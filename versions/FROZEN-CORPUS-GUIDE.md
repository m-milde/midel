# Frozen corpus — quick reference

**Manifest:** `versions/corpus-manifest-2026-10-23.json` (frozen **2026-10-23**)

Training and eval for the PyTorch rebuild use **only** the lesson rows defined at this freeze, with file **SHA-256** checks (`verify_frozen_manifest` in `midel_data.py`). Editing a listed `*_facts.js` after the freeze without a new manifest causes hash mismatch (resume can use `--skip-manifest-verify` as a temporary workaround).

## Row counts (PyTorch default — all categories)

| Source | Trainable rows | Notes |
|--------|----------------|--------|
| Fact packs (`*_facts.js` + **taught_facts.js**) | **~10,394** | Includes **Swear Words**, **Weed**, **Pharmaceuticals & Controlled Substances**, etc. |
| Science core | **100** | Derived Q from core statements |
| short_added.js | **17,975** | Small-network lines; **lower weight** in full joint |
| **Planned full rebuild** | **~28,469** | Packs + core + short |

Legacy **`--exclude-restricted`** omits categories matching `swear|weed|controlled substances` (~368 rows) — old runbook policy only.

## What the lab UI is *not*

- **~10,495** (lab chip) = built-in library + Teaching **display** count (includes statement-only rows).
- **Live chat** still uses `stage3_brain.js` until rebuild passes **§7 (≥80% needle)** and steps 11–12.

## Current training modes

| Run | Command | Rows | short_added |
|-----|---------|------|-------------|
| **L phase 2** | `npm run trainer:joint-phase2` | ~**10,494** packs+core | **Off** (`--packs-only`) |
| M full joint (done) | `npm run trainer:joint` | ~**28,469** | On — rejected @ 3.4% needle |

Phase 2 checkpoint: `versions/stage3_brain.joint.L-packs-2026-10-24.pt`

**Important:** A run started **before** this policy change was trained on the old ~10,026 subset. Restart or resume after pulling the change so packs include restricted topics.

## Needle eval

- Sample **800** fact-pack lessons (same pool as training — all categories unless `--exclude-restricted`), greedy continuation.
- **Ship bar: 80%** — live brain **not** replaced until met + export v2 (step 11).

## When you add new lessons or a new `*_facts.js` file

**Chat:** writer or **`npm run corpus:grow`** updates `pack_manifest.js` → reload the lab.

**Trainer:** already **glob-discover** every `*_facts.js` (no manifest list required for loading).

**Reproducible joint run:**

1. Pause joint training (or finish the current run).
2. Add/edit packs or Teaching rows.
3. **`npm run corpus:grow`** — sync manifest + drift report (`versions/corpus-growth-status.json`).
4. **`npm run corpus:refresh-manifest`** when files are new or edited (writes `corpus-manifest-YYYY-MM-DD.json`).
5. Joint-train on that freeze; warm-start from previous `.pt` when tier/tokenizer unchanged.

Full checklist: **`docs/CORPUS-GROWTH.md`**. Release when growth ≥ **~5%** or monthly (§5.6).

## Dashboard

- **Left pixel map** = BPE mass from **frozen rows** (export default includes full ~28k corpus for vocabulary footprint).
- **Deep network** tabs = inspect **`.pt` checkpoint**, not live JS brain.

See also: `DEEP_NETWORK_REBUILD_PLAN.md` §5.5, `versions/JOINT-LEARNINGS-2026-10-24.md`.
