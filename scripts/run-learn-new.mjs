#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Single learn-new run (wrapper for npm run learn:new). */
import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const r = spawnSync(resolvePython(), ['train_stage3.py', '--learn-new'], {
  cwd: ROOT,
  stdio: 'inherit'
});
process.exit(r.status ?? 1);
