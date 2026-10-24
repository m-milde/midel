/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Shared Wikipedia lookup scoring and save gates (browser + node tests).
 * Documented in MODEL.md (Online lookup, Remember, solid save gates, batch wiki:learn).
 * Keep save_taught.py in sync for the same relevance rules on /lookup (incl. wiki_topic_words).
 * Run: npm run test:wiki
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.WIKI_LOOKUP = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const WIKI_STOP = new Set(
    (
      'what when where who why how which is are do does did the a an of to in on for and or with from by at as be was were can could has have had will would should may might much many ' +
      'located locate location situated based found position positioned lies lying'
    ).split(' ')
  );

  /** Template / framing words — not topic anchors (wiki-learn question shapes). */
  const WIKI_META = new Set(
    (
      'main major primary common various different difference between compare comparison versus examples example types type kinds kind forms form categories category list overview ' +
      'aspects parts ways methods history develop development important importance significance used work relate related relationship role purpose function apply application ' +
      'benefit benefits advantage disadvantages impact effects cause causes result results describe explain definition notion concept concepts idea ideas theory field study branch ' +
      'basic fundamental essential key core general modern ancient current today human people social economic political cultural scientific natural'
    ).split(' ')
  );

  const WIKI_TOKEN_NORMALIZE = {
    forth: 'fourth',
    dimention: 'dimension',
    dimentions: 'dimension'
  };

  function normalizeWikiToken(word) {
    let w = String(word || '').toLowerCase();
    if (WIKI_TOKEN_NORMALIZE[w]) return WIKI_TOKEN_NORMALIZE[w];
    if (w.length > 5 && w.endsWith('ies')) {
      const y = w.slice(0, -3) + 'y';
      if (y.length >= 4) return y;
    }
    if (
      w.length > 5 &&
      w.endsWith('s') &&
      !w.endsWith('ss') &&
      !/(?:is|us|as)$/.test(w)
    ) {
      const sing = w.slice(0, -1);
      if (sing.length >= 4) return sing;
    }
    return w;
  }

  function wikiContentWords(query) {
    const raw = String(query || '')
      .toLowerCase()
      .replace(/\?+/g, ' ');
    return (raw.match(/[a-z0-9]+(?:'[a-z]+)?/g) || [])
      .filter((w) => w.length >= 3 && !WIKI_STOP.has(w))
      .map(normalizeWikiToken);
  }

  function wikiTopicWords(query) {
    const words = wikiContentWords(query).filter((w) => !WIKI_META.has(w));
    return words.length ? words : wikiContentWords(query);
  }

  function wikipediaSearchTerms(query) {
    let q = String(query || '')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\?+$/, '')
      .toLowerCase();
    let words = (q.match(/[a-z0-9]+(?:'[a-z]+)?/g) || []).map(normalizeWikiToken);
    words = words.filter((w) => !WIKI_STOP.has(w));
    while (words.length && WIKI_STOP.has(words[0])) words.shift();
    while (words.length && WIKI_STOP.has(words[words.length - 1])) words.pop();
    const topic = words.join(' ').trim();
    return topic.length >= 2 ? topic : q;
  }

  function wikiTopicWordInBlob(word, blob) {
    const w = String(word || '').toLowerCase();
    const b = String(blob || '').toLowerCase();
    if (b.includes(w)) return true;
    if (w.length > 5 && !w.endsWith('s') && b.includes(w + 's')) return true;
    return false;
  }

  function wikiRelevanceScore(query, title, snippet) {
    const need = wikiContentWords(query);
    if (!need.length) return 1;
    const blob = (String(title || '') + ' ' + String(snippet || '')).toLowerCase();
    return need.filter((w) => wikiTopicWordInBlob(w, blob)).length;
  }

  function definitionSingleTopic(query) {
    const raw = String(query || '').trim().replace(/\?+$/, '');
    if (!/^what is\b/i.test(raw)) return null;
    const words = wikiContentWords(query);
    return words.length === 1 ? words[0] : null;
  }

  function wordBoundaryRe(word) {
    return new RegExp(
      '\\b' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
      'i'
    );
  }

  function isLikelyPersonOrEntertainmentHit(hit) {
    const blob = ((hit && hit.title) || '') + ' ' + ((hit && hit.text) || '');
    return /\b(wrestler|wwe|wwf|ring name|professional wrestling|ambassador|actor|actress|singer|songwriter|country music artist|album|single)\b/i.test(
      blob
    );
  }

  function definitionTopicAccepts(topic, hit) {
    if (!topic || !hit) return false;
    const title = String(hit.title || '').trim();
    const tl = title.toLowerCase();
    const text = String(hit.text || '').toLowerCase();
    const re = wordBoundaryRe(topic);

    if (/stone cold|steve austin/i.test(title)) return false;
    if (isLikelyPersonOrEntertainmentHit(hit)) {
      if (tl !== topic && !tl.startsWith(topic + ' (') && !tl.startsWith(topic + '(')) return false;
    }

    if (tl === topic) return true;
    if (tl.startsWith(topic + ' (') || tl.startsWith(topic + '(')) return true;
    if (tl.startsWith('list of ') && re.test(text)) return true;
    if (re.test(text)) return true;

    if (topic === 'stone' && /rock \(geology\)/i.test(title) && /\b(geology|rock|mineral|solid)\b/.test(text)) {
      return true;
    }

    return false;
  }

  function wikiExtraSearchPhrases(query) {
    const topic = definitionSingleTopic(query);
    if (!topic) return [];
    if (topic === 'stone') return ['stone material', 'rock geology', 'building stone'];
    return [topic + ' material', topic + ' science'];
  }

  function wikiLocationQuestion(query) {
    return /^\s*where\b/i.test(String(query || '').trim());
  }

  /** “Where is Bulgaria …?” must match an article whose title names Bulgaria, not a village that only mentions it in the body. */
  function wikiWhereTitleMatchesTopics(query, hit) {
    if (!wikiLocationQuestion(query)) return true;
    const topics = wikiContentWords(query);
    if (!topics.length) return true;
    const title = String((hit && hit.title) || '').trim();
    if (!title) return false;
    return topics.some((t) => {
      if (t.length < 3) return false;
      return wordBoundaryRe(t).test(title);
    });
  }

  function wikiTopicRelevanceScore(query, title, snippet) {
    const need = wikiTopicWords(query);
    if (!need.length) return 1;
    const blob = (String(title || '') + ' ' + String(snippet || '')).toLowerCase();
    return need.filter((w) => wikiTopicWordInBlob(w, blob)).length;
  }

  function wikiHitRelevant(query, hit) {
    const need = wikiTopicWords(query);
    if (!need.length) return true;
    const defTopic = definitionSingleTopic(query);
    if (defTopic) return definitionTopicAccepts(defTopic, hit);
    if (!wikiWhereTitleMatchesTopics(query, hit)) return false;
    const score = wikiTopicRelevanceScore(query, hit && hit.title, hit && hit.text);
    if (need.length <= 4) return score >= need.length;
    return score >= Math.ceil(need.length * 0.65);
  }

  function compressWikiForLesson(text) {
    let t = String(text || '').replace(/\s+/g, ' ').trim();
    if (!t) return '';
    const abbrevs = [];
    t = t.replace(
      /\b(?:U\.S\.A?|U\.K\.|B\.C\.|A\.D\.|e\.g\.|i\.e\.|Dr\.|Mr\.|Mrs\.|Ms\.|St\.|vs\.|etc\.|approx\.|vol\.|no\.)\b/gi,
      (m) => {
        const key = '\u0001A' + abbrevs.length + '\u0001';
        abbrevs.push(m);
        return key;
      }
    );
    const parts = t.match(/[^.!?]+[.!?]+/g) || (t ? [t] : []);
    if (parts.length) {
      let n = Math.min(2, parts.length);
      t = parts.slice(0, n).join(' ').trim();
      while (t.length < 48 && n < parts.length && n < 4) {
        n += 1;
        t = parts.slice(0, n).join(' ').trim();
      }
    }
    for (let i = 0; i < abbrevs.length; i++) {
      t = t.split('\u0001A' + i + '\u0001').join(abbrevs[i]);
    }
    if (t.length > 900) t = t.slice(0, 897).replace(/\s+\S*$/, '') + '.';
    return t;
  }

  function promptToStoredQuestion(asked, wikiTitle) {
    const raw = String(asked || '').trim();
    if (raw.includes('?')) {
      const i = raw.indexOf('?');
      const q = raw.slice(0, i + 1).trim();
      if (/^what is /i.test(q)) return 'What is ' + q.slice(8).trim();
      if (/^which is /i.test(q)) return 'Which is ' + q.slice(9).trim();
      return q.charAt(0).toUpperCase() + q.slice(1);
    }
    if (/^(what|where|when|who|why|how|is|are|do|does|did|can|has|have)\b/i.test(raw)) {
      return raw.replace(/\?+$/, '').trim() + '?';
    }
    const title = String(wikiTitle || '').trim();
    const topic = wikipediaSearchTerms(raw) || title || raw;
    if (title) return 'What is ' + title + '?';
    return 'What is ' + topic + '?';
  }

  /**
   * @param {object} opts
   * @param {string} opts.asked
   * @param {object} opts.hit — { title, text }
   * @param {boolean} opts.deepMiss — library/small path says deep did not answer
   * @param {string} [opts.answer] — main chat answer line
   * @param {{ coverage: number, facts: object[] }|null} [opts.library]
   * @param {(prompt: string, fact: object) => boolean} [opts.lessonAnswersAsked]
   */
  function evaluateWikiSave(opts) {
    const asked = String((opts && opts.asked) || '').trim();
    const hit = opts && opts.hit;
    const deepMiss = !!(opts && opts.deepMiss);
    const answer = String((opts && opts.answer) || '').trim();
    const library = opts && opts.library;
    const lessonAnswersAsked = opts && opts.lessonAnswersAsked;

    if (!asked || asked.length > 240) return { allow: false, reason: 'prompt' };
    if (!deepMiss && !/^not in the library$/i.test(answer)) {
      return { allow: false, reason: 'no-miss' };
    }
    if (!hit || !String(hit.text || '').trim()) return { allow: false, reason: 'empty' };
    if (!wikiHitRelevant(asked, hit)) return { allow: false, reason: 'irrelevant' };

    const text = compressWikiForLesson(hit.text);
    if (text.length < 48) return { allow: false, reason: 'short' };

    const need = wikiTopicWords(asked);
    const wikiScore = wikiTopicRelevanceScore(asked, hit.title, hit.text);

    if (library && library.coverage >= 0.72 && library.facts && library.facts.length && lessonAnswersAsked) {
      const solid = library.facts.some((f) => lessonAnswersAsked(asked, f));
      if (solid) return { allow: false, reason: 'solid-library' };
      const allLoose = library.facts.every((f) => !lessonAnswersAsked(asked, f));
      if (!allLoose) {
        let bestWeak = 0;
        for (let i = 0; i < library.facts.length; i++) {
          const f = library.facts[i];
          const s = wikiRelevanceScore(asked, f.question, f.text);
          if (s > bestWeak) bestWeak = s;
        }
        if (need.length && wikiScore <= bestWeak) {
          return { allow: false, reason: 'weak-beats-wiki' };
        }
      }
    }

    if (need.length >= 2 && wikiScore < need.length) {
      return { allow: false, reason: 'low-score' };
    }

    return {
      allow: true,
      text,
      question: promptToStoredQuestion(asked, hit.title),
      wikiScore
    };
  }

  return {
    WIKI_STOP,
    WIKI_META,
    wikiContentWords,
    wikiTopicWords,
    wikipediaSearchTerms,
    wikiRelevanceScore,
    wikiTopicRelevanceScore,
    definitionSingleTopic,
    definitionTopicAccepts,
    wikiExtraSearchPhrases,
    wikiHitRelevant,
    compressWikiForLesson,
    promptToStoredQuestion,
    evaluateWikiSave
  };
});
