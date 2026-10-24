#!/usr/bin/env node
/**
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */
/** One-time / idempotent copyright headers for Midel nn-tutorial sources. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MARKER = 'Copyright (c) 2026 M.Milde';

const SKIP_DIRS = new Set([
  '.venv',
  'dist',
  'node_modules',
  '__pycache__',
  '.git',
  '.cursor'
]);

const SKIP_FILES = new Set([
  'learn-new.log',
  'wiki-learn-batch.log',
  'Untitled',
  'stage3_learned.json',
  'Midel-network-guide.pdf',
  'Midel-network-guide-bg.pdf',
  'apply-copyright-headers.mjs'
]);

const SKIP_PREFIX = ['neural_brain_curriculum_', 'taught_facts copy', 'neural_lab copy'];

const BLOCK = `Copyright (c) 2026 M.Milde <m.milde@gmail.com>
Free use; no sale, rebrand, or profit from this software.
See LICENSE.`;

function hasMarker(text) {
  return text.includes(MARKER);
}

function wrapBlock(style, body) {
  if (style === 'js') {
    return `/*
 * ${body.replace(/\n/g, '\n * ')}
 */\n\n`;
  }
  if (style === 'hash') {
    return body
      .split('\n')
      .map((l) => `# ${l}`)
      .join('\n')
      .concat('\n\n');
  }
  if (style === 'html') {
    return `<!--\n${body}\n-->\n\n`;
  }
  if (style === 'md') {
    return `<!-- ${body.replace(/\n/g, ' ')} -->\n\n`;
  }
  return '';
}

function styleFor(file) {
  const base = path.basename(file);
  if (base === '.htaccess') return 'hash';
  const ext = path.extname(file).toLowerCase();
  if (ext === '.py' || ext === '.sh') return 'hash';
  if (ext === '.md') return 'md';
  if (ext === '.html' || ext === '.htm') return 'html';
  if (ext === '.css' || ext === '.js' || ext === '.mjs') return 'js';
  if (ext === '.svg') return null;
  if (ext === '.txt') return 'hash';
  return null;
}

function prepend(file, style) {
  let text = fs.readFileSync(file, 'utf8');
  if (hasMarker(text)) return false;
  const header = wrapBlock(style, BLOCK);
  const shebang = text.match(/^#![^\n]*\n/);
  if (shebang) {
    const after = text.slice(shebang[0].length);
    const ext = path.extname(file).toLowerCase();
    const blockStyle =
      ext === '.mjs' || ext === '.js' ? 'js' : style === 'hash' ? 'hash' : style;
    text = shebang[0] + wrapBlock(blockStyle, BLOCK) + after;
  } else if (style === 'html' && text.startsWith('<!doctype')) {
    const idx = text.indexOf('\n');
    text = text.slice(0, idx + 1) + header + text.slice(idx + 1);
  } else {
    text = header + text;
  }
  fs.writeFileSync(file, text);
  return true;
}

function prependHugeJs(file) {
  const fd = fs.openSync(file, 'r+');
  const buf = Buffer.alloc(4096);
  const n = fs.readSync(fd, buf, 0, 4096, 0);
  const start = buf.slice(0, n).toString('utf8');
  if (start.includes(MARKER)) {
    fs.closeSync(fd);
    return false;
  }
  const header = wrapBlock('js', BLOCK);
  fs.closeSync(fd);
  const orig = fs.readFileSync(file);
  fs.writeFileSync(file, Buffer.concat([Buffer.from(header, 'utf8'), orig]));
  return true;
}

function walk(dir, out) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full, out);
    else out.push(full);
  }
}

function main() {
  const files = [];
  walk(ROOT, files);
  let updated = 0;
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const base = path.basename(file);
    if (SKIP_FILES.has(base)) continue;
    if (SKIP_PREFIX.some((p) => base.startsWith(p))) continue;
    const style = styleFor(file);
    if (!style) continue;
    if (base === 'stage3_brain.js') {
      if (prependHugeJs(file)) {
        updated++;
        console.log('updated', rel);
      }
      continue;
    }
    if (prepend(file, style)) {
      updated++;
      console.log('updated', rel);
    }
  }
  console.log('copyright headers:', updated, 'files updated');
}

main();
