# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Train byte-level BPE on frozen corpus (runbook step 6)."""

from __future__ import annotations

import argparse
import importlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import train_stage3 as t  # noqa: E402
from midel_bpe import MidelBPE, save_tokenizer  # noqa: E402
from midel_tokenizer_v2 import prepare_text  # noqa: E402
from training_text import training_text  # noqa: E402

# Keep in sync with scripts/corpus-inventory.py
RESTRICTED_CATEGORY_RE = re.compile(r"swear|\bweed\b|controlled substances", re.I)


def restricted(category: str) -> bool:
    return bool(RESTRICTED_CATEGORY_RE.search(category or ""))


def derive_question(text: str) -> str:
    text = (text or "").strip()
    if not text:
        return ""
    qm = text.find("?")
    if qm >= 0:
        return text[: qm + 1].strip()
    lead = re.match(
        r"^(?:(?:the|a|an)\s+)?(.{1,90}?)\s+(is|are|was|were|has|have)\b",
        text,
        re.I,
    )
    if lead:
        subject = lead.group(1).strip().rstrip(".,;:!?")
        aux = "are" if re.match(r"^(are|were)$", lead.group(2), re.I) else "is"
        return f"What {aux} {subject}?"
    return f"What is {' '.join(text.split()[:4]).rstrip('.,;:!?')}?"


def qa_string(question: str, answer: str) -> str:
    return prepare_text(f"{question.strip()} {training_text(answer.strip())}".strip())


def collect_strings() -> list[str]:
    sys.path.insert(0, str(ROOT / "scripts"))
    ci = importlib.import_module("corpus_inventory")
    out: list[str] = []
    for row in t.load_fact_packs():
        q = (row.get("question") or "").strip()
        a = (row.get("text") or "").strip()
        if not a or restricted(row.get("category") or ""):
            continue
        if not q:
            q = derive_question(a)
        if q:
            out.append(qa_string(q, a))
            out.append(prepare_text(training_text(a)))
    for row in ci.load_science_core():
        a = (row.get("text") or "").strip()
        if not a:
            continue
        q = derive_question(a)
        if q:
            out.append(qa_string(q, a))
            out.append(prepare_text(training_text(a)))
    seen = set()
    for line in ci.load_short_added_lines():
        text = str(line or "").strip()
        if not text or text.lower() in seen:
            continue
        seen.add(text.lower())
        q = derive_question(text)
        if q:
            out.append(qa_string(q, text))
            out.append(prepare_text(training_text(text)))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vocab-size", type=int, default=12288, help="target vocab (max 16384)")
    ap.add_argument("--train-sample", type=int, default=12000, help="random subset size for BPE merge training")
    ap.add_argument("--out", type=Path, default=ROOT / "versions" / "midel-tokenizer-v2.json")
    ap.add_argument("--manifest", type=Path, default=ROOT / "versions" / "corpus-manifest-2026-10-23.json")
    args = ap.parse_args()

    texts = collect_strings()
    if not texts:
        raise SystemExit("no training strings collected")
    print(f"training BPE on {len(texts)} strings, target vocab {args.vocab_size}…", flush=True)
    bpe = MidelBPE.train(texts, args.vocab_size, sample_size=args.train_sample)
    meta = {
        "trainedAt": datetime.now(timezone.utc).isoformat(),
        "corpusStrings": len(texts),
        "manifest": args.manifest.name if args.manifest.exists() else None,
        "prepare": "lowercase + strip thousands commas in numbers (midel_tokenizer_v2.prepare_text)",
        "normalization": "training-text-v1 before prepare",
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    save_tokenizer(args.out, bpe, meta)
    dated = args.out.with_name(args.out.stem + "-2026-10-23" + args.out.suffix)
    if dated != args.out:
        save_tokenizer(dated, bpe, meta)
    print(f"vocab size {bpe.vocab_size}  wrote {args.out.relative_to(ROOT)}", flush=True)
    if dated != args.out:
        print(f"  copy {dated.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    main()
