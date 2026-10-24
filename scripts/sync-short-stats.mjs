#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Regenerate short_added.meta.js from short_added.js (no full browser load).
 */
import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const exe = resolvePython();
const r = spawnSync(
  exe,
  [
    '-c',
    `
import json
from pathlib import Path
import save_taught as st
groups, removed = st.parse_short_file((Path("short_added.js")).read_text(encoding="utf-8"))
meta = st.compute_short_network_meta(groups, removed)
st.write_short_meta(meta)
print(json.dumps(meta))
`
  ],
  { cwd: ROOT, encoding: 'utf8' }
);
if (r.status !== 0) {
  console.error(r.stderr || r.stdout || 'sync-short-stats failed');
  process.exit(1);
}
console.log('wrote short_added.meta.js', r.stdout.trim());
