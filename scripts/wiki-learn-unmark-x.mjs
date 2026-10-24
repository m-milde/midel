#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Remove `[x]` from wiki-learn markdown bullets so they can be retried (keeps `[+]`). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(ROOT, 'wiki-learn-expanded.md');

if (!fs.existsSync(file)) {
  console.error('Not found:', file);
  process.exit(1);
}

const lines = fs.readFileSync(file, 'utf8').split('\n');
let n = 0;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*\*\s*\[x\]\s/i.test(lines[i])) {
    lines[i] = lines[i].replace(/^(\s*\*\s*)\[x\]\s/i, '$1');
    n++;
  }
}
fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Removed [x] from', n, 'lines in', path.basename(file));
