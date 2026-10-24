#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Hotlink protection in .htaccess, tested against a REAL Apache started on this computer.
 *
 * It copies the real .htaccess next to a few stub files, starts Apache on a free local port, and sends requests
 * with the headers a browser would send (own site, another site, no referer, Sec-Fetch headers).
 * If Apache or its modules are not available (for example on a machine without it), the test is skipped.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import http from 'http';
import { spawn, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODULE_DIRS = ['/usr/libexec/apache2', '/opt/homebrew/opt/httpd/lib/httpd/modules', '/usr/lib/apache2/modules'];
const HTTPD = ['/usr/sbin/httpd', '/opt/homebrew/bin/httpd', '/usr/sbin/apache2'].find((p) => fs.existsSync(p));
const modDir = MODULE_DIRS.find((d) => fs.existsSync(path.join(d, 'mod_rewrite.so')) && fs.existsSync(path.join(d, 'mod_headers.so')));
if (!HTTPD || !modDir) {
  console.log('SKIP htaccess test: Apache with mod_rewrite and mod_headers was not found on this computer.');
  process.exit(0);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'midel-htaccess-'));
const docroot = path.join(tmp, 'www');
fs.mkdirSync(docroot);
fs.copyFileSync(process.env.MIDEL_HTACCESS || path.join(ROOT, '.htaccess'), path.join(docroot, '.htaccess'));
fs.writeFileSync(path.join(docroot, 'neural_lab.html'), '<!doctype html><title>page</title>');
fs.writeFileSync(path.join(docroot, 'taught_facts.js'), 'var TAUGHT_LIBRARY = [];');
fs.writeFileSync(path.join(docroot, 'stage3_brain.js'), 'var STAGE3_BRAIN = {};');
fs.writeFileSync(path.join(docroot, 'data.json'), '{}');
fs.writeFileSync(path.join(docroot, 'midel-logo.png'), 'png');

const port = 20000 + Math.floor(Math.random() * 20000);
const mod = (name, file) => `LoadModule ${name} ${path.join(modDir, file)}`;
const conf = [
  `ServerRoot "${tmp}"`,
  `PidFile "${path.join(tmp, 'httpd.pid')}"`,
  `Listen 127.0.0.1:${port}`,
  'ServerName 127.0.0.1',
  ...[
    ['mpm_prefork_module', 'mod_mpm_prefork.so'],
    ['authz_core_module', 'mod_authz_core.so'],
    ['unixd_module', 'mod_unixd.so'],
    ['mime_module', 'mod_mime.so'],
    ['dir_module', 'mod_dir.so'],
    ['alias_module', 'mod_alias.so'],
    ['log_config_module', 'mod_log_config.so'],
    ['rewrite_module', 'mod_rewrite.so'],
    ['headers_module', 'mod_headers.so']
  ]
    .filter(([, f]) => fs.existsSync(path.join(modDir, f)))
    .map(([n, f]) => mod(n, f)),
  'TypesConfig /etc/apache2/mime.types',
  `DocumentRoot "${docroot}"`,
  `<Directory "${docroot}">`,
  '  AllowOverride All',
  '  Require all granted',
  '</Directory>',
  `ErrorLog "${path.join(tmp, 'error.log')}"`,
  'LogLevel warn'
].join('\n');
fs.writeFileSync(path.join(tmp, 'httpd.conf'), conf);

const syntax = spawnSync(HTTPD, ['-f', path.join(tmp, 'httpd.conf'), '-t'], { encoding: 'utf8' });
if (syntax.status !== 0) {
  // The config of THIS test failed; check whether it is our .htaccess by looking at a start attempt below.
  console.log('note: Apache config check said: ' + String(syntax.stderr || syntax.stdout).trim().split('\n')[0]);
}
// Apache signals its whole process group when it stops, so it gets a group of its own (otherwise it would take
// the calling shell down with it).
const server = spawn(HTTPD, ['-f', path.join(tmp, 'httpd.conf'), '-DFOREGROUND'], { stdio: 'ignore', detached: true });

function request(urlPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path: urlPath, method: 'GET', headers: { Host: `127.0.0.1:${port}`, ...headers } }, (res) => {
      res.resume();
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers }));
    });
    req.on('error', reject);
    req.end();
  });
}
async function waitUp() {
  for (let i = 0; i < 40; i++) {
    try {
      await request('/neural_lab.html');
      return true;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  return false;
}

let failures = 0;
function check(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failures++;
  }
}
const own = `http://127.0.0.1:${port}/neural_lab.html`;
let done = false;
const cleanup = () => {
  if (done) return;
  done = true;
  server.kill('SIGTERM');
  setTimeout(() => fs.rmSync(tmp, { recursive: true, force: true }), 300);
};
process.on('exit', cleanup);

try {
  if (!(await waitUp())) {
    const log = fs.existsSync(path.join(tmp, 'error.log')) ? fs.readFileSync(path.join(tmp, 'error.log'), 'utf8').trim().split('\n').slice(-3).join(' | ') : '';
    console.log('SKIP htaccess test: Apache did not start here. ' + log.slice(0, 200));
    cleanup();
    process.exit(0);
  }
  const cases = [
    // [label, path, headers, expected status]
    ['direct visit (no referer) to a lesson file', '/taught_facts.js', {}, 200],
    ['own page loading a lesson file', '/taught_facts.js', { Referer: own }, 200],
    ['own page loading the network file', '/stage3_brain.js', { Referer: own }, 200],
    ['own page loading a .json file', '/data.json', { Referer: own }, 200],
    ['another site embedding a lesson file', '/taught_facts.js', { Referer: 'https://other-site.example/page.html' }, 403],
    ['another site embedding the network file', '/stage3_brain.js', { Referer: 'http://www.other-site.example/' }, 403],
    ['another site loading a .json file', '/data.json', { Referer: 'https://other-site.example/' }, 403],
    ['spoofed referer that merely starts with our host', '/taught_facts.js', { Referer: `http://127.0.0.1:${port}.evil.example/x` }, 403],
    ['cross-site script request without a referer', '/taught_facts.js', { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Dest': 'script' }, 403],
    ['cross-site fetch() without a referer', '/stage3_brain.js', { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Dest': 'empty' }, 403],
    ['same-origin script request', '/taught_facts.js', { 'Sec-Fetch-Site': 'same-origin', 'Sec-Fetch-Dest': 'script' }, 200],
    ['someone opening a lesson file by link from another site (navigation)', '/taught_facts.js', { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Dest': 'document' }, 200],
    ['another site linking to the PAGE (not protected)', '/neural_lab.html', { Referer: 'https://other-site.example/' }, 200],
    ['another site using the logo image (not protected)', '/midel-logo.png', { Referer: 'https://other-site.example/' }, 200],
    ['.htaccess itself is never served', '/.htaccess', {}, 403]
  ];
  for (const [label, p, headers, expected] of cases) {
    const r = await request(p, headers);
    check(r.status === expected, `${label}: got ${r.status}, expected ${expected}`);
  }
  const hdr = await request('/taught_facts.js', { Referer: own });
  check(/noindex/.test(String(hdr.headers['x-robots-tag'] || '')), 'lesson files should carry X-Robots-Tag noindex');
  check(String(hdr.headers['x-content-type-options'] || '') === 'nosniff', 'the existing security headers must still be sent');
  console.log(failures ? '' : `OK htaccess hotlink protection (${cases.length + 2} requests against a real Apache)`);
} finally {
  cleanup();
}
process.exit(failures ? 1 : 0);
