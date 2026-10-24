# Growing the library and deep network

Midel is designed so **knowledge lives in lesson files first** and **weights catch up in scheduled joint runs** — not one-lesson installs that forget older facts.

## Two layers

| Layer | What it uses | New `my_subject_facts.js` |
|-------|----------------|---------------------------|
| **Chat (library)** | `pack_manifest.js` + `*_facts.js` scripts on the page | Visible after manifest sync + reload |
| **PyTorch rebuild** | **Glob** every `*_facts.js` via `load_fact_packs()` | Included on the **next** joint train automatically |
| **Legacy NumPy brain** | Same glob + `--learn-new` one id at a time | One lesson per run (deprecated for scale) |

The writer (`save_taught.py`) **watches the folder every 2s** and refreshes `pack_manifest.js` and `neural_lab.html` script tags when a new pack appears. You can also run:

```bash
python3 save_taught.py --sync-packs
# or
npm run corpus:grow -- --sync-packs-only
```

## Add a new facts file (checklist)

1. Create `something_facts.js` with valid JSON array rows (`id`, `category`, `question`, `text`). Use a free id block (`npm run audit:ids`).
2. **`npm run check`** — must list the file in `pack_manifest.js` and load from `neural_lab.html`.
3. **`npm run corpus:grow`** — syncs manifest, writes `versions/corpus-growth-status.json`, reports drift vs last freeze.
4. If you changed packs or added a file since the last joint run:
   ```bash
   npm run corpus:refresh-manifest
   ```
5. **Joint train** (consolidation release) on the new manifest — warm-start from the previous `.pt` when architecture unchanged:
   ```bash
   npm run trainer:joint -- --tier L --resume versions/stage3_brain.joint.L-packs-YYYY-MM-DD.pt ...
   ```
6. Pass **needle eval (≥80%)** before replacing live `stage3_brain.js` (runbook steps 11–12).

Chat answers from the new file **immediately** after reload; the deep network learns them on the **next successful release**.

## Release cadence (plan §5.6)

- Retrain when new/changed teachable rows reach **~5%** of the corpus **or** monthly — whichever comes first.
- `corpus:grow` sets `release_recommended: true` when that threshold is hit.
- Each joint epoch shuffles **all** frozen rows (full rehearsal) so old facts are not drowned out by new ones.

## Vocabulary and size

- **BPE v2** (~12k slots): new words usually become **pieces** of known tokens; the table does not grow per lesson.
- **Model width/depth** (tier S/M/L) is fixed per architecture; “smarter” means **better weights on more lessons**, not infinite parameters per fact.
- If the library outgrows context or tier capacity, bump `max_seq_len` or tier in a **new architecture release** (not silent).

## Status file

`versions/corpus-growth-status.json` — last drift report, row counts, and suggested next steps. Safe to commit for your own audit trail.

See also: `versions/FROZEN-CORPUS-GUIDE.md`, `DEEP_NETWORK_REBUILD_PLAN.md` §5.5–5.6, `MODEL.md` (new subject packs).
