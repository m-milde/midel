#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Looks for Midel's canary names (invented, clearly fictional lessons) in files or web addresses.
 *
 *   npm run canary:check -- some-file.js https://other-site.example/data.js
 *   npm run canary:check -- --self          check that your own lesson files still carry the canaries
 *   npm run canary:check -- --list          show which names are canaries
 *
 * A web address must point at the FILE that holds the data (for example the site's .js or .json file),
 * not just at the page. One matching name is a lead; several different names together are strong evidence
 * that lessons were copied. The canary list is versions/canary-manifest.json (keep it private).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = process.env.MIDEL_ROOT || path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const manifestPath = path.join(ROOT, 'versions', 'canary-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('No canary list found at versions/canary-manifest.json');
  process.exit(2);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const tokens = manifest.tokens || [];

if (argv.includes('--list')) {
  console.log('Canary names (keep private):\n  ' + tokens.join('\n  '));
  console.log(`\n${manifest.lessons.length} lessons and ${manifest.shortLines.length} short lines carry them.`);
  process.exit(0);
}

async function load(target) {
  if (/^https?:\/\//i.test(target)) {
    const res = await fetch(target, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'midel-canary-check' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  }
  return fs.readFileSync(target, 'utf8');
}

function scan(text) {
  const found = {};
  for (const t of tokens) {
    const re = new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    const n = (text.match(re) || []).length;
    if (n) found[t] = n;
  }
  return found;
}

let targets = argv.filter((a) => !a.startsWith('--'));
const self = argv.includes('--self');
if (self) {
  targets = fs
    .readdirSync(ROOT)
    .filter((f) => /_facts\.js$/.test(f) || f === 'short_added.js')
    .map((f) => path.join(ROOT, f));
}
if (!targets.length) {
  console.error('Usage: canary-check.mjs <file-or-url> [...]   |   --self   |   --list');
  process.exit(2);
}

let exit = 0;
const selfFound = new Set();
for (const target of targets) {
  let text;
  try {
    text = await load(target);
  } catch (e) {
    console.log(`  ?     ${target}: could not read it (${String(e.message).slice(0, 80)})`);
    exit = exit || 3;
    continue;
  }
  const found = scan(text);
  const names = Object.keys(found);
  names.forEach((n) => selfFound.add(n));
  if (self) {
    if (names.length) console.log(`  has   ${path.basename(target)}: ${names.length} canary name(s)`);
    continue;
  }
  if (!names.length) console.log(`  none  ${target}: no canary names found`);
  else {
    const strength = names.length >= 4 ? 'STRONG' : names.length >= 2 ? 'likely' : 'lead';
    console.log(`  ${strength.padEnd(6)} ${target}: ${names.length} of ${tokens.length} canary names found (${names.map((n) => `${n}×${found[n]}`).join(', ')})`);
    if (names.length >= 2) console.log('         Several different invented names in one place is very unlikely by chance. Keep a copy of the evidence and the dated backups.');
    exit = 1;
  }
}
if (self) {
  const missing = tokens.filter((t) => !selfFound.has(t));
  if (missing.length) {
    console.log(`\nMISSING canary names in your own files: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log(`\nOK: all ${tokens.length} canary names are present in your lesson files.`);
}
process.exit(self ? 0 : exit === 3 ? 3 : exit);
