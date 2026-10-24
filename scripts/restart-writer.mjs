#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Restart the Teaching writer on 8787. Uses LaunchAgent on Mac when installed. */
import { spawnSync, spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ROOT, resolvePython } from './midel-python.mjs';

const PORT = 8787;
const isWin = process.platform === 'win32';
const plist = path.join(os.homedir(), 'Library', 'LaunchAgents', 'com.midel.taught.plist');

function pidsOnPort() {
  if (isWin) {
    const r = spawnSync('netstat', ['-ano'], { encoding: 'utf8', windowsHide: true });
    const pids = new Set();
    String(r.stdout || '')
      .split(/\r?\n/)
      .forEach((line) => {
        if (!/LISTENING/i.test(line)) return;
        if (!new RegExp(':' + PORT + '\\s').test(line)) return;
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (/^\d+$/.test(pid) && pid !== '0') pids.add(pid);
      });
    return [...pids];
  }
  const r = spawnSync('lsof', ['-ti', `tcp:${PORT}`], { encoding: 'utf8' });
  return String(r.stdout || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function killPids(pids) {
  pids.forEach((pid) => {
    if (isWin) spawnSync('taskkill', ['/PID', pid, '/F'], { windowsHide: true });
    else spawnSync('kill', [pid]);
  });
}

function sleep(ms) {
  spawnSync(process.execPath, ['-e', `setTimeout(() => {}, ${ms})`], { stdio: 'ignore' });
}

function portOpen() {
  return pidsOnPort().length > 0;
}

function writerHealth() {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'writer-health.mjs')], {
    cwd: ROOT,
    stdio: 'inherit'
  });
  return (r.status ?? 1) === 0;
}

function startForegroundHint() {
  console.log('Start the writer in another terminal: npm run writer');
}

if (!isWin && fs.existsSync(plist)) {
  const uid = process.getuid ? process.getuid() : 0;
  const label = `gui/${uid}/com.midel.taught`;
  console.log('Restarting LaunchAgent com.midel.taught …');
  spawnSync('launchctl', ['kickstart', '-k', label], { stdio: 'ignore' });
  for (let i = 0; i < 15; i++) {
    if (portOpen() && writerHealth()) process.exit(0);
    sleep(1000);
  }
}

const existing = pidsOnPort();
if (existing.length) {
  console.log('Stopping process on port ' + PORT + ': ' + existing.join(', '));
  killPids(existing);
  sleep(800);
}

if (!isWin && fs.existsSync(plist)) {
  const uid = process.getuid ? process.getuid() : 0;
  spawnSync('launchctl', ['bootstrap', `gui/${uid}`, plist], { stdio: 'ignore' });
  sleep(1200);
  if (portOpen() && writerHealth()) process.exit(0);
}

console.log('Starting save_taught.py on port ' + PORT + ' …');
const child = spawn(resolvePython(), ['save_taught.py'], {
  cwd: ROOT,
  detached: true,
  stdio: 'ignore'
});
child.unref();
for (let i = 0; i < 15; i++) {
  sleep(1000);
  if (portOpen() && writerHealth()) process.exit(0);
}
startForegroundHint();
process.exit(1);
