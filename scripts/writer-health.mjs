#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

const WRITER = process.env.MIDEL_WRITER || 'http://127.0.0.1:8787';

async function main() {
  try {
    const res = await fetch(`${WRITER}/taught`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      console.error(`FAIL: GET /taught HTTP ${res.status}`);
      process.exit(1);
    }
    const data = await res.json();
    const patchProbe = await fetch(`${WRITER}/taught/patch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, text: 'x', relearnDeep: false }),
      signal: AbortSignal.timeout(4000)
    });
    const patchOk = patchProbe.status !== 404;
    console.log(
      `OK writer ${WRITER} count=${data.count} nextId=${data.nextId} patch=${data.patch === true ? 'yes' : data.patch === false ? 'no' : patchOk ? 'route' : 'MISSING'}`
    );
    if (!data.patch && patchProbe.status === 404) {
      console.error('Restart save_taught.py: npm run writer:restart');
      process.exit(2);
    }
    if (patchProbe.status === 400) {
      console.log('POST /taught/patch reachable (400 expected for id 0)');
    }
  } catch (e) {
    console.error('FAIL: no writer on port 8787. Run: npm run writer:restart');
    process.exit(1);
  }
}

main();
