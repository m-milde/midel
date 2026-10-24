<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel — roadmap toward stronger language models

**Midel** is a **teachable micro-transformer** plus an explicit **lesson library**. Chat answers come primarily from stored facts; the deep network (`stage3_brain.js`) supports continuations, gates, and the Signal/Attention panel. This document is the **forward plan**. Day-to-day resume notes, commands, and file roles stay in **[MODEL.md](./MODEL.md)**.

Last updated: **21 October 2026** (rebuild plan added; baseline numbers refreshed). **License:** [LICENSE](./LICENSE) (Copyright (c) 2026 M.Milde).

**After subscription reset — start with [DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md)** (owner decision 21 Oct 2026: the current deep network is **discarded and rebuilt from scratch**; measured facts, target sizes, gaps, runbook, acceptance). It wins on any conflict. Then follow **[CURSOR_DEEP_NETWORK_FIXES.md](./CURSOR_DEEP_NETWORK_FIXES.md)** (joint train on full `*_facts.js` + **`taught_facts.js`**, stable memory, then LM-like chat, then **compare/contrast** level).

---

## North star

Move **step by step** toward behaviors people associate with modern LLMs—broad knowledge, stable reasoning on taught facts, fluent continuations, multilingual support—while keeping Midel’s strengths:

| Keep | Why |
|------|-----|
| **Library-first answers** | Users see the full curated sentence; the network does not silently replace it with a hallucination. |
| **Incremental `--learn-new`** | One lesson per run, regression gates, no casual full-brain rewrites. |
| **Static deploy** | `neural_lab.html` + `stage3_brain.js` work without Python on FTP. |
| **Transparent weights** | NumPy trainer, inspectable `stage3_brain.js`, tutorial steps 1–5. |

Commercial LLMs (billions of parameters, web-scale pretraining) are **not** the near-term target on a laptop. The path is: **better knowledge pipeline → better incremental learning → controlled scale-up → optional pretraining/fine-tune tracks**.

---

## Current baseline (stable ops, Oct 2026)

### Architecture (stage 3)

| Item | Today |
|------|--------|
| Blocks | 4 pre-norm transformer layers |
| Width | 128 (`d_model`) |
| Heads | 4 |
| Context | 128 tokens |
| Vocab | **4,691 words in the weights**; the library has **21,244** distinct words (33% seen once). Word-level `[a-z0-9…]` tokenizer in trainer + page (drops symbols and line breaks) |
| Decode | Greedy continuation for diagrams |
| Training | `train_stage3.py --learn-new` only (no routine full 80-epoch retrain). NumPy float64, CPU. **Only 929 of 9,885 lessons (9.4%) are in the weights**; ~1.75M parameters, ~0.53M of them in the blocks |

### Three-layer answering

1. **Library** — `science_library.js`, `*_facts.js`, `taught_facts.js` (matcher + coverage).
2. **Small network** — short lines in `short_added.js` (stored answers, not browser-trained).
3. **Deep network** — weights in `stage3_brain.js`; lessons installed via `stage3_learned.json`.

### Tooling that should stay in daily use

| Command | Role |
|---------|------|
| `save_taught.py` (port **8787**, one process) | Teaching Add, Remember, **`wiki:learn`** saves |
| `npm run wiki:learn -- wiki-learn-expanded.md --limit N --delay 5000` | Batch Wikipedia → `taught_facts.js` |
| `npm run learn:new:loop` | Install library lessons into weights until queue empty |
| `npm run audit:ids` | Teaching vs pack and pack vs pack id check; per-file ranges and next free id |
| `npm run test:wiki` | Wikipedia gate regressions |

**Parallel terminals (safe):** wiki batch + learn-new loop; writer required for wiki saves, not for learn-new.

**Learn-new queue logging:** each run prints `deep network: N installed … P waiting …` and `LEARN-NEW-QUEUE installed=… pending=… teachable=…`.

**Retention replay cap:** `HELD_REPLAY_MAX = 64` in `train_stage3.py` — only the 64 most recent installed lessons are replayed per run (avoids 500+ lesson epochs).

**Wikipedia batch dedupe:** duplicate skip is **same question text only**; shared Wikipedia lede under different template questions gets **separate rows**. Duplicates do **not** mark `[+]` in the markdown.

**Teaching ids:** from **3001+**, never inside a pack-owned block (e.g. gemstone **4001–4040**). Since 14 Oct 2026 the writer's `nextId` and the next new pack both start at the highest id in any lesson file + 1; `npm run audit:ids` prints it.

See **[MODEL.md](./MODEL.md)** for gates, skip list, backup, and Bulgarian future notes.

---

## Phase A — Knowledge pipeline & quality (next)

**Goal:** More correct facts in the library, fewer false “done” markers, smoother batch + learn-new throughput.

| Work | Notes |
|------|--------|
| **Corpus hygiene** | Fix acronym casing in `wiki-learn-expanded.md` (CSS, HTML, JSON, not `cSS` / `hTML`); curate bad Wikipedia rows in Teaching before `--learn-new`. |
| **Marker audit** | Lines marked `[+]` without a matching `question` in `taught_facts.js` (legacy text-dedupe); unmark or re-run batch after fixes. Optional script: scan md `[+]` vs taught questions. |
| **Gate & lookup** | Extend `wikiTopicWords` / disambiguation for short acronyms (CSS vs Confederate ships); more `test:wiki` cases. |
| **Subject packs** | New `*_facts.js` blocks — **Scientists 13101–13200** shipped; next suggested **13201–13300** (see MODEL.md id table). Bulgarian content in English remains in packs until Phase E. |
| **Metrics** | Track `LEARN-NEW-QUEUE` over time in `learn-new.log`; optional dashboard or weekly `npm run backup` + diff taught row count. |
| **Documentation** | Keep MODEL.md stats refreshed via `npm run backup`; ROADMAP phase checkboxes when items ship. |

**Exit criteria:** Batch saves match chat lookup for template questions; pending queue drains predictably; no systematic duplicate/false `[+]` for new runs.

---

## Phase B — Deep network stable memory (priority after reset)

> **Superseded in detail by [DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md)** (clean-slate rebuild, release-cycle model instead of per-lesson installs, new eval sets, runbook). The table below stays as the summary.

**Goal:** Load **all** teachable library rows (packs + **`taught_facts.js`**, including longer Wikipedia/Teaching answers) into weights **without catastrophic forgetting**; replace the current ~8% needle pass / heavy forget curve under `--learn-new` alone.

| Work | Notes |
|------|--------|
| **Joint training** | `--joint-trial` / `--joint` on full `teachable_lesson_rows()` — see **CURSOR_DEEP_NETWORK_FIXES.md** Phase B. |
| **Context / length** | Many taught rows exceed **128 tokens**; raise context or chunked Q→A packs — library keeps full text. |
| **Needle selection** | `answer_needle()` weak-word list; prefer distinctive tokens (extend as new failure modes appear). |
| **Replay + retention** | Wider replay, wire `RETENTION_SLACK`, relearn drifted ids; loop eval floor before continuing installs. |
| **Eval harness** | `eval_model()`, `--eval-file`, baseline before/after joint; gates + needles — not gates alone. |
| **Skip policy** | Document when to use `skipped` in `stage3_learned.json` vs fixing lesson text. |
| **Chat vs weights** | Library remains source of truth until Phase C; UI shows when weights lag install record. |

**Exit criteria:** Joint acceptance (default **≥80%** needle pass on teachable ids + gates); `learn-new` fixes do not undo joint; honest `stage3_learned.json`.

---

## Phase C — Model scale & tokenizer (medium–long)

> **Brought forward:** the rebuild plan makes capacity and format changes part of the rebuild, not a later phase: target **~6–25M parameters** (tiers S/M/L), **context 256**, **tied embeddings**, **4× feed-forward**, **binary fp16/int8 weight file + header** (the current text file is ~9.5 bytes per weight), **Float32 in the browser + Web Worker**, **subword tokenizer** (needed only by trainer and `deep_model.js`, not by `science_library.js`), and a **PyTorch trainer** (owner decision). See [DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md) §4–5.

**Goal:** Richer continuations without breaking deploy format or static inference.

| Work | Notes |
|------|--------|
| **Tokenizer v2** | Subword (BPE/Unigram) or normalized acronym tokens; **shared** rules in `train_stage3.py`, `neural_lab.html`, `science_library.js`. |
| **Capacity** | Increase `d_model`, layers, or context with **versioned** export (`STAGE3_BRAIN` schema bump); migration tool for old brains. |
| **Decode** | Top-k / temperature for panel only; library answer unchanged. |
| **Training mix** | Curriculum batches (multiple lessons per epoch) while keeping gate checks—design carefully to avoid `--absorb`-style full retrains. |
| **Size budget** | Track deploy zip size; optional weight compression for FTP. |

**Exit criteria:** New schema documented; one upgraded brain ships in dev zip with backward-compatible loader or explicit “v2 only” flag in `deep_model.js`.

---

## Phase C2 — Compare and contrast (library-first)

**Goal:** Comparison asks answered from **stored** lessons — dedicated compare row and/or **two labeled library blocks** — not merged network prose.

| Work | Notes |
|------|--------|
| **Matcher** | Compare question shapes; dual pick (CURSOR guide Phase D Step 13). |
| **Chat** | Two-block UI (Step 15); default text from library. |
| **Eval** | `test:library` / optional `eval:compare` on real compare questions in `taught_facts.js`. |
| **Training** | **Optional** (Step 14); no synthetic concat of two facts into one target. |

**Prerequisite:** Stable library matcher; Phase C network contrast **not** required to ship compare UX.

**Detail:** **CURSOR_DEEP_NETWORK_FIXES.md** § Phase D.

---

## Phase D — Pretraining & instruction-style learning (long)

**Goal:** Move toward **LLM-like** generalization on top of Midel’s architecture—not a separate product.

| Track | Description |
|-------|-------------|
| **Corpus pretrain** | Offline train on licensed text (Wikipedia dumps, Gutenberg, own packs) → base checkpoint → then `--learn-new`-style adapters for facts. |
| **Instruction tuning** | Q&A pairs from `taught_facts.js` + packs as supervised fine-tune; still export to `stage3_brain.js` for the lab. |
| **RAG++** | Formalize today’s library matcher: embeddings + hybrid search (keyword + vector) before deep continuation. |
| **Optional cloud bridge** | Settings hook to call an external API for open-domain chat while local brain handles taught facts (never default on static deploy). |

**Exit criteria:** Defined legal/training data policy; reproducible train recipe; lab can load either “pack-only brain” or “pretrain+pack brain.”

---

## Phase E — Bulgarian & Cyrillic (planned)

Detailed in **[MODEL.md — Future: Bulgarian](./MODEL.md#future-bulgarian-and-cyrillic-knowledge-base)**.

Summary: Cyrillic tokenizer + stop words + optional `bg.wikipedia.org` + `--learn-new` on BG lessons without breaking English gates.

---

## Principles (do not break)

1. **Gates before export** — Angel Falls **979**, Sahara, Antarctica, Mercury (see MODEL.md).
2. **No destructive git/archive cleanup** — keep all `dist/midel-*-deploy.zip` history.
3. **Backup protocol** — `npm run backup` only when `stage3_brain.js` ends with `;`; do not stop learn-new mid-write for backup.
4. **Writer single-instance** — one `save_taught.py` on **8787**.
5. **Chat truth** — stored `text` wins unless deep pass is explicitly shown as continuation experiment.

---

## Anti-goals (explicit)

- Replacing the library with pure neural generation for factual Q&A.
- Running full 80-epoch retrains on every new pack without a migration plan.
- Shipping multi-GB weights in the default FTP deploy zip.
- Chasing closed API parity (GPT-4 class) inside the browser file bundle.

---

## How to use this document

| Role | Action |
|------|--------|
| **Daily dev** | MODEL.md + README workflow sections |
| **Planning a feature** | Pick a phase; add a row; link PR/commit in MODEL.md “resume notes” when shipped |
| **After trainer changes** | Update Phase B/C notes; extend eval harness when it exists |
| **Quarterly** | Re-read north star; adjust phases based on `LEARN-NEW-QUEUE` and user feedback |

When a phase item is **done**, move a one-line summary into MODEL.md and trim or check off here.
