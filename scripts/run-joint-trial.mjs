#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import { ROOT, resolvePython } from './midel-python.mjs';

const extra = process.argv.slice(2);
const r = spawnSync(resolvePython('torch'), [path.join(ROOT, 'train_midel_torch.py'), '--joint-trial', ...extra], {
  cwd: ROOT,
  stdio: 'inherit'
});
process.exit(r.status ?? 1);
