#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Percent calculator: exact answers for every supported wording, and no false triggers. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { percentCalc } = require('../percent_calc.js');

let failures = 0;
function fail(msg) {
  console.error('FAIL:', msg);
  failures++;
}

// [prompt, exact answer headline]
const answers = [
  ['23% of 320', '23% of 320 = 73.6'],
  ['What is 23% of 320?', '23% of 320 = 73.6'],
  ['what is 23 percent of 320', '23% of 320 = 73.6'],
  ['calculate 23 percent of 320?', '23% of 320 = 73.6'],
  ['How much is 23% of 320', '23% of 320 = 73.6'],
  ['15% of 1,200', '15% of 1,200 = 180'],
  ['12.5% of 80', '12.5% of 80 = 10'],
  ['7,5% of 200', '7.5% of 200 = 15'],
  ['what is 20% of $250', '20% of 250 = 50'],
  ['0.5% of 1000', '0.5% of 1,000 = 5'],
  ['150% of 40', '150% of 40 = 60'],
  ['33.333% of 90', '33.333% of 90 = 29.9997'],
  ['what percent is 15 of 50', '15 is 30% of 50'],
  ['what percentage is 3 of 8?', '3 is 37.5% of 8'],
  ['15 is what percent of 50', '15 is 30% of 50'],
  ['what percentage of 200 is 50', '50 is 25% of 200'],
  ['15 out of 50 as a percentage', '15 is 30% of 50'],
  ['what is 45 as a percentage of 60', '45 is 75% of 60'],
  ['15 is 30% of what', '15 is 30% of 50'],
  ['30% of what number is 15', '15 is 30% of 50'],
  ['increase 200 by 15%', '200 increased by 15% = 230'],
  ['200 plus 15%', '200 increased by 15% = 230'],
  ['200 + 15%', '200 increased by 15% = 230'],
  ['add 20% VAT to 100', '100 increased by 20% = 120'],
  ['add 20% to 100', '100 increased by 20% = 120'],
  ['decrease 200 by 15%', '200 decreased by 15% = 170'],
  ['200 minus 15%', '200 decreased by 15% = 170'],
  ['200 - 15%', '200 decreased by 15% = 170'],
  ['15% off 200', '200 decreased by 15% = 170'],
  ['subtract 15% from 200', '200 decreased by 15% = 170'],
  ['200 with 15% discount', '200 decreased by 15% = 170'],
  ['price 80 after a 25% discount', '80 decreased by 25% = 60'],
  ['200 at 10% off', '200 decreased by 10% = 180'],
  ['percent change from 50 to 75', 'From 50 to 75 is a 50% increase'],
  ['percentage decrease from 80 to 60', 'From 80 to 60 is a 25% decrease'],
  ['percent change between 0 and 5', 'undefined'],
  ['percentage difference between 80 and 120', 'Percentage difference between 80 and 120 = 40%'],
  ['15% tip on 80', '15% tip on 80 = 12 (total 92)'],
  ['tip of 18% on $45.50', '18% tip on 45.5 = 8.19 (total 53.69)'],
  ['what percent is 5 of 0', 'undefined']
];
for (const [prompt, expected] of answers) {
  const r = percentCalc(prompt);
  if (!r) fail(`no answer for "${prompt}" (expected "${expected}")`);
  else if (r.answer !== expected) fail(`"${prompt}" gave "${r.answer}", expected "${expected}"`);
}

// These must NOT be taken for percent questions (they belong to the library or other tools).
const notPercent = [
  'what is 5 + 3',
  'what is the capital of france?',
  'How do I find a percentage of a number?',
  'what is 2 plus 2',
  '20% of the population',
  'how to find direction using clock?',
  'what is 10 percent',
  'percent of what',
  'What is the quadratic formula?'
];
for (const prompt of notPercent) {
  if (percentCalc(prompt) !== null) fail(`"${prompt}" was wrongly treated as a percent question`);
}

// The explanation must be structured so the page renders "How it works" as rows.
const r = percentCalc('What is 23% of 320?');
if (!r || !/\*\*How it works\*\*\n- /.test(r.text)) fail('the explanation text lost its "How it works" bullet structure');
if (!r || !/^Calculator · /.test(r.reason)) fail('the reason line should start with "Calculator · "');

if (failures) process.exit(1);
console.log(`OK percent calculator (${answers.length} answers, ${notPercent.length} non-triggers)`);
