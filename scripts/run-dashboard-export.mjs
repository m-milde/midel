#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 */

import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const py = path.join(ROOT, '.venv-torch/bin/python');
const exe = fs.existsSync(py) ? py : 'python3';
const rest = process.argv.slice(2);
const ckpt =
  rest.find((a) => !a.startsWith('-') && a.endsWith('.pt')) ||
  'versions/stage3_brain.joint.L-packs-2026-10-24.pt';
const flags = rest.filter((a) => a.startsWith('--'));
const args = [path.join(ROOT, 'export_network_dashboard.py'), '--checkpoint', ckpt, ...flags];
const r = spawnSync(exe, args, { cwd: ROOT, stdio: 'inherit' });
process.exit(r.status ?? 1);
