#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** training_text.js and training_text.py must agree on sample answers. */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { ROOT, resolvePython } from './midel-python.mjs';

const exe = resolvePython();

const ctx = vm.createContext({ module: { exports: {} }, exports: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'training_text.js'), 'utf8'), ctx, { filename: 'training_text.js' });
const { trainingText } = ctx.module.exports;

const samples = [
  'Plain one sentence.',
  'Early signs are shivering.\n**Dangerous signs**\n- Confusion, slurred speech.\n**What to do**\n- Get out of wind.',
  'Area = π × r².',
  'x = (−b ± √(b² − 4ac)) / (2a).',
  '10 ÷ 2 is five.',
  'Tip is 15% of the bill.'
];

for (const s of samples) {
  const js = trainingText(s);
  const r = spawnSync(exe, ['-c', `from training_text import training_text; print(training_text(${JSON.stringify(s)}))`], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  if (r.status !== 0) {
    console.error('python failed:', r.stderr);
    process.exit(1);
  }
  const pyOut = r.stdout.trim();
  if (pyOut !== js) {
    console.error('MISMATCH');
    console.error(' in:', s.slice(0, 80));
    console.error(' js:', js);
    console.error(' py:', pyOut);
    process.exit(1);
  }
}
console.log('OK training_text.js matches training_text.py (' + samples.length + ' samples)');
