/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/* Stage 3 inference. Weights arrive from stage3_brain.js after train_stage3.py. */
function stage3Tokenize(text) {
  const s = String(text || "").toLowerCase().replace(/(\d),(?=\d)/g, "$1");
  return s.match(/\d+(?:\.\d+)?%?|[a-z]+|[?.!,]/g) || [];
}

function stage3Softmax(row) {
  let m = -Infinity;
  for (let i = 0; i < row.length; i++) if (row[i] > m) m = row[i];
  const ex = new Float64Array(row.length);
  let s = 0;
  for (let i = 0; i < row.length; i++) { ex[i] = Math.exp(row[i] - m); s += ex[i]; }
  for (let i = 0; i < row.length; i++) ex[i] /= s;
  return ex;
}

function stage3Norm(rows, g, b) {
  const T = rows.length, D = rows[0].length;
  const out = [];
  for (let t = 0; t < T; t++) {
    let mean = 0;
    for (let j = 0; j < D; j++) mean += rows[t][j];
    mean /= D;
    let v = 0;
    for (let j = 0; j < D; j++) { const d = rows[t][j] - mean; v += d * d; }
    v /= D;
    const std = Math.sqrt(v + 1e-5);
    const y = new Float64Array(D);
    for (let j = 0; j < D; j++) y[j] = ((rows[t][j] - mean) / std) * g[j] + b[j];
    out.push(y);
  }
  return out;
}

/* Weights arrive as plain JSON arrays; typed rows run the same arithmetic noticeably faster. Same numbers, same order. */
function stage3Prepare(brain) {
  if (brain.__typed) return;
  const typed = m => m.map(row => (row instanceof Float64Array ? row : Float64Array.from(row)));
  const vec = v => (v instanceof Float64Array ? v : Float64Array.from(v));
  brain.E = typed(brain.E);
  brain.P = typed(brain.P);
  brain.Whead = typed(brain.Whead);
  brain.lnF_g = vec(brain.lnF_g);
  brain.lnF_b = vec(brain.lnF_b);
  brain.layers.forEach(layer => {
    ["Wq", "Wk", "Wv", "Wo", "W1", "W2"].forEach(k => { layer[k] = typed(layer[k]); });
    ["ln1_g", "ln1_b", "ln2_g", "ln2_b", "b1", "b2"].forEach(k => { layer[k] = vec(layer[k]); });
  });
  brain.__typed = true;
}

function stage3Matmul(A, B) {
  const n = A.length, k = B.length, m = B[0].length;
  const out = [];
  for (let i = 0; i < n; i++) {
    const row = new Float64Array(m);
    const Ai = A[i];
    for (let p = 0; p < k; p++) {
      const a = Ai[p];
      const bp = B[p];
      for (let j = 0; j < m; j++) row[j] += a * bp[j];
    }
    out.push(row);
  }
  return out;
}

function stage3Snap(rows) {
  return rows.map(row => {
    const out = new Array(row.length);
    for (let j = 0; j < row.length; j++) out[j] = Math.abs(row[j]);
    return out;
  });
}

function stage3Forward(brain, ids) {
  stage3Prepare(brain);
  const T = ids.length;
  const D = brain.d_model;
  const H = brain.n_heads;
  const dh = D / H;
  let x = ids.map((id, t) => {
    const row = new Float64Array(D);
    const e = brain.E[id], p = brain.P[t];
    for (let j = 0; j < D; j++) row[j] = e[j] + p[j];
    return row;
  });
  let attn = null;
  const layerMaps = [];
  const activity = [{ name: "Tokens enter", grid: stage3Snap(x) }];
  for (const layer of brain.layers) {
    const h = stage3Norm(x, layer.ln1_g, layer.ln1_b);
    const Q = stage3Matmul(h, layer.Wq);
    const K = stage3Matmul(h, layer.Wk);
    const V = stage3Matmul(h, layer.Wv);
    const heads = [];
    const headLast = [];
    const Amean = Array.from({length: T}, () => new Float64Array(T));
    for (let head = 0; head < H; head++) {
      const scores = [];
      for (let i = 0; i < T; i++) {
        const row = new Float64Array(T);
        for (let j = 0; j < T; j++) {
          if (j > i) { row[j] = -1e9; continue; }
          let s = 0;
          for (let d = 0; d < dh; d++) s += Q[i][head * dh + d] * K[j][head * dh + d];
          row[j] = s / Math.sqrt(dh);
        }
        const a = stage3Softmax(row);
        scores.push(a);
        for (let j = 0; j < T; j++) Amean[i][j] += a[j] / H;
      }
      const C = [];
      for (let i = 0; i < T; i++) {
        const row = new Float64Array(dh);
        for (let j = 0; j < T; j++) {
          for (let d = 0; d < dh; d++) row[d] += scores[i][j] * V[j][head * dh + d];
        }
        C.push(row);
      }
      heads.push(C);
      headLast.push(Array.from(scores[T - 1]));
    }
    const Cat = x.map((_, i) => {
      const row = new Float64Array(D);
      for (let head = 0; head < H; head++) {
        for (let d = 0; d < dh; d++) row[head * dh + d] = heads[head][i][d];
      }
      return row;
    });
    const attnOut = stage3Matmul(Cat, layer.Wo);
    const x2 = x.map((row, i) => {
      const y = new Float64Array(D);
      for (let j = 0; j < D; j++) y[j] = row[j] + attnOut[i][j];
      return y;
    });
    const h2 = stage3Norm(x2, layer.ln2_g, layer.ln2_b);
    const pre = stage3Matmul(h2, layer.W1);
    const f1 = pre.map(row => {
      const y = new Float64Array(row.length);
      for (let j = 0; j < row.length; j++) y[j] = Math.max(0, row[j] + layer.b1[j]);
      return y;
    });
    const f2 = stage3Matmul(f1, layer.W2);
    x = x2.map((row, i) => {
      const y = new Float64Array(D);
      for (let j = 0; j < D; j++) y[j] = row[j] + f2[i][j] + layer.b2[j];
      return y;
    });
    attn = Amean.map(row => Array.from(row));
    layerMaps.push({ attention: attn, heads: headLast });
    activity.push({ name: "Block " + (activity.length), grid: stage3Snap(x) });
  }
  const z = stage3Norm(x, brain.lnF_g, brain.lnF_b);
  /* Only the last position predicts the next word, so only that row goes through the big output layer. */
  const logits = stage3Matmul([z[z.length - 1]], brain.Whead);
  return {
    probs: stage3Softmax(logits[0]),
    attention: attn,
    tokens: ids,
    layers: layerMaps,
    activity: activity
  };
}

/*
 * Incremental decoder: keeps each layer's keys and values so a new word only runs its own row through the
 * network instead of the whole sentence again. Every row uses the same arithmetic in the same order as
 * stage3Forward, so the predicted words are identical.
 */
function stage3Decoder(brain) {
  stage3Prepare(brain);
  const D = brain.d_model, H = brain.n_heads, dh = D / H;
  const scale = Math.sqrt(dh);
  const caches = brain.layers.map(() => ({ K: [], V: [] }));
  let count = 0;
  return {
    /* Feed one word; returns next-word probabilities when wantProbs is true. */
    push(id, wantProbs) {
      const t = count++;
      let x = new Float64Array(D);
      const e = brain.E[id], p = brain.P[t];
      for (let j = 0; j < D; j++) x[j] = e[j] + p[j];
      for (let li = 0; li < brain.layers.length; li++) {
        const layer = brain.layers[li], cache = caches[li];
        const h = stage3Norm([x], layer.ln1_g, layer.ln1_b);
        const q = stage3Matmul(h, layer.Wq)[0];
        cache.K.push(stage3Matmul(h, layer.Wk)[0]);
        cache.V.push(stage3Matmul(h, layer.Wv)[0]);
        const cat = new Float64Array(D);
        for (let head = 0; head < H; head++) {
          const off = head * dh;
          const row = new Float64Array(t + 1);
          for (let j = 0; j <= t; j++) {
            const kj = cache.K[j];
            let sc = 0;
            for (let d = 0; d < dh; d++) sc += q[off + d] * kj[off + d];
            row[j] = sc / scale;
          }
          const a = stage3Softmax(row);
          const ctx = new Float64Array(dh);
          for (let j = 0; j <= t; j++) {
            const vj = cache.V[j], aj = a[j];
            for (let d = 0; d < dh; d++) ctx[d] += aj * vj[off + d];
          }
          for (let d = 0; d < dh; d++) cat[off + d] = ctx[d];
        }
        const attnOut = stage3Matmul([cat], layer.Wo)[0];
        const x2 = new Float64Array(D);
        for (let j = 0; j < D; j++) x2[j] = x[j] + attnOut[j];
        const h2 = stage3Norm([x2], layer.ln2_g, layer.ln2_b);
        const pre = stage3Matmul(h2, layer.W1)[0];
        const f1 = new Float64Array(pre.length);
        for (let j = 0; j < pre.length; j++) f1[j] = Math.max(0, pre[j] + layer.b1[j]);
        const f2 = stage3Matmul([f1], layer.W2)[0];
        const y = new Float64Array(D);
        for (let j = 0; j < D; j++) y[j] = x2[j] + f2[j] + layer.b2[j];
        x = y;
      }
      if (!wantProbs) return null;
      const z = stage3Norm([x], brain.lnF_g, brain.lnF_b);
      return stage3Softmax(stage3Matmul(z, brain.Whead)[0]);
    }
  };
}

function stage3Top(brain, probs, k) {
  const idx = Array.from(probs, (_, i) => i);
  idx.sort((a, b) => probs[b] - probs[a]);
  return idx.slice(0, k).map(i => ({ word: brain.i2w[i], prob: probs[i] }));
}

var LAST_DEEP_PASS = null;

var STAGE3_W2I = null;
function stage3WordIndex(brain) {
  if (STAGE3_W2I && STAGE3_W2I.brain === brain) return STAGE3_W2I.map;
  const map = {};
  brain.i2w.forEach((w, i) => { map[w] = i; });
  STAGE3_W2I = { brain, map };
  return map;
}

const STAGE3_FILLER = {
  the: 1, a: 1, an: 1, of: 1, to: 1, in: 1, on: 1, for: 1, and: 1, or: 1,
  but: 1, with: 1, from: 1, by: 1, at: 1, as: 1, be: 1, is: 1, are: 1, was: 1,
  it: 1, its: 1, this: 1, that: 1, s: 1
};

function lessonAllowedWords(facts) {
  const allowed = new Set();
  (facts || []).forEach(f => stage3Tokenize(f.text).forEach(w => allowed.add(w)));
  return allowed;
}

function filterProducedToLesson(producedText, facts) {
  const allowed = lessonAllowedWords(facts);
  const kept = [];
  const counts = {};
  for (const w of String(producedText || "").split(/\s+/)) {
    if (!w || w === ",") continue;
    if (!allowed.has(w)) break;
    if (counts[w] && !["the", "a", "of", "s"].includes(w)) break;
    counts[w] = (counts[w] || 0) + 1;
    kept.push(w);
  }
  if (!kept.some(w => !STAGE3_FILLER[w] && w.length > 2)) return null;
  return kept.join(" ");
}

function stage3PromptVariants(question) {
  const words = stage3Tokenize(question);
  if (!words.length) return [];
  const variants = [words.join(" ")];
  let drop = 0;
  const lead = new Set(["what", "is", "the", "a", "an", "are", "do", "does", "how"]);
  while (drop < words.length - 2 && lead.has(words[drop])) {
    drop += 1;
    variants.push(words.slice(drop).join(" "));
  }
  return [...new Set(variants)];
}

function stage3AnswerNeedle(question, answer) {
  const stop = new Set(
    "the a an of to in on for and or with from by at as is are was be it its this that".split(" ")
  );
  const asked = new Set(stage3Tokenize(question));
  const ansWords = stage3Tokenize(answer);
  for (const w of ansWords) {
    if ("?.!,".includes(w) || stop.has(w) || asked.has(w)) continue;
    return w;
  }
  for (const w of ansWords) {
    if (!"?.!,".includes(w) && !stop.has(w)) return w;
  }
  return null;
}

function stage3AnswerOverlap(produced, answer) {
  const prod = new Set(stage3Tokenize(produced));
  const content = stage3Tokenize(answer).filter(w => !"?.!,".includes(w) && w.length > 1);
  if (!content.length) return 0;
  let hit = 0;
  for (const w of content) if (prod.has(w)) hit += 1;
  return hit / content.length;
}

function lessonStoredSentences(text) {
  return String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

/** First distinctive content word in a sentence (skips words already used in earlier sentences). */
function lessonSentenceSignature(sentence, usedWords) {
  const used = usedWords || new Set();
  for (const w of stage3Tokenize(sentence)) {
    if ("?.!,".includes(w) || STAGE3_FILLER[w] || w.length < 4) continue;
    if (used.has(w)) continue;
    used.add(w);
    return w;
  }
  return null;
}

/**
 * Deep network paraphrase may replace the stored lesson in chat only when it
 * covers the full stored answer (all sentences / enough tokens).
 */
function lessonNetworkAnswerComplete(produced, answer) {
  if (!produced || !answer) return false;
  const prodTok = stage3Tokenize(produced);
  const ansTok = stage3Tokenize(answer).filter(w => !"?.!,".includes(w));
  if (!prodTok.length || !ansTok.length) return false;
  const overlap = stage3AnswerOverlap(produced, answer);
  const sentences = lessonStoredSentences(answer);
  if (sentences.length <= 1) {
    return overlap >= 0.72 && prodTok.length >= ansTok.length * 0.85;
  }
  const used = new Set();
  for (let i = 0; i < sentences.length; i++) {
    const sig = lessonSentenceSignature(sentences[i], used);
    if (sig && !prodTok.includes(sig)) return false;
  }
  if (prodTok.length < ansTok.length * 0.72) return false;
  return overlap >= 0.55;
}

function stage3WordInBrain(word) {
  if (typeof STAGE3_BRAIN === "undefined" || !word) return false;
  return STAGE3_BRAIN.i2w.includes(word);
}

function stage3PromptForLesson(facts, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || !facts.length) return question;
  const known = stage3Tokenize(question).some(w => stage3WordInBrain(w));
  if (known) return question;
  if (typeof lessonDeepQuestion === "function") {
    const alt = lessonDeepQuestion(facts, question);
    if (alt && stage3Tokenize(alt).some(w => stage3WordInBrain(w))) return alt;
  }
  const stored = String(facts[0].question || "").trim();
  if (stored && stage3Tokenize(stored).some(w => stage3WordInBrain(w))) return stored;
  return question;
}

/** True when the matched lesson’s topic words are not in the installed brain yet. */
function lessonMissingDeepVocab(facts, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || !facts.length) return true;
  if (typeof questionContent === "function") {
    const subj = questionContent(question)[0];
    if (subj && subj.length > 2) return !stage3WordInBrain(subj);
  }
  for (const w of stage3Tokenize(question)) {
    if ("?.!,".includes(w) || w.length < 3) continue;
    if (stage3WordInBrain(w)) return false;
  }
  const fact = facts[0];
  const answer = String(fact.text || "").trim();
  const q = String(fact.question || question || "").trim();
  const needle = stage3AnswerNeedle(q, answer);
  if (needle && stage3WordInBrain(needle)) return false;
  return true;
}

/** Write the matched lesson from the deep network (question variants, same as training). */
function lessonNetworkAnswer(facts, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || facts.length !== 1) return null;
  const fact = facts[0];
  const answer = String(fact.text || "").trim();
  if (!answer) return null;
  const runQ = stage3PromptForLesson(facts, question);
  const needle = stage3AnswerNeedle(runQ, answer);
  let best = null;
  let bestScore = -1;
  const prompts = stage3PromptVariants(runQ);
  const factQ = stage3Tokenize(fact.text + " " + runQ).join(" ");
  if (factQ && !prompts.includes(factQ)) prompts.push(factQ);
  for (const variant of prompts) {
    const out = deepContinue(variant, 28);
    if (!out || !out.text) continue;
    const filtered = filterProducedToLesson(out.text, facts);
    if (!filtered) continue;
    const words = filtered.split(/\s+/);
    if (needle && !words.includes(needle)) continue;
    const score = stage3AnswerOverlap(filtered, answer);
    if (score > bestScore) {
      bestScore = score;
      best = {
        text: filtered,
        score,
        attention: out.attention,
        tokens: out.tokens,
        layers: out.layers,
        next: out.next,
        activity: out.activity
      };
    }
  }
  if (!best || bestScore < 0.5 || best.text.split(/\s+/).length < 2) return null;
  if (!lessonNetworkAnswerComplete(best.text, answer)) return null;
  return best;
}

async function lessonNetworkAnswerAsync(facts, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || facts.length !== 1) return null;
  const fact = facts[0];
  const answer = String(fact.text || "").trim();
  if (!answer) return null;
  const runQ = stage3PromptForLesson(facts, question);
  const needle = stage3AnswerNeedle(runQ, answer);
  let best = null;
  let bestScore = -1;
  const prompts = stage3PromptVariants(runQ);
  const factQ = stage3Tokenize(fact.text + " " + runQ).join(" ");
  if (factQ && !prompts.includes(factQ)) prompts.push(factQ);
  for (const variant of prompts) {
    const out = await deepContinueAsync(variant, 28);
    if (!out || !out.text) continue;
    const filtered = filterProducedToLesson(out.text, facts);
    if (!filtered) continue;
    const words = filtered.split(/\s+/);
    if (needle && !words.includes(needle)) continue;
    const score = stage3AnswerOverlap(filtered, answer);
    if (score > bestScore) {
      bestScore = score;
      best = {
        text: filtered,
        score,
        attention: out.attention,
        tokens: out.tokens,
        layers: out.layers,
        next: out.next,
        activity: out.activity
      };
    }
  }
  if (!best || bestScore < 0.5 || best.text.split(/\s+/).length < 2) return null;
  if (!lessonNetworkAnswerComplete(best.text, answer)) return null;
  return best;
}

function claimVote(factText, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !factText || !question) return null;
  const out = deepContinue(factText + " " + question, 1);
  if (!out || !out.text) return null;
  const word = out.text.trim().toLowerCase();
  return word === "yes" || word === "no" ? word : null;
}

async function claimVoteAsync(factText, question) {
  if (typeof STAGE3_BRAIN === "undefined" || !factText || !question) return null;
  const out = await deepContinueAsync(factText + " " + question, 1);
  if (!out || !out.text) return null;
  const word = out.text.trim().toLowerCase();
  return word === "yes" || word === "no" ? word : null;
}

function groundedContinue(prompt, facts) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || !facts.length) return null;
  const runQ =
    typeof stage3PromptForLesson === "function" ? stage3PromptForLesson(facts, prompt) : prompt;
  const out = deepContinue(runQ, 18);
  if (!out || !out.text) return null;
  const filtered = filterProducedToLesson(out.text, facts);
  if (!filtered) return null;
  return {
    text: filtered,
    attention: out.attention,
    tokens: out.tokens,
    layers: out.layers,
    next: out.next,
    activity: out.activity
  };
}

async function groundedContinueAsync(prompt, facts) {
  if (typeof STAGE3_BRAIN === "undefined" || !facts || !facts.length) return null;
  const runQ =
    typeof stage3PromptForLesson === "function" ? stage3PromptForLesson(facts, prompt) : prompt;
  const out = await deepContinueAsync(runQ, 18);
  if (!out || !out.text) return null;
  const filtered = filterProducedToLesson(out.text, facts);
  if (!filtered) return null;
  return {
    text: filtered,
    attention: out.attention,
    tokens: out.tokens,
    layers: out.layers,
    next: out.next,
    activity: out.activity
  };
}

/*
 * Shared generation helpers. Short sentences use the incremental decoder; if the sentence could outgrow
 * the window (positions would shift) we fall back to full passes exactly as before.
 */
function deepGenerateSetup(prompt, steps, prefix) {
  if (typeof STAGE3_BRAIN === "undefined") return null;
  const brain = STAGE3_BRAIN;
  const w2i = stage3WordIndex(brain);
  const known = (text) => stage3Tokenize(text).filter(w => w2i[w] !== undefined);
  const prefixWords = prefix ? known(prefix) : [];
  const qWords = known(prompt);
  let words = prefixWords.concat(qWords);
  if (!words.length) return null;
  const budget = Math.max(8, brain.max_seq_len - Math.max(1, steps || 1));
  if (words.length > budget) words = words.slice(-budget);
  return { brain, w2i, words, incremental: words.length + steps <= brain.max_seq_len };
}

/* The pass shown to the person is the last window the network looked at: one full pass over it. */
function deepGenerateFinish(setup, produced, lastWindow) {
  const { brain, w2i } = setup;
  const windowWords = lastWindow.slice(-brain.max_seq_len);
  const out = stage3Forward(brain, windowWords.map(w => w2i[w]));
  LAST_DEEP_PASS = {
    text: produced.join(" "),
    attention: out.attention,
    tokens: windowWords,
    layers: out.layers,
    next: stage3Top(brain, out.probs, 6),
    activity: out.activity
  };
  return LAST_DEEP_PASS;
}

function deepPickWord(brain, probs, produced) {
  let best = 0;
  for (let i = 1; i < probs.length; i++) if (probs[i] > probs[best]) best = i;
  const word = brain.i2w[best];
  if (!word || "?.!".includes(word)) return null;
  if (produced.filter(w => w === word).length >= 2) return null;
  return word;
}

/* One generation step; returns false when the answer is finished. */
function deepGenerateStep(run) {
  const { setup, produced, shown } = run;
  const { brain, w2i } = setup;
  run.lastWindow = shown.slice();
  if (!run.decoder) {
    run.probs = stage3Forward(brain, shown.slice(-brain.max_seq_len).map(w => w2i[w])).probs;
  }
  const word = deepPickWord(brain, run.probs, produced);
  if (!word) return false;
  produced.push(word);
  shown.push(word);
  if (run.decoder) run.probs = run.decoder.push(w2i[word], true);
  return true;
}

function deepGenerateStart(setup) {
  const { brain, w2i, words, incremental } = setup;
  const run = { setup, produced: [], shown: words.slice(), lastWindow: words.slice(), decoder: null, probs: null };
  if (incremental) {
    run.decoder = stage3Decoder(brain);
    words.forEach((w, i) => { run.probs = run.decoder.push(w2i[w], i === words.length - 1); });
  }
  return run;
}

function deepContinue(prompt, steps, prefix) {
  const setup = deepGenerateSetup(prompt, steps, prefix);
  if (!setup) return null;
  const run = deepGenerateStart(setup);
  for (let s = 0; s < steps; s++) if (!deepGenerateStep(run)) break;
  return deepGenerateFinish(setup, run.produced, run.lastWindow);
}

async function deepContinueAsync(prompt, steps, prefix) {
  const setup = deepGenerateSetup(prompt, steps, prefix);
  if (!setup) return null;
  let sliceStart = performance.now();
  const run = deepGenerateStart(setup);
  for (let s = 0; s < steps; s++) {
    /* Hand control back to the page only when a time slice is used up. */
    if (performance.now() - sliceStart > 12) {
      await new Promise(resolve => setTimeout(resolve, 0));
      sliceStart = performance.now();
    }
    if (!deepGenerateStep(run)) break;
  }
  return deepGenerateFinish(setup, run.produced, run.lastWindow);
}
