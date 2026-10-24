#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Asks the library every question in scripts/fixtures/eval-baseline.json and reports how it did.
 *
 *   npm run eval:baseline                              4 worker processes, writes versions/eval-baseline-results-DATE.json
 *   node scripts/run-eval-baseline.mjs --workers 6
 *   node scripts/run-eval-baseline.mjs --limit 100     quick look at the first 100 questions
 *   node scripts/run-eval-baseline.mjs --compare versions/eval-baseline-results-2026-10-21.json
 *
 * Each answer is one of: pass (the right lesson), wrong (a different lesson: the worst outcome) or none
 * ("not in the library"). Refusal questions pass when nothing is returned.
 * The same fixture is meant to be reused to judge the deep network after the rebuild.
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (name, def) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : def;
};
const FIXTURE = arg('--fixture', path.join(ROOT, 'scripts', 'fixtures', 'eval-baseline.json'));

// ── worker: loads the library once, answers its share of the questions ──
if (argv.includes('--worker')) {
  const { loadMidelLibrary } = await import('./load-midel-library.mjs');
  const [k, n] = arg('--worker', '0/1').split('/').map(Number);
  const limit = Number(arg('--limit', 0)) || Infinity;
  const doc = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'));
  const lib = loadMidelLibrary();
  const mine = doc.items.slice(0, limit).filter((_, i) => i % n === k);
  for (const it of mine) {
    const t0 = Date.now();
    let r = null;
    try {
      r = await lib.answerFromLessonsAsync(it.prompt, lib.taught);
    } catch (e) {
      r = { error: String(e.message).slice(0, 80), facts: [] };
    }
    const ids = r && r.facts ? r.facts.map((f) => f.id) : [];
    const expected = new Set(it.expectedIds);
    let outcome;
    if (it.kind === 'refusal') outcome = r ? 'wrong' : 'pass';
    else if (!r || !ids.length) outcome = 'none';
    else outcome = ids.some((id) => expected.has(id)) ? 'pass' : 'wrong';
    process.send({ id: it.id, outcome, ids: ids.slice(0, 3), got: r && r.facts && r.facts[0] ? r.facts[0].question || '(no question)' : null, ms: Date.now() - t0 });
  }
  process.send({ done: true });
  process.exit(0);
}

// ── main ──
const doc = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'));
const limit = Number(arg('--limit', 0)) || Infinity;
const total = Math.min(doc.items.length, limit);
const workers = Math.max(1, Math.min(Number(arg('--workers', 4)), os.cpus().length, total));
const results = new Map();
const started = Date.now();
console.log(`asking the library ${total} questions with ${workers} worker(s)…`);

await Promise.all(
  Array.from({ length: workers }, (_, k) =>
    new Promise((resolve, reject) => {
      const child = fork(fileURLToPath(import.meta.url), ['--worker', `${k}/${workers}`, '--fixture', FIXTURE, ...(limit < Infinity ? ['--limit', String(limit)] : [])], { silent: false });
      child.on('message', (m) => {
        if (m.done) return resolve();
        results.set(m.id, m);
        if (results.size % 100 === 0) process.stdout.write(`  ${results.size}/${total}\n`);
      });
      child.on('error', reject);
      child.on('exit', (code) => (code ? reject(new Error('worker ' + k + ' exited with ' + code)) : resolve()));
    })
  )
);

const items = doc.items.slice(0, limit).map((it) => ({ ...it, ...results.get(it.id) }));
const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
function tally(list) {
  const t = { n: list.length, pass: 0, wrong: 0, none: 0 };
  for (const it of list) t[it.outcome]++;
  return t;
}
const line = (label, t) => `  ${label.padEnd(22)} ${String(t.n).padStart(4)}   pass ${String(pct(t.pass, t.n)).padStart(3)}%   wrong ${String(pct(t.wrong, t.n)).padStart(3)}%   none ${String(pct(t.none, t.n)).padStart(3)}%`;

const byKind = {};
const byField = {};
const byCategory = {};
for (const it of items) {
  (byKind[it.kind] = byKind[it.kind] || []).push(it);
  if (it.kind !== 'refusal') {
    (byField[it.field] = byField[it.field] || []).push(it);
    (byCategory[it.category] = byCategory[it.category] || []).push(it);
  }
}
const real = items.filter((i) => i.kind !== 'refusal');
const summary = {
  created: new Date().toISOString(),
  fixture: path.relative(ROOT, FIXTURE),
  questions: items.length,
  seconds: Math.round((Date.now() - started) / 1000),
  overall: tally(real),
  refusal: tally(byKind.refusal || []),
  byKind: Object.fromEntries(Object.entries(byKind).map(([k, v]) => [k, tally(v)])),
  byField: Object.fromEntries(Object.entries(byField).map(([k, v]) => [k, tally(v)])),
  weakestCategories: Object.entries(byCategory)
    .filter(([, v]) => v.length >= 5)
    .map(([k, v]) => [k, tally(v)])
    .sort((a, b) => a[1].pass / a[1].n - b[1].pass / b[1].n)
    .slice(0, 8)
    .map(([k, t]) => ({ category: k, ...t })),
  benchmark: tally(items.filter((i) => i.benchmark)),
  slowestMs: Math.max(0, ...items.map((i) => i.ms || 0)),
  medianMs: items.map((i) => i.ms || 0).sort((a, b) => a - b)[Math.floor(items.length / 2)] || 0
};
const failures = items.filter((i) => i.outcome !== 'pass').sort((a, b) => (a.outcome === 'wrong' ? -1 : 1) - (b.outcome === 'wrong' ? -1 : 1));

console.log(`\nBASELINE RESULTS  (${summary.questions} questions, ${summary.seconds}s, median ${summary.medianMs} ms per question)`);
console.log(line('all lesson questions', summary.overall));
for (const [k, t] of Object.entries(summary.byKind)) if (k !== 'refusal') console.log(line('  ' + k, t));
console.log(line('refusal (nonsense)', summary.refusal));
console.log(line('benchmark (exact 100)', summary.benchmark));
console.log('\nby field (lesson questions only)');
for (const [k, t] of Object.entries(summary.byField).sort((a, b) => a[1].pass / a[1].n - b[1].pass / b[1].n)) console.log(line(k, t));
console.log('\nweakest categories (5+ questions)');
for (const c of summary.weakestCategories) console.log(line(c.category, c));

if (failures.length) {
  console.log(`\nfirst problems (wrong answers first):`);
  for (const f of failures.slice(0, 12)) console.log(`  [${f.outcome}] ${f.kind}: "${f.prompt}"  →  ${f.got ? '"' + f.got + '"' : 'not in the library'}${f.kind === 'refusal' ? '' : '   (wanted "' + f.question + '")'}`);
}

const cmp = arg('--compare', '');
if (cmp && fs.existsSync(cmp)) {
  const prev = JSON.parse(fs.readFileSync(cmp, 'utf8')).summary;
  const d = (a, b) => (pct(a.pass, a.n) - pct(b.pass, b.n) >= 0 ? '+' : '') + (pct(a.pass, a.n) - pct(b.pass, b.n));
  console.log(`\nCHANGE vs ${path.basename(cmp)} (pass rate, percentage points)`);
  console.log(`  all ${d(summary.overall, prev.overall)} · refusal ${d(summary.refusal, prev.refusal)}`);
  for (const [k, t] of Object.entries(summary.byKind)) if (prev.byKind[k]) console.log(`  ${k.padEnd(10)} ${d(t, prev.byKind[k])}`);
  for (const [k, t] of Object.entries(summary.byField)) if (prev.byField[k]) console.log(`  ${k.padEnd(22)} ${d(t, prev.byField[k])}`);
}

const outPath = arg('--out', path.join(ROOT, 'versions', `eval-baseline-results-${new Date().toISOString().slice(0, 10)}.json`));
if (limit === Infinity) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ summary, failures: failures.slice(0, 200).map(({ id, kind, prompt, outcome, got, question, field, category, ids }) => ({ id, kind, prompt, outcome, got, wanted: question, field, category, ids })) }, null, 1) + '\n');
  console.log(`\nsaved ${path.relative(ROOT, outPath)}`);
}
process.exit(0);
