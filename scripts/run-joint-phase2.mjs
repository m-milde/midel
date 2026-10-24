#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Phase-2 joint: tier L, fact packs + core only, answer-focus + cosine LR.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const date = new Date().toISOString().slice(0, 10);
const out = `versions/stage3_brain.joint.L-packs-${date}.pt`;

const preset = [
  '--tier',
  'L',
  '--epochs',
  '40',
  '--batch-size',
  '2',
  '--packs-only',
  '--out',
  out,
  '--checkpoint-every',
  '5',
  '--eval-every',
  '5',
  '--eval-sample',
  '800',
  '--log-interval',
  '200',
  '--eval-log-every',
  '40',
  '--lr-schedule',
  'cosine',
  '--answer-focus-len',
  '64'
];

console.log('joint-phase2 →', out);
const r = spawnSync('node', [path.join(ROOT, 'scripts/run-joint-full.mjs'), ...preset, ...process.argv.slice(2)], {
  cwd: ROOT,
  stdio: 'inherit'
});
process.exit(r.status ?? 1);
