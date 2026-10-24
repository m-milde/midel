#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Overnight chain: wait for the current L phase-2 joint run to finish, then automatically
 * resume with the full fact-pack corpus (swear / weed / controlled-substance categories included).
 * No user input required while sleeping.
 */

import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROOT, resolvePython } from './midel-python.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATUS_PATH = path.join(ROOT, 'versions', 'joint-auto-chain.json');
const WAKE_PATH = path.join(ROOT, 'versions', 'WHEN-YOU-WAKE.md');
const DEFAULT_OUT = 'versions/stage3_brain.joint.L-packs-2026-10-24.pt';
const DEFAULT_LOG = 'versions/joint-full-L-packs-2026-10-24.log';

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = {
    waitPid: null,
    out: DEFAULT_OUT,
    log: DEFAULT_LOG,
    tier: 'L',
    batchSize: 2,
    phase2Epochs: 40,
    phase2bTotalEpochs: 60,
    checkpointEvery: 5,
    evalEvery: 5,
    evalSample: 800
  };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--wait-pid' && a[i + 1]) opts.waitPid = Number(a[++i]);
    else if (a[i] === '--out' && a[i + 1]) opts.out = a[++i];
    else if (a[i] === '--log' && a[i + 1]) opts.log = a[++i];
    else if (a[i] === '--phase2b-epochs' && a[i + 1]) opts.phase2bTotalEpochs = Number(a[++i]);
  }
  return opts;
}

function writeStatus(patch) {
  let prev = {};
  try {
    prev = JSON.parse(fs.readFileSync(STATUS_PATH, 'utf8'));
  } catch {
    /* new */
  }
  const next = { ...prev, ...patch, updatedAt: new Date().toISOString() };
  fs.mkdirSync(path.dirname(STATUS_PATH), { recursive: true });
  fs.writeFileSync(STATUS_PATH, JSON.stringify(next, null, 2) + '\n');
}

function writeWake(body) {
  fs.writeFileSync(WAKE_PATH, body.trim() + '\n');
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function runTrainer(opts, extraArgs, logLabel) {
  const outPath = path.join(ROOT, opts.out);
  const logPath = path.join(ROOT, opts.log);
  const exe = resolvePython('torch');
  const args = [
    path.join(ROOT, 'train_midel_torch.py'),
    '--joint',
    '--tier',
    opts.tier,
    '--batch-size',
    String(opts.batchSize),
    '--packs-only',
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
    '200',
    '--eval-log-every',
    '40',
    '--lr-schedule',
    'cosine',
    '--answer-focus-len',
    '64',
    '--skip-eval-start',
    ...extraArgs
  ];

  fs.appendFileSync(logPath, `\n--- ${logLabel} ---\n`);

  return new Promise((resolve, reject) => {
    const child = spawn(exe, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.on('data', (d) => {
      process.stdout.write(d);
      fs.appendFileSync(logPath, d);
    });
    child.stderr.on('data', (d) => {
      process.stderr.write(d);
      fs.appendFileSync(logPath, d);
    });
    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 1));
  });
}

async function main() {
  const opts = parseArgs();
  const outRel = opts.out;
  const startedAt = new Date().toISOString();

  writeStatus({
    phase: 'waiting_phase2',
    message: 'Waiting for current L phase-2 joint trainer to exit',
    checkpoint: outRel,
    phase2Epochs: opts.phase2Epochs,
    phase2bTotalEpochs: opts.phase2bTotalEpochs,
    startedAt
  });

  writeWake(`# Midel joint — auto chain armed

Started: ${startedAt}

**You can sleep.** This machine will:

1. Wait for the current **L phase-2** run (${opts.phase2Epochs} epochs, packs-only) to finish.
2. **Automatically** resume training with **all fact packs** (including swear, weed, and controlled-substance lessons — ~368 extra rows). No click needed.

Status file: \`versions/joint-auto-chain.json\`  
Log: \`${opts.log}\`

When you are back, open this file again — it will be updated with results and what to say in chat to continue the rebuild.
`);

  let pid = opts.waitPid || findJointTrainerPid();
  if (pid) {
    console.log(`joint-auto-chain: waiting for pid ${pid} …`);
    writeStatus({ waitPid: pid });
    while (pidAlive(pid)) {
      await sleep(30_000);
    }
    console.log('joint-auto-chain: phase-2 process exited');
  } else {
    console.log('joint-auto-chain: no running joint trainer (continuing to phase-2b)');
  }

  const outPath = path.join(ROOT, opts.out);
  if (!fs.existsSync(outPath)) {
    writeStatus({ phase: 'error', message: 'checkpoint missing after phase 2' });
    console.error(`joint-auto-chain: missing ${opts.out}`);
    process.exit(1);
  }

  writeStatus({
    phase: 'phase2b_running',
    message: 'Resuming with full fact-pack corpus (all categories)',
    include_restricted_categories: true
  });

  writeWake(`# Midel joint — phase 2 finished, full corpus run started

Phase-2 (original run) has **stopped**. Phase-2b started **automatically** with all fact categories included.

- Checkpoint: \`${outRel}\`
- Target epochs on this resume: **${opts.phase2bTotalEpochs}** total (extra training after phase 2)
- Log: \`${opts.log}\`

Refresh \`network_dashboard.html\` after eval checkpoints. When phase-2b finishes, this file updates again.
`);

  const code = await runTrainer(
    opts,
    ['--epochs', String(opts.phase2bTotalEpochs)],
    `joint-auto-chain phase-2b full corpus → ${opts.phase2bTotalEpochs} epochs`
  );

  let evalPass = null;
  let jointStatus = null;
  try {
    const evalPath = outPath.replace(/\.pt$/, '.eval.json');
    if (fs.existsSync(evalPath)) {
      const ev = JSON.parse(fs.readFileSync(evalPath, 'utf8'));
      evalPass = ev.eval?.pass_pct;
    }
    const statusGlob = path.join(ROOT, 'versions', 'joint-status-2026-10-24.json');
    if (fs.existsSync(statusGlob)) {
      jointStatus = JSON.parse(fs.readFileSync(statusGlob, 'utf8')).status;
    }
  } catch {
    /* optional */
  }

  try {
    spawnSync('npm', ['run', 'dashboard:export'], { cwd: ROOT, stdio: 'ignore', timeout: 120_000 });
  } catch {
    /* non-fatal */
  }

  const doneAt = new Date().toISOString();
  writeStatus({
    phase: code === 0 ? 'phase2b_done' : 'phase2b_failed',
    exitCode: code,
    evalPassPct: evalPass,
    jointStatus,
    finishedAt: doneAt
  });

  writeWake(`# Midel joint — overnight chain finished

Finished: ${doneAt}  
Exit code: ${code}  
Needle (last eval): ${evalPass != null ? evalPass + '%' : 'see log'}  
JOINT-STATUS: ${jointStatus ?? 'see log'}

## What ran automatically

1. Waited for L phase-2 (${opts.phase2Epochs} ep, packs-only).
2. Resumed **phase-2b** with **all fact packs** (swear / weed / controlled substances included) through epoch **${opts.phase2bTotalEpochs}**.

Checkpoint: \`${outRel}\`  
Log: \`${opts.log}\`  
Live status: \`versions/network-live.json\`

## When you are awake — reply in chat

Copy or paraphrase:

> **Continue the deep rebuild** — check needle on the L checkpoint, then run **full L joint** (packs + core + \`short_added\` at 0.25 weight) if we are still below 80%, or start export v2 if we passed.

Open \`network_dashboard.html\` (hard refresh) for maps and eval history.

Ship bar remains **80% needle** before replacing live \`stage3_brain.js\`.
`);

  console.log(`joint-auto-chain: done exit=${code}`);
  process.exit(code === 0 ? 0 : 1);
}

main().catch((e) => {
  writeStatus({ phase: 'error', message: String(e) });
  console.error(e);
  process.exit(1);
});
