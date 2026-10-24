#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

import { loadMidelLibrary } from './load-midel-library.mjs';

const lib = loadMidelLibrary();
const {
  answerFromLessons,
  answerFromLessonsAsync,
  rankLessons,
  selectLessons,
  isSplitWordLessonPair,
  SCIENCE_LIBRARY,
  buildTypoSuggestQuestion,
  shouldSuggestTypo,
  taught
} = lib;

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  }
}

const maxwellTypo = answerFromLessons('Who is James Maxuel?', []);
assert(maxwellTypo && /Maxwell/i.test(maxwellTypo.text), 'Maxuel → Maxwell lesson');
assert(
  maxwellTypo.facts.some((f) => f.id === 13125),
  'Scientists #13125 for James Maxuel'
);

const maxwellOk = answerFromLessons('Who is James Maxwell?', []);
assert(maxwellOk && /Maxwell/i.test(maxwellOk.text), 'correct spelling still works');

const ranked = rankLessons('Who is James Maxuel?', SCIENCE_LIBRARY);
assert(ranked.length && ranked[0].fact.id === 13125, 'rankLessons picks Maxwell on typo');

const unrelated = answerFromLessons('Who is James Bond?', []);
assert(!unrelated || !/Clerk Maxwell/i.test(unrelated.text || ''), 'no fuzzy Bond→Maxwell');

const messy = answerFromLessons('Who is James Maxuel zzz?', []);
assert(messy && /Maxwell/i.test(messy.text), 'partial typo still answers');
assert(
  messy.suggestQuestion &&
    /James Maxwell/i.test(messy.suggestQuestion) &&
    !/maxuel/i.test(messy.suggestQuestion) &&
    !/zzz/i.test(messy.suggestQuestion),
  'suggest fixes typo and drops unmatched noise'
);
assert(!/\?\?/.test(messy.suggestQuestion), 'single question mark in suggest');

const cleanTypo = answerFromLessons('Who is James Maxuel?', []);
assert(
  !cleanTypo.suggestQuestion,
  'full typo match does not need did-you-mean'
);

const hatLight = answerFromLessons('hat are infrared and ultraviolet light?', taught);
assert(
  hatLight && hatLight.facts.some((f) => f.id === 4970),
  'dropped w on what → infrared/ultraviolet lesson'
);

const misspellContent = answerFromLessons(
  'what are infrard and ultrviolet light?',
  taught
);
assert(
  misspellContent && misspellContent.facts.some((f) => f.id === 4970),
  'missing letters in content words across sentence'
);
assert(!messy.suggestQuestion || !messy.typoPartial, 'strong overlap is not typoPartial flag');

const rankedMessy = rankLessons('Who is James Maxuel zzz?', SCIENCE_LIBRARY);
assert(shouldSuggestTypo(rankedMessy[0]), 'missed word + typo → suggest');

const nato = answerFromLessons('What is NATO?', taught);
assert(nato && nato.facts.some((f) => f.id === 6562), 'NATO acronym is not fuzzy-corrected to "not"');

const midel6602 = taught.find((f) => f.id === 6602);
const midel6601 = taught.find((f) => f.id === 6601);
if (midel6602 && midel6602.question) {
  const hit = answerFromLessons(midel6602.question.replace(/\?+$/, '') + '?', taught);
  assert(hit && hit.facts.some((f) => f.id === 6602), 'exact stored question hits Midel lesson');
  const who = answerFromLessons('Who are you?', taught);
  assert(who && who.facts.some((f) => f.id === 6603), 'Who are you → Midel #6603');
}
const midel6603 = taught.find((f) => f.id === 6603);
if (midel6601 && midel6602 && midel6603) {
  assert(midel6601.text !== midel6602.text, 'What is Midel vs What are you use different answer text');
  assert(midel6602.text !== midel6603.text, 'What are you vs Who are you use different answer text');
}
if (midel6601 && midel6602 && midel6601.text === midel6602.text) {
  const dedupedByTextOnly = [];
  const seenText = new Set();
  for (const f of taught) {
    const k = String(f.text || '').toLowerCase();
    if (seenText.has(k)) continue;
    seenText.add(k);
    dedupedByTextOnly.push(f);
  }
  assert(
    !dedupedByTextOnly.some((f) => f.id === 6602),
    'text-only dedupe would drop #6602 (regression guard)'
  );
  const merged = taught.filter((f) => f.id === 6601 || f.id === 6602);
  assert(merged.length === 2, '6601 and 6602 are distinct lessons despite same answer text');
  const whatMidel = answerFromLessons('What is Midel?', merged);
  assert(whatMidel && whatMidel.facts.some((f) => f.id === 6601), 'What is Midel? → #6601');
  const whatYou = answerFromLessons('What are you?', merged);
  assert(whatYou && whatYou.facts.some((f) => f.id === 6602), 'What are you? → #6602');
}

const splitAns = answerFromLessons('American nation?', taught);
assert(splitAns && splitAns.facts.length === 1, 'split-word multi-lesson pick collapses to one fact');
assert(!/^The library says both:/i.test(String(splitAns.text || '')), 'no stitched dual answer');

let asyncLookupCompleted = false;
const asyncAnswerPromise = answerFromLessonsAsync(
  'What does dropout do during neural network training?',
  taught
).then((answer) => {
  asyncLookupCompleted = true;
  return answer;
});
await new Promise((resolve) => setTimeout(resolve, 0));
assert(!asyncLookupCompleted, 'async library lookup yields before completing its full scan');
const asyncAnswer = await asyncAnswerPromise;
const syncAnswer = answerFromLessons('What does dropout do during neural network training?', taught);
assert(
  asyncAnswer && syncAnswer && asyncAnswer.text === syncAnswer.text,
  'async library lookup matches synchronous answer'
);
assert(
  asyncAnswer && asyncAnswer.facts[0].id === syncAnswer.facts[0].id,
  'async library lookup preserves the selected lesson'
);

const sofiaPeople = answerFromLessons('How many inhabitants does sofia have?', []);
assert(sofiaPeople && /1\.3 million/i.test(sofiaPeople.text), 'Sofia inhabitants lesson answers the follow-up');
assert(sofiaPeople.facts.some((f) => f.id === 13655), 'Geography #13655 for Sofia inhabitants');

const quadraticFormula = answerFromLessons('What is the quadratic formula?', []);
assert(
  quadraticFormula && /b² − 4ac|2a/i.test(quadraticFormula.text),
  'quadratic formula lesson answers the follow-up rewrite'
);
assert(
  quadraticFormula.facts.some((f) => f.id === 14699),
  'Mathematics #14699 for the quadratic formula'
);

const marsMoons = answerFromLessons('What are the moons of mars?', []);
assert(marsMoons && /Phobos/i.test(marsMoons.text) && /Deimos/i.test(marsMoons.text), 'moons of Mars');
assert(
  marsMoons.facts.some((f) => f.id === 9434),
  'Space #9434 for moons of Mars'
);

const formulaOne = answerFromLessons('What is the formula?', []);
assert(
  !formulaOne || !/quadratic/i.test(formulaOne.text || ''),
  'bare “the formula” must not steal the quadratic formula'
);

if (!process.exitCode) {
  console.log('OK library typo tolerance');
}
