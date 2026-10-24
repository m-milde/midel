# Joint training learnings (24 Oct 2026)

## What we ran (step 10)

| Run | Tier | Epochs | Corpus | Needle (800 sample) | JOINT-STATUS |
|-----|------|--------|--------|---------------------|--------------|
| Full joint | M | 60 | packs + core + short (48k seq/epoch) | **3.4%** (27/800) | rejected |
| Trials (500 ids) | S/M/L | 15 | packs only | 12% / 8.6% / 17.4% | trial only |

Live **`stage3_brain.js` was not replaced** (bar is **≥ 80%** per rebuild plan §7).

## Diagnosis

1. **Training loss ≠ needle recall** — final loss ~0.41 while greedy needle recall stayed ~3%. The model fits teacher-forced answer tokens (~50% on first 8 answer tokens) but **free-run generation diverges** after a few good tokens (exposure bias).

2. **Short-line flood** — ~18k `short_added` lines × 0.25 weight still adds ~37% of sequences; many are one-liners unlike full lesson answers. Likely hurts open-ended generation quality.

3. **Needle eval matches legacy intent** — `answer_needle()` + greedy continuation; eval is harsh but correct for the runbook. Some answers start correctly then drift (see honeybee example in logs).

4. **Capacity** — CURSOR guide: **&lt; 30% after ~30 epochs → Step 7 / bigger tier**. M at 60 epochs is below that; **L trial was best** on 500 lessons.

## Phase 2 (next training pass)

Train **from scratch** (new `.pt` path), do not resume M weights into L.

| Change | Rationale |
|--------|-----------|
| **Tier L** | More capacity (trial winner) |
| **`--packs-only`** | Fact packs + 100 core; **no short_added** for this pass |
| **`--answer-focus-len 64`** | 2× loss on opening answer tokens (where needle lives) |
| **`--lr-schedule cosine`** | Warmup + decay |
| 40–60 epochs | More time at lower LR |

Command preset: **`npm run trainer:joint-phase2`**

## Still not step 12

Even if phase 2 improves recall, we still need before live replace:

- **Step 11** — export format v2 (`.bin`), browser background load, latency check  
- Full §7 gates (paraphrase, fields, refusals, size ≤ 60 MB, etc.)

## Artifacts

- Weights: `versions/stage3_brain.joint.M-2026-10-24.pt`  
- Log: `versions/joint-full-M-2026-10-24.log`  
- Status: `versions/joint-status-2026-10-24.json`
