#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = vm.createContext({ console, String, Math, Set, Map, RegExp, Array, Object });
vm.runInContext(fs.readFileSync(path.join(root, 'deep_model.js'), 'utf8'), ctx, {
  filename: 'deep_model.js'
});

const { lessonNetworkAnswerComplete } = ctx;
if (
  typeof lessonNetworkAnswerComplete !== 'function' ||
  typeof ctx.lessonNetworkAnswerAsync !== 'function'
) {
  console.error('missing lesson network answer helper');
  process.exit(1);
}

const stored4711 =
  'Graphic design is a profession, academic discipline and applied art that involves creating visual communications intended to transmit specific messages to social groups, with specific objectives.  Graphic design is an interdisciplinary branch of design and of the fine arts.';

const partial =
  'graphic design is a profession academic discipline and applied art that involves creating visual communications intended to transmit specific messages';

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed = 1;
  }
}

assert(!lessonNetworkAnswerComplete(partial, stored4711), 'partial first sentence rejected');
assert(lessonNetworkAnswerComplete(stored4711.toLowerCase(), stored4711), 'full stored text accepted');
assert(
  (await ctx.lessonNetworkAnswerAsync([], 'What is graphic design?')) === null,
  'async lesson answer rejects empty facts'
);

if (!failed) console.log('OK lesson network complete gate');

process.exit(failed);
