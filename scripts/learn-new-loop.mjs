#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Run train_stage3.py --learn-new until the queue is empty (or --max N runs). */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ROOT, resolvePython } from './midel-python.mjs';

const logPath = process.env.LEARN_NEW_LOG || path.join(ROOT, 'learn-new.log');
const py = resolvePython();

let max = 0;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--max') {
    max = Number(argv[++i] || 0);
  }
}

function appendLog(text) {
  fs.appendFileSync(logPath, text.endsWith('\n') ? text : text + '\n');
}

let run = 0;
while (true) {
  run += 1;
  if (max > 0 && run > max) {
    const msg = `learn-new-loop: stopped after ${max} runs (queue may still have pending lessons).`;
    console.log(msg);
    appendLog(msg);
    process.exit(0);
  }
  const stamp = `=== learn-new run ${run} ${new Date().toISOString()} ===`;
  console.log(stamp);
  appendLog(stamp);
  const r = spawnSync(py, ['train_stage3.py', '--learn-new'], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, PYTHONUNBUFFERED: '1' }
  });
  const out = String(r.stdout || '') + String(r.stderr || '');
  if (out) {
    process.stdout.write(out);
    appendLog(out);
  }
  if ((r.status ?? 1) !== 0) {
    const msg = `learn-new-loop: trainer exited ${r.status}`;
    console.error(msg);
    appendLog(msg);
    process.exit(r.status ?? 1);
  }
  if (/LEARN-NEW-STATUS queue-empty/.test(out) || /every lesson file is already in the deep network/.test(out)) {
    const msg = 'learn-new-loop: all lessons with questions are in the deep network.';
    console.log(msg);
    appendLog(msg);
    process.exit(0);
  }
  if (/LEARN-NEW-STATUS (installed|skipped|relearned|relearn-deferred|install-deferred) /.test(out)) {
    continue;
  }
  if (/^installed [0-9]+\.|^skipped [0-9]+\./m.test(out)) {
    continue;
  }
  const msg = 'learn-new-loop: no install/skip/empty status in output — stopping (see log).';
  console.error(msg);
  appendLog(msg);
  process.exit(1);
}
