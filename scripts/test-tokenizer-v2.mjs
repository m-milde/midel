#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Round-trip + Python/JS parity for midel tokenizer v2. */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { TextDecoder, TextEncoder } from 'util';
import { ROOT, resolvePython } from './midel-python.mjs';

const exe = resolvePython();
const TOKENIZER = path.join(ROOT, 'versions', 'midel-tokenizer-v2.json');
const SPOT = path.join(ROOT, 'scripts', 'fixtures', 'tokenizer-v2-spotcheck.json');

if (!fs.existsSync(TOKENIZER)) {
  console.error('FAIL missing ' + path.relative(ROOT, TOKENIZER) + ' — run npm run tokenizer:build');
  process.exit(1);
}

const tokJson = fs.readFileSync(TOKENIZER, 'utf8');
const tokData = JSON.parse(tokJson);
if (tokData.vocabSize > 16384) {
  console.error('FAIL vocab size ' + tokData.vocabSize + ' exceeds 16k cap');
  process.exit(1);
}

const ctx = vm.createContext({ module: { exports: {} }, exports: {}, TextEncoder, TextDecoder });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'midel_tokenizer_v2.js'), 'utf8'), ctx, { filename: 'midel_tokenizer_v2.js' });
const JS = ctx.module.exports;
JS.loadFromObject(tokData);

function pyBatch(strings) {
  const payload = JSON.stringify(strings);
  const code = `
import json, sys
sys.path.insert(0, ${JSON.stringify(ROOT)})
from midel_tokenizer_v2 import load, encode, decode, prepare_text
load(${JSON.stringify(TOKENIZER)})
data = json.loads(sys.stdin.read())
out = []
for s in data:
    prep = prepare_text(s) if s else ""
    ids = encode(s) if s else []
    back = decode(ids) if ids else ""
    out.append({"ids": ids, "back": back, "prep": prep})
print(json.dumps(out))
`;
  const r = spawnSync(exe, ['-c', code], { input: payload, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) {
    console.error(r.stderr);
    process.exit(1);
  }
  return JSON.parse(r.stdout);
}

function collectLessonStrings(limit = 0) {
  const r = spawnSync(
    exe,
    ['-c', `
import json, sys
sys.path.insert(0, ${JSON.stringify(ROOT)})
import train_stage3 as t
from training_text import training_text
from midel_tokenizer_v2 import prepare_text
import re
RESTRICTED = re.compile(r"swear|\\\\bweed\\\\b|controlled substances", re.I)
out = []
for row in t.teachable_lesson_rows():
    if RESTRICTED.search(row.get("category") or ""):
        continue
    q = (row.get("question") or "").strip()
    a = training_text((row.get("text") or "").strip())
    s = prepare_text(q + " " + a)
    out.append(s)
print(json.dumps(out))
`],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  if (r.status !== 0) {
    console.error('collect lessons failed:', r.stderr);
    process.exit(1);
  }
  const all = JSON.parse(r.stdout);
  return limit ? all.slice(0, limit) : all;
}

const spot = JSON.parse(fs.readFileSync(SPOT, 'utf8')).samples.filter((s) => s !== '');
const lessons = collectLessonStrings(0);
const allStrings = [...spot, ...lessons];

const pyOut = pyBatch(allStrings);
let badRt = 0;
let badParity = 0;

for (let i = 0; i < allStrings.length; i++) {
  const s = allStrings[i];
  const prep = JS.prepareText(s);
  const jsIds = JS.encode(s);
  const jsBack = JS.decode(jsIds);
  const py = pyOut[i];
  if (py.back !== prep) {
    badRt++;
    if (badRt <= 3) console.error('FAIL round-trip py', s.slice(0, 60), '→', py.back.slice(0, 60));
  }
  if (jsBack !== prep) {
    badRt++;
    if (badRt <= 3) console.error('FAIL round-trip js', s.slice(0, 60));
  }
  if (JSON.stringify(jsIds) !== JSON.stringify(py.ids)) {
    badParity++;
    if (badParity <= 3) {
      console.error('FAIL parity', s.slice(0, 50));
      console.error(' js', jsIds.slice(0, 20));
      console.error(' py', py.ids.slice(0, 20));
    }
  }
}

if (badRt || badParity) {
  console.error(`FAIL round-trip ${badRt} parity ${badParity} of ${allStrings.length}`);
  process.exit(1);
}

console.log(
  'OK tokenizer v2 vocab ' +
    tokData.vocabSize +
    ' — round-trip + py/js parity on ' +
    allStrings.length +
    ' strings (' +
    lessons.length +
    ' fact-pack lessons + spotcheck)'
);
