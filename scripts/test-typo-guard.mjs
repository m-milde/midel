#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Typos and everyday wording: a spelling slip should find the right lesson, a weak guess must not
 * produce a WRONG answer (it should return nothing so the page shows "Did you mean"), and a clock
 * should find a watch.
 *
 * The cases look at the lesson's question text, not its id, so they keep working when lessons are edited.
 * Each case is skipped (with a note) when the library no longer holds a matching lesson.
 */
import { loadMidelLibrary } from './load-midel-library.mjs';

const lib = loadMidelLibrary();
const { answerFromLessons, SCIENCE_LIBRARY, taught } = lib;
const all = SCIENCE_LIBRARY.concat(taught);
const has = (re) => all.some((f) => re.test(f.question || ''));

let failures = 0;
let skipped = 0;
let ran = 0;
function check(cond, msg) {
  ran++;
  if (!cond) {
    console.error('FAIL:', msg);
    failures++;
  }
}
const top = (prompt) => {
  const r = answerFromLessons(prompt, taught);
  return r ? { q: (r.facts[0] && r.facts[0].question) || '', ids: r.facts.map((f) => f.id), text: r.text } : null;
};

// [prompt, lesson question that must exist, what the answer must look like]
const finds = [
  ['how do I purify wter?', /^How can I purify water\?$/i, /purify water/i],
  ['how to boild water', /^How long should I boil water\?$/i, /boil water/i],
  ['what are signs of hypotermia', /signs of hypothermia/i, /hypothermia/i],
  ['what is the quadratic formla', /^What is the quadratic formula\?$/i, /quadratic formula/i],
  ['what is pythagoras theorem?', /pythagoras theorem/i, /pythagoras theorem/i],
  ['how to find direction using clock?', /simple clock|watch as a compass/i, /clock|watch/i],
  ['how do you use a clock as a compass?', /watch as a compass/i, /watch|clock/i],
  ['how to defend from attackers?', /defend|protect yourself/i, /attack|defend|protect/i],
  ['hat are infrared and ultraviolet light?', /^What are infrared and ultraviolet light\?$/i, /infrared/i],
  // One-word topics: the closest spelling must win, even though a rarer word may sit one slip away.
  ['What is a parsite?', /^What is a parasite\?$/i, /parasite/i],
  ['What is roseary?', /^What is rosemary\?$/i, /rosemary/i],
  ['What is tenis?', /^What is tennis\?$/i, /tennis/i]
];
for (const [prompt, mustExist, answerLooksLike] of finds) {
  if (!has(mustExist)) {
    skipped++;
    console.log(`skip: no lesson matching ${mustExist} for "${prompt}"`);
    continue;
  }
  const t = top(prompt);
  check(t && answerLooksLike.test(t.q), `"${prompt}" should find ${answerLooksLike}, got ${t ? `"${t.q}"` : 'nothing'}`);
}

// A scientist's name with a typo still finds the scientist.
if (has(/electromagnetic radiation/i)) {
  const t = answerFromLessons('Who is James Maxuel?', taught);
  check(t && /Maxwell/i.test(t.text), '"James Maxuel" should find the Maxwell lesson');
}

// Weak guesses must not return a wrong lesson; they must return nothing.
for (const [prompt, wrongShape] of [
  ['how do I stop a flod', /freez|food/i],
  ['how do I find north with a compas', /revolution/i],
  ['blah blah blah', /./], // nonsense must be refused, not matched to a lookalike word
  ['What is a zorblax?', /./]
]) {
  const t = top(prompt);
  check(!t || !wrongShape.test(t.q), `"${prompt}" must not return the wrong lesson "${t && t.q}"`);
}

// A genuine tie (one slip from two common words) may answer with either word or ask "Did you mean", but must never go elsewhere.
for (const [prompt, allowed] of [['What is maekup?', /makeup|markup/i]]) {
  if (!has(/^What is makeup\?$/i)) continue;
  const t = top(prompt);
  check(!t || allowed.test(t.q), `"${prompt}" may answer ${allowed} or nothing, got "${t && t.q}"`);
}

// The exact question must still win.
if (has(/^What is the quadratic formula\?$/i)) {
  const t = top('What is the quadratic formula?');
  check(t && /^What is the quadratic formula\?$/i.test(t.q), 'the exact question must still find its own lesson');
}

if (failures) process.exit(1);
console.log(`OK typo guard (${ran} checks${skipped ? `, ${skipped} skipped` : ''})`);
