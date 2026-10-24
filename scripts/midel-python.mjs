/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Resolve the NumPy (.venv) or PyTorch (.venv-torch) interpreter on Mac or Windows. */
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const isWin = process.platform === 'win32';

function venvPython(dir) {
  const exe = isWin
    ? path.join(ROOT, dir, 'Scripts', 'python.exe')
    : path.join(ROOT, dir, 'bin', 'python');
  return existsSync(exe) ? exe : '';
}

function fallbackPython() {
  if (isWin) {
    const r = spawnSync('py', ['-3', '-c', 'import sys; print(sys.executable)'], {
      encoding: 'utf8',
      windowsHide: true
    });
    if ((r.status ?? 1) === 0 && String(r.stdout || '').trim()) return String(r.stdout).trim();
    return 'python';
  }
  return 'python3';
}

/** kind: "numpy" (.venv) or "torch" (.venv-torch). Falls back to py -3 / python3. */
export function resolvePython(kind = 'numpy') {
  if (kind === 'torch') return venvPython('.venv-torch') || fallbackPython();
  return venvPython('.venv') || fallbackPython();
}

export function hasVenv(kind = 'numpy') {
  return Boolean(kind === 'torch' ? venvPython('.venv-torch') : venvPython('.venv'));
}
