/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/*
 * Answer formatter. Turns one block of answer text into readable structure:
 * short paragraphs, bullet lists, numbered steps and bold labels, instead of one long sentence.
 *
 *   formatAnswer(text)     → blocks: { type: 'p' | 'h' | 'ul' | 'ol', runs | items }  (runs = [{ t, b }])
 *   answerPlainText(text)  → the same structure as plain text (• bullets, 1. steps), for Copy
 *
 * Text that already has line breaks or markdown (- item, 1. step, **bold**, # heading) keeps its own structure.
 * Plain sentences are grouped: a lead sentence, then bullets for the details, and "Example:" / "Note:" on their own line.
 */
(function (root) {
  var LABEL = /^(example|for example|e\.g\.|note|tip|warning|important|formula|how it works|how|remember|steps?)\b[:,]?\s*/i;
  var ORDINAL = /^(first|second|third|fourth|next|then|finally|lastly|after that|step\s*\d+)\b/i;
  var LIST_LEAD = /^(.{0,90}?\b(?:include|includes|including|contains?|consists? of)\b)[:,]?\s+(.+?)\.$/i;

  /* Sentences that give an instruction ("Wear layers.") are the practical part; the rest is background. */
  var ACTION_VERBS = new RegExp('^(?:use|wear|cover|keep|avoid|stay|build|make|check|find|look|move|drink|boil|collect|choose|drop|call|stop|seek|protect|add|mark|create|fill|store|carry|take|put|follow|learn|practice|prepare|begin|start|remove|reduce|increase|inspect|secure|let|allow|bring|filter|purify|signal|shout|leave|get|open|close|clean|wash|apply|press|tie|dig|gather|ignite|strike|scrape|direct|position|insulate|ensure|include|remember|try|consider|wait|listen|eat|conserve|monitor|maintain|pack|cut|blow|rub|sit|lie|stand|walk|climb|descend|aim|stack|arrange|clear|plan|record|note|tell|share|combine|mix|measure|divide|multiply|subtract|solve|simplify|convert|round|compare|calculate|estimate|pull|push|lift|lower|raise|swap|replace|repair|fix|release|seal|label|rotate|ventilate|continue|repeat|hold|turn|tilt|rinse|soak|scrub|pour|dry|stir|label|mark|test)\\b', 'i');
  var NOT_INSTRUCTION = /^(?:is|are|was|were|can|could|may|might|will|would|should|must|does|did|has|have|had|also|often|usually|generally|improves?|helps?|reduces?|increases?|provides?|makes?|allows?|becomes?|gives?|keeps?|requires?|takes?|means?|creates?|works?|ensures?|prevents?|protects?|supports?|builds?|lowers?|raises?)$/;
  var RATIONALE = /\b(important|essential|critical|vital|helps?|improves?|reduces?|prevents?|protects?|significantly|greatly|safer|safety|success|chance|risk|better|benefits?|reliable|accidents?|mistakes?|danger)/i;
  var ACTION_NEGATED = /^(?:never|always|do not|don.t)\b/i;

  function isAction(sentence) {
    var t = String(sentence || '').trim();
    if (ACTION_NEGATED.test(t)) return true;
    if (!ACTION_VERBS.test(t)) return false;
    /* "Practice improves success…" starts with a verb word but is a statement, not an instruction. */
    var second = (t.split(/\s+/)[1] || '').toLowerCase().replace(/[^a-z]/g, '');
    return !NOT_INSTRUCTION.test(second);
  }

  /* ── inline ── */
  function parseInline(text) {
    var runs = [];
    var parts = String(text || '').split(/(\*\*[^*]+\*\*)/g);
    parts.forEach(function (part) {
      if (!part) return;
      var m = /^\*\*([^*]+)\*\*$/.exec(part);
      if (m) runs.push({ t: m[1], b: true });
      else runs.push({ t: part.replace(/\*\*/g, ''), b: false });
    });
    return runs;
  }

  function runsText(runs) {
    return runs
      .map(function (r) {
        return r.t;
      })
      .join('');
  }

  /* ── sentences ── */
  function splitSentences(text) {
    var t = String(text || '').replace(/\s+/g, ' ').trim();
    if (!t) return [];
    var out = [];
    var start = 0;
    var re = /[.!?]["')\]]?\s+(?=[A-Z0-9"'(\[])/g;
    var m;
    while ((m = re.exec(t))) {
      var cut = m.index + m[0].length;
      var before = t.slice(start, m.index + 1);
      /* Do not split after an abbreviation or a single initial: "Dr.", "U.S.", "No." */
      if (/(?:\b(?:Dr|Mr|Mrs|Ms|St|vs|No|Fig|approx|etc)|\b[A-Z])\.$/.test(before) && !/[!?]$/.test(before)) continue;
      out.push(t.slice(start, cut).trim());
      start = cut;
    }
    var rest = t.slice(start).trim();
    if (rest) out.push(rest);
    return out;
  }

  function labelRuns(sentence) {
    var m = LABEL.exec(sentence);
    if (!m) return parseInline(sentence);
    var label = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
    var rest = sentence.slice(m[0].length);
    return [{ t: label + ':', b: true }, { t: ' ' + rest, b: false }];
  }

  /* "Include water, food, a light and a radio." → lead + items, only when it clearly reads as a list. */
  function listFromSentence(sentence) {
    var m = LIST_LEAD.exec(sentence);
    if (!m) return null;
    /* The lead must say what is being listed ("Useful items include"), not just the bare verb. */
    if (m[1].trim().split(/\s+/).length < 3) return null;
    var items = m[2]
      .split(/,\s*(?:and\s+|or\s+)?|\s+and\s+(?=[^,]*$)/i)
      .map(function (x) {
        return x.trim();
      })
      .filter(Boolean);
    if (items.length < 4) return null;
    var short = items.every(function (x) {
      return x.split(/\s+/).length <= 6;
    });
    if (!short) return null;
    var lead = m[1].trim() + ':';
    return {
      lead: lead.charAt(0).toUpperCase() + lead.slice(1),
      items: items.map(function (x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
      })
    };
  }

  function bodyBlocks(sentences) {
    var n = sentences.length;
    if (!n) return [];
    if (n === 1) {
      var single = listFromSentence(sentences[0]);
      if (single) {
        return [
          { type: 'p', runs: parseInline(single.lead) },
          {
            type: 'ul',
            items: single.items.map(function (x) {
              return parseInline(x);
            })
          }
        ];
      }
      return [{ type: 'p', runs: parseInline(sentences[0]) }];
    }
    /* A lead sentence that is really a list ("Include water, food, …") becomes bullets, then the rest follows. */
    var firstList = listFromSentence(sentences[0]);
    if (firstList) {
      return [
        { type: 'p', runs: parseInline(firstList.lead) },
        {
          type: 'ul',
          items: firstList.items.map(function (x) {
            return parseInline(x);
          })
        }
      ].concat(bodyBlocks(sentences.slice(1)));
    }
    /* Two or more instructions: show them as a "What to do" list and keep the background separate. */
    var actions = sentences.filter(isAction);
    if (actions.length >= 2) {
      var firstAction = sentences.findIndex(isAction);
      var opening = sentences.slice(0, firstAction);
      var background = sentences.slice(firstAction).filter(function (x) {
        return !isAction(x);
      });
      var out = [];
      if (opening.length) out.push({ type: 'p', runs: parseInline(opening.join(' ')) });
      out.push({ type: 'h', runs: [{ t: 'What to do', b: true }] });
      out.push({
        type: 'ul',
        items: actions.map(function (x) {
          return parseInline(x);
        })
      });
      if (background.length) {
        /* Reasons and importance are "Good to know"; what happens as a result of the steps stays unlabeled. */
        var reason = RATIONALE.test(background.join(' '));
        out.push({
          type: 'p',
          runs: reason
            ? [{ t: 'Good to know:', b: true }, { t: ' ' + background.join(' '), b: false }]
            : parseInline(background.join(' '))
        });
      }
      return out;
    }
    if (n === 2) return [{ type: 'p', runs: parseInline(sentences.join(' ')) }];

    var rest = sentences.slice(1);
    var ordinals = rest.filter(function (s) {
      return ORDINAL.test(s);
    }).length;
    var avg =
      sentences.reduce(function (sum, s) {
        return sum + s.length;
      }, 0) / n;

    /* Steps: "First…, Then…, Finally…" → numbered list. */
    if (ordinals >= 2 || (ordinals >= 1 && ORDINAL.test(sentences[0]))) {
      var steps = ORDINAL.test(sentences[0]) ? sentences : rest;
      var head = ORDINAL.test(sentences[0]) ? [] : [{ type: 'p', runs: parseInline(sentences[0]) }];
      return head.concat([
        {
          type: 'ol',
          items: steps.map(function (s) {
            return parseInline(s);
          })
        }
      ]);
    }
    /* Long encyclopedic sentences read better as short paragraphs than as bullets. */
    if (avg > 115) {
      var paras = [];
      for (var i = 0; i < n; i += 2) {
        paras.push({ type: 'p', runs: parseInline(sentences.slice(i, i + 2).join(' ')) });
      }
      return paras;
    }
    /* Lead sentence, then the details as bullets. */
    return [
      { type: 'p', runs: parseInline(sentences[0]) },
      {
        type: 'ul',
        items: rest.map(function (s) {
          return parseInline(s);
        })
      }
    ];
  }

  function structurePlain(text) {
    var sentences = splitSentences(text);
    var blocks = [];
    var body = [];
    function flush() {
      bodyBlocks(body).forEach(function (b) {
        blocks.push(b);
      });
      body = [];
    }
    sentences.forEach(function (s) {
      if (LABEL.test(s) && /^(example|for example|e\.g\.|note|tip|warning|important|formula|how it works|how)\b/i.test(s)) {
        flush();
        blocks.push({ type: 'p', runs: labelRuns(s) });
      } else {
        body.push(s);
      }
    });
    flush();
    return blocks;
  }

  /* ── text that already carries line breaks / markdown ── */
  function parseStructured(text) {
    var lines = String(text || '').replace(/\r/g, '').split('\n');
    var blocks = [];
    var list = null;
    function closeList() {
      if (list) blocks.push(list);
      list = null;
    }
    lines.forEach(function (raw) {
      var line = raw.replace(/\s+$/, '');
      if (!line.trim()) {
        closeList();
        return;
      }
      var bullet = /^\s*(?:[-*•–])\s+(.*)$/.exec(line);
      var number = /^\s*(\d+)[.)]\s+(.*)$/.exec(line);
      var heading = /^\s*#{1,4}\s+(.*)$/.exec(line);
      if (bullet) {
        if (!list || list.type !== 'ul') {
          closeList();
          list = { type: 'ul', items: [] };
        }
        list.items.push(parseInline(bullet[1]));
      } else if (number) {
        if (!list || list.type !== 'ol') {
          closeList();
          list = { type: 'ol', items: [] };
        }
        list.items.push(parseInline(number[2]));
      } else if (heading) {
        closeList();
        blocks.push({ type: 'h', runs: [{ t: heading[1].replace(/\*\*/g, ''), b: true }] });
      } else {
        closeList();
        var t = line.trim();
        /* A whole line wrapped in ** is a label row. */
        var wholeBold = /^\*\*([^*]+)\*\*:?$/.exec(t);
        if (wholeBold) blocks.push({ type: 'h', runs: [{ t: wholeBold[1], b: true }] });
        else blocks.push({ type: 'p', runs: parseInline(t) });
      }
    });
    closeList();
    return blocks;
  }

  function formatAnswer(raw) {
    var text = String(raw || '').replace(/\r/g, '').trim();
    if (!text) return [];
    if (/\n/.test(text) || /^\s*(?:[-*•]\s|\d+[.)]\s|#{1,4}\s)/.test(text)) return parseStructured(text);
    /* Markdown that arrives on one line: split before inline "- " / "1. " items only when several are present. */
    var inlineItems = text.split(/\s+(?=(?:\d+[.)]|[-•])\s+[A-Z])/);
    if (inlineItems.length >= 3) return parseStructured(inlineItems.join('\n'));
    return structurePlain(text);
  }

  function isPlainParagraph(blocks) {
    return (
      blocks.length === 1 &&
      blocks[0].type === 'p' &&
      blocks[0].runs.every(function (r) {
        return !r.b;
      })
    );
  }

  function answerPlainText(raw) {
    var blocks = formatAnswer(raw);
    var out = [];
    blocks.forEach(function (b) {
      if (b.type === 'ul') {
        out.push(
          b.items
            .map(function (it) {
              return '• ' + runsText(it);
            })
            .join('\n')
        );
      } else if (b.type === 'ol') {
        out.push(
          b.items
            .map(function (it, i) {
              return i + 1 + '. ' + runsText(it);
            })
            .join('\n')
        );
      } else {
        out.push(runsText(b.runs));
      }
    });
    return out.join('\n\n');
  }

  root.formatAnswer = formatAnswer;
  root.answerPlainText = answerPlainText;
  root.answerIsPlainParagraph = isPlainParagraph;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatAnswer: formatAnswer, answerPlainText: answerPlainText, answerIsPlainParagraph: isPlainParagraph };
  }
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this);
