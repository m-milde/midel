# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Public encode/decode API for rebuild tokenizer v2 (trainer + tests)."""

from __future__ import annotations

from pathlib import Path

from midel_bpe import MidelBPE, load_tokenizer

DEFAULT_TOKENIZER_PATH = Path(__file__).resolve().parent / "versions" / "midel-tokenizer-v2.json"

_bpe: MidelBPE | None = None
_meta: dict | None = None


def prepare_text(text: str) -> str:
    """Match training convention: lowercase + thousands comma strip (extends word-v1)."""
    import re

    s = (text or "").lower()
    return re.sub(r"(\d),(?=\d)", r"\1", s)


def load(path: Path | str | None = None) -> MidelBPE:
    global _bpe, _meta
    p = Path(path) if path else DEFAULT_TOKENIZER_PATH
    _bpe, _meta = load_tokenizer(p)
    return _bpe


def get_bpe() -> MidelBPE:
    if _bpe is None:
        load()
    assert _bpe is not None
    return _bpe


def encode(text: str, *, prepared: bool = False) -> list[int]:
    s = text if prepared else prepare_text(text)
    return get_bpe().encode(s)


def decode(ids: list[int]) -> str:
    return get_bpe().decode(ids)


def encode_tokens(text: str, *, prepared: bool = False) -> list[str]:
    s = text if prepared else prepare_text(text)
    return get_bpe().encode_tokens(s)
