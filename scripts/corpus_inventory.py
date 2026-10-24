# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Read-only training corpus inventory (rebuild runbook step 4).

Lists every source, row counts, trainable vs excluded (with reason), and optional
corpus freeze manifest with per-file SHA-256 hashes.

  npm run corpus:inventory
  npm run corpus:inventory -- --freeze 2026-10-23  (scripts/corpus_inventory.py)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import train_stage3 as t  # noqa: E402

TOKENIZER_VERSION = "byte-bpe-v2"

try:
    from training_text import TRAINING_TEXT_VERSION as _TTV  # noqa: E402

    NORMALIZATION_VERSION = f"training-text-v{_TTV}"
except ImportError:
    NORMALIZATION_VERSION = "none"

# Legacy exclusion rule (optional --exclude-restricted). Deep rebuild trains all categories by default.
RESTRICTED_CATEGORY_RE = re.compile(r"swear|\bweed\b|controlled substances", re.I)

SCIENCE_CORE_MARKER = "var SCIENCE_LIBRARY ="
SHORT_ADDED_MARKER = "var SHORT_ADDED ="


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _extract_js_array(text: str, marker: str) -> list:
    pos = text.find(marker)
    if pos < 0:
        raise ValueError(f"missing {marker}")
    start = text.find("{", pos) if marker.endswith("SHORT_ADDED") else text.find("[", pos)
    if marker.endswith("SHORT_ADDED"):
        # object with "added": [ ... ]
        m = re.search(r'"added"\s*:\s*\[', text[pos:])
        if not m:
            raise ValueError("SHORT_ADDED.added")
        start = pos + m.start() + len(m.group(0)) - 1
    depth = 0
    i = start
    in_str = None
    esc = False
    open_ch, close_ch = ("[", "]") if text[start] == "[" else ("{", "}")
    while i < len(text):
        ch = text[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        elif ch in ('"', "'"):
            in_str = ch
        elif ch == open_ch:
            depth += 1
        elif ch == close_ch:
            depth -= 1
            if depth == 0:
                blob = text[start : i + 1]
                lines = [line for line in blob.splitlines() if not line.strip().startswith("//")]
                blob = "\n".join(lines)
                blob = re.sub(r",(\s*[\]}])", r"\1", blob)
                return json.loads(blob)
        i += 1
    raise ValueError(f"unclosed array after {marker}")


def load_science_core() -> list[dict]:
    text = (ROOT / "science_library.js").read_text()
    rows = _extract_js_array(text, SCIENCE_CORE_MARKER)
    return [r for r in rows if isinstance(r, dict)]


def load_short_added_lines() -> list[str]:
    text = (ROOT / "short_added.js").read_text()
    pos = text.find(SHORT_ADDED_MARKER)
    if pos < 0:
        return []
    m = re.search(r'"added"\s*:\s*\[', text[pos:])
    if not m:
        return []
    start = pos + m.start() + len(m.group(0)) - 1
    depth = 0
    i = start
    in_str = None
    esc = False
    while i < len(text):
        ch = text[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        elif ch in ('"', "'"):
            in_str = ch
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                blob = text[start : i + 1]
                lines = [line for line in blob.splitlines() if not line.strip().startswith("//")]
                blob = "\n".join(lines)
                blob = re.sub(r",(\s*[\]}])", r"\1", blob)
                return json.loads(blob)
        i += 1
    return []


def derive_question(text: str) -> str:
    """Same rule as libSuggestQuestionForFact / shortSuggestionFacts (statement-only)."""
    text = (text or "").strip()
    if not text:
        return ""
    qm = text.find("?")
    if qm >= 0:
        return text[: qm + 1].strip().replace("  ", " ")
    lead = re.match(
        r"^(?:(?:the|a|an)\s+)?(.{1,90}?)\s+(is|are|was|were|has|have|contains?|includes?|means?|refers?|describes?|represents?|occurs?|happens?|forms?|causes?|consists?|lies|stands|reaches|measures|weighs|lives|became|founded|born|known)\b",
        text,
        re.I,
    )
    if lead:
        subject = lead.group(1).strip().rstrip(".,;:!?")
        aux = "are" if re.match(r"^(are|were)$", lead.group(2), re.I) else "is"
        return f"What {aux} {subject}?"
    words = text.split()
    subject = " ".join(words[:4]).rstrip(".,;:!?")
    return f"What is {subject}?" if subject else ""


def restricted_category(category: str) -> bool:
    return bool(RESTRICTED_CATEGORY_RE.search(category or ""))


def classify_row(
    row: dict, *, source: str, exclude_restricted: bool = False
) -> tuple[str | None, str | None]:
    """Returns (status, exclude_reason). status: trainable | excluded."""
    question = (row.get("question") or "").strip()
    answer = (row.get("text") or "").strip()
    category = row.get("category") or ""
    if not answer:
        return "excluded", "no answer text"
    if not question:
        question = derive_question(answer)
        if not question:
            return "excluded", "no question (could not derive)"
        row = {**row, "question": question, "_derived_question": True}
    if exclude_restricted and restricted_category(category):
        return "excluded", "restricted category (library-only)"
    return "trainable", None


def inventory_fact_file(path: Path, *, exclude_restricted: bool = False) -> dict:
    text = path.read_text()
    if path.name == "taught_facts.js":
        rows = t._extract_taught_library(text)
    else:
        blob = text[text.index("[") : text.rindex("]") + 1]
        blob = re.sub(r",(\s*[\]}])", r"\1", blob)
        rows = json.loads(blob)
    stats = Counter()
    reasons = Counter()
    for row in rows:
        if not isinstance(row, dict):
            stats["unparsable"] += 1
            continue
        stats["rows_read"] += 1
        status, reason = classify_row(row, source=path.name, exclude_restricted=exclude_restricted)
        if status == "trainable":
            stats["trainable"] += 1
        else:
            stats["excluded"] += 1
            reasons[reason or "excluded"] += 1
    return {
        "file": path.name,
        "source": "fact_pack",
        "rows_read": stats["rows_read"],
        "trainable": stats["trainable"],
        "excluded": stats["excluded"],
        "unparsable": stats.get("unparsable", 0),
        "exclude_reasons": dict(reasons),
    }


def inventory_science_core(*, exclude_restricted: bool = False) -> dict:
    rows = load_science_core()
    stats = Counter()
    reasons = Counter()
    for row in rows:
        stats["rows_read"] += 1
        status, reason = classify_row(
            row, source="science_library.js", exclude_restricted=exclude_restricted
        )
        if status == "trainable":
            stats["trainable"] += 1
        else:
            stats["excluded"] += 1
            reasons[reason or "excluded"] += 1
    return {
        "file": "science_library.js (SCIENCE_LIBRARY core)",
        "source": "science_core",
        "rows_read": stats["rows_read"],
        "trainable": stats["trainable"],
        "excluded": stats["excluded"],
        "exclude_reasons": dict(reasons),
    }


def inventory_short_added(*, exclude_restricted: bool = False) -> dict:
    lines = load_short_added_lines()
    stats = Counter()
    reasons = Counter()
    seen = set()
    for line in lines:
        text = str(line or "").strip()
        if not text:
            continue
        key = text.lower()
        if key in seen:
            stats["duplicate_line"] += 1
            continue
        seen.add(key)
        stats["rows_read"] += 1
        row = {"text": text, "category": "Small network", "source": "short"}
        status, reason = classify_row(row, source="short_added.js", exclude_restricted=exclude_restricted)
        if status == "trainable":
            stats["trainable"] += 1
        else:
            stats["excluded"] += 1
            reasons[reason or "excluded"] += 1
    return {
        "file": "short_added.js (SHORT_ADDED.added)",
        "source": "short_added",
        "rows_read": stats["rows_read"],
        "trainable": stats["trainable"],
        "excluded": stats["excluded"],
        "duplicate_lines_skipped": stats.get("duplicate_line", 0),
        "exclude_reasons": dict(reasons),
        "note": "Rebuild: train with lower weight than full lessons (not in manifest totals until trainer implements).",
    }


def run_inventory(*, exclude_restricted: bool = False) -> dict:
    fact_paths = sorted(ROOT.glob("*_facts.js"))
    lines = []
    for path in fact_paths:
        try:
            lines.append(inventory_fact_file(path, exclude_restricted=exclude_restricted))
        except (json.JSONDecodeError, ValueError) as e:
            print(f"FAIL {path.name}: {e}", file=sys.stderr)
            raise SystemExit(1) from e
    lines.append(inventory_science_core(exclude_restricted=exclude_restricted))
    lines.append(inventory_short_added(exclude_restricted=exclude_restricted))

    pack_trainable = sum(x["trainable"] for x in lines if x["source"] == "fact_pack")
    pack_excluded = sum(x["excluded"] for x in lines if x["source"] == "fact_pack")
    pack_read = sum(x["rows_read"] for x in lines if x["source"] == "fact_pack")

    # Cross-check: trainer teachable rows today (fact packs only, no restriction filter yet)
    trainer_teachable = len(t.teachable_lesson_rows())
    trainer_rows = len(t.load_fact_packs())

    totals = {
        "fact_packs_rows_read": pack_read,
        "fact_packs_trainable": pack_trainable,
        "fact_packs_trainable_current_trainer": trainer_teachable,
        "fact_packs_trainable_after_restricted_exclusion": pack_trainable
        if exclude_restricted
        else None,
        "fact_packs_excluded": pack_excluded,
        "exclude_restricted_categories": exclude_restricted,
        "science_core_trainable": next(x["trainable"] for x in lines if x["source"] == "science_core"),
        "short_added_trainable": next(x["trainable"] for x in lines if x["source"] == "short_added"),
        "planned_trainable_all_sources": pack_trainable
        + next(x["trainable"] for x in lines if x["source"] == "science_core")
        + next(x["trainable"] for x in lines if x["source"] == "short_added"),
    }

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "tokenizerVersion": TOKENIZER_VERSION,
        "normalizationVersion": NORMALIZATION_VERSION,
        "restrictedRule": RESTRICTED_CATEGORY_RE.pattern,
        "include_restricted_categories": not exclude_restricted,
        "sources": lines,
        "totals": totals,
        "trainerCrossCheck": {
            "load_fact_packs_rows": trainer_rows,
            "teachable_lesson_rows": trainer_teachable,
            "delta_trainable_vs_inventory_packs": trainer_teachable - pack_trainable,
        },
    }


def print_report(inv: dict) -> None:
    print("CORPUS INVENTORY (read-only)")
    print(f"  tokenizer: {inv['tokenizerVersion']}  normalization: {inv['normalizationVersion']}")
    if inv.get("include_restricted_categories"):
        print("  restricted categories: included in trainable counts (deep rebuild default)")
    else:
        print(f"  restricted: /{inv['restrictedRule']}/i excluded from training (--exclude-restricted)")
    print()
    for src in inv["sources"]:
        print(
            f"  {src['file']:<42} read {src['rows_read']:>6}  trainable {src['trainable']:>6}  excluded {src['excluded']:>5}"
        )
        for reason, n in sorted((src.get("exclude_reasons") or {}).items(), key=lambda x: -x[1]):
            print(f"      - {reason}: {n}")
    t = inv["totals"]
    print()
    print(f"  fact packs trainable: {t['fact_packs_trainable']}")
    if t.get("fact_packs_trainable_after_restricted_exclusion") is not None:
        print(
            f"  fact packs trainable (legacy restricted exclusion): "
            f"{t['fact_packs_trainable_after_restricted_exclusion']}"
        )
    print(f"  + science core: {t['science_core_trainable']}  + short_added: {t['short_added_trainable']}")
    print(f"  planned trainable (all sources): {t['planned_trainable_all_sources']}")
    chk = inv["trainerCrossCheck"]
    if chk["delta_trainable_vs_inventory_packs"] != 0:
        print(
            f"  WARN trainer teachable {chk['teachable_lesson_rows']} vs inventory packs {t['fact_packs_trainable']} "
            f"(delta {chk['delta_trainable_vs_inventory_packs']})"
        )


def write_freeze_manifest(freeze_date: str, inv: dict) -> Path:
    fact_files = sorted(ROOT.glob("*_facts.js"))
    extra = [ROOT / "science_library.js", ROOT / "short_added.js", ROOT / "short_added.meta.js"]
    file_hashes = []
    for path in fact_files + extra:
        if not path.exists():
            continue
        file_hashes.append(
            {
                "path": path.name,
                "bytes": path.stat().st_size,
                "sha256": sha256_file(path),
            }
        )
    manifest = {
        "frozenDate": freeze_date,
        "frozenAt": datetime.now(timezone.utc).isoformat(),
        "runbook": "DEEP_NETWORK_REBUILD_PLAN.md §5.5",
        "tokenizerVersion": TOKENIZER_VERSION,
        "normalizationVersion": NORMALIZATION_VERSION,
        "preRebuildBaselines": "versions/pre-rebuild-steps-0-2-2026-10-23.json",
        "files": file_hashes,
        "inventory": inv,
        "notes": [
            "Train only from this snapshot; do not replace live brain without passing Section 7 acceptance.",
            "Pause wiki batches and per-lesson learn-new during joint training on this manifest.",
            "Deep rebuild trains all fact-pack categories unless --exclude-restricted is used.",
        ],
    }
    out = ROOT / "versions" / f"corpus-manifest-{freeze_date}.json"
    out.write_text(json.dumps(manifest, indent=2) + "\n")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--freeze", metavar="YYYY-MM-DD", help="write versions/corpus-manifest-DATE.json with file hashes")
    ap.add_argument("--json", metavar="PATH", help="write inventory JSON to PATH")
    ap.add_argument(
        "--exclude-restricted",
        action="store_true",
        help="count swear/weed/controlled-substance categories as non-trainable (legacy policy)",
    )
    args = ap.parse_args()

    inv = run_inventory(exclude_restricted=args.exclude_restricted)
    print_report(inv)

    if args.json:
        Path(args.json).write_text(json.dumps(inv, indent=2) + "\n")
        print(f"\nwrote inventory {args.json}")

    if args.freeze:
        out = write_freeze_manifest(args.freeze, inv)
        print(f"\nFREEZE manifest: {out.relative_to(ROOT)}")

    # Fail if any fact pack could not be parsed (already exited) or totals inconsistent
    if inv["trainerCrossCheck"]["load_fact_packs_rows"] != inv["totals"]["fact_packs_rows_read"]:
        print(
            f"\nFAIL row count mismatch: load_fact_packs {inv['trainerCrossCheck']['load_fact_packs_rows']} "
            f"vs inventory {inv['totals']['fact_packs_rows_read']}",
            file=sys.stderr,
        )
        raise SystemExit(1)
    raise SystemExit(0)


if __name__ == "__main__":
    main()
