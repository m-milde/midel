# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""UTF-8 byte-level BPE with integer token ids (trainer + midel_tokenizer_v2)."""

from __future__ import annotations

import json
import random
from collections import Counter
from pathlib import Path

BASE_VOCAB = 256


def merge_in_doc(doc: list[int], pair: tuple[int, int], new_id: int) -> list[int]:
    if len(doc) < 2:
        return doc
    a, b = pair
    out: list[int] = []
    i = 0
    while i < len(doc):
        if i < len(doc) - 1 and doc[i] == a and doc[i + 1] == b:
            out.append(new_id)
            i += 2
        else:
            out.append(doc[i])
            i += 1
    return out


def doc_has_pair(doc: list[int], pair: tuple[int, int]) -> bool:
    a, b = pair
    for i in range(len(doc) - 1):
        if doc[i] == a and doc[i + 1] == b:
            return True
    return False


class MidelBPE:
    def __init__(self, merges: list[tuple[int, int]] | None = None):
        self.merges: list[tuple[int, int]] = list(merges or [])
        self._merge_ranks = {pair: i for i, pair in enumerate(self.merges)}
        self._token_bytes = self._build_token_bytes()

    def _build_token_bytes(self) -> list[bytes]:
        tb = [bytes([i]) for i in range(BASE_VOCAB)]
        for a, b in self.merges:
            tb.append(tb[a] + tb[b])
        return tb

    @property
    def vocab_size(self) -> int:
        return BASE_VOCAB + len(self.merges)

    def encode(self, text: str) -> list[int]:
        ids = list(text.encode("utf-8"))
        if len(ids) < 2:
            return ids
        while True:
            pairs = {(ids[i], ids[i + 1]) for i in range(len(ids) - 1)}
            ranked = [(self._merge_ranks[p], p) for p in pairs if p in self._merge_ranks]
            if not ranked:
                break
            _rank, best = min(ranked)
            new_id = BASE_VOCAB + self._merge_ranks[best]
            ids = merge_in_doc(ids, best, new_id)
        return ids

    def decode(self, ids: list[int]) -> str:
        chunks = [self._token_bytes[i] for i in ids]
        return b"".join(chunks).decode("utf-8", errors="replace")

    def to_json(self) -> dict:
        return {
            "byteLevel": True,
            "encoding": "utf-8-raw-bytes",
            "merges": [[a, b] for a, b in self.merges],
            "vocabSize": self.vocab_size,
        }

    @classmethod
    def from_json(cls, data: dict) -> MidelBPE:
        merges = [tuple(m) for m in data.get("merges", [])]
        return cls(merges=merges)

    @classmethod
    def train(
        cls,
        texts: list[str],
        vocab_size: int,
        *,
        sample_size: int = 12000,
        seed: int = 7,
    ) -> MidelBPE:
        target = max(BASE_VOCAB, min(vocab_size, 16384))
        pool = [t for t in texts if t]
        if len(pool) > sample_size:
            rng = random.Random(seed)
            pool = rng.sample(pool, sample_size)
        corpus = [list(t.encode("utf-8")) for t in pool]
        merges: list[tuple[int, int]] = []
        while BASE_VOCAB + len(merges) < target:
            stats: Counter[tuple[int, int]] = Counter()
            for doc in corpus:
                for i in range(len(doc) - 1):
                    stats[(doc[i], doc[i + 1])] += 1
            if not stats:
                break
            pair = stats.most_common(1)[0][0]
            new_id = BASE_VOCAB + len(merges)
            merges.append(pair)
            if len(merges) % 500 == 0:
                print(f"  merge {len(merges)} vocab {BASE_VOCAB + len(merges)}…", flush=True)
            corpus = [
                merge_in_doc(doc, pair, new_id) if doc_has_pair(doc, pair) else doc for doc in corpus
            ]
        return cls(merges=merges)


def save_tokenizer(path: Path, bpe: MidelBPE, meta: dict) -> None:
    payload = {"version": 2, "name": "midel-utf8-byte-bpe", **meta, **bpe.to_json()}
    path.write_text(json.dumps(payload, indent=2) + "\n")


def load_tokenizer(path: Path) -> tuple[MidelBPE, dict]:
    data = json.loads(path.read_text())
    return MidelBPE.from_json(data), data
