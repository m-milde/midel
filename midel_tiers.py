# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Rebuild architecture tiers (DEEP_NETWORK_REBUILD_PLAN §4.2)."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TierConfig:
    name: str
    n_layers: int
    d_model: int
    n_heads: int
    max_seq_len: int
    ff_mult: int = 4
    vocab_size: int = 12288
    tied_embeddings: bool = True

    @property
    def d_ff(self) -> int:
        return self.d_model * self.ff_mult

    def param_estimate(self) -> int:
        """Rough parameter count (tied embedding counted once)."""
        v, d, ff = self.vocab_size, self.d_model, self.d_ff
        embed = v * d
        per_layer = 4 * d * d + 2 * d * ff  # attn out + ffn
        blocks = self.n_layers * per_layer
        pos = self.max_seq_len * d
        return embed + blocks + pos


TIERS = {
    "S": TierConfig("S", n_layers=6, d_model=192, n_heads=6, max_seq_len=256),
    "M": TierConfig("M", n_layers=8, d_model=256, n_heads=8, max_seq_len=256),
    "L": TierConfig("L", n_layers=10, d_model=384, n_heads=12, max_seq_len=256),
}
