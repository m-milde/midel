#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Foreground Teaching writer on port 8787 (Mac and Windows). */
import { spawn } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const child = spawn(resolvePython(), ['save_taught.py'], {
  cwd: ROOT,
  stdio: 'inherit'
});
child.on('exit', (code) => process.exit(code ?? 1));
