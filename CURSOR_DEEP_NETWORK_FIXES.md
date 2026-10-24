<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Cursor guide: deep network — stable memory and LM-like answers

Audience: Cursor AI (or any coding agent) working in `nn-tutorial/`.

**Last updated:** 13 October 2026. **Update block added 21 October 2026 (below).**

Read first: **[MODEL.md](./MODEL.md)** (operations), **[ROADMAP.md](./ROADMAP.md)** (strategy), **`train_stage3.py`** (trainer), **`deep_model.js`** + **`neural_lab.html`** (inference and chat routing).

Detail lives in sections below; agents should **start with this block only**.

---

## UPDATE 21 Oct 2026 — read [DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md) FIRST

**Owner decision:** the current deep network is **discarded and created again from scratch** (library files are never deleted). The rebuild plan holds the refreshed measurements, target sizes, gaps and the runbook. This guide's Steps 1–6 and 8–15 remain the detailed trainer work; **these points are superseded or clarified:**

| Where in this guide | Was | Now |
|---------------------|-----|-----|
| §2 hard rule "`.venv/bin/python` (NumPy). No GPU path." | NumPy only | A from-scratch network of ~6–25M parameters is impractical on NumPy (days). **PyTorch (MPS or rented GPU) is approved by the owner (21 Oct 2026, "no restrictions")** — install it in a separate virtual environment; ask only before *renting* a GPU (rebuild plan §5.1, §10). Keep `train_stage3.py` as the teaching trainer. |
| Step 1b verdict "LONG-TAIL, not MISFIT — Step 7 not forced by length" | length is fine | Still true for today's lessons (21 Oct: median 42 tokens, 4 lessons > 128), but **capacity, not length, forces Step 7** (only ~0.53M block parameters vs ~445k corpus tokens). Context goes to **256** for the longer practical answers now being written. |
| Step 5 "`--learn-new` as a safety rail" | per-lesson installs maintain the brain | Not for the large network. Use the **release cycle** (rebuild plan §5.6): full-corpus retrain at ~5% new lessons or monthly; `learn:new:loop` retired. |
| "~0.5 M block params" / "~1.73 M weights" (both appear) | ambiguous | Measured: **1,745,408 total**; blocks **527,872**; embedding and head 600,448 each. |
| Step 7 "configurable D_MODEL / N_LAYERS / N_HEADS / MAX_LEN" | size flags only | Also: **tied embeddings, 4× feed-forward, binary weight format v2, Float32 in the page, Web Worker, subword tokenizer** (rebuild plan §4–5). |
| Step 7b "tokenizer first, if possible" | optional | Recommended: **subword ~8–16k tokens**, shared by trainer and `deep_model.js` only. |
| Corpus rule | keep all fact files | Unchanged, plus **freeze a snapshot and write a manifest** per run (rebuild plan §5.5), and **normalize training text** (markdown, bullets, math symbols — §5.4). |
| §9 status table | up to 13 Oct | Library/page features shipped since (percent calculator, answer formatter, field hop and menu, loading screen) are listed in rebuild plan §5.8; they are independent of the weights. |

**Do not** start Step 4 (full joint) on the old 128-context architecture.

---

## Do next (agents — copy this)

1. **Stop** `learn:new:loop`; backup `stage3_brain.js` + `stage3_learned.json` → `versions/`.
2. **`npm run eval`** → save baseline log.
3. **Capacity audit (before any multi-hour joint) — `npm run corpus:stats` (shipped):** measure **packed token length** (`pack_qa(question, text)`) for **all** `teachable_lesson_rows()` — report **median, p75, p95**, and **% rows over 128 tokens**. If **median or most Teaching/Wikipedia rows exceed 128**, treat current 128-context arch as **mis-fit** → **Step 7 (bigger context) first**, then joint — **do not** run full joint on 128 expecting 80%.
4. Implement **`eval_model()`** + **`--eval-file`** if missing; eval reports **pass rate overall and by length bucket** (e.g. ≤64 / 65–128 / &gt;128 tokens).
5. **`--joint-trial`** 500 lessons, 10–30 epochs → report stratified pass % → user decides.
6. **Full `--joint`** only on an architecture that fits the corpus; replace live brain only if § acceptance passes.
7. Fix **`--learn-new`** (wider replay ~100, retention, loop eval floor) — **safety rail**, not the main loader for 3k+ rows.
8. **Phase C:** default chat = **stored library text**; network text **only** when **per-prompt** generation eval passes (dev flag strict).
9. **Phase D (product):** compare = **library retrieval + two-block UI** (Steps 13, 15). **Step 14 (weights)** optional; **no synthetic concat** compare targets.

10. **Owner goal for the rebuild (stated 13 Oct 2026, after the Cursor subscription resets):** train a **bigger deep network from scratch** — **more layers, wider, longer context as the audit and a trial justify** — so it can **learn and understand the whole library** and **write complex answers**, not only repeat short lessons. Treat this as the target for Steps 7, 4 and Phase C. It needs two additions to the eval: a **paraphrase / related-question set** (does the network answer a lesson asked in other words, and pick related lessons?) and a **complex-answer set** (multi-sentence, multi-lesson). See **Step 7b** below.

**Corpus rule (once):** keep all `*_facts.js` + full **`taught_facts.js`**; merge rows by **`id`**; library keeps full answer text; training may chunk or widen context.

> **Added 21 Oct 2026:** the trainer reads only `*_facts.js` rows that have a question. **`short_added.js` (17,972 lines) and the 100 core lessons in `science_library.js` are not read**, and restricted categories are not excluded automatically. See [DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md) §5.10 (source inventory) before freezing the corpus.

---

## North star (what we are building)

| Layer | Today | Target |
|-------|--------|--------|
| **Library** | All `*_facts.js` + `taught_facts.js` — chat answers here | **Unchanged.** Source of truth; no deleting fact files. |
| **Deep weights** | `stage3_brain.js` — ~8% needle pass; forgetting under `--learn-new`; **~0.5M block params**, **128** context vs **~3.4k** long rows | **Joint** on architecture that **fits packed length**; **≥80%** needle pass **overall** with **stratified** report (short vs long answers); honest `stage3_learned.json`. |
| **Chat output** | Library text shown; network text only if `lessonNetworkAnswerComplete` (`deep_model.js`) | **Default = stored `text`.** Network compose **only** when generation eval passes **that prompt** (faithfulness-sensitive). |
| **Compare / contrast** | Matcher can return two lessons; chat can split conflicts; network rarely contrasts two topics faithfully | **Library-first:** dual retrieval + **two labeled blocks**; optional network contrast **only** if Phase C generation is proven — **not** synthetic stitched answers. |
| **New lessons** | `--learn-new` one id per run | Fixed installer (replay + retention + relearn) so joint gains are not erased. |

This is **not** a billion-parameter web LM. It is a **teachable micro-transformer** that should behave **LM-like on your knowledge base**: fluent answers grounded in stored facts, static deploy (`stage3_brain.js` + page), gates preserved.

**Anti-goals (from ROADMAP):** pure neural factual Q&A with no library fallback; multi-GB default deploy zip; chasing closed-API parity on a laptop.

---

## When subscription resets — start here

> **Owner goal (13 Oct 2026):** rebuild the deep network from scratch, bigger and deeper, so it can learn and understand the whole library and write complex answers. See **Do next §10** and **Step 7b**.

Do these in order. **Pause** `npm run learn:new:loop` before Phase B unless the user explicitly wants installs to continue.

| # | Action | Done when |
|---|--------|-----------|
| 1 | Read this file + MODEL.md “Deep network” + ROADMAP Phase B–D | Agent context loaded |
| 2 | `pgrep -fl "train_stage3|learn-new"` — stop loop cleanly; wait for `stage3_brain.js` to end with `;` | No trainer running |
| 3 | Copy `stage3_brain.js`, `stage3_learned.json` → `versions/` dated backup | Backup exists |
| 4 | `npm run eval` → save log as **baseline** | Baseline recorded |
| 5 | User confirms: **keep all fact files**; reset **weights + install record** only after joint accepts | Scope agreed |
| 6 | **Capacity audit** — packed token stats on **full** teachable corpus (see Do next §3) | Fit/misfit 128-context decided |
| 7 | **Phase B Step 1** — `eval_model()` + `--eval-file` + **length-stratified** pass rates | Trial weights scorable |
| 8 | **Phase B Step 2–3** — `--joint-trial` 500 → stratified report → **Step 7 first** if corpus &gt; 128 | Go / no-go |
| 9 | **Phase B Step 4 or 7→4** — full joint on **fitting** arch; live replace only if § acceptance passes | Stable memory |
| 10 | **Phase B Step 5–6** — fix `--learn-new`, update MODEL.md / guide PDF | Future installs safe |
| 11 | **Phase C** — generation eval; chat stays **library-default** | Per-prompt network optional |
| 12 | **Phase D** — compare via **matcher + two blocks** (Step 14 optional) | Compare asks grounded |
| 13 | Resume **`learn:new:loop`** only if Step 5 guard + eval floor hold | No silent forgetting |

Ask the user before any step **> ~10 minutes**, **replacing live `stage3_brain.js`**, or **changing model width/layers**.

### Stability bar (why subscription reset focuses on Phase B first)

User-visible today (Oct 2026): the deep network **forgets heavily** under `--learn-new`; **five rehearsal gates** pass while **needle eval ~8%**; chat stays usable because the **library** answers. That gap means **gates are necessary but not sufficient** — the installer replay window (`HELD_REPLAY_MAX = 64`), weak retention acceptance, and one-lesson-at-a-time installs **erase** earlier weights. **Do not** add comparison training or “prefer deep answer” in chat until **joint + fixed learn-new** meet §7 acceptance; otherwise compare/LM features will drift and hallucinate.

---

## 1. The problem (memory)

The deep network (4 blocks, width 128, 4 heads, context 128, ~1.73 M weights) is taught **one lesson at a time** by `.venv/bin/python train_stage3.py --learn-new`. It forgets older lessons almost as fast as it learns new ones. **`npm run eval`** on installed ids was ~**8%** needle pass (Oct 2026 baseline) while **five safety gates** still passed (rehearsed every run).

**Chat is not broken:** answers come from the **library**, not weights. What fails is continuation, Signal/Attention, and the value of the install loop.

### Evidence (4 Oct 2026)

| Install order | Still answer |
|---------------|--------------|
| first 700 lessons | 12 / 700 |
| 800–899 | 42 / 100 |
| newest 29 | 23 / 29 |

Example drift: id `8010` “What is the capital of Azerbaijan?” → gibberish continuation.

### Root causes (`train_stage3.py`)

1. **Replay too narrow** — `HELD_REPLAY_MAX = 64`, recent installs only.
2. **Failed lessons never replayed** — `held` skips rows where `fact_known()` is false.
3. **Retention ignores drift** — `learn_retention_accept()` ignores `lost`; `RETENTION_SLACK = 2` unused.
4. **Relearn starves** — long `pending` queue; relearn rarely runs.
5. **Capacity is the main risk** — ~3.4k rows, many answers 200–800 chars, ~0.5 M block params, **128-token** context; embedding table grows with vocab. **Test packed-length fit before full joint**, not after a failed run.
6. **Long queue** — each `--learn-new` ~13 min; thousands pending erodes old weights.

**Re-teaching from scratch with the same loop alone repeats this curve.** Fix training **first** (joint on full library + installer fixes), then LM routing (Phase C), then comparison level (Phase D).

**Expectation after reset:** one **joint** pass (or Step 7 bigger net + joint) over **all** teachable rows, honest `stage3_learned.json`, then **learn-new** only as a **safety rail** that must not drop pass rate below an eval floor — not as the primary way to load 3k+ lessons.

---

## 2. Hard rules for the agent

- **Never two trainers; never edit `stage3_brain.js` while training.** `pgrep -fl "train_stage3|learn-new"`.
- **Back up** weights + `stage3_learned.json` to `versions/` before experiments.
- **Trials write elsewhere** — `stage3_brain.trial.js`, `stage3_brain.joint.js`. Live replace only after §7 acceptance.
- Valid `stage3_brain.js` ends with `};`. `export()` with default path stamps `neural_lab.html` cache-bust — use **explicit `path`** for trials.
- **Do not delete `*_facts.js` or `taught_facts.js`** for a “memory wipe.” Wipe = new weights + synced `stage3_learned.json`.
- Tokenizer: lowercase words/numbers/`? . ! ,` — shared across `train_stage3.py`, `neural_lab.html`, `science_library.js`. Acronym fixes belong in matcher/normalize (e.g. NATO), not ad hoc tokenizer breaks.
- Interpreter: `.venv/bin/python` (NumPy). No GPU path.
- Do not commit huge brain files unless the user asks.
- **`npm run backup`** only when brain file complete (`;`) and no trainer running.

---

## 3. Phase A — Library prep (no weight changes)

**Goal:** Fact files stay; quality improves matcher + future training.

1. Curate **teachable** rows: both `question` and `text`; fix typos (NATO, acronyms in `wiki-learn-expanded.md`).
2. Remove or skip junk **Wikipedia** rows before install (`skipped` in `stage3_learned.json` when needed).
3. `npm run audit:ids` — Teaching id vs pack collisions. **Also** run `npm run corpus:stats` and confirm there is no *Duplicate ids* line (83 found on 12 Oct 2026, 82 fixed the same day; only the broken Teaching row 9509 remains); `audit:ids` does not check pack-vs-pack clashes.
4. `npm run test:library` — matcher regressions (incl. split-word pair guard, NATO token fix).
5. Optional: drain or pause wiki batch until brain strategy is chosen.

**Exit:** User trusts library as ground truth; pending teachable count known (`LEARN-NEW-QUEUE` / teachable list in trainer).

---

## 4. Phase B — Stable memory (implement + run)

### Step 0: Prepare

1. Stop learn-new loop cleanly (see checklist above).
2. Backup to `versions/`.
3. `npm run eval` → baseline log.

### Step 1: Reusable eval

Refactor `eval_brain()` → **`eval_model(model, ids=None) -> dict`** (counts, drifted ids, gates, Angel Falls 979). Keep CLI wrapper. Add **`--eval-file PATH`**. Helper to load weights from any path (extract from `load_installed()`).

**Stratified reporting (required):** for each evaluated id, bucket by packed answer length (tokens after `pack_qa`): e.g. **short ≤64**, **medium 65–128**, **long &gt;128**. Print **pass rate per bucket** and overall. The **80%** target is misleading if long Wikipedia rows dominate failures — user decides threshold **per bucket** or accepts lower long-row pass with library carrying chat.

**Shipped already:** `npm run eval`, `eval_brain()`, `learn_new_learning_rate()`, merge-safe `taught_facts.js` writes.

**Still to implement:** `eval_model()`, `--eval-file`, joint commands, installer fixes below.

### Step 1b: Corpus capacity audit (run before Step 2)

Add **`--corpus-stats`** (or small script using `teachable_lesson_rows()` + `pack_qa` + `tokenize`):

1. For **every** teachable row, compute packed sequence length (or 0 if `pack_qa` fails).
2. Print count, **median**, **p75**, **p95**, max, and **fraction &gt; MAX_LEN** (default 128).
3. **Decision gate:**
   - If **median packed length &gt; 128** or **&gt;50%** of rows exceed 128 → **do Step 7** (raise `MAX_LEN` / width as needed), **then** joint trial on new arch. **Skip** full joint on current 128-context brain.
   - If most rows fit 128 but long tail exists → joint with **chunk packs** for long ids only; stratified eval must show long bucket acceptable or those ids stay library-only in chat.

This is **not** a fallback — it is the **first** engineering question for Phase B.

**Shipped (12 Oct 2026): `npm run corpus:stats`** (`scripts/corpus-stats.py`, read-only). Reports median / p75 / p90 / p95 / max, the short / medium / long buckets, the share fitting 128–1024 tokens, how many lessons lose the start of their question to truncation, vocabulary size, duplicate ids, a per-category table and the longest lessons, then prints the verdict above. `--max-len N`, `--top N`, `--json PATH`, `--csv PATH` (see MODEL.md, *Corpus length audit*). Re-run it on the **frozen** library right before any joint run.

**First measurement (12 Oct 2026, 6951 teachable lessons):** median **40** tokens, p95 68, max 159; **92.7%** ≤64, 7.3% 65–128, **4** lessons over 128 → verdict **LONG-TAIL, not MISFIT**. The 128-token context is **not** the bottleneck, so Step 7 is **not** forced by length. What remains open: weights vs vocabulary (about 17.7k distinct tokens, 35% seen once, vs ~0.5 M block params) — the Step 2 joint trial answers that. Also found: **83 duplicate ids** (geography/sport 42, food/geography 40, science_fiction/taught 9509); `audit:ids` does not catch pack-vs-pack clashes. **Fixed 12 Oct 2026:** the 82 pack-vs-pack rows were renumbered to 13201–13282 (map: `versions/id-renumber-2026-10-12.json`); they count as *pending* in `stage3_learned.json`, which is fine because the weights are being rebuilt. **Still open:** 9509 (science_fiction pack vs a broken Teaching row) — repair or delete that Teaching row before the freeze.

### Step 2: Joint trial (read-only on live brain)

Add **`--joint-trial --lessons N --epochs E --out stage3_brain.trial.js`**:

1. Load live weights from a **copy** (or fresh init if user wants scratch — prefer copy for vocab baseline unless Step 7).
2. First **N** teachable rows (`question` + `text` from packs + taught via `load_fact_packs()` / `teachable_lesson_rows()`).
3. `grow_vocab()` for all words in those rows, `prompt_variants()`, `claim_examples()`, Angel Falls; `scale_new_embeddings()`.
4. Items like `learn_new()`: `pack_qa(variant, text)` per variant, `(text, 0, False)`, gate drills, claims.
5. Train **E** epochs: `train_epoch()` + `learn_new_learning_rate()`, shuffle per epoch.
6. Every few epochs: `eval_model()` on trial lesson ids + gates.
7. Export **only** to `--out`.

**First run:** `--lessons 500 --epochs 10` (~5 min). Record **stratified** pass rate (Step 1).

### Step 3: Decide from trial

| Trial pass rate (overall) | Next |
|-----------------|------|
| **≥ 80%** on **fitting** arch and long bucket acceptable | Step 4 full joint (all teachable) |
| **30–80%** | More epochs on 500; re-check long bucket; then Step 4 or Step 7 |
| **< 30%** after ~30 epochs on fitting arch | Step 7 bigger network / context, then joint from scratch |
| Corpus audit says **misfit 128** | **Step 7 first** — do not interpret low pass as “need more epochs” on 128 |

**Report stratified numbers to the user before multi-hour runs.**

### Step 4: Full joint (`--joint`)

All **teachable** lessons from **`load_fact_packs()`** — every pack in `pack_manifest.js` **and** every row in **`taught_facts.js`** with both `question` and `text` (~3.4k+ and growing, many variants per row via `prompt_variants()`):

1. **Prerequisite:** Step **1b** passed — architecture matches corpus length (or long rows use chunk packs with documented eval bucket).
2. **Long answers:** do not skip Teaching rows for length; truncate only inside **training packs**, not in `taught_facts.js`. Log ids where `pack_qa()` fails (question words not prefix of full token list) and fix tokenization or split packs.
3. Checkpoint every K epochs to `stage3_brain.joint.js` (explicit path); atomic write (temp + rename).
4. `--resume PATH`; log loss + `eval_model()` pass rate periodically.
5. **20–80 epochs** (~1.7–7 h) — epoch count is a flag.
6. Replace live **`stage3_brain.js` only if:** gates pass, Angel Falls 979 ok, lesson pass rate ≥ user threshold (default **80%**).
7. Rewrite **`stage3_learned.json`:** `ids` = ids that pass eval; clear stale `relearn`; keep intentional `skipped`.
8. Print `JOINT-STATUS accepted pass=…` or `JOINT-STATUS rejected …`.

This is **teaching the deep network from scratch in one pass** using **current library files** — not deleting fact files.

### Step 5: Fix `--learn-new` (do not undo joint)

In `learn_new()`:

1. **Wider replay** — ~**100** sampled ids (recent + random from installed, **including failures**); cheap, **slows** forgetting only.
2. **Retention** — wire `RETENTION_SLACK` into `learn_retention_accept()` (behaviour documented in MODEL.md).
3. **Relearn batches** even when pending exists; **`--relearn-drifted`** from `eval_model()` drift list.
4. **`learn-new-loop.sh`** — sampled eval every N installs; stop if pass rate on fixed 100-id sample falls below floor.

**Role of learn-new after joint:** **safety rail** for new Teaching/Wikipedia rows — **not** the primary way to load 3k+ lessons. Joint is the real fix; replay tweaks do not replace it.

### Step 6: Docs + backup

1. Update **MODEL.md** (commands, replay, eval meaning, joint vs learn-new).
2. **build_network_guide.py** — “Keeping the deep network up to date”, glossary.
3. `npm run backup` when safe.

### Step 7: Bigger network / context (capacity — often first)

User agreement required — retrain from scratch. **Run Step 1b first;** if corpus does not fit 128 tokens, Step 7 precedes full joint on the **current** small context brain.

1. Configurable `D_MODEL`, `N_LAYERS`, `N_HEADS`, `MAX_LEN` (flags or small config).
2. **`deep_model.js`**, `neural_lab.html`, guide PDF — dynamic width/context labels.
3. Measure train time, file size, page load.
4. Joint train all teachable lessons on new architecture; backup old brain in `versions/`.

### Phase B acceptance (§7)

- `npm run eval` / `eval:strict`: pass rate ≥ threshold, all gates, `eval probe angel falls 979: ok`.
- `stage3_learned.json` `ids` matches passing teachable ids.
- Page loads new `stage3_brain.js?v=<vocab>`; previously lost question shows Signal/Attention.
- `npm run test:library`, `npm run test:lesson-network` pass.
- No `*.trial.js` / `*.joint.js` in deploy zip (`pack_midel_backup.py`).

### Time estimates (M3, 16 GB)

- Joint trial 500×10 epochs: ~5 min.
- Full joint: ~5 min/epoch → 1.7 h (20 ep) to 7 h (80 ep).
- Wider `--learn-new`: +33–66% per install — safety rail only, not main fix.

---

## 5. Phase C — LM-like answers (after Phase B passes)

**Prerequisite:** Joint (or Step 7) brain meets §7 acceptance. Otherwise generation will drift and hallucinate.

### What “LM-like” means here

1. **Retrieve** — `answerFromLessons()` / matcher on full library (unchanged corpus).
2. **Generate** — `deepContinue` / `lessonNetworkAnswer` produce **user-visible** answer from question + matched fact(s).
3. **Fallback** — If overlap / completeness checks fail, show stored **`text`** (library-first safety until eval proves otherwise).
4. **Refuse** — “Not in the library” when no solid match; no invented facts on static deploy.

### Step 8: Generation eval harness

Add **`npm run eval:generate`** (or extend `eval_model`):

- Held-out or all installed teachable ids: run **`lessonNetworkAnswer`** / same prompts as training.
- Metrics: token overlap vs stored `text`, multi-sentence signature coverage (mirror `lessonNetworkAnswerComplete` in `deep_model.js`).
- Fixed benchmark JSON (~100 questions across categories) for regressions.
- **Do not loosen `fact_known()`** to inflate needle scores; keep **needle eval** and **generation eval** separate.

### Step 9: Training for full answers (optional refinement post-joint)

Joint already trains `pack_qa(question, answer)`. If generation eval is weak:

- Weight full-answer sequences in joint epochs (not only needle-friendly openings).
- Optional held-out Q→A packs without answer in prompt for eval split only.
- Consider Phase D in ROADMAP: instruction-style fine-tune on all Q/A pairs → same `stage3_brain.js` export.

### Step 10: Inference and decode

In **`deep_model.js`** / page:

- Tune **`deepContinue` step budget** per answer length (Wikipedia rows need more steps).
- Optional **top-k / temperature** for chat (ROADMAP Phase C — start dev-only).
- **`filterProducedToLesson`** — keep; tighten or relax only when Step 8 metrics improve.

### Step 11: Chat routing (`neural_lab.html`)

**Retrieve-then-generate policy:**

| Condition | Show |
|-----------|------|
| Any solid library match | **Stored `library.text`** (default, production) |
| Solid match + dev flag + **per-prompt** generation eval pass | May show **network text** (secondary label or optional block) |
| Match but generation incomplete or eval fail | Stored **`library.text`** only |
| Loose match / weak | Loose label + library or defer Remember/Wikipedia |
| No match | **Not in the library** |

**Strict rule:** composing answers can mis-state a **number or name**. Do **not** flip global default to network-primary without user sign-off **and** benchmark proof. Dev flag first; optional per-prompt gate from **`eval:generate`** (or cached pass list for benchmark ids only).

Document routing in **MODEL.md**; align with **“Chat truth — stored text wins unless deep pass is explicit.”**

### Step 7b: Rebuild target — bigger, deeper, able to understand the library (owner goal, 13 Oct 2026)

**Goal:** after the subscription reset, rebuild the deep network **from scratch** with **more layers and a wider model** (and a longer context only if the audit says so), so it can **learn and understand all lessons in the library** and **output complex answers**. Once taught, the library and the network should agree: whatever the library stores, the network can answer, in the lesson's words and in other words.

1. **Size by evidence, not by wish.** Today: 4 layers, width 128, context 128, about 17.7k-word vocabulary with about 35% single-use words (first `corpus:stats` run); the median lesson is about 41 tokens and only 4 lessons exceed 128 (library now about 7,600 lessons). So the likely bottleneck is **depth/width and vocabulary**, not context. Try several sizes in `--joint-trial` (for example 6 or 8 layers, width 192 or 256 — **starting points, not measured**) and pick the smallest one that passes the stratified eval. Record train time, file size and page load for each.
2. **Tokenizer first, if possible.** Rare words inflate the embedding table (Step 12, tokenizer v2). Decide before the big run, because trainer, page and `science_library.js` must share one rule.
3. **Understanding tests, not only recall.** Add to the eval: (a) **paraphrase set** — each sampled lesson asked in 2–3 other wordings, including bare topics and small typos; (b) **related-lessons set** — for a lesson, do the nearest stored lessons look related; (c) **complex-answer set** — questions whose answer needs 2–3 lessons. Pass bars are agreed with the owner, not invented by the agent.
4. **Library features that already exist and must keep working after the rebuild** (all library-side, shipped 13 Oct 2026, see MODEL.md *Several lessons for one prompt* and *Suggestions*): all lessons for the same question, topic prompts with BEST MATCH, "Did you mean" spelling fixes, "Related" questions. After the rebuild, **test whether the new network's own representations give better related questions or spelling fixes than the library word-overlap method**; swap only if it measurably wins. Chat stays library-default.
5. **Order:** Step 1b audit (done) → Step 1 eval incl. the three new sets → Step 7/7b size trial → Step 4 full joint → Phase C.

### Step 12: Scale path (longer term, ROADMAP C–D)

- **Tokenizer v2** — subword or acronym-safe tokens; **same rules** in trainer, page, `science_library.js`.
- **RAG++** — hybrid search before generate if keyword matcher misses paraphrases.
- **Optional pretrain** on licensed corpus → fine-tune on packs (does not replace library files).

**Phase C exit:** User sees network-composed answers on benchmark set with agreed faithfulness score; library fallback still works; gates green after routing changes.

---

## 6. Phase D — Compare and contrast (library-first)

**Prerequisite:** Phase B stable enough for chat; Phase C optional for network contrast.

**User goal:** Comparison asks (“difference between X and Y”, “compare A and B”) answered from **stored** lessons — **not** invented side-by-side prose.

**Scope (keep small):** **Required:** Steps **13 + 15** (matcher + two-block UI). **Optional:** Step **14** (weight training) only if Phase C generation is trustworthy. **Do not** build **synthetic pair** targets (concat two facts into one compare answer) — high hallucination risk; if no dedicated compare row exists, show **two blocks** or “not in the library”, not a merged network essay.

### What exists today

| Piece | Status |
|-------|--------|
| Library | Many compare-shaped questions already in **`taught_facts.js`** and packs; matcher **dual pick** + split-word guards (`science_library.js`); chat **two-block** conflict UI (`neural_lab.html`). |
| Training | No dedicated **compare** loss or multi-entity needles; long compare answers hit **128-token** ceiling like other rows. |
| Chat | Best case: **library** shows one or two lesson texts; network continuation rarely **contrasts** both entities. |

### Step 13: Library — compare retrieval

1. **Question shapes:** normalize “difference between A and B”, “compare A and B”, “A vs B”, “A versus B” to a shared compare intent (without merging distinct lesson ids).
2. **Dual lesson pick:** when two facts each **define** one side (or one row is explicitly a compare answer), prefer **pair** with coverage rules stricter than generic dual stitch — reuse `trimSplitWordLessonPick` / unanchored dual guards; add **`npm run test:library`** cases for compare templates.
3. **Single-lesson compare rows:** many taught rows already encode contrast in one `text` — matcher must still hit **exact / strong** question match (not small-network subject false positives).

### Step 14: Training — compare in weights (**optional**)

Skip unless user explicitly wants network contrast **and** Phase C faithfulness is green.

1. **Benchmark:** `scripts/fixtures/compare-eval.json` from real compare **questions** in `taught_facts.js` / packs (existing single-lesson compare rows only).
2. **Training mix:** extra **`prompt_variants()`** on those rows only — **no** synthetic X+Y concat targets.
3. **Eval:** multi-needle checks on **stored** compare text only.
4. **Replay:** compare benchmark ids in held set if Step 14 runs.

### Step 15: Chat — comparison presentation

1. When library returns **two** facts for a compare ask, keep **two labeled blocks** (already started); optional short **contrast line** from deep net only if **`eval:generate`** pass on that prompt class.
2. When one compare lesson matches, show full **`text`**; network diagram optional.
3. **Do not** let small network **pronoun/subject** shortcuts override compare library hits (see Midel identity fix pattern).

### Phase D acceptance (product)

- **`npm run test:library`** (or **`eval:compare`**) — compare-shaped prompts hit correct lesson(s).
- Chat shows **one or two labeled library blocks**; short network does not override.
- Manual spot-check: 10 compare asks from **`wiki-learn-expanded.md`** — grounded blocks, no junk from short net.
- Step 14 metrics optional; do not block ship on network contrast.

**Phase D exit:** Compare questions work **in the library layer**; network contrast is a bonus, not required.

---

## 7. Known gotchas

- Needle eval **stricter** than showing library text in chat.
- `answer_needle()` — bad needle fails a lesson the net partially knows; spot-check failures.
- `learned` order in JSON is **install order**, not id order.
- `grow_vocab()` changes embedding shape — reload brain after export.
- Evaluate **exported** file, not only in-memory model (`export()` rounds to 5 decimals).
- **Installed ≠ answers** — pause loop during joint strategy.
- **FTP deploy:** chat works from facts + brain; update deploy zip after brain replace (`npm run backup`).

---

## 8. Code map (quick reference)

| Area | Files |
|------|--------|
| Training | `train_stage3.py` |
| Weights | `stage3_brain.js`, `stage3_learned.json` |
| Inference | `deep_model.js` (`lessonNetworkAnswer`, `groundedContinue`, `deepContinue`) |
| Chat routing | `neural_lab.html` (prompt path, `libraryWeakForPrompt`, blocks) |
| Matcher | `science_library.js` (`answerFromLessons`, `selectLessons`, split-word guard) |
| Lessons | `pack_manifest.js`, `*_facts.js`, `taught_facts.js` |
| Eval CLI | `npm run eval`, `npm run eval:strict`; tests `scripts/test-library-typo.mjs` |
| Loop | `scripts/learn-new-loop.sh`, `learn-new.log` |

---

## 9. Implementation status (update when shipping)

| Item | Status |
|------|--------|
| `npm run eval`, `eval_brain()` | Shipped |
| `learn_new_learning_rate`, `--flat-lr` | Shipped |
| Merge-safe taught writer | Shipped |
| Matcher: split-word / unanchored dual guard, NATO normalize | Shipped |
| Taught merge by **id** (page + wiki batch); identity / pronoun short-net guards | Shipped |
| `eval_model()`, `--eval-file` | **Not implemented** |
| `--joint-trial`, `--joint`, `--resume` | **Not implemented** |
| Wider replay, RETENTION_SLACK, relearn batching, loop guard | **Not implemented** |
| `eval:generate`, chat “prefer deep answer” | **Not implemented** |
| Corpus length audit (`npm run corpus:stats`) | **Shipped** (12 Oct 2026) |
| Chat shows all lessons for the same question, and finds lessons for bare topic prompts (BEST MATCH tag) | **Shipped** (13 Oct 2026), library side only, weights untouched. See MODEL.md, *Several lessons for one prompt*. Keep it when the deep network is rebuilt: the library stays the default answer |
| "Did you mean" spelling fixes after a miss and "Related" questions after an answer (chips, also in the deploy zip) | **Shipped** (13 Oct 2026), library side only, weights untouched. After the rebuild, test whether the network's representations beat the word-overlap method (Step 7b §4) |
| Length-stratified `eval_model` | **Not implemented** |
| Phase D: compare matcher + two-block UI (Step 14 optional) | **Partial** (UI/matcher started) |

When an item ships, tick it here and add one line to **MODEL.md** resume notes.

---

## 10. Master checklist (copy for the user)

```
[ ] Phase A — library curated, baseline eval saved, loop paused
[ ] Step 1b — corpus packed-length audit → arch fit: ____
[ ] Step 1 — eval_model + --eval-file + stratified buckets
[ ] Step 2 — joint-trial 500 → overall ____% | short ____% | medium ____% | long ____%
[ ] Step 3 — Step 7 first if misfit 128; else joint / more epochs
[ ] Step 7b — owner goal: bigger/deeper from-scratch rebuild; paraphrase, related and complex-answer eval sets added; size chosen by trial: ____
[ ] Step 4 — full joint → live replace? pass rates: ____
[ ] Step 5 — learn-new ~100 replay + loop floor (safety rail only)
[ ] Step 6 — MODEL.md + guide PDF + backup
[ ] Step 8–11 — Phase C: eval:generate; chat stays library-default
[ ] Steps 13+15 — Phase D compare UI (Step 14 optional)
[ ] learn:new:loop resumed only if eval floor holds
```

**Bottom line:** **Capacity first** (context vs corpus length). **Joint** on a fitting arch loads the knowledge base; **learn-new** only maintains it. **Chat default = library text.** **Compare = two blocks**, not synthetic merge. **`--learn-new`-only is not stable** today.
