# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Training copy normalization — keep in sync with training_text.js (DEEP_NETWORK_REBUILD_PLAN §5.4)."""

from __future__ import annotations

import re

TRAINING_TEXT_VERSION = 1

TRAINING_SYMBOL_WORDS = [
    ("×", " times "),
    ("÷", " divided by "),
    ("−", " minus "),
    ("–", " minus "),
    ("—", " "),
    ("±", " plus or minus "),
    ("√", " square root of "),
    ("π", " pi "),
    ("≤", " at most "),
    ("≥", " at least "),
    ("²", " squared"),
    ("³", " cubed"),
    ("%", " percent"),
]


def training_text(answer: str) -> str:
    s = str(answer or "")
    s = s.replace("**", "")
    s = s.replace("\r\n", "\n")
    parts = []
    for line in s.split("\n"):
        line = re.sub(r"^\s*[-*•]\s+", "", line).strip()
        if line:
            parts.append(line)
    s = ". ".join(parts)
    s = re.sub(r"\.+", ".", s)
    for sym, word in TRAINING_SYMBOL_WORDS:
        s = s.replace(sym, word)
    s = re.sub(r"(\d)\s*/\s*(\d)", r"\1 divided by \2", s)
    s = re.sub(r"\s+", " ", s).strip()
    if s and not re.search(r"[.!?]$", s):
        s += "."
    return s
