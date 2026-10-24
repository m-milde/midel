#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Pre-pack check: finds the silent problems that cost time before they reach the page or the deploy zip.
 *
 *   npm run check            fast checks (a few seconds)
 *   npm run check:full       the checks, then every regression test
 *   node scripts/preflight-check.mjs --quiet   print only problems (used by `npm run backup`)
 *
 * Exit code 1 when there is at least one ERROR. Warnings never fail the run.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = process.env.MIDEL_ROOT || path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const quiet = process.argv.includes('--quiet');

const errors = [];
const warnings = [];
const notes = [];
const ok = [];
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(ROOT, f));

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

/** Strict-JSON array of lesson rows from a facts file. Returns { rows } or { error }. */
function readFactsFile(file) {
  const text = read(file);
  const start = text.indexOf('[', file === 'taught_facts.js' ? Math.max(0, text.indexOf('var TAUGHT_LIBRARY')) : 0);
  const end = text.lastIndexOf(']');
  if (start < 0 || end < start) return { error: 'no [ ... ] array found' };
  const offset = start;
  let blob = text.slice(start, end + 1);
  blob = blob
    .split('\n')
    .map((l) => (l.trim().startsWith('//') ? '' : l))
    .join('\n');
  blob = blob.replace(/,(\s*[\]}])/g, '$1');
  try {
    return { rows: JSON.parse(blob) };
  } catch (e) {
    // Point at the first invalid backslash if there is one: the usual cause (LaTeX like \( ... \)).
    const bad = /\\[^"\\/bfnrtu]/.exec(blob);
    if (bad) {
      const line = lineOf(text, offset + bad.index);
      return { error: `single backslash before "${bad[0][1]}" at line ${line} (JSON allows only \\\\ \\" \\n \\t \\uXXXX). Write a² or a^2, not LaTeX` };
    }
    const m = /position (\d+)/.exec(String(e.message));
    const where = m ? ` near line ${lineOf(text, offset + Number(m[1]))}` : '';
    return { error: `invalid JSON${where}: ${String(e.message).slice(0, 90)}` };
  }
}

// ── 1. Lesson files ────────────────────────────────────────────────
const factFiles = fs
  .readdirSync(ROOT)
  .filter((f) => /_facts\.js$/.test(f))
  .sort();
const allRows = [];
const seenIds = new Map();
let rowsMissingQuestion = 0;
const missingQuestionExamples = [];
let backslashRows = 0;

for (const file of factFiles) {
  const res = readFactsFile(file);
  if (res.error) {
    errors.push(`${file}: ${res.error}. The page-builder would silently drop this whole file.`);
    continue;
  }
  if (!Array.isArray(res.rows)) {
    errors.push(`${file}: does not contain an array of lessons`);
    continue;
  }
  for (const r of res.rows) {
    if (!r || typeof r !== 'object') {
      errors.push(`${file}: a lesson row is not an object`);
      continue;
    }
    if (!Number.isInteger(r.id)) errors.push(`${file}: a row has no numeric id (${JSON.stringify(r).slice(0, 60)})`);
    if (typeof r.text !== 'string' || !r.text.trim()) errors.push(`${file}: lesson #${r.id} has no answer text`);
    if (typeof r.category !== 'string' || !r.category.trim()) warnings.push(`${file}: lesson #${r.id} has no category`);
    if (seenIds.has(r.id)) errors.push(`duplicate lesson id ${r.id}: ${seenIds.get(r.id)} and ${file}`);
    else seenIds.set(r.id, file);
    if (!String(r.question || '').trim()) {
      rowsMissingQuestion++;
      if (missingQuestionExamples.length < 3) missingQuestionExamples.push(`#${r.id} (${file})`);
    }
    if (typeof r.text === 'string' && r.text.includes('\\')) backslashRows++;
    allRows.push({ ...r, __file: file });
  }
}
if (!errors.some((e) => /_facts\.js:/.test(e))) ok.push(`${factFiles.length} lesson files are strict JSON; ${allRows.length} lessons, all ids unique`);
if (rowsMissingQuestion) warnings.push(`${rowsMissingQuestion} lesson(s) have no question and are not teachable, e.g. ${missingQuestionExamples.join(', ')}`);
if (backslashRows) warnings.push(`${backslashRows} lesson text(s) contain a backslash character; check they are intended`);

// Question quality and duplicates: information, not failures.
const normQ = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const qCount = new Map();
const tCount = new Map();
let lowerStart = 0;
let noMark = 0;
for (const r of allRows) {
  const q = String(r.question || '').trim();
  if (!q) continue;
  qCount.set(normQ(q), (qCount.get(normQ(q)) || 0) + 1);
  tCount.set(normQ(r.text), (tCount.get(normQ(r.text)) || 0) + 1);
  if (/^[a-z]/.test(q)) lowerStart++;
  if (!q.endsWith('?')) noMark++;
}
const dupQ = [...qCount.values()].reduce((n, c) => n + (c > 1 ? c - 1 : 0), 0);
const dupT = [...tCount.values()].reduce((n, c) => n + (c > 1 ? c - 1 : 0), 0);
notes.push(`library quality: ${dupQ} repeated questions, ${dupT} repeated answer texts, ${lowerStart} questions start lowercase, ${noMark} lack a "?"`);

// ── 2. Page file list (manifest and html) ──────────────────────────
let manifestNames = [];
try {
  const m = read('pack_manifest.js').match(/KNOWLEDGE_PACKS\s*=\s*(\[[^\]]*\])/);
  manifestNames = JSON.parse(m[1]);
} catch (e) {
  errors.push('pack_manifest.js: cannot read KNOWLEDGE_PACKS');
}
const html = exists('neural_lab.html') ? read('neural_lab.html') : '';
for (const f of factFiles) {
  if (!manifestNames.includes(f)) errors.push(`${f} is not listed in pack_manifest.js, so the page will NOT load it`);
  else if (!new RegExp(`<script src="${f.replace(/[.]/g, '\\.')}`).test(html)) errors.push(`${f} has no <script> tag in neural_lab.html`);
}
for (const f of manifestNames) if (!exists(f)) errors.push(`pack_manifest.js lists ${f}, which does not exist`);
if (!errors.some((e) => /pack_manifest|<script> tag|NOT load/.test(e))) ok.push(`pack_manifest.js and neural_lab.html load all ${factFiles.length} lesson files`);

// ── 3. neural_lab.html itself ──────────────────────────────────────
if (!html) {
  errors.push('neural_lab.html is missing');
} else {
  if (!html.includes('<body>')) errors.push('neural_lab.html has no literal <body> tag; the deploy packer needs it to mark the deploy build');
  let bad = 0;
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, i) => {
    try {
      new vm.Script(m[1]);
    } catch (e) {
      bad++;
      errors.push(`neural_lab.html inline script #${i + 1}: ${String(e.message).slice(0, 100)}`);
    }
  });
  if (!bad) ok.push('neural_lab.html inline scripts have no syntax errors');

  // Every local file the page loads must exist and must be in the deploy list.
  const refs = new Set();
  for (const m of html.matchAll(/<script src="([^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/<link[^>]+href="([^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) refs.add(m[1]);
  let deployNames = [];
  try {
    const py = read('pack_midel_backup.py');
    const block = py.match(/DEPLOY_NAMES\s*=\s*\(([\s\S]*?)\)/)[1];
    deployNames = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  } catch (e) {
    warnings.push('could not read DEPLOY_NAMES from pack_midel_backup.py');
  }
  let missing = 0;
  for (const ref of refs) {
    if (/^(https?:|data:|\/\/)/.test(ref)) continue;
    const file = ref.split('?')[0];
    if (!exists(file)) {
      errors.push(`neural_lab.html uses ${file}, which does not exist`);
      missing++;
    } else if (deployNames.length && !deployNames.includes(file) && !/_facts\.js$/.test(file) && file !== 'taught_facts.js') {
      errors.push(`neural_lab.html uses ${file}, but pack_midel_backup.py (DEPLOY_NAMES) would not put it in the deploy zip`);
      missing++;
    }
  }
  if (!missing) ok.push('every file the page loads exists and is in the deploy list');
  if (!/id="boot"[^>]*data-expected-bytes="\d+"/.test(html)) warnings.push('loading screen element (id="boot" with data-expected-bytes) not found in neural_lab.html');
}

// ── 4. Other scripts ───────────────────────────────────────────────
let jsBad = 0;
for (const f of [
  'science_library.js',
  'percent_calc.js',
  'chat_context.js',
  'training_text.js',
  'answer_format.js',
  'deep_model.js',
  'wiki_lookup.js',
  'think_network.js',
  'short_added.js',
  'short_added.meta.js',
  'pack_manifest.js'
]) {
  if (!exists(f)) {
    if (f !== 'think_network.js') errors.push(`${f} is missing`);
    continue;
  }
  try {
    new vm.Script(read(f), { filename: f });
  } catch (e) {
    jsBad++;
    errors.push(`${f}: syntax error: ${String(e.message).slice(0, 100)}`);
  }
}
if (!jsBad) ok.push('library, calculator, formatter, deep-model and short-lesson scripts have no syntax errors');

if (exists('stage3_brain.js')) {
  const size = fs.statSync(path.join(ROOT, 'stage3_brain.js')).size;
  const fd = fs.openSync(path.join(ROOT, 'stage3_brain.js'), 'r');
  const tailLen = Math.min(64, size);
  const buf = Buffer.alloc(tailLen);
  fs.readSync(fd, buf, 0, tailLen, size - tailLen);
  fs.closeSync(fd);
  if (!/;\s*$/.test(buf.toString('utf8'))) errors.push('stage3_brain.js does not end with ";" (a trainer may be writing it, or the file is cut off)');
  else ok.push(`stage3_brain.js is complete (${(size / 1e6).toFixed(1)} MB)`);
}

// ── 4b. Protection: .htaccess hotlink rules, About/license card and canary lessons ──
if (!exists('.htaccess')) {
  warnings.push('.htaccess is missing: the deployed site would have no hotlink protection or security headers');
} else {
  const ht = read('.htaccess');
  if (!/RewriteRule\s+\\\.\(js\|json\)\$\s+-\s+\[F,L\]/.test(ht)) warnings.push('.htaccess has no hotlink-protection rule for .js/.json files');
  else ok.push('.htaccess carries the hotlink-protection rules');
  try {
    const py = read('pack_midel_backup.py');
    if (!/"\.htaccess"/.test(py.match(/DEPLOY_NAMES\s*=\s*\(([\s\S]*?)\)/)[1])) warnings.push('.htaccess is not in DEPLOY_NAMES, so the deploy zip would not contain it');
  } catch (e) {
    /* deploy list unreadable: already reported above */
  }
}
if (html && !/id="about-card"/.test(html)) warnings.push('the About & license card (id="about-card") is missing from neural_lab.html');
if (exists('versions/canary-manifest.json')) {
  try {
    const man = JSON.parse(read('versions/canary-manifest.json'));
    const byId = new Map(allRows.map((r) => [r.id, r]));
    let gone = 0;
    for (const l of man.lessons || []) {
      const r = byId.get(l.id);
      if (!r || r.question !== l.question) gone++;
    }
    const shortText = exists('short_added.js') ? read('short_added.js') : '';
    for (const line of man.shortLines || []) if (!shortText.includes(line)) gone++;
    if (gone) warnings.push(`${gone} canary lesson(s)/line(s) are missing or changed (see versions/canary-manifest.json); restore them or update the manifest`);
    else ok.push('canary lessons are in place');
  } catch (e) {
    warnings.push('could not read versions/canary-manifest.json');
  }
}

// ── 5. What is running ─────────────────────────────────────────────
const ps = spawnSync('pgrep', ['-fl', 'train_stage3|learn-new|save_taught|watch-css'], { encoding: 'utf8' });
const running = String(ps.stdout || '')
  .split('\n')
  .filter((l) => l.trim() && !/pgrep/.test(l));
if (running.some((l) => /train_stage3|learn-new/.test(l))) warnings.push('a trainer is running: do not pack or replace stage3_brain.js until it finishes');
if (running.some((l) => /save_taught|watch-css/.test(l))) {
  notes.push('background tools are running (the lesson writer and/or the CSS watcher). They re-save neural_lab.html and rotate its ?v= tags, so re-check your edits about 15 seconds after saving.');
}

// ── Report ─────────────────────────────────────────────────────────
const out = [];
if (!quiet) for (const m of ok) out.push(`  ok   ${m}`);
for (const m of notes) if (!quiet) out.push(`  info ${m}`);
for (const m of warnings) out.push(`  WARN ${m}`);
for (const m of errors) out.push(`  FAIL ${m}`);
if (out.length) console.log(out.join('\n'));
if (errors.length) {
  console.error(`\nCHECK FAILED: ${errors.length} error(s), ${warnings.length} warning(s). Fix the FAIL lines before packing.`);
  process.exit(1);
}
if (!quiet || warnings.length) console.log(`\nCHECK OK${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
