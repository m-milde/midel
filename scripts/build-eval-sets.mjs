#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Builds the baseline question sets used to judge the library today and the deep network after the rebuild.
 *
 *   npm run eval:sets                     writes scripts/fixtures/eval-baseline.json
 *   node scripts/build-eval-sets.mjs --per-field 15 --seed 20261021
 *
 * The sets are the SAME questions every time for the same library and seed. They cover the 14 fields
 * evenly and never include the restricted categories (Swear Words, Weed, Controlled Substances), which
 * stay library-only under the rebuild plan.
 *
 * Kinds of question, all aimed at one stored lesson:
 *   exact    the stored question, word for word (also the benchmark set for answer-writing tests)
 *   casual   lowercase, no question mark
 *   typo     one slip in the longest word
 *   reworded "how to" / "how do I", dropped "the", and so on
 *   synonym  an everyday synonym swapped in (only when the question has one)
 *   refusal  invented words and nonsense: the right answer is "not in the library"
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMidelLibrary } from './load-midel-library.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, def) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : def;
};
const PER_FIELD = Number(arg('--per-field', 15));
const SEED = Number(arg('--seed', 20261021));
const OUT = arg('--out', path.join(ROOT, 'scripts', 'fixtures', 'eval-baseline.json'));

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
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const lib = loadMidelLibrary();
const { SCIENCE_LIBRARY, taught, libSuggestIndex, libFieldModel, libFieldByName } = lib;
const all = SCIENCE_LIBRARY.concat(taught);
const idx = libSuggestIndex(taught);
const model = libFieldModel(idx);

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
// Questions that differ only by a/an/the ("What is squid?" and "What is a squid?") are the same question.
const normQ = (s) => norm(s).replace(/\b(a|an|the)\b/g, ' ').replace(/\s+/g, ' ').trim();
const fieldById = new Map();
for (const d of idx.docs) fieldById.set(d.fact.id, model.fieldOf.get(d) || 'other');
const EXCLUDED = '~excluded';

// Lessons that share a question or an answer count as the same target (the library shows them all).
const byQuestion = new Map();
const byText = new Map();
for (const f of all) {
  if (!f.question || !f.text) continue;
  const q = normQ(f.question);
  const t = norm(f.text);
  if (!byQuestion.has(q)) byQuestion.set(q, []);
  byQuestion.get(q).push(f.id);
  if (!byText.has(t)) byText.set(t, []);
  byText.get(t).push(f.id);
}

const eligible = all.filter((f) => {
  if (!String(f.question || '').trim() || !String(f.text || '').trim()) return false;
  if (libFieldByName(f.category) === EXCLUDED) return false;
  const field = fieldById.get(f.id);
  return field && field !== EXCLUDED && field !== 'other';
});

// Stratified sample: the same number of lessons from every field.
const byField = new Map();
for (const f of eligible) {
  const field = fieldById.get(f.id);
  if (!byField.has(field)) byField.set(field, []);
  byField.get(field).push(f);
}
const sample = [];
for (const field of [...byField.keys()].sort()) {
  const pool = shuffle(byField.get(field)).filter((f) => f.question.length <= 120);
  sample.push(...pool.slice(0, PER_FIELD));
}

// ── variants ───────────────────────────────────────────────────────
const STOP = new Set('what is are the a an of to in on for and or with from by do does how why who which when where can i you it'.split(' '));
const SYNONYMS = [
  ['clock', 'watch'], ['watch', 'clock'], ['defend', 'protect'], ['protect', 'defend'], ['start', 'begin'], ['begin', 'start'],
  ['fix', 'repair'], ['repair', 'fix'], ['buy', 'purchase'], ['price', 'cost'], ['cost', 'price'], ['help', 'assist'], ['large', 'big'], ['big', 'large']
];

function typoOf(question) {
  const words = question.replace(/[?]/g, '').split(/\s+/);
  let best = -1;
  words.forEach((w, i) => {
    const clean = w.replace(/[^A-Za-z]/g, '');
    if (i > 0 && clean.length >= 6 && !STOP.has(clean.toLowerCase()) && (best < 0 || clean.length > words[best].replace(/[^A-Za-z]/g, '').length)) best = i;
  });
  if (best < 0) return null;
  const w = words[best];
  const letters = w.replace(/[^A-Za-z]/g, '');
  const p = 1 + Math.floor(rng() * (letters.length - 2));
  const ops = [
    () => letters.slice(0, p) + letters[p + 1] + letters[p] + letters.slice(p + 2), // swap two neighbours
    () => letters.slice(0, p) + letters.slice(p + 1), // drop a letter
    () => letters.slice(0, p) + letters[p] + letters.slice(p) // double a letter
  ];
  const changed = ops[Math.floor(rng() * ops.length)]();
  if (changed === letters) return null;
  words[best] = w.replace(letters, changed);
  return words.join(' ') + (question.trim().endsWith('?') ? '?' : '');
}

function rewordOf(question) {
  const q = question.trim();
  let m;
  if ((m = /^How do (?:I|you) (.+)\?$/i.exec(q))) return 'How to ' + m[1] + '?';
  if ((m = /^How to (.+?)\??$/i.exec(q))) return 'How do I ' + m[1] + '?';
  if ((m = /^How can (?:I|you) (.+)\?$/i.exec(q))) return 'How to ' + m[1] + '?';
  if (/\b(the|a|an)\s+\w+/i.test(q.slice(q.indexOf(' ') + 1))) return q.replace(/\s+(the|a|an)\s+/i, ' ');
  return null;
}

function synonymOf(question) {
  for (const [from, to] of SYNONYMS) {
    const re = new RegExp('\\b' + from + '\\b', 'i');
    if (re.test(question)) return question.replace(re, to);
  }
  return null;
}

const items = [];
let n = 0;
const add = (kind, prompt, f) => {
  if (!prompt || prompt === f.question) {
    if (kind !== 'exact') return;
  }
  const expected = new Set([f.id]);
  for (const id of byQuestion.get(normQ(f.question)) || []) expected.add(id);
  for (const id of byText.get(norm(f.text)) || []) expected.add(id);
  items.push({
    id: 'q' + String(++n).padStart(4, '0'),
    kind,
    prompt,
    target: f.id,
    expectedIds: [...expected].sort((a, b) => a - b),
    question: f.question,
    category: f.category,
    field: fieldById.get(f.id)
  });
};
for (const f of sample) {
  add('exact', f.question, f);
  add('casual', f.question.toLowerCase().replace(/\?+$/, ''), f);
  add('typo', typoOf(f.question), f);
  add('reworded', rewordOf(f.question), f);
  add('synonym', synonymOf(f.question), f);
}
// Synonym questions are rare in a random sample, so add up to 30 more lessons whose question holds a swappable word.
const sampled = new Set(sample.map((f) => f.id));
for (const f of shuffle(eligible.filter((x) => !sampled.has(x.id) && x.question.length <= 120 && synonymOf(x.question))).slice(0, 30)) {
  add('synonym', synonymOf(f.question), f);
}
const benchmarkIds = new Set(items.filter((i) => i.kind === 'exact').slice(0, 100).map((i) => i.id));
for (const it of items) if (benchmarkIds.has(it.id)) it.benchmark = true;

// ── refusal set: invented words and nonsense must give "not in the library" ──
const invented = ['zorblax', 'quendrix', 'flomby', 'vrastle', 'glimmerwock', 'snarfle', 'tupperwhistle', 'blorptonic', 'wumbleshank', 'dracovian'];
const templates = ['What is a {w}?', 'How do I build a {w}?', 'Who invented the {w}?'];
const refusal = [];
for (const w of invented) for (const t of templates) refusal.push(t.replace('{w}', w));
refusal.push('asdkj qweoi zxcmn?', 'qqqq wwww eeee rrrr', 'zzzz xxxx cccc vvvv bbbb?', 'blah blah blah', 'lorem ipsum dolor sit amet?', 'xyzzy plugh?', 'hmmm ooo aaa uuu?', 'ghjkl mnbvc?', 'ppp ooo iii uuu yyy?', 'fffgg hhhjj kkkll?');
for (const prompt of refusal) {
  items.push({ id: 'q' + String(++n).padStart(4, '0'), kind: 'refusal', prompt, target: null, expectedIds: [], question: null, category: null, field: null });
}

const counts = {};
for (const it of items) counts[it.kind] = (counts[it.kind] || 0) + 1;
const doc = {
  version: 1,
  created: new Date().toISOString().slice(0, 10),
  seed: SEED,
  perField: PER_FIELD,
  library: { lessons: all.length, sampledLessons: sample.length, extraSynonymLessons: items.filter((i) => i.kind === 'synonym').length },
  fields: [...byField.keys()].sort(),
  counts,
  note: 'A question passes when the library returns a lesson whose id (or answer text) is in expectedIds; refusal questions pass when nothing is returned. Rebuild with `npm run eval:sets`; compare runs with `npm run eval:baseline`.',
  items
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
console.log(`wrote ${path.relative(ROOT, OUT)}: ${items.length} questions from ${sample.length} lessons in ${byField.size} fields`);
console.log('  by kind: ' + Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log(`  benchmark (answer-writing) set: ${benchmarkIds.size} exact questions`);
