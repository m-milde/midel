# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Build JSON/JS snapshots for network_dashboard.html from checkpoint + corpus."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import torch

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))

from midel_data import corpus_counts, load_frozen_corpus_rows, load_eval_rows  # noqa: E402
from midel_tiers import TIERS, TierConfig  # noqa: E402
from midel_tokenizer_v2 import decode, encode, load as load_tokenizer  # noqa: E402
from training_text import training_text  # noqa: E402
from network_dashboard_pixels import (  # noqa: E402
    PIXEL_COLS,
    PIXEL_ROWS,
    grid_activity_stats,
    weight_grid_from_state_dict,
)

VERSIONS = ROOT / "versions"
SNAPSHOT = VERSIONS / "network-dashboard-snapshot.json"
SUMMARY = VERSIONS / "network-dashboard-summary.json"
HEATMAPS = VERSIONS / "network-dashboard-heatmaps.json"
EMBED_BIN = VERSIONS / "network-dashboard-embeddings.f32"
DATA_JS = ROOT / "network_dashboard_data.js"
TOKENIZER_JS = ROOT / "network_dashboard_tokenizer.js"
TOKENIZER_JSON = VERSIONS / "midel-tokenizer-v2.json"
PASS_BAR = 80.0


def _rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def tensor_stats(t: torch.Tensor) -> dict:
    x = t.detach().float().cpu()
    return {
        "shape": list(x.shape),
        "count": int(x.numel()),
        "mean": round(float(x.mean()), 6),
        "std": round(float(x.std()), 6),
        "min": round(float(x.min()), 6),
        "max": round(float(x.max()), 6),
        "abs_mean": round(float(x.abs().mean()), 6),
    }


def _values_to_uint8_grid(values: torch.Tensor, cols: int, rows: int, *, log_scale: bool = False) -> list[list[int]]:
    flat = values.detach().float().cpu().flatten()
    n = int(flat.numel())
    target = cols * rows
    if n == 0:
        return [[0] * cols for _ in range(rows)]
    idx = torch.linspace(0, max(0, n - 1), target).long().clamp(0, max(0, n - 1))
    sampled = flat[idx]
    if log_scale:
        sampled = torch.log1p(sampled.clamp(min=0))
    mx = float(sampled.max()) or 1.0
    scaled = (sampled / mx * 255).clamp(0, 255).byte()
    return scaled.reshape(rows, cols).tolist()


def corpus_token_pixel_map(rows: list, vocab_size: int, *, cols: int = PIXEL_COLS, rows_h: int = PIXEL_ROWS) -> dict:
    load_tokenizer()
    counts = torch.zeros(vocab_size, dtype=torch.float32)
    rows_encoded = 0
    token_occurrences = 0
    for row in rows:
        q = (row.get("question") or "").strip()
        a = training_text((row.get("text") or row.get("answer") or "").strip())
        if not q and not a:
            continue
        text = f"{q}\n{a}" if q and a else (q or a)
        ids = encode(text, prepared=True)
        if not ids:
            continue
        rows_encoded += 1
        for tid in ids:
            if 0 <= tid < vocab_size:
                counts[tid] += 1
                token_occurrences += 1
    grid = _values_to_uint8_grid(counts, cols, rows_h, log_scale=True)
    return {
        "cols": cols,
        "rows": rows_h,
        "grid": grid,
        "unique_token_ids": int((counts > 0).sum().item()),
        "vocab_size": vocab_size,
        "corpus_rows_encoded": rows_encoded,
        "token_occurrences": token_occurrences,
        **grid_activity_stats(grid, active_threshold=10),
    }


def checkpoint_weight_pixel_map(state_dict: dict, *, cols: int = PIXEL_COLS, rows_h: int = PIXEL_ROWS) -> dict:
    return weight_grid_from_state_dict(state_dict, cols=cols, rows=rows_h)


def build_dashboard_insights(
    *,
    corpus: dict,
    pixel_maps: dict | None,
    rebuild: dict,
    pixel_meta: dict,
    training_history: list,
) -> dict:
    tok = (pixel_maps or {}).get("corpus_tokens") or {}
    wt = (pixel_maps or {}).get("checkpoint_weights") or {}
    meta = rebuild.get("meta") or {}
    pass_pct = None
    for row in reversed(training_history):
        if row.get("pass_pct") is not None:
            pass_pct = float(row["pass_pct"])
            break

    vocab_size = tok.get("vocab_size") or 12288
    unique = tok.get("unique_token_ids") or 0
    vocab_cov = round(100.0 * unique / max(1, vocab_size), 1)
    wt_active = wt.get("active_cells_pct") or grid_activity_stats(wt.get("grid") or [[0]])["active_cells_pct"]

    full_target = corpus.get("target_trainable_full_rebuild") or 0
    short_n = (corpus.get("row_counts") or {}).get("short") or 0
    packs_only = pixel_meta.get("corpus_scope") == "packs_only"
    epoch_done = int(meta.get("epoch_done") or 0)
    epochs_planned = int(meta.get("epochs_planned") or meta.get("epochs") or 40)
    epoch_prog = round(100.0 * epoch_done / max(1, epochs_planned), 1)

    needle_score = min(100.0, (pass_pct or 0) / PASS_BAR * 100.0) if pass_pct is not None else 0.0
    strength = round(
        min(
            100.0,
            needle_score * 0.45 + vocab_cov * 0.2 + wt_active * 0.2 + epoch_prog * 0.15,
        ),
        0,
    )
    if strength < 25:
        strength_label = "Early stage"
    elif strength < 50:
        strength_label = "Learning"
    elif strength < 75:
        strength_label = "Developing"
    else:
        strength_label = "Strong (still below ship bar until needle ≥80%)"

    left: list[str] = []
    if packs_only and short_n:
        left.append(
            f"About {short_n:,} short-network lines are not in the current trainer mix (planned at lower weight)."
        )
    if pass_pct is None:
        left.append("No needle eval on this checkpoint yet — accuracy on fact recall is unknown.")
    elif pass_pct < PASS_BAR:
        left.append(f"Needle recall is {pass_pct:.1f}% — need {PASS_BAR:.0f}% before replacing the live chat brain.")
    if vocab_cov < 95:
        left.append(f"Roughly {100 - vocab_cov:.0f}% of BPE slots are unused by the frozen corpus (normal; not all ids appear in lessons).")
    if epoch_done < epochs_planned:
        left.append(f"Training schedule: {epoch_done}/{epochs_planned} epochs complete on this run.")

    weak: list[str] = []
    if pass_pct is not None and pass_pct < 15:
        weak.append("Needle recall is very low — the model rarely returns exact taught answers on the sample eval.")
    if wt_active < 35:
        weak.append("Many weight cells are still dim — the network has large regions with small magnitudes (typical early in training).")
    if (wt.get("cold_bottom_rows") or 0) >= 2:
        weak.append("Weight map has a cold band at the bottom — some parameter groups are barely active in the snapshot.")
    if pass_pct is not None and pass_pct < PASS_BAR and (pass_pct or 0) < 10:
        weak.append("Ship criterion not met: rebuild stays offline until eval improves.")

    lede = (
        f"This rebuild is at the “{strength_label}” stage (score {strength:.0f}/100). "
        f"The left map shows which word-pieces your lessons use; the right map shows how strong the trained numbers are. "
    )
    if pass_pct is not None:
        lede += f"On needle checks it gets about {pass_pct:.1f}% of sample facts exactly right (goal {PASS_BAR:.0f}%)."
    else:
        lede += "Run an eval epoch to measure fact recall."

    return {
        "strength_score": strength,
        "strength_label": strength_label,
        "vocab_coverage_pct": vocab_cov,
        "weight_active_pct": wt_active,
        "epoch_progress_pct": epoch_prog,
        "needle_pass_pct": pass_pct,
        "lede": lede,
        "left_to_learn": left,
        "weak_points": weak,
        "meters": {
            "corpus_vocab": {"label": "Lesson text covers vocabulary", "pct": vocab_cov},
            "weights_alive": {"label": "Weights above noise floor", "pct": wt_active},
            "training_epochs": {"label": "Epochs on this run", "pct": epoch_prog},
            "needle_recall": {"label": "Needle recall vs ship bar", "pct": pass_pct},
        },
    }


def downsample_matrix(t: torch.Tensor, out_h: int = 64, out_w: int = 64) -> list[list[float]]:
    x = t.detach().float().cpu()
    if x.dim() == 1:
        x = x.unsqueeze(0)
    if x.dim() > 2:
        x = x.reshape(x.shape[0], -1)
    h, w = x.shape
    ys = torch.linspace(0, h - 1, out_h).long()
    xs = torch.linspace(0, w - 1, out_w).long()
    grid = x[ys][:, xs]
    return [[round(float(v), 5) for v in row] for row in grid.tolist()]


def arch_from_cfg(cfg: dict) -> dict:
    fields = {k: cfg[k] for k in TierConfig.__dataclass_fields__ if k in cfg}
    if "name" not in fields:
        fields["name"] = cfg.get("tier") or "L"
    tier = TierConfig(**fields)
    est = tier.param_estimate()
    groups = [
        {"name": "Token embedding (tied)", "params": tier.vocab_size * tier.d_model},
        {"name": "Position embedding", "params": tier.max_seq_len * tier.d_model},
        {
            "name": f"Transformer blocks ×{tier.n_layers}",
            "params": est - tier.vocab_size * tier.d_model - tier.max_seq_len * tier.d_model,
        },
    ]
    return {
        "tier": tier.name,
        "n_layers": tier.n_layers,
        "d_model": tier.d_model,
        "n_heads": tier.n_heads,
        "d_ff": tier.d_ff,
        "max_seq_len": tier.max_seq_len,
        "vocab_size": tier.vocab_size,
        "params_estimate": est,
        "param_groups": groups,
    }


def _lab_deep_library_counts() -> dict:
    """Same notion as neural_lab left chip: built-in SCIENCE_LIBRARY merge + taught_facts rows."""
    import re

    import train_stage3 as t
    from corpus_inventory import load_science_core

    taught_rows = t._extract_taught_library((ROOT / "taught_facts.js").read_text())
    teaching = len([r for r in taught_rows if (r.get("text") or "").strip()])
    seen: set[tuple] = set()
    built = 0
    for row in load_science_core():
        if not (row.get("text") or "").strip():
            continue
        seen.add((row.get("category"), row.get("id")))
        built += 1
    for path in sorted(ROOT.glob("*_facts.js")):
        if path.name == "taught_facts.js":
            continue
        text = path.read_text()
        blob = text[text.index("[") : text.rindex("]") + 1]
        blob = re.sub(r",(\s*[\]}])", r"\1", blob)
        rows = json.loads(blob)
        for row in rows:
            if not (row.get("text") or "").strip():
                continue
            key = (row.get("category"), row.get("id"))
            if key in seen:
                continue
            seen.add(key)
            built += 1
    return {
        "lab_built_in": built,
        "lab_teaching": teaching,
        "lab_deep_total": built + teaching,
        "note": "Matches neural_lab knowledge-count: SCIENCE_LIBRARY merge + taught_facts.js (chat library, not trainer-only Q+A).",
    }


def _short_network_meta() -> dict:
    meta_path = ROOT / "short_added.meta.js"
    if not meta_path.is_file():
        return {}
    m = re.search(r"SHORT_ADDED_STATS\s*=\s*(\{[\s\S]*?\})\s*;", meta_path.read_text())
    if not m:
        return {}
    return json.loads(m.group(1))


def corpus_snapshot(*, packs_only: bool = False) -> dict:
    import train_stage3 as t

    rows = load_frozen_corpus_rows(include_core=True, include_short=not packs_only)
    counts = corpus_counts(rows)
    packs = [{"file": p.name, "bytes": p.stat().st_size} for p in sorted(ROOT.glob("*_facts.js"))]
    pack_rows = load_eval_rows()
    all_qa = t.teachable_lesson_rows()
    taught_ids = {r.get("id") for r in t._extract_taught_library((ROOT / "taught_facts.js").read_text())}
    taught_qa = sum(1 for r in all_qa if r.get("id") in taught_ids)
    pack_qa = len(all_qa) - taught_qa
    short_meta = _short_network_meta()
    growth_path = ROOT / "versions" / "corpus-growth-status.json"
    growth = {}
    if growth_path.is_file():
        try:
            growth = json.loads(growth_path.read_text())
        except json.JSONDecodeError:
            growth = {}
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "growth_status": growth,
        "lab_library": _lab_deep_library_counts(),
        "row_counts": counts,
        "trainer": {
            "all_question_answer_rows": len(all_qa),
            "fact_pack_trainable": len(pack_rows),
            "after_restricted_exclusion": len(pack_rows),
            "include_restricted_categories": True,
            "pack_and_wiki_qa": pack_qa,
            "taught_qa": taught_qa,
            "science_core_derived": counts.get("science_core", 0),
            "short_lines_rebuild": counts.get("short", 0),
            "note_qa": "Trainer requires question + answer. Lab built-in counts any row with text (includes statement-only core).",
        },
        "small_network": {
            "lesson_total": short_meta.get("lessonTotal"),
            "added_lines": short_meta.get("addedLines"),
            "builtin_lines": short_meta.get("builtinLines"),
            "note": "Small network (think_network / short_added.js). Owner plan: train into rebuild deep net at lower weight — not in phase-2 packs-only run.",
        },
        "total_rows": len(rows),
        "eval_eligible_packs": len(pack_rows),
        "fact_files": packs,
        "target_trainable_full_rebuild": counts.get("fact_pack", 0)
        + counts.get("science_core", 0)
        + counts.get("short", 0),
        "target_trainable_packs_only": counts.get("fact_pack", 0) + counts.get("science_core", 0),
    }


def load_training_history() -> list[dict]:
    hist: list[dict] = []
    live = VERSIONS / "network-live.json"
    if live.is_file():
        try:
            hist = json.loads(live.read_text()).get("history") or []
        except json.JSONDecodeError:
            pass
    for p in sorted(VERSIONS.glob("stage3_brain.joint*.eval.json")):
        try:
            data = json.loads(p.read_text())
            meta = data.get("meta") or {}
            ev = data.get("eval") or {}
            hist.append(
                {
                    "source": p.name,
                    "epoch": meta.get("epoch_done"),
                    "pass_pct": ev.get("pass_pct"),
                    "loss": meta.get("last_loss"),
                }
            )
        except json.JSONDecodeError:
            continue
    return hist


def export_checkpoint(path: Path, *, write_embeddings: bool = True, corpus_rows: list | None = None) -> dict:
    load_tokenizer()
    ckpt = torch.load(path, map_location="cpu", weights_only=False)
    meta = ckpt.get("meta") or {}
    cfg = meta.get("cfg") or TIERS["L"].__dict__
    state = ckpt["model"]
    arch = arch_from_cfg(cfg)

    layers = []
    heatmaps = {}
    for key, ten in sorted(state.items()):
        layers.append({"key": key, **tensor_stats(ten)})
        if ten.dim() == 1 and ten.numel() >= 32:
            heatmaps[key] = downsample_matrix(ten.unsqueeze(0), out_h=4, out_w=64)
        elif ten.dim() >= 2 and ten.numel() > 256:
            heatmaps[key] = downsample_matrix(ten)

    emb = state.get("token_emb.weight")
    token_norms: list[float] = []
    token_preview: list[dict] = []
    token_vector_preview: dict[str, list[float]] = {}
    if emb is not None:
        norms = emb.float().norm(dim=1)
        token_norms = [round(float(n), 5) for n in norms.tolist()]
        if write_embeddings:
            flat = emb.detach().cpu().float().numpy().astype("float32")
            EMBED_BIN.write_bytes(flat.tobytes())
        for tid in range(min(int(cfg.get("vocab_size", 12288)), 12288)):
            if tid % 97 != 0 and tid > 400:
                continue
            try:
                piece = decode([tid])
            except Exception:
                piece = f"<{tid}>"
            token_preview.append({"id": tid, "text": piece, "norm": token_norms[tid] if tid < len(token_norms) else 0})
        token_preview.sort(key=lambda x: -x["norm"])
        token_preview = token_preview[:120]
        d_model = int(emb.shape[1])
        idx = torch.linspace(0, max(0, d_model - 1), min(96, d_model)).long()
        for row in token_preview:
            tid = int(row["id"])
            if tid >= emb.shape[0]:
                continue
            vec = emb[tid].float().cpu()[idx]
            token_vector_preview[str(tid)] = [round(float(v), 5) for v in vec.tolist()]

    pixel_maps: dict | None = None
    if corpus_rows is not None:
        vs = int(cfg.get("vocab_size", arch.get("vocab_size") or 12288))
        pixel_maps = {
            "corpus_tokens": corpus_token_pixel_map(corpus_rows, vs),
            "checkpoint_weights": checkpoint_weight_pixel_map(state),
        }

    return {
        "checkpoint": _rel(path),
        "meta": meta,
        "architecture": arch,
        "tensors": layers,
        "heatmaps": heatmaps,
        "token_norms": token_norms,
        "token_preview": token_preview,
        "token_vector_preview": token_vector_preview,
        "heatmap_keys": sorted(heatmaps.keys()),
        "acceptance_bar_pct": PASS_BAR,
        "pixel_maps": pixel_maps,
    }


def legacy_brain_summary() -> dict:
    learned = ROOT / "stage3_learned.json"
    brain = ROOT / "stage3_brain.js"
    out = {"live_brain": brain.name if brain.is_file() else None, "bytes": brain.stat().st_size if brain.is_file() else 0}
    if learned.is_file():
        data = json.loads(learned.read_text())
        ids = data.get("ids") or []
        out["installed_ids"] = len(ids)
        out["learned_file"] = learned.name
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--checkpoint", type=Path, default=VERSIONS / "stage3_brain.joint.L-packs-2026-10-24.pt")
    ap.add_argument(
        "--packs-only-corpus",
        action="store_true",
        help="omit short_added from corpus stats (default: show full rebuild target incl. short)",
    )
    ap.add_argument("--no-embeddings-bin", action="store_true")
    ap.add_argument("--write-js", action="store_true", default=True)
    args = ap.parse_args()

    corp_rows = load_frozen_corpus_rows(include_core=True, include_short=not args.packs_only_corpus)
    snap = {
        "schema": "midel-network-dashboard/v1",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "corpus": corpus_snapshot(packs_only=args.packs_only_corpus),
        "legacy": legacy_brain_summary(),
        "training_history": load_training_history(),
        "rebuild": None,
        "pixel_maps_meta": {
            "corpus_scope": "packs_only" if args.packs_only_corpus else "full_rebuild",
            "corpus_rows_on_disk": len(corp_rows),
            "grid": f"{PIXEL_COLS}×{PIXEL_ROWS}",
            "note": "Each dot = one cell; left maps BPE vocab mass from frozen rows, right maps |weight| in checkpoint.",
        },
    }
    heatmaps_blob: dict = {}
    if args.checkpoint.is_file():
        full_rebuild = export_checkpoint(
            args.checkpoint,
            write_embeddings=not args.no_embeddings_bin,
            corpus_rows=corp_rows,
        )
        heatmaps_blob = full_rebuild.pop("heatmaps", {}) or {}
        snap["rebuild"] = full_rebuild
        snap["dashboard_insights"] = build_dashboard_insights(
            corpus=snap["corpus"],
            pixel_maps=full_rebuild.get("pixel_maps"),
            rebuild=full_rebuild,
            pixel_meta=snap["pixel_maps_meta"],
            training_history=snap["training_history"],
        )
    else:
        snap["rebuild"] = {"error": f"missing checkpoint {args.checkpoint}"}

    SNAPSHOT.write_text(json.dumps({**snap, "rebuild": {**snap["rebuild"], "heatmaps": heatmaps_blob}}, indent=2) + "\n")
    print(f"wrote {SNAPSHOT.relative_to(ROOT)}")

    SUMMARY.write_text(json.dumps(snap, indent=2) + "\n")
    print(f"wrote {SUMMARY.relative_to(ROOT)}")
    if heatmaps_blob:
        HEATMAPS.write_text(json.dumps(heatmaps_blob) + "\n")
        print(f"wrote {HEATMAPS.relative_to(ROOT)} ({HEATMAPS.stat().st_size // 1024} KB)")

    live_path = VERSIONS / "network-live.json"
    if args.checkpoint.is_file():
        meta = snap["rebuild"].get("meta") or {}
        arch = snap["rebuild"].get("architecture") or {}
        existing: dict = {}
        if live_path.is_file():
            try:
                existing = json.loads(live_path.read_text())
            except json.JSONDecodeError:
                existing = {}
        if existing.get("status") == "training":
            pass  # trainer owns live file while running
        else:
            hist = snap.get("training_history") or existing.get("history") or []
            last_pass = None
            for row in reversed(hist):
                if row.get("pass_pct") is not None:
                    last_pass = row["pass_pct"]
                    break
            live_path.write_text(
                json.dumps(
                    {
                        "updatedAt": snap["generatedAt"],
                        "status": existing.get("status") or "idle",
                        "tier": arch.get("tier") or meta.get("tier"),
                        "epoch_done": meta.get("epoch_done"),
                        "epochs_planned": meta.get("epochs_planned") or meta.get("epochs"),
                        "last_loss": meta.get("last_loss"),
                        "pass_pct": last_pass,
                        "checkpoint": snap["rebuild"].get("checkpoint"),
                        "history": hist,
                        "acceptance_bar_pct": PASS_BAR,
                    },
                    indent=2,
                )
                + "\n"
            )

    if args.write_js:
        DATA_JS.write_text(
            "/* auto-generated by export_network_dashboard.py — do not edit */\n"
            f"var NETWORK_DASHBOARD_SUMMARY = {json.dumps(snap)};\n",
            encoding="utf-8",
        )
        print(f"wrote {DATA_JS.name} ({DATA_JS.stat().st_size // 1024} KB)")
        if TOKENIZER_JSON.is_file():
            TOKENIZER_JS.write_text(
                "/* auto-generated by export_network_dashboard.py — BPE v2 merges for dashboard encode */\n"
                f"var MIDEL_TOKENIZER_V2 = {TOKENIZER_JSON.read_text()};\n",
                encoding="utf-8",
            )
            print(f"wrote {TOKENIZER_JS.name} ({TOKENIZER_JS.stat().st_size // 1024} KB)")

    if not args.no_embeddings_bin and args.checkpoint.is_file() and EMBED_BIN.is_file():
        print(f"wrote {EMBED_BIN.name} ({EMBED_BIN.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
