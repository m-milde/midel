# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Detect new/changed lesson files and sync chat + PyTorch training sources.

  npm run corpus:grow
  npm run corpus:grow -- --refresh-manifest
  npm run corpus:grow -- --sync-packs-only
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))

from corpus_inventory import run_inventory, write_freeze_manifest  # noqa: E402
from midel_data import (  # noqa: E402
    corpus_counts,
    corpus_drift_report,
    latest_corpus_manifest,
    load_frozen_corpus_rows,
    load_trial_rows,
)

STATUS_PATH = ROOT / "versions" / "corpus-growth-status.json"
RELEASE_GROWTH_PCT = 5.0  # DEEP_NETWORK_REBUILD_PLAN §5.6


def _rel(p: Path) -> str:
    try:
        return str(p.relative_to(ROOT))
    except ValueError:
        return str(p)


def sync_pack_manifest() -> bool:
    r = subprocess.run(
        [sys.executable, str(ROOT / "save_taught.py"), "--sync-packs"],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        print(r.stderr or r.stdout, file=sys.stderr)
        raise SystemExit(r.returncode)
    if r.stdout.strip():
        print(r.stdout.strip())
    return True


def teachable_rows_now() -> int:
    return len(load_trial_rows())


def baseline_rows_from_manifest(manifest_path: Path | None) -> int | None:
    if not manifest_path or not manifest_path.is_file():
        return None
    data = json.loads(manifest_path.read_text())
    inv = data.get("inventory") or {}
    totals = inv.get("totals") or {}
    if totals.get("fact_packs_trainable") is not None:
        return int(totals["fact_packs_trainable"])
    if totals.get("fact_packs_trainable_after_restricted_exclusion") is not None:
        return int(totals["fact_packs_trainable_after_restricted_exclusion"])
    return None


def main() -> None:
    ap = argparse.ArgumentParser(description="Sync packs + report corpus growth for deep network releases")
    ap.add_argument(
        "--sync-packs-only",
        action="store_true",
        help="only refresh pack_manifest.js and neural_lab.html script tags",
    )
    ap.add_argument(
        "--refresh-manifest",
        action="store_true",
        help="write a new versions/corpus-manifest-YYYY-MM-DD.json for the next joint run",
    )
    ap.add_argument(
        "--manifest",
        type=Path,
        default=None,
        help="compare against this manifest (default: newest corpus-manifest-*.json)",
    )
    ap.add_argument("--json", type=Path, default=STATUS_PATH, help="write status JSON (default: versions/corpus-growth-status.json)")
    args = ap.parse_args()

    manifest_ref = args.manifest or latest_corpus_manifest() or (ROOT / "versions" / "corpus-manifest-2026-10-23.json")

    sync_pack_manifest()
    if args.sync_packs_only:
        raise SystemExit(0)

    drift = corpus_drift_report(manifest_ref)
    inv = run_inventory()
    teachable = teachable_rows_now()
    baseline = baseline_rows_from_manifest(manifest_ref)
    full_rows = corpus_counts(load_frozen_corpus_rows(include_core=True, include_short=True))
    full_total = sum(full_rows.values())

    growth_pct = None
    release_recommended = False
    if baseline and baseline > 0:
        growth_pct = round(100.0 * max(0, teachable - baseline) / baseline, 2)
        release_recommended = growth_pct >= RELEASE_GROWTH_PCT

    new_manifest_path = None
    if args.refresh_manifest:
        date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        new_manifest_path = write_freeze_manifest(date, inv)
        manifest_ref = new_manifest_path
        drift = corpus_drift_report(manifest_ref)
        baseline = teachable_rows_now()
        growth_pct = 0.0
        release_recommended = False

    next_steps: list[str] = []
    if drift.get("new_files"):
        next_steps.append(
            "New pack file(s) on disk — chat loads them after pack_manifest sync (done). "
            "Run with --refresh-manifest before the next joint train."
        )
    if drift.get("hash_mismatch"):
        next_steps.append(
            "Edited lesson file(s) since last freeze — run npm run corpus:grow -- --refresh-manifest, then joint-train."
        )
    if release_recommended:
        next_steps.append(
            f"Growth ≥{RELEASE_GROWTH_PCT:.0f}% since last manifest — schedule a consolidation joint run (§5.6)."
        )
    if not next_steps:
        next_steps.append("Library and manifest aligned enough for continued training; chat uses all *_facts.js via glob.")

    status = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "manifest_reference": _rel(manifest_ref),
        "pack_manifest_synced": True,
        "disk_fact_files": drift.get("disk_files"),
        "manifest_fact_files": drift.get("manifest_files"),
        "new_files": drift.get("new_files") or [],
        "removed_files": drift.get("removed_files") or [],
        "hash_mismatch": drift.get("hash_mismatch") or [],
        "teachable_fact_rows": teachable,
        "teachable_at_manifest_baseline": baseline,
        "growth_pct_since_baseline": growth_pct,
        "release_recommended": release_recommended,
        "full_rebuild_row_counts": full_rows,
        "full_rebuild_total_rows": full_total,
        "trainer_discovery": "PyTorch and train_stage3 load every *_facts.js by folder glob (not pack_manifest.js).",
        "chat_discovery": "neural_lab loads packs listed in pack_manifest.js (synced above).",
        "new_manifest_written": _rel(new_manifest_path) if new_manifest_path else None,
        "next_steps": next_steps,
    }

    args.json.parent.mkdir(parents=True, exist_ok=True)
    args.json.write_text(json.dumps(status, indent=2) + "\n")

    print("\nCORPUS GROWTH")
    print(f"  teachable fact rows now: {teachable}")
    if baseline is not None:
        print(f"  baseline at manifest:  {baseline}  (Δ {teachable - baseline:+d}, {growth_pct}%)")
    print(f"  full rebuild target:   {full_total} rows {full_rows}")
    if drift.get("new_files"):
        print(f"  NEW files: {', '.join(drift['new_files'])}")
    if drift.get("hash_mismatch"):
        print(f"  CHANGED files: {', '.join(drift['hash_mismatch'])}")
    if new_manifest_path:
        print(f"  wrote freeze manifest: {new_manifest_path.relative_to(ROOT)}")
    print(f"  status JSON: {args.json.relative_to(ROOT)}")
    for line in next_steps:
        print(f"  → {line}")

    if drift.get("new_files") or drift.get("hash_mismatch"):
        if not args.refresh_manifest:
            raise SystemExit(2)
    raise SystemExit(0)


if __name__ == "__main__":
    main()
