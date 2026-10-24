#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Regression checks for Wikipedia relevance and save gates (wiki_lookup.js).
 * Run after changing wiki_lookup.js, save_taught.py lookup, or batch gates: npm run test:wiki
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const W = require(join(__dirname, '..', 'wiki_lookup.js'));

let failed = 0;

function assert(name, cond) {
  if (!cond) {
    console.error('FAIL:', name);
    failed++;
  } else {
    console.log('ok:', name);
  }
}

const songHit = {
  title: 'Fastest Girl in Town',
  text: '"Fastest Girl in Town" is a song co-written and recorded by American country music artist Miranda Lambert.'
};

const birdsHit = {
  title: 'List of birds by flight speed',
  text: 'This is a list of the average and fastest flight speeds achieved by birds. The peregrine falcon can exceed 320 km/h.'
};

const timeHit = {
  title: 'Time',
  text: 'Time is the continuous progression of existence that occurs in an apparently irreversible succession from the past, through the present, and into the future.'
};

const timeZoneFact = {
  id: 3721,
  category: 'Sky and space',
  question: 'What is a time zone?',
  text: 'A time zone is a region of the Earth that has the same standard time.'
};

function lessonAnswersAskedTime(prompt, fact) {
  if (!fact || fact.id !== 3721) return false;
  return false;
}

assert('rejects song for fastest bird question', !W.wikiHitRelevant('Which is the fastest bird?', songHit));
assert('accepts bird list for fastest bird', W.wikiHitRelevant('Which is the fastest bird?', birdsHit));
assert('accepts Time article for what is time', W.wikiHitRelevant('what is time?', timeHit));

const saveBird = W.evaluateWikiSave({
  asked: 'Which is the fastest bird?',
  hit: songHit,
  deepMiss: true,
  answer: 'not in the library',
  library: null,
  lessonAnswersAsked: () => false
});
assert('does not save song as bird lesson', !saveBird.allow && saveBird.reason === 'irrelevant');

const saveBirdGood = W.evaluateWikiSave({
  asked: 'Which is the fastest bird?',
  hit: birdsHit,
  deepMiss: true,
  answer: 'not in the library',
  library: null,
  lessonAnswersAsked: () => false
});
assert('saves relevant bird article', saveBirdGood.allow);

const saveTimeWeak = W.evaluateWikiSave({
  asked: 'what is time?',
  hit: timeHit,
  deepMiss: true,
  answer: timeZoneFact.text,
  library: { coverage: 0.85, facts: [timeZoneFact] },
  lessonAnswersAsked: lessonAnswersAskedTime
});
assert('saves Time over loose time-zone match', saveTimeWeak.allow);

const saveTimeSolid = W.evaluateWikiSave({
  asked: 'What is a time zone?',
  hit: timeHit,
  deepMiss: false,
  answer: timeZoneFact.text,
  library: { coverage: 0.9, facts: [timeZoneFact] },
  lessonAnswersAsked: (p, f) => f.id === 3721 && /time zone/i.test(p)
});
assert('blocks save when library solidly answers', !saveTimeSolid.allow && saveTimeSolid.reason === 'no-miss');

assert('search terms strip ask words', W.wikipediaSearchTerms('Which is the fastest bird?') === 'fastest bird');

const wrestlerHit = {
  title: 'Stone Cold Steve Austin',
  text: 'Steve Austin, also known by his ring name Stone Cold Steve Austin, is an American media personality and retired professional wrestler.'
};
const rockHit = {
  title: 'Rock (geology)',
  text: 'In geology, a rock is any naturally occurring solid mass or aggregate of minerals or mineraloid matter.'
};
assert('rejects wrestler for what is stone', !W.wikiHitRelevant('what is stone?', wrestlerHit));
assert('accepts geology for what is stone', W.wikiHitRelevant('what is stone?', rockHit));

const fourthHit = {
  title: 'Fourth dimension',
  text: 'In physics and mathematics, the fourth dimension is an abstract concept extending three-dimensional space.'
};
assert(
  'accepts fourth dimension for typo forth dimensions',
  W.wikiHitRelevant('what is the forth dimensions?', fourthHit)
);

const tsarichinaHit = {
  title: 'Tsarichina',
  text: 'Tsarichina is a village in western Bulgaria, located in Kostinbrod Municipality, Sofia Province north of the capital Sofia.'
};
const bulgariaHit = {
  title: 'Bulgaria',
  text: 'Bulgaria is a country in Southeast Europe on the eastern flank of the Balkans, bordered by Romania, Serbia, and the Black Sea.'
};
assert(
  'rejects village for where is Bulgaria located',
  !W.wikiHitRelevant('Where is Bulgaria located?', tsarichinaHit)
);
assert(
  'accepts Bulgaria for where is Bulgaria located',
  W.wikiHitRelevant('Where is Bulgaria located?', bulgariaHit)
);

const cannabisHit = {
  title: 'Cannabis',
  text: 'Cannabis is a genus of flowering plants in the family Cannabaceae.'
};
assert(
  'accepts Cannabis for what is cannabis (not cannabi plural bug)',
  W.wikiHitRelevant('what is cannabis?', cannabisHit)
);

const chicagoHit = {
  title: 'Chicago',
  text:
    'Chicago is the most populous city in the U.S. state of Illinois and in the Midwestern United States. Located on the western shore of Lake Michigan, it is the third-most populous city in the United States, with a population of 2.74 million at the 2020 census.'
};
const chicagoSave = W.evaluateWikiSave({
  asked: 'Where is Chicago located?',
  hit: chicagoHit,
  deepMiss: true,
  answer: 'not in the library',
  library: null,
  lessonAnswersAsked: () => false
});
assert('saves Chicago where-is (U.S. abbrev in summary)', chicagoSave.allow && chicagoSave.text.length >= 48);

const socialismHit = {
  title: 'Socialism',
  text:
    'Socialism is an economic ideology. Types of socialism vary based on the role of markets and planning in resource allocation.'
};
assert(
  'accepts Socialism for main types of socialism (meta words ignored)',
  W.wikiHitRelevant('What are the main types of socialism?', socialismHit)
);
const socialismSave = W.evaluateWikiSave({
  asked: 'What are the main types of socialism?',
  hit: socialismHit,
  deepMiss: true,
  answer: 'not in the library',
  library: null,
  lessonAnswersAsked: () => false
});
assert('saves socialism types question', socialismSave.allow);

if (failed) {
  console.error('\n' + failed + ' failed');
  process.exit(1);
}
console.log('\nAll wiki remember checks passed.');
