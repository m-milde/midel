#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Load SCIENCE_LIBRARY + rankLessons / answerFromLessons for CLI tools (no browser).
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function readPacks(root) {
  const manifest = fs.readFileSync(path.join(root, 'pack_manifest.js'), 'utf8');
  const m = manifest.match(/KNOWLEDGE_PACKS\s*=\s*(\[[^\]]+\])/);
  if (!m) throw new Error('KNOWLEDGE_PACKS not found in pack_manifest.js');
  // eslint-disable-next-line no-eval
  return eval(m[1]);
}

export function loadMidelLibrary(root = ROOT) {
  const sandbox = {
    window: null,
    console,
    Array,
    Object,
    String,
    Math,
    Set,
    Map,
    RegExp,
    parseInt,
    parseFloat,
    Infinity,
    isNaN,
    setTimeout,
    performance,
    undefined,
    NaN,
    JSON
  };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);

  const packs = readPacks(root);
  for (const file of packs) {
    if (file === 'taught_facts.js') continue;
    const fp = path.join(root, file);
    if (!fs.existsSync(fp)) continue;
    vm.runInContext(fs.readFileSync(fp, 'utf8'), ctx, { filename: file });
  }
  vm.runInContext(fs.readFileSync(path.join(root, 'science_library.js'), 'utf8'), ctx, {
    filename: 'science_library.js'
  });

  let taught = [];
  const taughtPath = path.join(root, 'taught_facts.js');
  if (fs.existsSync(taughtPath)) {
    const ts = vm.createContext({ console, Array, Object, String, JSON });
    vm.runInContext(fs.readFileSync(taughtPath, 'utf8'), ts, { filename: 'taught_facts.js' });
    taught = (ts.TAUGHT_LIBRARY || [])
      .filter((f) => f && String(f.text || '').trim())
      .map((f) => ({
        id: f.id,
        category: f.category || 'Learned',
        text: String(f.text),
        question: String(f.question || '')
      }));
  }

  const required = [
    'SCIENCE_LIBRARY',
    'answerFromLessons',
    'answerFromLessonsAsync',
    'rankLessons',
    'rankLessonsAsync',
    'questionMatches',
    'questionPromptOverlap',
    'questionContent',
    'definesSubject',
    'asksDefinition',
    'scienceTokens',
    'buildTypoSuggestQuestion',
    'shouldSuggestTypo'
  ];
  for (const name of required) {
    if (typeof ctx[name] === 'undefined') {
      throw new Error('load-midel-library: missing ' + name);
    }
  }

  const TAUGHT_ID_MIN = 3001;
  const packReserved = new Set();
  for (const file of packs) {
    if (file === 'taught_facts.js') continue;
    const fp = path.join(root, file);
    if (!fs.existsSync(fp)) continue;
    const ts = vm.createContext({ console, Array, Object, String, JSON });
    vm.runInContext(fs.readFileSync(fp, 'utf8'), ts, { filename: file });
    const key = file.replace('_facts.js', '').toUpperCase() + '_LIBRARY';
    const lib = ts[key] || ts[Object.keys(ts).find((k) => k.endsWith('_LIBRARY'))];
    if (Array.isArray(lib)) {
      for (const f of lib) {
        const id = parseInt(f && f.id, 10);
        if (!isNaN(id) && id > 0) packReserved.add(id);
      }
    }
  }

  function nextTaughtIdFromRows(rows) {
    // One shared counter: highest id in any lesson file (packs + taught) plus one.
    let max = TAUGHT_ID_MIN - 1;
    for (const id of packReserved) max = Math.max(max, id);
    for (const f of rows || []) {
      const id = parseInt(f && f.id, 10);
      if (!isNaN(id) && id >= TAUGHT_ID_MIN) max = Math.max(max, id);
    }
    let next = max + 1;
    const used = new Set(
      (rows || []).map((f) => parseInt(f && f.id, 10)).filter((id) => !isNaN(id))
    );
    while (packReserved.has(next) || used.has(next)) next += 1;
    return next;
  }

  return {
    TAUGHT_ID_MIN,
    nextTaughtIdFromRows,
    SCIENCE_LIBRARY: ctx.SCIENCE_LIBRARY,
    taught,
    answerFromLessons: ctx.answerFromLessons.bind(ctx),
    answerFromLessonsAsync: ctx.answerFromLessonsAsync.bind(ctx),
    rankLessons: ctx.rankLessons.bind(ctx),
    rankLessonsAsync: ctx.rankLessonsAsync.bind(ctx),
    rankAllLessons: ctx.rankAllLessons.bind(ctx),
    selectLessons: ctx.selectLessons.bind(ctx),
    isSplitWordLessonPair: ctx.isSplitWordLessonPair.bind(ctx),
    questionMatches: ctx.questionMatches.bind(ctx),
    questionPromptOverlap: ctx.questionPromptOverlap.bind(ctx),
    questionContent: ctx.questionContent.bind(ctx),
    definesSubject: ctx.definesSubject.bind(ctx),
    asksDefinition: ctx.asksDefinition.bind(ctx),
    buildTypoSuggestQuestion: ctx.buildTypoSuggestQuestion.bind(ctx),
    shouldSuggestTypo: ctx.shouldSuggestTypo.bind(ctx),
    // Added for the feature tests (yes/no, suggestions, fields). Each is bound only if the library defines it.
    ...Object.fromEntries(
      [
        'polarAnswer',
        'relatedQuestions',
        'suggestCorrectedQuestions',
        'libSuggestIndex',
        'libFieldByName',
        'libFieldModel',
        'libCategoryMenu',
        'libRandomQuestionIn',
        'scienceStem'
      ]
        .filter((name) => typeof ctx[name] === 'function')
        .map((name) => [name, ctx[name].bind(ctx)])
    )
  };
}
