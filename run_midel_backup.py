#!/usr/bin/env python3
# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.
"""Midel backup pipeline: refresh MODEL.md, rebuild PDF, pack deploy + dev zips."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

from pack_midel_backup import brain_complete, pack_archives
from save_taught import ensure_short_meta_file, pack_names, write_manifest
from pack_midel_backup import (
    pack_manifest_version,
    stamp_pack_manifest_cache_bust,
    stamp_short_meta_cache_bust,
    stamp_taught_facts_cache_bust,
    taught_facts_version,
)

ROOT = Path(__file__).resolve().parent
PYTHON = ROOT / ".venv" / "bin" / "python"
MODEL = ROOT / "MODEL.md"
PAGE = ROOT / "neural_lab.html"


def load_brain() -> tuple[dict, int]:
    path = ROOT / "stage3_brain.js"
    raw = path.read_text(errors="replace")
    payload = json.loads(raw.split("=", 1)[1].strip().rstrip(";"))
    return payload, path.stat().st_size


def param_count(obj) -> int:
    if isinstance(obj, list):
        if not obj:
            return 0
        if isinstance(obj[0], list):
            return sum(param_count(row) for row in obj)
        return len(obj)
    return 1


def brain_weights(payload: dict) -> int:
    total = 0
    for key in ("E", "P", "lnF_g", "lnF_b", "Whead"):
        total += param_count(payload[key])
    for layer in payload.get("layers", []):
        for value in layer.values():
            total += param_count(value)
    return total


def stamp_brain_version(vocab_n: int) -> None:
    if not PAGE.exists():
        return
    needle = f"stage3_brain.js?v={vocab_n}"
    text = PAGE.read_text()
    updated = re.sub(r"stage3_brain\.js(?:\?v=\d+)?", needle, text, count=1)
    if updated != text:
        PAGE.write_text(updated)


def stamp_short_meta_version(lesson_total: int) -> None:
    if not PAGE.exists() or lesson_total <= 0:
        return
    text = PAGE.read_text(encoding="utf-8")
    updated = stamp_short_meta_cache_bust(text, lesson_total)
    if updated != text:
        PAGE.write_text(updated, encoding="utf-8")


def stamp_pack_manifest_version() -> None:
    if not PAGE.exists():
        return
    version = pack_manifest_version()
    text = PAGE.read_text(encoding="utf-8")
    updated = stamp_pack_manifest_cache_bust(text, version)
    if updated != text:
        PAGE.write_text(updated, encoding="utf-8")


def refresh_model_md(vocab: int, size: int, weights: int, deploy_name: str | None, dev_name: str | None) -> None:
    text = MODEL.read_text()
    today = date.today().strftime("%d %B %Y")
    size_fmt = f"{size:,}"
    weights_fmt = f"{weights:,}"

    text = re.sub(r"Updated \d+ \w+ \d{4}", f"Updated {today}", text, count=1)

    text = re.sub(
        r"Installed file: `stage3_brain\.js` \([\d,]+ bytes\)\. The page loads it as `stage3_brain\.js\?v=\d+`\. "
        r"A successful `--learn-new` updates that number to the new vocabulary size so a reload does not keep the previous weights\. "
        r"The load diagram counts \*\*[\d,]+\*\* weights\.",
        f"Installed file: `stage3_brain.js` ({size_fmt} bytes). The page loads it as `stage3_brain.js?v={vocab}`. "
        f"A successful `--learn-new` updates that number to the new vocabulary size so a reload does not keep the previous weights. "
        f"The load diagram counts **{weights_fmt}** weights.",
        text,
    )

    text = re.sub(r"\| Vocabulary \| \d+ \|", f"| Vocabulary | {vocab} |", text)

    text = re.sub(
        r"\| `stage3_brain\.js` \| Installed deep weights\. Vocabulary \d+\. [\d,]+ bytes\. [\d,]+ weights\. \|",
        f"| `stage3_brain.js` | Installed deep weights. Vocabulary {vocab}. {size_fmt} bytes. {weights_fmt} weights. |",
        text,
    )

    if deploy_name and dev_name:
        text = re.sub(
            r"The latest pair is `dist/[^`]+` \(FTP\) and `dist/[^`]+` \(dev\)\.[^\n]*",
            f"The latest pair is `dist/{deploy_name}` (FTP) and `dist/{dev_name}` (dev). Older zips in `dist/` stay as history.",
            text,
        )

    MODEL.write_text(text)


def run_py(script: str) -> None:
    exe = PYTHON if PYTHON.is_file() else Path(sys.executable)
    subprocess.run([str(exe), str(ROOT / script)], cwd=ROOT, check=True)


def main() -> int:
    if not brain_complete():
        print("stage3_brain.js is missing or incomplete; wait for --learn-new to finish.", file=sys.stderr)
        return 1

    payload, size = load_brain()
    vocab = len(payload["i2w"])
    weights = brain_weights(payload)
    stamp_brain_version(vocab)
    short_meta = ensure_short_meta_file()
    lesson_total = int((short_meta or {}).get("lessonTotal") or 0)
    stamp_short_meta_version(lesson_total)
    refresh_model_md(vocab, size, weights, None, None)

    print("refreshed MODEL.md brain stats", flush=True)
    if lesson_total:
        print(f"synced short_added.meta.js lessonTotal={lesson_total}", flush=True)
    run_py("build_network_guide.py")
    write_manifest(pack_names())
    stamp_pack_manifest_version()
    if PAGE.exists():
        text = PAGE.read_text(encoding="utf-8")
        updated = stamp_taught_facts_cache_bust(text, taught_facts_version())
        if updated != text:
            PAGE.write_text(updated, encoding="utf-8")
    print("synced pack_manifest.js", flush=True)

    deploy_zip, dev_zip = pack_archives()
    refresh_model_md(vocab, size, weights, deploy_zip.name, dev_zip.name)

    print("wrote", deploy_zip, "bytes", deploy_zip.stat().st_size, flush=True)
    print("wrote", dev_zip, "bytes", dev_zip.stat().st_size, flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
