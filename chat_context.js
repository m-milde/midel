/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software. See LICENSE.
 */

/*
 * Conversation context. Follow-up questions reuse the last topic so
 *   "What is Mars?" → … → "What are the moons?" becomes "What are the moons of mars?"
 *   "What is a quadratic equation?" → "What is the formula?" becomes "What is the quadratic formula?"
 *
 *   chatContextResolve(prompt)  → { prompt, lookup, lookups, prefix, generate, usedContext, focus, reason }
 *   chatContextRecord(turn)
 *   chatContextReset()
 *   chatContext.pickFollowUpLesson(lessons, resolved)
 */
(function (root) {
  var MAX_TURNS = 4;
  var MAX_PREFIX_TOKENS = 80;

  var STOP = new Set(
    (
      'what when where who which is are do does did the a an of to in on for and or but with from by at as be was were ' +
      'been being it its this that these those into about than then so if can could has have how why not no yes there ' +
      'their them they he she i you we your my our also just please tell me called named'
    ).split(' ')
  );

  var PRONOUNS = new Set('it its they them their this that these those there'.split(' '));

  var ASK = new Set('what when where who why how which'.split(' '));

  var ATTR = new Set(
    (
      'inhabitants population people residents citizens size area capital location name history climate language ' +
      'currency weather temperature height length width depth age founder mayor president king queen river mountain ' +
      'color colour meaning origin nickname flag anthem religion formula formulas equation equations moon moons ' +
      'ring rings gravity mass diameter radius density atmosphere surface core orbit orbital period day year ' +
      'large largest big bigger old older hot hotter cold colder tall tallest long longer wide wider red ' +
      'population inhabitants climate weather'
    ).split(' ')
  );

  var ATTR_EXPAND = {
    large: ['large', 'largest', 'size', 'big', 'area'],
    largest: ['large', 'largest', 'size', 'big', 'area'],
    big: ['large', 'largest', 'size', 'big'],
    size: ['large', 'largest', 'size', 'area'],
    formula: ['formula', 'formulas', 'quadratic'],
    formulas: ['formula', 'formulas'],
    moons: ['moon', 'moons'],
    moon: ['moon', 'moons'],
    red: ['red', 'color', 'colour', 'rust', 'iron']
  };

  var WEAK_FOCUS = new Set(
    'mathematics math science history geography physics chemistry biology nature astronomy space'.split(' ')
  );

  var PUNCT = new Set('? . ! ,'.split(' '));

  var turns = [];

  function tokenize(text) {
    var s = String(text || '')
      .toLowerCase()
      .replace(/(\d),(?=\d)/g, '$1');
    return s.match(/\d+(?:\.\d+)?%?|[a-z]+|[?.!,]/g) || [];
  }

  function firstSentence(text) {
    var t = String(text || '').replace(/\s+/g, ' ').trim();
    if (!t) return '';
    var m = t.match(/^[\s\S]+?[.!?](?:\s|$)/);
    return m ? m[0].trim() : t;
  }

  function contentWords(text) {
    return tokenize(text).filter(function (w) {
      return !STOP.has(w) && !PUNCT.has(w) && !PRONOUNS.has(w);
    });
  }

  function unique(list) {
    var seen = new Set();
    var out = [];
    list.forEach(function (w) {
      if (!w || seen.has(w)) return;
      seen.add(w);
      out.push(w);
    });
    return out;
  }

  function pretty(word) {
    var s = String(word || '');
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function asQuestion(text) {
    var s = String(text || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    s = s.replace(/^[.!,]+/, '').trim();
    if (!/[?]$/.test(s)) s += '?';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function lastTurn() {
    return turns.length ? turns[turns.length - 1] : null;
  }

  function skipPreamble(tokens) {
    var i = 0;
    if (tokens[0] === 'in' || tokens[0] === 'on' || tokens[0] === 'at') {
      i = 1;
      while (i < tokens.length && tokens[i] !== ',') i += 1;
      if (tokens[i] === ',') i += 1;
    }
    while (i < tokens.length && (tokens[i] === 'a' || tokens[i] === 'an' || tokens[i] === 'the')) i += 1;
    return i;
  }

  function firstContent(text) {
    var toks = tokenize(firstSentence(text));
    var i = skipPreamble(toks);
    while (i < toks.length) {
      var w = toks[i];
      if (!STOP.has(w) && !PUNCT.has(w) && !PRONOUNS.has(w) && w.length > 1 && !WEAK_FOCUS.has(w)) return w;
      i += 1;
    }
    return '';
  }

  function extractFocus(turn) {
    if (!turn) return { focus: '', related: [] };
    var answer = firstSentence(turn.answer || '');
    var asked = String(turn.asked || '');
    var fact = turn.facts && turn.facts[0] ? turn.facts[0] : null;
    var factText = fact ? String(fact.text || '') : '';
    var factQ = fact ? String(fact.question || '') : '';

    var focus = firstContent(answer) || firstContent(factText);
    if (!focus || WEAK_FOCUS.has(focus) || ATTR.has(focus)) {
      var qc = contentWords(factQ || asked).filter(function (w) {
        return !ATTR.has(w) && !WEAK_FOCUS.has(w);
      });
      if (qc[0]) focus = qc[0];
      else if (!focus) focus = contentWords(factQ || asked)[0] || '';
    }

    var related = [];
    [asked, factQ, factText, answer].forEach(function (src) {
      contentWords(src).forEach(function (w) {
        if (w !== focus && w.length > 2) related.push(w);
      });
    });
    return { focus: focus, related: unique(related).slice(0, 8) };
  }

  function contextWords(turn) {
    var info = extractFocus(turn);
    var set = new Set(info.related);
    if (info.focus) set.add(info.focus);
    tokenize(turn.asked || '').forEach(function (w) {
      if (!STOP.has(w) && !PUNCT.has(w)) set.add(w);
    });
    tokenize(firstSentence(turn.answer || '')).forEach(function (w) {
      if (!STOP.has(w) && !PUNCT.has(w)) set.add(w);
    });
    return set;
  }

  function hasPronoun(tokens) {
    return tokens.some(function (w) {
      return PRONOUNS.has(w);
    });
  }

  function startsAsFollowUp(text) {
    var s = String(text || '').trim();
    return /^(and|also|so|then|but)\b/i.test(s) || /^(and\s+)?(what|how)\s+about\b/i.test(s);
  }

  function ofComplements(prompt) {
    var out = [];
    String(prompt || '')
      .toLowerCase()
      .replace(/[?]+/g, '')
      .split(/\bof\b/g)
      .slice(1)
      .forEach(function (chunk) {
        contentWords(chunk).forEach(function (w) {
          if (!ATTR.has(w)) out.push(w);
        });
      });
    return out;
  }

  function slotQuestion(prompt) {
    var s = String(prompt || '').trim();
    if (!/^(what|who|when|where|why|how)\b/i.test(s) && !/[?]$/.test(s)) return false;
    return contentWords(s).length <= 2;
  }

  /** "What is Earth?" / "What is a parasite?" — a complete new subject, not "What is the formula?" */
  function isBareDefinition(prompt) {
    var s = String(prompt || '').trim();
    return (
      /^(what|who)\s+(is|are)\s+(?:a|an)\s+[a-z][\w'-]*\s*\??$/i.test(s) ||
      /^(what|who)\s+(is|are)\s+[a-z][\w'-]*\s*\??$/i.test(s)
    );
  }

  function novelSubject(tokens, ctx) {
    var novel = [];
    tokens.forEach(function (w) {
      if (PUNCT.has(w) || STOP.has(w) || PRONOUNS.has(w) || ASK.has(w)) return;
      if (w === 'many' || w === 'much') return;
      if (ctx.has(w)) return;
      if (/^\d/.test(w)) {
        novel.push(w);
        return;
      }
      if (w.length < 3) return;
      novel.push(w);
    });
    return novel;
  }

  function isFollowUp(prompt, turn) {
    if (!turn) return false;
    var tokens = tokenize(prompt);
    if (!tokens.length) return false;
    if (hasPronoun(tokens)) return true;
    if (startsAsFollowUp(prompt)) return true;
    var ctx = contextWords(turn);
    var foreign = ofComplements(prompt).filter(function (w) {
      return !ctx.has(w);
    });
    if (foreign.length) return false;
    if (isBareDefinition(prompt)) {
      var noun = contentWords(prompt)[0];
      return !!(noun && noun === extractFocus(turn).focus);
    }
    var novel = novelSubject(tokens, ctx);
    if (novel.some(function (w) {
      return /^\d/.test(w);
    }))
      return false;
    if (novel.length >= 2) return false;
    if (slotQuestion(prompt)) return true;
    return novel.length === 0 && contentWords(prompt).length > 0;
  }

  function askedTerms(resolvedOrPrompt) {
    var src =
      resolvedOrPrompt && typeof resolvedOrPrompt === 'object'
        ? resolvedOrPrompt.prompt || resolvedOrPrompt.lookup || ''
        : resolvedOrPrompt;
    var out = [];
    contentWords(src).forEach(function (w) {
      expandAttr(w).forEach(function (a) {
        out.push(a);
      });
    });
    return unique(out);
  }

  function lessonAboutTerm(fact, term) {
    if (!fact || !term) return false;
    if (contentWords(fact.question || '').indexOf(term) !== -1) return true;
    return firstContent(fact.text || '') === term;
  }

  function lessonFitsFollowUp(fact, resolved) {
    if (!fact || !resolved || !resolved.focus) return false;
    var blob = String((fact.question || '') + ' ' + (fact.text || ''));
    if (!mentionsFocus(blob, resolved.focus)) return false;
    var terms = askedTerms(resolved);
    if (!terms.length) return true;
    return terms.some(function (a) {
      return lessonAboutTerm(fact, a);
    });
  }

  function shouldFallbackStandalone(prompt, resolved) {
    if (!resolved || !resolved.usedContext) return false;
    var tokens = tokenize(prompt);
    if (hasPronoun(tokens)) return false;
    if (startsAsFollowUp(prompt) && contentWords(prompt).length < 1) return false;
    return contentWords(prompt).length >= 1;
  }

  function replacePronouns(text, focus) {
    if (!focus) return String(text || '');
    return String(text || '').replace(/\b(its|their|it|they|them|this|that|these|those|there)\b/gi, function (m) {
      var low = m.toLowerCase();
      if (low === 'its' || low === 'their') return focus + "'s";
      return focus;
    });
  }

  function stripLead(text) {
    return String(text || '')
      .replace(/^(and|also|so|then|but)\s+/i, '')
      .replace(/^(and\s+)?(what|how)\s+about\s+/i, '')
      .trim();
  }

  function attachFocus(text, focus) {
    var s = stripLead(String(text || '').replace(/[?]+$/g, '').trim());
    if (!s || !focus) return asQuestion(s || text);
    if (new RegExp('\\b' + focus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(s)) {
      return asQuestion(s);
    }
    var theNoun = s.match(/^what is(?: the)?\s+(.+)$/i);
    if (theNoun) return asQuestion('What is the ' + focus + ' ' + theNoun[1]);
    var thePlural = s.match(/^what are(?: the)?\s+(.+)$/i);
    if (thePlural) return asQuestion('What are the ' + thePlural[1] + ' of ' + focus);
    if (/^how (?!many\b|much\b)\w+\b/i.test(s)) {
      if (/\b(is|are|was|were)\b/i.test(s)) return asQuestion(s + ' ' + focus);
      var adj = (s.match(/^how (\w+)/i) || [])[1] || 'large';
      return asQuestion('How ' + adj + ' is ' + focus);
    }
    if (/^how many\b/i.test(s) || /^how much\b/i.test(s)) {
      if (/\b(does|do|did|has|have|is|are)\b/i.test(s)) return asQuestion(s + ' ' + focus);
      return asQuestion(s + ' does ' + focus + ' have');
    }
    if (/^where\b/i.test(s)) {
      if (/\b(is|are|was|were|does|do)\b/i.test(s)) return asQuestion(s + ' ' + focus);
      return asQuestion('where is ' + focus);
    }
    if (/^when\b/i.test(s)) {
      if (/\b(is|was|did|does)\b/i.test(s)) return asQuestion(s + ' ' + focus);
      return asQuestion('when is ' + focus);
    }
    if (/^who\b/i.test(s)) return asQuestion(s + ' ' + focus);
    if (/^why\b/i.test(s)) return asQuestion(s + ' ' + focus);
    if (/^what\b/i.test(s) && !/\bof\b/i.test(s)) return asQuestion(s + ' of ' + focus);
    return asQuestion(s + ' of ' + focus);
  }

  function lookupVariants(lookup, prompt, focus) {
    var out = [lookup];
    var noun = contentWords(prompt)[0];
    if (noun && focus) {
      out.push('What is the ' + focus + ' ' + noun + '?');
      out.push('What are the ' + noun + ' of ' + focus + '?');
      out.push('How ' + noun + ' is ' + focus + '?');
      out.push(asQuestion(String(prompt || '').replace(/[?]+$/g, '') + ' of ' + focus));
    }
    return unique(out).filter(Boolean);
  }

  function rewrite(prompt, turn) {
    var info = extractFocus(turn);
    var focus = info.focus;
    if (!focus) return { lookup: String(prompt || '').trim(), focus: '', lookups: [], reason: 'no-focus' };
    var withNames = replacePronouns(prompt, focus);
    var lookup = attachFocus(withNames, focus);
    var wikiSearch = unique(
      [focus].concat(
        info.related.filter(function (w) {
          return ATTR.has(w);
        }),
        contentWords(prompt).filter(function (w) {
          return ATTR.has(w);
        })
      )
    )
      .slice(0, 3)
      .join(' ');
    return {
      lookup: lookup,
      lookups: lookupVariants(lookup, prompt, focus),
      focus: focus,
      related: info.related,
      wikiSearch: wikiSearch || focus,
      reason: 'follow-up → ' + focus
    };
  }

  function mentionsFocus(text, focus) {
    var f = String(focus || '').trim();
    if (!f) return true;
    var re = new RegExp('\\b' + f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    return re.test(String(text || ''));
  }

  function expandAttr(word) {
    return ATTR_EXPAND[word] || [word];
  }

  function pickFollowUpLesson(lessons, resolved) {
    var focus = resolved && resolved.focus;
    if (!focus || !lessons || !lessons.length) return null;
    var terms = askedTerms(resolved);
    var best = null;
    var bestScore = 0;
    lessons.forEach(function (f) {
      if (!lessonFitsFollowUp(f, resolved)) return;
      var blob = String((f.question || '') + ' ' + (f.text || '')).toLowerCase();
      var score = 2;
      terms.forEach(function (a) {
        if (blob.indexOf(a) !== -1) score += 3;
      });
      if (mentionsFocus(f.question || '', focus)) score += 2;
      if (score > bestScore) {
        bestScore = score;
        best = f;
      }
    });
    return best;
  }

  function prefixFromTurns(list) {
    if (!list || !list.length) return '';
    var parts = [];
    list.slice(-2).forEach(function (t) {
      var q = String(t.asked || '').replace(/\s+/g, ' ').trim();
      var a = firstSentence(t.answer || '');
      if (q) parts.push(q);
      if (a) parts.push(a);
    });
    var tokens = tokenize(parts.join(' '));
    if (tokens.length > MAX_PREFIX_TOKENS) tokens = tokens.slice(-MAX_PREFIX_TOKENS);
    return tokens.join(' ');
  }

  function resolve(prompt) {
    var original = String(prompt || '').trim();
    var empty = {
      prompt: original,
      lookup: original,
      lookups: [original],
      prefix: '',
      generate: original,
      usedContext: false,
      focus: '',
      related: [],
      wikiSearch: '',
      reason: 'standalone'
    };
    if (!original) return empty;
    var prev = lastTurn();
    var prefix = prefixFromTurns(turns);
    if (!prev || !isFollowUp(original, prev)) {
      empty.prefix = prefix;
      empty.generate = prefix ? prefix + ' ' + original : original;
      return empty;
    }
    var rw = rewrite(original, prev);
    var lookup = rw.lookup || original;
    return {
      prompt: original,
      lookup: lookup,
      lookups: rw.lookups && rw.lookups.length ? rw.lookups : [lookup],
      prefix: prefix,
      generate: prefix ? prefix + ' ' + lookup : lookup,
      usedContext: true,
      focus: rw.focus || '',
      related: rw.related || [],
      wikiSearch: rw.wikiSearch || rw.focus || '',
      reason: rw.reason
    };
  }

  function record(turn) {
    if (!turn) return null;
    var asked = String(turn.asked || '').trim();
    var answer = String(turn.answer || '').trim();
    if (!asked || !answer) return null;
    if (/^(not in the library|remembered|already known|not stored|—|–)$/i.test(answer)) return null;
    var row = {
      asked: asked,
      lookup: String(turn.lookup || asked).trim(),
      answer: answer,
      facts: Array.isArray(turn.facts) ? turn.facts.slice(0, 3) : []
    };
    turns.push(row);
    if (turns.length > MAX_TURNS) turns = turns.slice(-MAX_TURNS);
    return row;
  }

  function reset() {
    turns = [];
  }

  var api = {
    resolve: resolve,
    record: record,
    reset: reset,
    turns: function () {
      return turns.slice();
    },
    last: lastTurn,
    isFollowUp: function (prompt) {
      return isFollowUp(prompt, lastTurn());
    },
    extractFocus: extractFocus,
    prefix: function () {
      return prefixFromTurns(turns);
    },
    generatePrompt: function (prompt) {
      return resolve(prompt).generate;
    },
    tokenize: tokenize,
    prettyFocus: pretty,
    mentionsFocus: mentionsFocus,
    pickFollowUpLesson: pickFollowUpLesson,
    lessonFitsFollowUp: lessonFitsFollowUp,
    shouldFallbackStandalone: shouldFallbackStandalone,
    askedTerms: askedTerms
  };

  root.chatContext = api;
  root.chatContextResolve = resolve;
  root.chatContextRecord = record;
  root.chatContextReset = reset;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this);
