#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Runs the regression tests one after another and prints one line per test.
 *
 *   node scripts/run-tests.mjs all                  every test
 *   node scripts/run-tests.mjs percent format       only the named ones
 *
 * Names: percent, format, context, polar, typo-guard (the feature tests, fast), then library, lesson-network, wiki, canary, htaccess.
 * Exit code 1 when any test fails. Every test prints its own FAIL lines; they are repeated here.
 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const TESTS = [
  { name: 'percent', file: 'test-percent-calc.mjs', what: 'percent calculator: exact answers, no false triggers' },
  { name: 'format', file: 'test-answer-format.mjs', what: 'answer layout: paragraphs, bullets, steps, labels' },
  { name: 'training-text', file: 'test-training-text.mjs', what: 'training_text.js matches training_text.py' },
  { name: 'tokenizer-v2', file: 'test-tokenizer-v2.mjs', what: 'byte BPE round-trip and py/js parity' },
  { name: 'context', file: 'test-chat-context.mjs', what: 'follow-ups keep the last conversation topic' },
  { name: 'polar', file: 'test-polar-yesno.mjs', what: 'yes/no answers respect "not"' },
  { name: 'typo-guard', file: 'test-typo-guard.mjs', what: 'typos find the right lesson, weak guesses find nothing' },
  { name: 'library', file: 'test-library-typo.mjs', what: 'library matcher regressions' },
  { name: 'lesson-network', file: 'test-lesson-network-complete.mjs', what: 'lesson network completeness gate' },
  { name: 'wiki', file: 'test-wiki-remember.mjs', what: 'Wikipedia save gates' },
  { name: 'canary', file: 'test-canary.mjs', what: 'canary checker finds copies and stays quiet on clean files' },
  { name: 'htaccess', file: 'test-htaccess.mjs', what: 'hotlink protection against a real Apache (skipped without Apache)' }
];

const wanted = process.argv.slice(2);
if (!wanted.length) {
  console.error('Usage: node scripts/run-tests.mjs all | <name> [<name> ...]\nNames: ' + TESTS.map((t) => t.name).join(', '));
  process.exit(2);
}
const picked = wanted.includes('all') ? TESTS : TESTS.filter((t) => wanted.includes(t.name));
const unknown = wanted.filter((w) => w !== 'all' && !TESTS.some((t) => t.name === w));
if (unknown.length) {
  console.error('Unknown test name(s): ' + unknown.join(', '));
  process.exit(2);
}

let failed = 0;
const started = Date.now();
for (const t of picked) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', t.file)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  const out = `${r.stdout || ''}${r.stderr || ''}`.trim();
  if (r.status === 0) {
    const last = out.split('\n').filter(Boolean).pop() || '';
    console.log(`  pass  ${t.name.padEnd(15)} ${secs.padStart(6)}s  ${last}`);
  } else {
    failed++;
    console.log(`  FAIL  ${t.name.padEnd(15)} ${secs.padStart(6)}s  ${t.what}`);
    const lines = out.split('\n').filter((l) => /^FAIL|Error|not defined|Cannot/.test(l)).slice(0, 8);
    for (const l of lines) console.log('          ' + l.slice(0, 200));
  }
}
const total = ((Date.now() - started) / 1000).toFixed(1);
console.log(`\n${picked.length - failed} of ${picked.length} test(s) passed in ${total}s.`);
process.exit(failed ? 1 : 0);
