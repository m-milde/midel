#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Answer formatter: how stored text becomes paragraphs, bullets, steps and bold labels. */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { formatAnswer, answerPlainText, answerIsPlainParagraph } = require('../answer_format.js');

let failures = 0;
function check(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failures++;
  }
}
const types = (text) => formatAnswer(text).map((b) => b.type).join(',');
const runsText = (b) => (b.runs || []).map((r) => r.t).join('');

// 1. One or two plain sentences stay one plain paragraph.
check(answerIsPlainParagraph(formatAnswer('Pi is a mathematical constant representing the ratio of a circle circumference to its diameter.')), 'one sentence should stay a plain paragraph');
check(types('Boiling is reliable. Filters also help.') === 'p', 'two sentences should be one paragraph');

// 2. Three sentences: a lead sentence, then bullets.
check(types('A lean-to uses a main beam and angled branches. Cover it with leaves or grass. Face the opening away from the wind.') !== 'p', 'three sentences should be structured');

// 3. Two or more instructions become "What to do" plus bullets; background goes to "Good to know".
{
  const b = formatAnswer('Use insulation beneath your body and stay dry. Wear layered clothing suitable for conditions. Cover exposed skin when temperatures drop. Conserving heat during sleep is extremely important.');
  check(b[0] && b[0].type === 'h' && runsText(b[0]) === 'What to do', 'instructions should start with a "What to do" heading');
  check(b[1] && b[1].type === 'ul' && b[1].items.length === 3, 'three instructions should be three bullets');
  check(b[2] && b[2].type === 'p' && /^Good to know:/.test(runsText(b[2])), 'the reason sentence should be labelled "Good to know"');
}

// 4. A verb word used as a noun is not an instruction ("Practice improves success").
{
  const b = formatAnswer('Scrape the rod sharply to create sparks. Direct sparks onto dry tinder. Continue until ignition occurs. Practice improves success with ferro rods.');
  const list = b.find((x) => x.type === 'ul');
  check(list && list.items.length === 3, '"Practice improves success" must not become a bullet');
}

// 5. A sentence that is really a list becomes bullets.
{
  const b = formatAnswer('A basic survival kit should include water, food, a first aid kit, a flashlight, and a whistle. Check it every six months.');
  const list = b.find((x) => x.type === 'ul');
  check(list && list.items.length === 5, 'a list sentence should become 5 bullets');
  check(runsText(b[0]).endsWith(':'), 'the lead of a list should end with a colon');
}

// 6. Steps: First / Then / Finally become a numbered list.
check(types('First, find a safe place. Then call for help. Finally, stay calm until help arrives.') === 'ol', 'First/Then/Finally should be a numbered list');

// 7. "Example:" goes on its own row with a bold label.
{
  const b = formatAnswer('Divide the numerator by the denominator. The quotient is the whole part and the remainder becomes the new numerator. Example: 11/4 = 2 remainder 3, so 2 3/4.');
  const last = b[b.length - 1];
  check(last.type === 'p' && last.runs[0].b === true && last.runs[0].t === 'Example:', '"Example:" should be a bold label on its own row');
}

// 8. Markdown that arrives with line breaks keeps its structure.
{
  const b = formatAnswer('Early signs are shivering.\n**Dangerous signs**\n- Confusion\n- Slurred speech\n**What to do**\n1. Get warm\n2. Call help');
  check(types('Early signs are shivering.\n**Dangerous signs**\n- Confusion\n- Slurred speech\n**What to do**\n1. Get warm\n2. Call help') === 'p,h,ul,h,ol', 'markdown rows should map to p,h,ul,h,ol');
  check(b[2].items.length === 2 && b[4].items.length === 2, 'markdown lists should keep their items');
}

// 9. Long encyclopedia sentences become short paragraphs, not bullets.
{
  const long = 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France, named after the engineer Gustave Eiffel whose company designed and built it. It was constructed from 1887 to 1889 as the centerpiece of the 1889 World Fair and was initially criticized by some of the leading artists and intellectuals of France. It is now a global cultural icon of France and one of the most recognizable structures in the world.';
  check(types(long) === 'p,p', 'long sentences should become paragraphs');
}

// 10. Yes/no with its reason: the bold verdict leads the first paragraph.
{
  const b = formatAnswer('**No.** Chamomile is not a proven treatment for severe stomach pain. Mild tea may be soothing for some people. Seek medical advice if symptoms are severe.');
  check(b[0].runs[0].b === true && b[0].runs[0].t === 'No.', 'the bold "No." should lead the answer');
}

// 11. Copy text: bullets and numbers, blank line between blocks.
check(answerPlainText('Early signs are shivering.\n- Confusion\n- Slurred speech').includes('• Confusion\n• Slurred speech'), 'plain text for Copy should use • bullets');
check(answerPlainText('First, find a safe place. Then call for help. Finally, stay calm.').startsWith('1. First'), 'plain text for Copy should number steps');
check(formatAnswer('').length === 0, 'empty text should give no blocks');

if (failures) process.exit(1);
console.log('OK answer formatter');
