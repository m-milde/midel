#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** The canary checker: finds copied canary names, stays quiet on clean files, and notices missing canaries. */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const real = path.join(ROOT, 'versions', 'canary-manifest.json');
if (!fs.existsSync(real)) {
  console.log('SKIP canary test: no versions/canary-manifest.json on this computer.');
  process.exit(0);
}
const manifest = JSON.parse(fs.readFileSync(real, 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'midel-canary-'));
fs.mkdirSync(path.join(tmp, 'versions'));
fs.copyFileSync(real, path.join(tmp, 'versions', 'canary-manifest.json'));

let failures = 0;
function check(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failures++;
  }
}
const run = (...args) => spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'canary-check.mjs'), ...args], { encoding: 'utf8', env: { ...process.env, MIDEL_ROOT: tmp } });
const write = (name, text) => {
  const f = path.join(tmp, name);
  fs.writeFileSync(f, text);
  return f;
};

const many = manifest.tokens.slice(0, 5).join(' ... ');
let r = run(write('copy.txt', `lessons: ${many}`));
check(r.status === 1 && /STRONG/.test(r.stdout), 'five different canary names in one file should be reported STRONG');
r = run(write('one.txt', `a story about ${manifest.tokens[0]} only`));
check(r.status === 1 && /lead/.test(r.stdout), 'a single canary name should be reported as a lead');
r = run(write('clean.txt', 'Nothing unusual here: tennis, rosemary and the quadratic formula.'));
check(r.status === 0 && /none/.test(r.stdout), 'a clean file should report none and exit 0');
r = run(write('lower.txt', `${manifest.tokens[1].toUpperCase()} and ${manifest.tokens[2].toLowerCase()}`));
check(/likely/.test(r.stdout), 'matching should ignore upper/lower case');
r = run(write('partial.txt', `${manifest.tokens[0]}ish ${manifest.tokens[0]}s`));
check(r.status === 0, 'a name that is only part of a longer word must not count');

// --self in a folder that lacks the canaries must complain.
fs.writeFileSync(path.join(tmp, 'a_facts.js'), 'var A = [];');
r = run('--self');
check(r.status === 1 && /MISSING/.test(r.stdout), '--self should complain when the canaries are missing from the lesson files');

fs.rmSync(tmp, { recursive: true, force: true });
if (failures) process.exit(1);
console.log('OK canary checker');
