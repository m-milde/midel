/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Browser-parity Wikipedia lookup for Node (batch Remember).
 * Throttled requests + 429 backoff. Used by wiki-learn-batch.mjs by default.
 * Documented in MODEL.md § Batch Wikipedia learning.
 */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const W = require(path.join(__dirname, '..', 'wiki_lookup.js'));

const UA = 'MidelNeuralLab/1.0 (local educational chat; batch wiki-learn)';

const WIKI_GAP_MS = 1400;
let wikiNextOk = 0;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url, timeoutMs = 12000) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const now = Date.now();
    if (now < wikiNextOk) await sleep(wikiNextOk - now);
    wikiNextOk = Date.now() + WIKI_GAP_MS;

    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (res.status === 429) {
      const pause = Math.min(12000 + attempt * 15000, 120000);
      await sleep(pause);
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  const err = new Error('Wikipedia rate limit (429)');
  err.code = 'RATE_LIMIT';
  throw err;
}

async function fetchSummaryByTitle(title) {
  const summaryPath =
    'https://en.wikipedia.org/api/rest_v1/page/summary/' +
    encodeURIComponent(String(title || '').replace(/ /g, '_'));
  const summary = await fetchJson(summaryPath, 12000);
  if (!summary || summary.type === 'disambiguation') return null;
  const text = String(summary.extract || '').trim();
  if (!text) return null;
  const pageUrl =
    summary.content_urls &&
    summary.content_urls.desktop &&
    summary.content_urls.desktop.page;
  return {
    ok: true,
    source: 'Wikipedia',
    title: String(summary.title || title),
    text,
    url: pageUrl || 'https://en.wikipedia.org/wiki/' + encodeURIComponent(String(title).replace(/ /g, '_'))
  };
}

async function mediaSearch(searchPhrase, limit = 8) {
  const url =
    'https://en.wikipedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: searchPhrase,
      srlimit: String(limit),
      format: 'json'
    });
  const data = await fetchJson(url, 12000);
  const hits = data && data.query && data.query.search;
  if (!Array.isArray(hits)) return [];
  return hits.map((h) => h.title).filter(Boolean);
}

/**
 * @param {string} question
 * @param {{ batch?: boolean }} [options] — batch mode: fewer title tries (less API load)
 * @returns {Promise<object|null>}
 */
export async function fetchWikipediaHit(question, options) {
  const batch = !!(options && options.batch);
  const maxTitles = batch ? 3 : 6;
  const maxMediaQueries = batch ? 1 : 4;
  const mediaLimit = batch ? 4 : 8;

  const q = String(question || '').trim();
  if (!q || q.length > 240) return null;
  const search = W.wikipediaSearchTerms(q);
  if (!search || search.length < 2) return null;

  const tried = new Set();
  const tryTitle = async (title) => {
    const key = String(title || '').toLowerCase();
    if (!key || tried.has(key)) return null;
    tried.add(key);
    const hit = await fetchSummaryByTitle(title);
    if (hit && W.wikiHitRelevant(q, hit)) return hit;
    return null;
  };

  const opUrl =
    'https://en.wikipedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'opensearch',
      search,
      limit: '10',
      namespace: '0',
      format: 'json'
    });
  const opensearch = await fetchJson(opUrl, 12000);
  if (Array.isArray(opensearch) && opensearch.length >= 3) {
    const titles = opensearch[1] || [];
    const snippets = opensearch[2] || [];
    const ranked = titles
      .map((title, i) => ({
        title,
        score: W.wikiRelevanceScore(q, title, snippets[i])
      }))
      .sort((a, b) => b.score - a.score);
    const queue = ranked.filter((c) => c.score > 0);
    const walk = queue.length ? queue : ranked;
    for (let i = 0; i < walk.length && i < maxTitles; i++) {
      const hit = await tryTitle(walk[i].title);
      if (hit) return hit;
    }
  }

  const content = W.wikiContentWords(q).join(' ').trim() || search;
  const extra = W.wikiExtraSearchPhrases ? W.wikiExtraSearchPhrases(q) : [];
  const mediaQueries = extra.concat([content]).slice(0, maxMediaQueries);
  for (let mi = 0; mi < mediaQueries.length; mi++) {
    const phrase = mediaQueries[mi];
    if (!phrase) continue;
    const mediaTitles = await mediaSearch(phrase, mediaLimit);
    for (let i = 0; i < mediaTitles.length && i < maxTitles; i++) {
      const hit = await tryTitle(mediaTitles[i]);
      if (hit) return hit;
    }
  }
  return null;
}
