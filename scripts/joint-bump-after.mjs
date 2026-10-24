#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Wait for a joint train_midel_torch.py process to exit, then resume to a higher epoch count.
 */

import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ROOT, resolvePython } from './midel-python.mjs';

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = {
    waitPid: null,
    out: 'versions/stage3_brain.joint.M-2026-10-24.pt',
    epochs: 60,
    tier: 'M',
    batchSize: 4,
    checkpointEvery: 5,
    evalEvery: 5,
    evalSample: 800,
    log: 'versions/joint-full-M-2026-10-24.log'
  };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--wait-pid' && a[i + 1]) opts.waitPid = Number(a[++i]);
    else if (a[i] === '--out' && a[i + 1]) opts.out = a[++i];
    else if (a[i] === '--epochs' && a[i + 1]) opts.epochs = Number(a[++i]);
    else if (a[i] === '--tier' && a[i + 1]) opts.tier = a[++i];
    else if (a[i] === '--log' && a[i + 1]) opts.log = a[++i];
  }
  return opts;
}

function pidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function findJointTrainerPid() {
  const r = spawnSync('pgrep', ['-f', 'train_midel_torch.py --joint'], { encoding: 'utf8' });
  const ids = (r.stdout || '')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(Number);
  return ids[0] || null;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const opts = parseArgs();
  let pid = opts.waitPid || findJointTrainerPid();
  if (!pid) {
    console.log('joint-bump: no running train_midel_torch --joint; starting resume now');
  } else {
    console.log(`joint-bump: waiting for pid ${pid} (30-epoch run) …`);
    while (pidAlive(pid)) {
      await sleep(30_000);
    }
    console.log('joint-bump: first run finished');
  }

  const outPath = path.join(ROOT, opts.out);
  if (!fs.existsSync(outPath)) {
    console.error(`joint-bump: missing checkpoint ${opts.out}`);
    process.exit(1);
  }

  const logPath = path.join(ROOT, opts.log);
  const exe = resolvePython('torch');
  const args = [
    path.join(ROOT, 'train_midel_torch.py'),
    '--joint',
    '--tier',
    opts.tier,
    '--epochs',
    String(opts.epochs),
    '--batch-size',
    String(opts.batchSize),
    '--out',
    outPath,
    '--resume',
    outPath,
    '--checkpoint-every',
    String(opts.checkpointEvery),
    '--eval-every',
    String(opts.evalEvery),
    '--eval-sample',
    String(opts.evalSample),
    '--log-interval',
    '300',
    '--eval-log-every',
    '40',
    '--skip-eval-start'
  ];

  console.log(`joint-bump: resuming → ${opts.epochs} epochs (same weights file)`);
  fs.appendFileSync(logPath, `\n--- joint-bump resume to ${opts.epochs} epochs ---\n`);

  const child = spawn(exe, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', (d) => {
    process.stdout.write(d);
    fs.appendFileSync(logPath, d);
  });
  child.stderr.on('data', (d) => {
    process.stderr.write(d);
    fs.appendFileSync(logPath, d);
  });
  child.on('close', (code) => process.exit(code ?? 1));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
