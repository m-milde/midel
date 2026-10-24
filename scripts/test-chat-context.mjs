#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Conversation context: follow-ups keep the last topic; new questions stay standalone. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ctx = require('../chat_context.js');

let failures = 0;
function fail(msg) {
  console.error('FAIL:', msg);
  failures++;
}

function eq(got, want, label) {
  if (got !== want) fail(label + ' → "' + got + '", expected "' + want + '"');
}

function includes(got, needle, label) {
  if (String(got).toLowerCase().indexOf(String(needle).toLowerCase()) === -1) {
    fail(label + ' missing "' + needle + '" in "' + got + '"');
  }
}

ctx.reset();

const first = ctx.resolve('What is the capital of Bulgaria?');
if (first.usedContext) fail('first question should be standalone');
eq(first.lookup, 'What is the capital of Bulgaria?', 'first lookup');

ctx.record({
  asked: 'What is the capital of Bulgaria?',
  answer: 'Sofia is the capital of Bulgaria, positioned at the foot of Vitosha mountain.',
  facts: [
    {
      id: 8040,
      question: 'What is the capital of Bulgaria?',
      text: 'Sofia is the capital of Bulgaria, positioned at the foot of Vitosha mountain in the western part of the country.'
    }
  ]
});

const info = ctx.extractFocus(ctx.last());
eq(info.focus, 'sofia', 'focus from Sofia answer');

const follow = ctx.resolve('And how many inhabitants does it have?');
if (!follow.usedContext) fail('pronoun follow-up should use context');
includes(follow.lookup, 'sofia', 'it → sofia');
includes(follow.lookup, 'inhabitants', 'keeps inhabitants');
includes(follow.prefix, 'bulgaria', 'prefix keeps previous question');
includes(follow.prefix, 'sofia', 'prefix keeps previous answer');
includes(follow.generate, 'sofia', 'generate prompt includes focus');
includes(follow.wikiSearch, 'sofia', 'wiki search leads with sofia');
if (ctx.mentionsFocus('An Inhabitant of Carcosa is a short story', 'sofia')) {
  fail('off-topic Wikipedia text must not count as Sofia');
}
if (!ctx.mentionsFocus('Sofia has a population of about 1.3 million', 'sofia')) {
  fail('Sofia population text should mention focus');
}
if (!ctx.isFollowUp('And how many inhabitants does it have?')) fail('isFollowUp pronoun');

const short = ctx.resolve('How many inhabitants?');
if (!short.usedContext) fail('subject-less follow-up should use context');
includes(short.lookup, 'sofia', 'bare how-many attaches sofia');

const its = ctx.resolve("What's its population?");
if (!its.usedContext) fail("its should use context");
includes(its.lookup, 'sofia', "its → sofia");

const standalone = ctx.resolve('What is the capital of France?');
if (standalone.usedContext) fail('new named topic must stay standalone');
eq(standalone.lookup, 'What is the capital of France?', 'france lookup unchanged');

ctx.record({
  asked: 'What is the capital of France?',
  answer: 'Paris is the capital of France.',
  facts: [{ question: 'What is the capital of France?', text: 'Paris is the capital of France.' }]
});
eq(ctx.extractFocus(ctx.last()).focus, 'paris', 'focus moves to Paris');

const next = ctx.resolve('And how many inhabitants does it have?');
includes(next.lookup, 'paris', 'it now refers to Paris, not Sofia');

ctx.reset();
if (ctx.turns().length) fail('reset should clear turns');
if (ctx.resolve('And how many inhabitants does it have?').usedContext) {
  fail('follow-up without a previous turn is standalone');
}

if (ctx.record({ asked: 'Q?', answer: 'not in the library' })) {
  fail('library miss must not become context');
}

ctx.reset();
ctx.record({
  asked: 'What is the Sahara Desert?',
  answer:
    'The Sahara is the largest hot desert in the world, covering much of North Africa. It is about the size of the United States and has extreme temperatures and very little rainfall.',
  facts: [
    {
      id: 3165,
      category: 'Places',
      question: 'What is the Sahara Desert?',
      text: 'The Sahara is the largest hot desert in the world, covering much of North Africa. It is about the size of the United States and has extreme temperatures and very little rainfall.'
    }
  ]
});
eq(ctx.extractFocus(ctx.last()).focus, 'sahara', 'Sahara answer focuses on sahara');
const saharaSize = ctx.resolve('How large is it?');
if (!saharaSize.usedContext) fail('How large is it? is a Sahara follow-up');
includes(saharaSize.lookup, 'sahara', 'How large attaches Sahara');
const saharaPicked = ctx.pickFollowUpLesson(
  [
    {
      id: 3165,
      question: 'What is the Sahara Desert?',
      text: 'The Sahara is the largest hot desert in the world, covering much of North Africa. It is about the size of the United States.'
    },
    {
      id: 10822,
      question: 'Which is the largest hot desert?',
      text: 'The Sahara Desert in Northern Africa is the largest hot desert in the world, spanning over 3.5 million square miles.'
    }
  ],
  saharaSize
);
if (!saharaPicked || !/sahara/i.test(saharaPicked.text)) fail('Sahara size pick must stay on Sahara');

ctx.reset();
ctx.record({
  asked: 'What is a quadratic equation?',
  answer:
    'In mathematics, a quadratic equation is an equation that can be rearranged in standard form as where the variable represents an unknown number, and a, b, and c represent known numbers, where a ≠ 0.',
  facts: [
    {
      id: 5533,
      question: 'What is a quadratic equation?',
      text: 'In mathematics, a quadratic equation is an equation that can be rearranged in standard form.'
    }
  ]
});
eq(ctx.extractFocus(ctx.last()).focus, 'quadratic', 'skip In mathematics, preamble');
const formula = ctx.resolve('What is the formula?');
if (!formula.usedContext) fail('What is the formula? is a quadratic follow-up');
includes(formula.lookup, 'quadratic', 'formula binds to quadratic');
includes(formula.lookup, 'formula', 'keeps formula');
if (ctx.resolve('What is Formula 1?').usedContext) fail('Formula 1 is a new topic');
const formulaPick = ctx.pickFollowUpLesson(
  [
    {
      id: 99,
      question: 'What is Formula 1?',
      text: 'Formula 1 is an international single-seater motor racing championship.'
    },
    {
      id: 14699,
      question: 'What is the quadratic formula?',
      text: 'For ax² + bx + c = 0, the solutions are x = (−b ± √(b² − 4ac)) / (2a).'
    }
  ],
  formula
);
if (!formulaPick || formulaPick.id !== 14699) fail('formula follow-up must pick the quadratic formula, not Formula 1');

ctx.reset();
ctx.record({
  asked: 'What is Mars?',
  answer: 'Mars is often called the Red Planet because iron minerals in its surface rocks and dust have oxidized.',
  facts: [
    {
      id: 9431,
      question: 'What is Mars?',
      text: 'Mars is often called the Red Planet because iron minerals in its surface rocks and dust have oxidized.'
    }
  ]
});
eq(ctx.extractFocus(ctx.last()).focus, 'mars', 'Mars focus');
ctx.record({
  asked: 'Why is it red?',
  answer: 'Mars is often called the Red Planet because iron minerals in its surface rocks and dust have oxidized.',
  facts: [
    {
      id: 9431,
      question: 'What is Mars?',
      text: 'Mars is often called the Red Planet because iron minerals in its surface rocks and dust have oxidized.'
    }
  ]
});
const moons = ctx.resolve('What are the moons?');
if (!moons.usedContext) fail('What are the moons? is a Mars follow-up');
includes(moons.lookup, 'mars', 'moons of Mars');
includes(moons.lookup, 'moon', 'keeps moons');
if (ctx.resolve('What are the moons of Jupiter?').usedContext) fail('moons of Jupiter is a new topic');
const moonPick = ctx.pickFollowUpLesson(
  [
    {
      id: 1,
      question: 'What is the Moon?',
      text: "The Moon is Earth's only natural satellite."
    },
    {
      id: 9434,
      question: 'What are the moons of Mars?',
      text: 'Mars has two small moons called Phobos and Deimos.'
    }
  ],
  moons
);
if (!moonPick || moonPick.id !== 9434) fail('moons follow-up must pick Phobos and Deimos, not Earth\'s Moon');

ctx.reset();
ctx.record({
  asked: 'What is the Sahara Desert?',
  answer: 'The Sahara is the largest hot desert in the world, covering much of North Africa.',
  facts: [
    {
      id: 3165,
      question: 'What is the Sahara Desert?',
      text: 'The Sahara is the largest hot desert in the world, covering much of North Africa.'
    }
  ]
});
const nitrogen = ctx.resolve('What is nitrogen?');
if (nitrogen.usedContext) fail('What is nitrogen? is a new subject, not a Sahara follow-up');
eq(nitrogen.lookup, 'What is nitrogen?', 'nitrogen lookup stays standalone');

ctx.reset();
ctx.record({
  asked: 'What is Mars?',
  answer: 'Mars is often called the Red Planet because iron minerals in its surface rocks and dust have oxidized.',
  facts: [
    {
      id: 9431,
      question: 'What is Mars?',
      text: 'Mars has two small moons called Phobos and Deimos. They are irregularly shaped and much smaller than Earth\'s Moon.'
    }
  ]
});
const earth = ctx.resolve('What is Earth?');
if (earth.usedContext) fail('What is Earth? after Mars must not stay on Mars');
eq(earth.lookup, 'What is Earth?', 'Earth lookup is standalone');
if (
  ctx.pickFollowUpLesson(
    [
      {
        id: 9559,
        question: 'What does terraformed Mars mean in science fiction?',
        text: 'A terraformed Mars is a fictional version of Mars. Making Mars Earth-like would require technology far beyond current capabilities.'
      },
      {
        id: 900,
        question: 'What is Earth?',
        text: 'Earth is the third planet from the Sun and the only known world with life.'
      }
    ],
    {
      usedContext: true,
      focus: 'mars',
      prompt: 'What is Earth?',
      lookup: 'What is the mars earth?'
    }
  )
) {
  fail('Earth-like in a Mars sci-fi lesson must not count as What is Earth?');
}
if (ctx.resolve('What is a chromosome pair?').usedContext) {
  fail('a new two-word topic stays standalone');
}
if (ctx.resolve('What is the capital of France?').usedContext) {
  fail('of-France stays standalone after Sahara');
}

if (failures) {
  console.error(failures + ' failure(s)');
  process.exit(1);
}
console.log('OK chat context — follow-ups bind it/empty subject to the last answer; new topics stay standalone');
