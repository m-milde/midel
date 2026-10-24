# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Minimal causal transformer for rebuild training benchmarks (PyTorch)."""

from __future__ import annotations

import math

import torch
import torch.nn as nn
import torch.nn.functional as F

from midel_tiers import TierConfig


class MidelBlock(nn.Module):
    def __init__(self, cfg: TierConfig):
        super().__init__()
        d = cfg.d_model
        ff = cfg.d_ff
        self.ln1 = nn.LayerNorm(d)
        self.attn = nn.MultiheadAttention(d, cfg.n_heads, batch_first=True)
        self.ln2 = nn.LayerNorm(d)
        self.ff = nn.Sequential(
            nn.Linear(d, ff),
            nn.GELU(),
            nn.Linear(ff, d),
        )

    def forward(self, x: torch.Tensor, attn_mask: torch.Tensor) -> torch.Tensor:
        h = self.ln1(x)
        a, _ = self.attn(h, h, h, attn_mask=attn_mask, need_weights=False)
        x = x + a
        x = x + self.ff(self.ln2(x))
        return x


class MidelLM(nn.Module):
    def __init__(self, cfg: TierConfig):
        super().__init__()
        self.cfg = cfg
        self.token_emb = nn.Embedding(cfg.vocab_size, cfg.d_model)
        self.pos_emb = nn.Embedding(cfg.max_seq_len, cfg.d_model)
        self.blocks = nn.ModuleList([MidelBlock(cfg) for _ in range(cfg.n_layers)])
        self.ln_f = nn.LayerNorm(cfg.d_model)

    def forward(self, ids: torch.Tensor) -> torch.Tensor:
        b, t = ids.shape
        pos = torch.arange(t, device=ids.device)
        x = self.token_emb(ids) + self.pos_emb(pos)[None, :, :]
        mask = torch.triu(torch.ones(t, t, device=ids.device, dtype=torch.bool), diagonal=1)
        for block in self.blocks:
            x = block(x, mask)
        x = self.ln_f(x)
        logits = F.linear(x, self.token_emb.weight)
        return logits

    def loss_on_batch(
        self,
        ids: torch.Tensor,
        answer_starts: torch.Tensor | None = None,
        *,
        pad_id: int = 0,
        sample_weights: torch.Tensor | None = None,
        answer_focus_len: int = 0,
        answer_focus_boost: float = 2.0,
    ) -> torch.Tensor:
        logits = self.forward(ids[:, :-1])
        targets = ids[:, 1:]
        vloss = F.cross_entropy(
            logits.reshape(-1, logits.size(-1)),
            targets.reshape(-1),
            reduction="none",
        ).view(ids.size(0), -1)
        mask = (targets != pad_id).float()
        if answer_starts is not None:
            mask = torch.zeros_like(mask)
            for b in range(ids.size(0)):
                start = int(answer_starts[b].item())
                if start > 0:
                    ans_idx = max(0, start - 1)
                    mask[b, ans_idx:] = 1.0
                    if answer_focus_len > 0:
                        end = min(mask.size(1), ans_idx + answer_focus_len)
                        mask[b, ans_idx:end] *= answer_focus_boost
        mask = mask * (targets != pad_id).float()
        per_seq = (vloss * mask).sum(dim=1) / mask.sum(dim=1).clamp_min(1.0)
        if sample_weights is not None:
            w = sample_weights.to(per_seq.dtype)
            return (per_seq * w).sum() / w.sum().clamp_min(1e-6)
        return per_seq.mean()

    def count_params(self) -> int:
        return sum(p.numel() for p in self.parameters())


def causal_train_step(model: MidelLM, ids: torch.Tensor, opt: torch.optim.Optimizer) -> float:
    opt.zero_grad(set_to_none=True)
    loss = model.loss_on_batch(ids)
    loss.backward()
    opt.step()
    return float(loss.detach().cpu())
