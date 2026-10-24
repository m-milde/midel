#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Yes/no answers must respect negation in the stored text ("is not a proven treatment" means no).
 * The cases use their own sample texts, so they do not depend on what is in the library today.
 * The last block checks the real chamomile lessons only when they exist.
 */
import { loadMidelLibrary } from './load-midel-library.mjs';

const lib = loadMidelLibrary();
const { polarAnswer, answerFromLessons, SCIENCE_LIBRARY, taught } = lib;

let failures = 0;
function check(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failures++;
  }
}

const stomach =
  'Chamomile is not a proven treatment for severe stomach pain, persistent vomiting, or unexplained digestive symptoms. Mild tea may be soothing for some people, but it should not delay medical assessment. Seek medical advice if symptoms are severe, persistent, or accompanied by blood or fever.';
const oil =
  'Chamomile essential oil is much more concentrated than chamomile tea and should not be swallowed or applied undiluted to the skin. Concentrated oils can cause irritation or allergic reactions.';
const tea = 'Chamomile tea is a mild herbal drink that is often used to help people relax before sleep.';
const boil = 'Boiling is one of the most reliable purification methods. Water filters and tablets can also help.';
const herb = 'Chamomile is a gentle herb and is not a medicine.';
const water = 'Water can be made safe to drink by boiling it. Untreated water is not safe.';

const cases = [
  ['Can chamomile treat severe stomach pain?', stomach, 'no'],
  ['Can chamomile cure fever?', stomach, 'no'],
  ['Is chamomile a proven treatment for severe stomach pain?', stomach, 'no'],
  ['Is chamomile essential oil safe to swallow?', oil, 'no'],
  ['Is chamomile tea used to relax?', tea, 'yes'],
  ['Is chamomile tea a herbal drink?', tea, 'yes'],
  ['Is boiling a reliable purification method?', boil, 'yes'],
  ['Is chamomile a gentle herb?', herb, 'yes'],
  ['Is chamomile a medicine?', herb, 'no'],
  ['Can water be made safe by boiling?', water, 'yes'],
  ['Is untreated water safe?', water, 'no']
];
for (const [q, text, expected] of cases) {
  const got = polarAnswer(q, text);
  check(got === expected, `"${q}" gave ${got}, expected ${expected}`);
}

// Questions that are not yes/no questions must not get a yes/no.
check(polarAnswer('What is chamomile?', tea) === null, '"What is…" must not get a yes/no');
check(polarAnswer('How do I purify water?', boil) === null, '"How do I…" must not get a yes/no');

// The real lessons, if they are still in the library (checked by their stored question).
const all = SCIENCE_LIBRARY.concat(taught);
const real = all.find((f) => /^Can chamomile treat severe stomach pain\?$/i.test(f.question || ''));
if (real) {
  const r = answerFromLessons('Can chamomile treat severe stomach pain?', taught);
  check(r && /^no$/i.test(r.text), 'the stored chamomile lesson should answer "no" for severe stomach pain');
}

if (failures) process.exit(1);
console.log(`OK yes/no negation (${cases.length} cases)`);
