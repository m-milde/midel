/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/*
 * Percent calculator. Answers percentage questions exactly, before any lesson lookup:
 *   "23% of 320"                       → 73.6
 *   "what percent is 15 of 50"         → 30%
 *   "15 is 30% of what"                → 50
 *   "increase 200 by 15%"              → 230
 *   "200 minus 15%" / "15% off 200"    → 170
 *   "percent change from 50 to 75"     → 50% increase
 *   "15% tip on 80"                    → tip 12, total 92
 * percentCalc(prompt) returns { answer, text, reason, kind } or null when the prompt is not a percent calculation.
 */
(function (root) {
  var CURRENCY = /[$€£]|\b(?:usd|eur|gbp|bgn|lv|leva|lev|dollars?|euros?|pounds?)\b/g;

  function parseNum(raw) {
    var s = String(raw || '').replace(/[.,]+$/, '');
    if (!s) return NaN;
    var hasDot = s.indexOf('.') !== -1;
    var hasComma = s.indexOf(',') !== -1;
    if (hasDot && hasComma) {
      /* The last separator is the decimal point: 1,200.50 or 1.200,50 */
      if (s.lastIndexOf('.') > s.lastIndexOf(',')) s = s.replace(/,/g, '');
      else s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma) {
      /* 1,200 is a thousands group; 23,5 is a decimal comma */
      s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
    }
    return Number(s);
  }

  /* Round away binary noise, then show at most `digits` decimals with thousands separators. */
  function fmt(n, digits) {
    if (!isFinite(n)) return 'undefined';
    var d = digits == null ? 6 : digits;
    var r = Math.round((n + Number.EPSILON) * Math.pow(10, d)) / Math.pow(10, d);
    if (Object.is(r, -0)) r = 0;
    return r.toLocaleString('en-US', { maximumFractionDigits: d });
  }

  function pct(n) {
    return fmt(n, 4) + '%';
  }

  function clean(prompt) {
    var s = String(prompt || '').toLowerCase().trim();
    s = s.replace(/[?!]+/g, ' ').replace(/\s+/g, ' ').trim();
    s = s.replace(CURRENCY, ' ').replace(/\s+/g, ' ').trim();
    s = s.replace(/what's/g, 'what is').replace(/whats/g, 'what is');
    /* "23 percent", "23 per cent", "23 pct" → "23%" ; the bare word stays for "what percent is…" */
    s = s.replace(/(\d)\s*(?:%|percent|per cent|pct)(?![a-z])/g, '$1%');
    s = s.replace(/(\d)\s+%/g, '$1%');
    /* leading filler */
    var filler = /^(?:(?:please|can you|could you|tell me|help me|i need to|i want to|how much is|how much|calculate|compute|work out|find out|find|solve|what is|what are|give me|show me)\s+)+/;
    s = s.replace(filler, '').trim();
    s = s.replace(/[.]+$/, '').trim();
    return s;
  }

  var N = '(\\d[\\d.,]*)';
  var TAIL = '(?:\\s+[a-z]+){0,3}';

  /* Structured answer text: the result on top, then the working as short rows (the page renders the bullets). */
  function how(head, steps) {
    return head + '\n\n**How it works**\n' + steps.map(function (x) { return '- ' + x; }).join('\n');
  }

  function build(kind, answer, text, reason) {
    return { kind: kind, answer: answer, text: text, reason: reason };
  }

  function ofPercent(p, base) {
    var v = (p * base) / 100;
    var q = p / 100;
    return build(
      'of',
      fmt(p) + '% of ' + fmt(base) + ' = ' + fmt(v),
      how(fmt(p) + '% of ' + fmt(base) + ' = ' + fmt(v), [
        fmt(p) + '% means ' + fmt(p) + ' ÷ 100 = ' + fmt(q),
        'Multiply by the number: ' + fmt(q) + ' × ' + fmt(base) + ' = ' + fmt(v)
      ]),
      'Calculator · ' + fmt(p) + ' ÷ 100 × ' + fmt(base) + ' = ' + fmt(v)
    );
  }

  function whatPercent(part, whole) {
    if (whole === 0) {
      return build('what-percent', 'undefined', 'A percentage of 0 is undefined, because you cannot divide by zero.', 'Calculator · division by zero');
    }
    var ratio = part / whole;
    var v = ratio * 100;
    return build(
      'what-percent',
      fmt(part) + ' is ' + pct(v) + ' of ' + fmt(whole),
      how(fmt(part) + ' is ' + pct(v) + ' of ' + fmt(whole), [
        'Divide the part by the whole: ' + fmt(part) + ' ÷ ' + fmt(whole) + ' = ' + fmt(ratio, 6),
        'Multiply by 100: ' + fmt(ratio, 6) + ' × 100 = ' + pct(v)
      ]),
      'Calculator · ' + fmt(part) + ' ÷ ' + fmt(whole) + ' × 100 = ' + pct(v)
    );
  }

  function wholeFromPart(part, p) {
    if (p === 0) {
      return build('whole', 'undefined', '0% of any number is 0, so the original number cannot be found.', 'Calculator · division by zero');
    }
    var v = (part * 100) / p;
    return build(
      'whole',
      fmt(part) + ' is ' + fmt(p) + '% of ' + fmt(v),
      how(fmt(part) + ' is ' + fmt(p) + '% of ' + fmt(v), [
        fmt(p) + '% = ' + fmt(p) + ' ÷ 100 = ' + fmt(p / 100),
        'Divide the part by it: ' + fmt(part) + ' ÷ ' + fmt(p / 100) + ' = ' + fmt(v)
      ]),
      'Calculator · ' + fmt(part) + ' ÷ ' + fmt(p) + ' × 100 = ' + fmt(v)
    );
  }

  function change(base, p, sign) {
    var delta = (base * p) / 100;
    var v = base + sign * delta;
    var word = sign > 0 ? 'increased' : 'decreased';
    var op = sign > 0 ? '+' : '−';
    return build(
      sign > 0 ? 'increase' : 'decrease',
      fmt(base) + ' ' + word + ' by ' + fmt(p) + '% = ' + fmt(v),
      how(fmt(base) + ' ' + word + ' by ' + fmt(p) + '% = ' + fmt(v), [
        'Find the percent: ' + fmt(p) + '% of ' + fmt(base) + ' = ' + fmt(delta),
        (sign > 0 ? 'Add it: ' : 'Subtract it: ') + fmt(base) + ' ' + op + ' ' + fmt(delta) + ' = ' + fmt(v)
      ]),
      'Calculator · ' + fmt(base) + ' ' + op + ' ' + fmt(p) + '% = ' + fmt(v)
    );
  }

  function percentChange(from, to, symmetric) {
    if (symmetric) {
      var avg = (from + to) / 2;
      if (avg === 0) return build('difference', 'undefined', 'The percentage difference is undefined when the average of the two numbers is 0.', 'Calculator · division by zero');
      var d = (Math.abs(from - to) / Math.abs(avg)) * 100;
      return build(
        'difference',
        'Percentage difference between ' + fmt(from) + ' and ' + fmt(to) + ' = ' + pct(d),
        how('Percentage difference between ' + fmt(from) + ' and ' + fmt(to) + ' = ' + pct(d), [
          'Difference: |' + fmt(from) + ' − ' + fmt(to) + '| = ' + fmt(Math.abs(from - to)),
          'Average of the two: (' + fmt(from) + ' + ' + fmt(to) + ') ÷ 2 = ' + fmt(avg),
          'Divide and multiply by 100: ' + fmt(Math.abs(from - to)) + ' ÷ ' + fmt(Math.abs(avg)) + ' × 100 = ' + pct(d)
        ]),
        'Calculator · |a − b| ÷ average × 100 = ' + pct(d)
      );
    }
    if (from === 0) {
      return build('change', 'undefined', 'The percent change from 0 is undefined, because you cannot divide by zero.', 'Calculator · division by zero');
    }
    var c = ((to - from) / Math.abs(from)) * 100;
    var dir = c > 0 ? 'increase' : c < 0 ? 'decrease' : 'change';
    var head = c === 0 ? 'No change from ' + fmt(from) + ' to ' + fmt(to) + ' (0%)' : 'From ' + fmt(from) + ' to ' + fmt(to) + ' is a ' + pct(Math.abs(c)) + ' ' + dir;
    return build(
      'change',
      head,
      how(head, [
        'Change: ' + fmt(to) + ' − ' + fmt(from) + ' = ' + fmt(to - from),
        'Divide by the starting value: ' + fmt(to - from) + ' ÷ ' + fmt(Math.abs(from)) + ' = ' + fmt((to - from) / Math.abs(from), 6),
        'Multiply by 100: ' + pct(c)
      ]),
      'Calculator · (new − old) ÷ old × 100 = ' + pct(c)
    );
  }

  function tip(p, bill) {
    var t = (p * bill) / 100;
    return build(
      'tip',
      fmt(p) + '% tip on ' + fmt(bill) + ' = ' + fmt(t) + ' (total ' + fmt(bill + t) + ')',
      how(fmt(p) + '% tip on ' + fmt(bill) + ' = ' + fmt(t) + ', so the total is ' + fmt(bill + t), [
        'Tip: ' + fmt(p) + ' ÷ 100 × ' + fmt(bill) + ' = ' + fmt(t),
        'Total: ' + fmt(bill) + ' + ' + fmt(t) + ' = ' + fmt(bill + t)
      ]),
      'Calculator · ' + fmt(p) + ' ÷ 100 × ' + fmt(bill) + ' = ' + fmt(t)
    );
  }

  /* Each rule: [regex, handler(match) → result]. Order matters: the most specific shapes come first. */
  var RULES = [
    /* percent change / percentage difference between two numbers */
    [
      new RegExp('^(?:the )?(?:percent(?:age)?|%) (change|increase|decrease|difference|growth) (?:from|between) ' + N + ' (?:to|and) ' + N + TAIL + '$'),
      function (m) {
        return percentChange(parseNum(m[2]), parseNum(m[3]), m[1] === 'difference');
      }
    ],
    [
      new RegExp('^' + N + ' to ' + N + ' (?:percent(?:age)?|%) (change|increase|decrease|growth)$'),
      function (m) {
        return percentChange(parseNum(m[1]), parseNum(m[2]), false);
      }
    ],
    /* what percent is A of B */
    [
      new RegExp('^what (?:percent(?:age)?|%) (?:is|are) ' + N + ' of ' + N + TAIL + '$'),
      function (m) {
        return whatPercent(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    /* A is what percent of B */
    [
      new RegExp('^' + N + ' (?:is|are) what (?:percent(?:age)?|%) of ' + N + TAIL + '$'),
      function (m) {
        return whatPercent(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    /* what percent of B is A */
    [
      new RegExp('^what (?:percent(?:age)?|%) of ' + N + TAIL + ' (?:is|are) ' + N + '$'),
      function (m) {
        return whatPercent(parseNum(m[2]), parseNum(m[1]));
      }
    ],
    /* A out of B as a percentage / A of B in percent / what is A as a percentage of B */
    [
      new RegExp('^' + N + ' (?:out of|of|/) ' + N + TAIL + ' (?:as|in|to) (?:a |an )?(?:percent(?:age)?|%)$'),
      function (m) {
        return whatPercent(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    [
      new RegExp('^' + N + ' as (?:a |an )?(?:percent(?:age)?|%) of ' + N + TAIL + '$'),
      function (m) {
        return whatPercent(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    /* A is X% of what (number) */
    [
      new RegExp('^' + N + ' (?:is|are|equals?) ' + N + '% of (?:what|which|a number|what number|the number)$'),
      function (m) {
        return wholeFromPart(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    /* X% of what (number) is A */
    [
      new RegExp('^' + N + '% of (?:what|which|what number|which number|a number|the number) (?:is|are|equals?) ' + N + '$'),
      function (m) {
        return wholeFromPart(parseNum(m[2]), parseNum(m[1]));
      }
    ],
    /* tip */
    [
      new RegExp('^' + N + '% tip (?:on|for|of) ' + N + TAIL + '$'),
      function (m) {
        return tip(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    [
      new RegExp('^(?:a )?tip (?:of )?' + N + '% (?:on|for|of) ' + N + TAIL + '$'),
      function (m) {
        return tip(parseNum(m[1]), parseNum(m[2]));
      }
    ],
    /* increase N by X% */
    [
      new RegExp('^(?:increase|raise|grow|add) ' + N + ' by ' + N + '%$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), 1);
      }
    ],
    [
      new RegExp('^' + N + ' (?:increased|raised|grown) by ' + N + '%$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), 1);
      }
    ],
    [
      new RegExp('^add ' + N + '%(?: [a-z]+)? to ' + N + TAIL + '$'),
      function (m) {
        return change(parseNum(m[2]), parseNum(m[1]), 1);
      }
    ],
    [
      new RegExp('^' + N + ' (?:plus|\\+|with|and) ' + N + '%(?: (?!off|discount)[a-z]+)?(?: added)?$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), 1);
      }
    ],
    /* decrease N by X% */
    [
      new RegExp('^(?:decrease|reduce|lower|cut|drop) ' + N + ' by ' + N + '%$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), -1);
      }
    ],
    [
      new RegExp('^' + N + ' (?:decreased|reduced|lowered|cut|dropped) by ' + N + '%$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), -1);
      }
    ],
    [
      new RegExp('^(?:subtract|take|remove|deduct) ' + N + '%(?: [a-z]+)? (?:from|off|of) ' + N + TAIL + '$'),
      function (m) {
        return change(parseNum(m[2]), parseNum(m[1]), -1);
      }
    ],
    [
      new RegExp('^' + N + ' (?:minus|-|−|less) ' + N + '%$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), -1);
      }
    ],
    [
      new RegExp('^' + N + '% (?:off|discount(?: off| on)?) (?:of |on )?' + N + TAIL + '$'),
      function (m) {
        return change(parseNum(m[2]), parseNum(m[1]), -1);
      }
    ],
    [
      new RegExp('^(?:(?:price|cost|total|bill) )?' + N + ' (?:with|after|less|minus|at) (?:a |an )?' + N + '% (?:off|discount)$'),
      function (m) {
        return change(parseNum(m[1]), parseNum(m[2]), -1);
      }
    ],
    /* X% of N (also "X% from N") — the plain, most common shape */
    [
      new RegExp('^' + N + '% (?:of|from) ' + N + TAIL + '$'),
      function (m) {
        return ofPercent(parseNum(m[1]), parseNum(m[2]));
      }
    ]
  ];

  function percentCalc(prompt) {
    var s = clean(prompt);
    if (!s || !/\d/.test(s)) return null;
    /* Only prompts that talk about percent get here, so ordinary maths and dates are left alone. */
    if (!/%|percent|per cent|pct/.test(s)) return null;
    for (var i = 0; i < RULES.length; i++) {
      var m = RULES[i][0].exec(s);
      if (!m) continue;
      var r = RULES[i][1](m);
      var nums = Array.prototype.slice.call(m, 1).filter(function (x) {
        return /^\d/.test(x);
      });
      if (nums.some(function (x) {
        return isNaN(parseNum(x));
      })) {
        continue;
      }
      return r;
    }
    return null;
  }

  root.percentCalc = percentCalc;
  if (typeof module !== 'undefined' && module.exports) module.exports = { percentCalc: percentCalc };
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this);
