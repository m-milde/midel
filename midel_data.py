# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Training corpus rows for PyTorch rebuild (frozen-corpus rules)."""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))

import train_stage3 as t  # noqa: E402
from corpus_inventory import (  # noqa: E402
    derive_question,
    load_science_core,
    load_short_added_lines,
    restricted_category,
)
from midel_tokenizer_v2 import encode  # noqa: E402
from training_text import training_text  # noqa: E402

RESTRICTED_CATEGORY_RE = re.compile(r"swear|\bweed\b|controlled substances", re.I)

CORE_ID_BASE = 300_000
SHORT_ID_BASE = 400_000


def restricted(category: str) -> bool:
    return bool(RESTRICTED_CATEGORY_RE.search(category or "")) or restricted_category(category)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def verify_frozen_manifest(manifest_path: Path) -> dict:
    data = json.loads(manifest_path.read_text())
    for ent in data.get("files") or []:
        rel = ent["path"]
        p = ROOT / rel
        if not p.is_file():
            raise SystemExit(f"manifest missing file: {rel}")
        got = sha256_file(p)
        want = ent["sha256"]
        if got != want:
            raise SystemExit(f"manifest hash mismatch {rel}\n  want {want}\n  got  {got}")
    return data


def pack_qa_ids(question: str, answer: str, *, max_len: int = 256) -> tuple[list[int], int] | None:
    q = (question or "").strip()
    a = training_text((answer or "").strip())
    if not q or not a:
        return None
    q_ids = encode(q)
    full = encode(f"{q} {a}")
    q_len = len(q_ids)
    if q_len >= len(full):
        return None
    if len(full) > max_len:
        drop = len(full) - max_len
        full = full[-max_len:]
        q_len = max(0, q_len - drop)
    if q_len >= len(full):
        return None
    return full, q_len


def load_trial_rows(*, limit: int | None = None, skip_restricted: bool = True) -> list[dict]:
    rows = []
    for row in t.teachable_lesson_rows():
        if skip_restricted and restricted(row.get("category") or ""):
            continue
        rows.append({**row, "source": row.get("source") or "fact_pack"})
    rows.sort(key=lambda r: int(r.get("id") or 0))
    if limit is not None:
        rows = rows[:limit]
    return rows


def load_eval_rows(*, skip_restricted: bool = True) -> list[dict]:
    """Fact-pack lessons only (real ids) for needle eval / install record."""
    return load_trial_rows(limit=None, skip_restricted=skip_restricted)


def _row_from_statement(row: dict, *, source: str, id_base: int, index: int) -> dict | None:
    answer = (row.get("text") or "").strip()
    if not answer:
        return None
    question = (row.get("question") or "").strip()
    if not question:
        question = derive_question(answer)
    if not question:
        return None
    category = row.get("category") or ""
    if restricted(category):
        return None
    return {
        **row,
        "id": id_base + index,
        "question": question,
        "text": answer,
        "category": category,
        "source": source,
    }


def load_science_core_rows() -> list[dict]:
    out = []
    for i, row in enumerate(load_science_core()):
        if not isinstance(row, dict):
            continue
        built = _row_from_statement(row, source="science_core", id_base=CORE_ID_BASE, index=i)
        if built:
            out.append(built)
    return out


def load_short_rows() -> list[dict]:
    out = []
    seen: set[str] = set()
    idx = 0
    for line in load_short_added_lines():
        text = str(line or "").strip()
        if not text:
            continue
        key = text.lower()
        if key in seen:
            continue
        seen.add(key)
        built = _row_from_statement(
            {"text": text, "category": "Small network"},
            source="short",
            id_base=SHORT_ID_BASE,
            index=idx,
        )
        if built:
            out.append(built)
            idx += 1
    return out


def load_frozen_corpus_rows(
    *,
    include_core: bool = True,
    include_short: bool = True,
    skip_restricted: bool = True,
) -> list[dict]:
    rows = load_trial_rows(limit=None, skip_restricted=skip_restricted)
    if include_core:
        rows = rows + load_science_core_rows()
    if include_short:
        rows = rows + load_short_rows()
    return rows


def build_training_items(
    rows: list[dict],
    *,
    max_len: int = 256,
    short_weight: float = 0.25,
) -> list[tuple[list[int], int, int, float]]:
    """(token ids, answer_start, lesson id, loss weight)"""
    items: list[tuple[list[int], int, int, float]] = []
    for row in rows:
        q = (row.get("question") or "").strip()
        a = (row.get("text") or "").strip()
        rid = int(row.get("id"))
        source = row.get("source") or "fact_pack"
        weight = short_weight if source == "short" else 1.0
        variants = [q] if source == "short" else t.prompt_variants(q)
        for variant in variants:
            packed = pack_qa_ids(variant, a, max_len=max_len)
            if packed:
                ids, ans_at = packed
                items.append((ids, ans_at, rid, weight))
    return items


def corpus_counts(rows: list[dict]) -> dict[str, int]:
    c: dict[str, int] = {}
    for row in rows:
        src = row.get("source") or "fact_pack"
        c[src] = c.get(src, 0) + 1
    return c
