#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Extra eval fixtures for rebuild step 7 (DEEP_NETWORK_REBUILD_PLAN §5.7).
 * Paraphrase + refusal: use scripts/fixtures/eval-baseline.json (npm run eval:sets).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMidelLibrary } from './load-midel-library.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts', 'fixtures', 'eval-extra.json');
const SEED = 20261023;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(SEED);

const lib = loadMidelLibrary();
const { taught, libSuggestIndex, libFieldModel } = lib;
const idx = libSuggestIndex(taught);
const model = libFieldModel(idx);
const EXCLUDED = '~excluded';

const eligible = idx.docs
  .filter((d) => {
    const f = d.fact;
    return f.question && f.text && model.fieldOf.get(d) !== EXCLUDED;
  })
  .map((d) => d.fact);

function packedLen(question, text) {
  return (String(question) + ' ' + String(text)).split(/\s+/).length;
}

const complex = eligible
  .filter((f) => packedLen(f.question, f.text) >= 95)
  .sort((a, b) => packedLen(b.question, b.text) - packedLen(a.question, a.text))
  .slice(0, 80)
  .map((f) => ({
    id: f.id,
    question: f.question,
    category: f.category,
    approxTokens: packedLen(f.question, f.text)
  }));

const structure = eligible
  .filter((f) => /survival/i.test(f.category || '') && /\d+\./.test(f.text))
  .slice(0, 40)
  .map((f) => {
    const nums = [...f.text.matchAll(/\b(\d+)\./g)].slice(0, 4).map((m) => m[0]);
    return {
      id: f.id,
      question: f.question,
      mustContain: nums.length ? nums : ['1.'],
      category: f.category
    };
  });

const byField = new Map();
for (const d of idx.docs) {
  const f = d.fact;
  if (!f.question || !f.text) continue;
  const field = model.fieldOf.get(d);
  if (!field || field === EXCLUDED) continue;
  if (!byField.has(field)) byField.set(field, []);
  byField.get(field).push(f);
}

const related = [];
for (const [field, list] of byField) {
  if (list.length < 4) continue;
  const anchor = list[Math.floor(rng() * list.length)];
  const others = list.filter((x) => x.id !== anchor.id).slice(0, 8);
  related.push({
    field,
    anchorId: anchor.id,
    prompt: anchor.question,
    relatedIds: others.map((x) => x.id)
  });
  if (related.length >= 28) break;
}

const doc = {
  version: 1,
  created: new Date().toISOString().slice(0, 10),
  seed: SEED,
  note: 'Paraphrase/refusal: eval-baseline.json. Network graded with npm run eval:model / eval:network-baseline.',
  counts: { complex: complex.length, structure: structure.length, related: related.length },
  complex,
  structure,
  related
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
console.log(`wrote ${path.relative(ROOT, OUT)}: complex ${complex.length}, structure ${structure.length}, related ${related.length}`);
