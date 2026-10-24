#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Sync pack_manifest + report corpus growth for chat and PyTorch joint training.
 */

import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const extra = process.argv.slice(2);
const r = spawnSync(resolvePython(), ['scripts/corpus_grow.py', ...extra], {
  cwd: ROOT,
  stdio: 'inherit'
});
process.exit(r.status ?? 1);
