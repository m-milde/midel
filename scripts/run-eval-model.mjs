#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Run train_stage3 needle eval on any brain file (stratified buckets). */
import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const exe = resolvePython();
const extra = process.argv.slice(2);
const r = spawnSync(exe, ['train_stage3.py', '--eval', ...extra], { cwd: ROOT, stdio: 'inherit' });
process.exit(r.status ?? 1);
