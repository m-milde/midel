#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Runbook step 8: 100-step trainer benchmark (PyTorch tier M + optional NumPy legacy). */
import { spawnSync } from 'child_process';
import { ROOT, resolvePython, hasVenv } from './midel-python.mjs';

const extra = process.argv.slice(2);

function run(exe, more) {
  return spawnSync(exe, ['scripts/benchmark_trainer.py', ...more], { cwd: ROOT, stdio: 'inherit' });
}

if (hasVenv('torch')) {
  const r = run(resolvePython('torch'), extra);
  process.exit(r.status ?? 1);
}
console.warn('No .venv-torch — running PyTorch benchmark with system/python fallback may fail.');
const r = run(resolvePython(), extra);
process.exit(r.status ?? 1);
