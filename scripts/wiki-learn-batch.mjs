#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Batch Remember: read questions from wiki-learn*.md, skip solid library hits,
 * fetch Wikipedia, apply evaluateWikiSave gates, append to taught_facts.js via writer.
 *
 * Markers: `* [+] Question?` stored or solid library; `* [x] Question?` verified no Wikipedia hit (after writer + direct lookup). Gate skips are logged but not marked. Both [+] and [x] skipped on later runs unless `--retry-x`.
 *
 * Usage:
 *   npm run wiki:learn -- wiki-learn-expanded.md
 *   npm run wiki:learn -- wiki-learn-expanded.md --limit 20 --delay 5000
 *   npm run wiki:learn -- wiki-learn-expanded.md --retry-x --limit 30
 *   npm run wiki:unmark-x -- wiki-learn-expanded.md
 *
 * Flags: --dry-run --limit N --offset N --delay MS (default 4000) --retry-x
 *   --direct (write via save_taught.py --write-json) --no-mark --writer-lookup
 *
 * Saves need save_taught.py on port 8787 unless --direct. Lookups use direct Wikipedia by default.
 * Documented in MODEL.md § Batch Wikipedia learning and wiki-learn-expanded.md intro.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { loadMidelLibrary } from './load-midel-library.mjs';
import { fetchWikipediaHit } from './wikipedia-fetch.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const require = createRequire(import.meta.url);
const W = require(path.join(ROOT, 'wiki_lookup.js'));

const WRITER = process.env.MIDEL_WRITER || 'http://127.0.0.1:8787';
const MARK_BULLET_RE = /^\*\s*\[(x|\+)\]\s/i;

function parseArgs(argv) {
  const opts = {
    file: '',
    dryRun: false,
    limit: Infinity,
    offset: 0,
    delayMs: 4000,
    direct: false,
    writerLookup: false,
    noMark: false,
    retryX: false,
    log: path.join(ROOT, 'wiki-learn-batch.log')
  };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--direct') opts.direct = true;
    else if (a === '--writer-lookup') opts.writerLookup = true;
    else if (a === '--no-mark') opts.noMark = true;
    else if (a === '--retry-x') opts.retryX = true;
    else if (a === '--limit') opts.limit = parseInt(argv[++i], 10) || 0;
    else if (a === '--offset') opts.offset = parseInt(argv[++i], 10) || 0;
    else if (a === '--delay') opts.delayMs = parseInt(argv[++i], 10) || 0;
    else if (a === '--log') opts.log = argv[++i];
    else if (a === '--writer') opts.writer = argv[++i];
    else if (a.startsWith('-')) throw new Error('Unknown flag: ' + a);
    else rest.push(a);
  }
  if (opts.writer) opts.writerUrl = opts.writer.replace(/\/$/, '');
  else opts.writerUrl = WRITER.replace(/\/$/, '');
  opts.file = rest[0] ? path.resolve(process.cwd(), rest[0]) : path.join(ROOT, 'wiki-learn-expanded.md');
  return opts;
}

function isLineMarkedDone(trimmed) {
  if (MARK_BULLET_RE.test(trimmed)) return true;
  if (/<!--\s*wiki-learn:done\s*-->/i.test(trimmed)) return true;
  return false;
}

function questionFromBulletLine(trimmed) {
  if (!trimmed.startsWith('* ')) return '';
  let body = trimmed.slice(2).trim();
  if (MARK_BULLET_RE.test(trimmed)) {
    body = body.replace(/^\[(x|\+)\]\s/i, '');
  }
  body = body.replace(/\s*<!--\s*wiki-learn:done\s*-->\s*$/i, '').trim();
  return body;
}

function isValidQuestion(q) {
  return q.length >= 4 && q.length <= 240 && /\?$/.test(q);
}

/** Pending bullets; `--retry-x` re-queues only `[x]` lines (e.g. after Wikipedia rate limits). */
function parseQuestionEntries(lines, opts) {
  const out = [];
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const trimmed = lines[lineIndex].trim();
    if (!trimmed.startsWith('* ')) continue;
    if (opts && opts.retryX) {
      if (!/^\*\s*\[x\]\s/i.test(trimmed)) continue;
    } else if (isLineMarkedDone(trimmed)) continue;
    const question = questionFromBulletLine(trimmed);
    if (!isValidQuestion(question)) continue;
    out.push({ lineIndex, question });
  }
  return out;
}

/** @param {'+'|'x'} tag */
function markQuestion(lines, lineIndex, tag) {
  const line = lines[lineIndex];
  if (!line || !/^\s*\*\s/.test(line)) return false;
  const trimmed = line.trim();
  if (/^\*\s*\[(x|\+)\]\s/i.test(trimmed)) {
    lines[lineIndex] = line.replace(/^(\s*\*\s*)\[(x|\+)\]\s/i, '$1[' + tag + '] ');
    return true;
  }
  if (isLineMarkedDone(trimmed)) return false;
  lines[lineIndex] = line.replace(/^(\s*\*\s)/, '$1[' + tag + '] ');
  return true;
}

function writeMarkdown(file, lines) {
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function logLine(logPath, line) {
  const ts = new Date().toISOString();
  const row = ts + ' ' + line + '\n';
  fs.appendFileSync(logPath, row);
  console.log(line);
}

function lessonAnswersAsked(lib, prompt, fact) {
  if (!fact) return false;
  if (lib.questionMatches(prompt, fact)) return true;
  if (fact.question && lib.questionPromptOverlap(prompt, fact)) return true;
  if (!lib.asksDefinition(prompt)) return false;
  const subject = lib.questionContent(prompt)[0];
  return !!(subject && lib.definesSubject(String(fact.text || ''), subject));
}

function libraryContext(lib, prompt, taught) {
  const libAns = lib.answerFromLessons(prompt, taught);
  if (!libAns || libAns.coverage < 0.72) {
    return {
      deepMiss: true,
      answer: 'not in the library',
      library: libAns ? { coverage: libAns.coverage, facts: libAns.facts || [] } : null
    };
  }
  const facts = libAns.facts || [];
  const solid = facts.some((f) => lessonAnswersAsked(lib, prompt, f));
  if (solid) {
    return { deepMiss: false, answer: libAns.text, library: { coverage: libAns.coverage, facts } };
  }
  return {
    deepMiss: true,
    answer: libAns.text,
    library: { coverage: libAns.coverage, facts }
  };
}

function alreadyStored(taught, question, text, asked) {
  /** Same question only — shared Wikipedia lede for different asks must still get their own row. */
  const qKey = String(question || '')
    .toLowerCase()
    .trim();
  const aKey = String(asked || '')
    .toLowerCase()
    .trim();
  return taught.some((f) => {
    if (!f || !f.text) return false;
    const fq = String(f.question || '')
      .toLowerCase()
      .trim();
    if (qKey && fq === qKey) return true;
    if (aKey && fq === aKey) return true;
    return false;
  });
}

function normalizeTaughtRow(f) {
  if (!f || !String(f.text || '').trim()) return null;
  return {
    id: f.id,
    category: f.category || 'Learned',
    text: String(f.text),
    question: String(f.question || '')
  };
}

function reloadTaughtFromDisk() {
  const lib = loadMidelLibrary(ROOT);
  return (lib.taught || []).map(normalizeTaughtRow).filter(Boolean);
}

async function fetchTaughtFromWriter(writerUrl) {
  const res = await fetch(writerUrl + '/taught?facts=1', {
    signal: AbortSignal.timeout(120000)
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || !data.ok || !Array.isArray(data.facts)) return null;
  return data.facts.map(normalizeTaughtRow).filter(Boolean);
}

async function probeWriter(writerUrl) {
  try {
    const res = await fetch(writerUrl + '/taught', { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.ok ? data : null;
  } catch (e) {
    return null;
  }
}

async function fetchWikiOnce(writerUrl, q) {
  const res = await fetch(writerUrl + '/lookup?q=' + encodeURIComponent(q), {
    signal: AbortSignal.timeout(25000)
  });
  if (res.status === 429) {
    const err = new Error('Wikipedia rate limit (429) — slow down or wait a few minutes');
    err.code = 'RATE_LIMIT';
    throw err;
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('lookup HTTP ' + res.status);
  const data = await res.json();
  if (data && data.rateLimited) {
    const err = new Error('Wikipedia rate limit');
    err.code = 'RATE_LIMIT';
    throw err;
  }
  return data;
}

async function fetchWikiWriter(writerUrl, q) {
  let wait = 8000;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return await fetchWikiOnce(writerUrl, q);
    } catch (e) {
      if (e.code === 'RATE_LIMIT' && attempt < 3) {
        await sleep(wait);
        wait = Math.min(wait * 2, 120000);
        continue;
      }
      throw e;
    }
  }
  return null;
}

/**
 * Batch default: direct Wikipedia only (one client, throttled in wikipedia-fetch.mjs).
 * Optional --writer-lookup tries save_taught.py /lookup first (doubles traffic).
 */
async function fetchWikiDirect(q) {
  for (let round = 0; round < 3; round++) {
    try {
      const hit = await fetchWikipediaHit(q, { batch: true });
      return { hit, via: 'direct' };
    } catch (e) {
      if (e.code === 'RATE_LIMIT' && round < 2) {
        await sleep(90000 * (round + 1));
        continue;
      }
      throw e;
    }
  }
  return { hit: null, via: 'direct' };
}

async function fetchWiki(writerUrl, q, opts) {
  if (opts && opts.writerLookup) {
    let hit = null;
    try {
      hit = await fetchWikiWriter(writerUrl, q);
    } catch (e) {
      if (e.code !== 'RATE_LIMIT') throw e;
    }
    if (hit && hit.text) return { hit, via: 'writer' };
  }
  return fetchWikiDirect(q);
}

async function persistTaught(writerUrl, facts) {
  const res = await fetch(writerUrl + '/taught', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ facts }),
    signal: AbortSignal.timeout(120000)
  });
  if (!res.ok) {
    console.error('writer POST /taught failed: HTTP ' + res.status);
    return false;
  }
  let data;
  try {
    data = await res.json();
  } catch (e) {
    return false;
  }
  if (!data || !data.ok) return false;
  await sleep(150);
  let fromWriter = await fetchTaughtFromWriter(writerUrl);
  if (!fromWriter || (typeof data.count === 'number' && fromWriter.length !== data.count)) {
    await sleep(400);
    fromWriter = await fetchTaughtFromWriter(writerUrl);
  }
  if (fromWriter && typeof data.count === 'number' && fromWriter.length === data.count) {
    return { ok: true, taught: fromWriter, count: data.count };
  }
  const reloaded = reloadTaughtFromDisk();
  if (typeof data.count === 'number' && reloaded.length === data.count) {
    return { ok: true, taught: reloaded, count: data.count };
  }
  if (fromWriter && fromWriter.length > 0) {
    return { ok: true, taught: fromWriter, count: fromWriter.length };
  }
  console.error(
    'writer save unclear: writer count=' +
      (data.count != null ? data.count : '?') +
      ' disk=' +
      reloaded.length
  );
  return false;
}

async function persistDirect(facts) {
  const { spawnSync } = await import('child_process');
  const { resolvePython } = await import('./midel-python.mjs');
  const script = path.join(ROOT, 'save_taught.py');
  const exe = resolvePython();
  const r = spawnSync(exe, [script, '--write-json'], {
    cwd: ROOT,
    input: JSON.stringify(facts),
    encoding: 'utf8'
  });
  if (r.status !== 0) {
    throw new Error(r.stderr || r.stdout || 'write failed');
  }
  return true;
}

function markTagForReason(reason) {
  if (reason === 'saved' || reason === 'solid-library') return '+';
  if (reason === 'no-wiki') return 'x';
  return null;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(opts.file)) {
    console.error('File not found:', opts.file);
    process.exit(1);
  }

  if (!opts.direct) {
    const probe = await probeWriter(opts.writerUrl);
    if (!probe) {
      console.error('');
      console.error('wiki:learn needs save_taught.py on port 8787 (POST /taught).');
      console.error('  cd nn-tutorial && npm run writer:restart');
      console.error('  Or use --direct to write via save_taught.py --write-json (no HTTP).');
      console.error('');
      process.exit(1);
    }
  }

  let lib;
  try {
    lib = loadMidelLibrary(ROOT);
  } catch (e) {
    console.error('Could not load lesson library (check taught_facts.js and pack files):', e.message);
    process.exit(1);
  }

  const lines = fs.readFileSync(opts.file, 'utf8').split('\n');
  const allPending = parseQuestionEntries(lines, opts);
  let batch = allPending.slice(opts.offset);
  if (opts.limit !== Infinity) batch = batch.slice(0, opts.limit);

  logLine(
    opts.log,
    'wiki-learn-batch start file=' +
      path.basename(opts.file) +
      ' pending=' +
      allPending.length +
      ' run=' +
      batch.length +
      (opts.dryRun ? ' DRY-RUN' : '') +
      (opts.noMark ? ' no-mark' : '') +
      (opts.retryX ? ' retry-x' : '') +
      ' delay=' +
      opts.delayMs +
      'ms'
  );

  let taught = reloadTaughtFromDisk();
  if (!opts.direct) {
    const synced = await fetchTaughtFromWriter(opts.writerUrl);
    if (synced && synced.length) taught = synced;
  }

  const stats = { saved: 0, skipped: 0, noWiki: 0, error: 0, marked: 0 };
  let rateLimitStreak = 0;
  const MAX_RATE_STREAK = 4;

  function markAndFlush(lineIndex, reason) {
    if (opts.noMark || opts.dryRun) return;
    const tag = markTagForReason(reason);
    if (!tag) return;
    if (markQuestion(lines, lineIndex, tag)) {
      writeMarkdown(opts.file, lines);
      stats.marked++;
    }
  }

  for (let i = 0; i < batch.length; i++) {
    const { lineIndex, question: q } = batch[i];
    const prefix = '[' + (i + 1) + '/' + batch.length + ']';

    try {
      const ctx = libraryContext(lib, q, taught);
      if (!ctx.deepMiss) {
        logLine(opts.log, prefix + ' SKIP solid-library  ' + q);
        stats.skipped++;
        markAndFlush(lineIndex, 'solid-library');
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      let lookup;
      try {
        lookup = await fetchWiki(opts.writerUrl, q, opts);
        rateLimitStreak = 0;
      } catch (e) {
        logLine(opts.log, prefix + ' ERROR lookup ' + q + ' — ' + e.message);
        stats.error++;
        if (e.code === 'RATE_LIMIT') {
          rateLimitStreak++;
          logLine(
            opts.log,
            prefix +
              ' Wikipedia still rate-limiting (' +
              rateLimitStreak +
              '/' +
              MAX_RATE_STREAK +
              '). Pausing 3 min (question not marked).'
          );
          await sleep(180000);
          if (rateLimitStreak >= MAX_RATE_STREAK) {
            logLine(
              opts.log,
              'Stopping batch after repeated rate limits. Wait 15–30 min, then: npm run wiki:learn -- wiki-learn-expanded.md --limit 20 --delay 5000'
            );
            process.exitCode = 1;
            break;
          }
          i--;
          continue;
        }
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      const hit = lookup && lookup.hit;
      if (!hit || !hit.text) {
        logLine(
          opts.log,
          prefix + ' NO-WIKI  ' + q + (lookup && lookup.via ? ' (' + lookup.via + ')' : '')
        );
        stats.noWiki++;
        markAndFlush(lineIndex, 'no-wiki');
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      const gate = W.evaluateWikiSave({
        asked: q,
        hit,
        deepMiss: true,
        answer: ctx.answer,
        library: ctx.library,
        lessonAnswersAsked: (prompt, fact) => lessonAnswersAsked(lib, prompt, fact)
      });

      if (!gate.allow) {
        logLine(
          opts.log,
          prefix +
            ' SKIP gate:' +
            (gate.reason || '?') +
            '  ' +
            q +
            ' (wiki hit: ' +
            (hit.title || '?') +
            ', not marked)'
        );
        stats.skipped++;
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      if (alreadyStored(taught, gate.question, gate.text, q)) {
        logLine(opts.log, prefix + ' SKIP duplicate  ' + q);
        stats.skipped++;
        markAndFlush(lineIndex, 'duplicate');
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      taught = reloadTaughtFromDisk();
      const row = {
        id: lib.nextTaughtIdFromRows(taught),
        category: 'Wikipedia',
        text: gate.text,
        question: gate.question
      };

      if (opts.dryRun) {
        logLine(opts.log, prefix + ' DRY-RUN would save #' + row.id + '  ' + gate.question);
        stats.saved++;
        if (opts.delayMs) await sleep(opts.delayMs);
        continue;
      }

      const next = taught.concat([row]);
      let ok = false;
      let saveResult = false;
      if (opts.direct) {
        saveResult = await persistDirect(next);
      } else {
        saveResult = await persistTaught(opts.writerUrl, next);
      }
      if (!saveResult) {
        logLine(opts.log, prefix + ' ERROR writer  ' + q);
        stats.error++;
        process.exitCode = 1;
        break;
      }
      if (saveResult && typeof saveResult === 'object' && saveResult.taught) {
        taught = saveResult.taught;
      } else {
        taught = reloadTaughtFromDisk();
      }
      logLine(opts.log, prefix + ' SAVED #' + row.id + '  ' + gate.question);
      stats.saved++;
      markAndFlush(lineIndex, 'saved');
    } catch (err) {
      logLine(opts.log, prefix + ' ERROR ' + q + ' — ' + err.message);
      stats.error++;
    }

    if (opts.delayMs) await sleep(opts.delayMs);
  }

  logLine(
    opts.log,
    'wiki-learn-batch done saved=' +
      stats.saved +
      ' skipped=' +
      stats.skipped +
      ' noWiki=' +
      stats.noWiki +
      ' errors=' +
      stats.error +
      ' marked=' +
      stats.marked
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
