# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""100-step trainer benchmark (runbook step 8)."""

from __future__ import annotations

import argparse
import json
import random
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import train_stage3 as t  # noqa: E402
from midel_tiers import TIERS  # noqa: E402
from midel_tokenizer_v2 import encode, load as load_tokenizer  # noqa: E402


def sample_qa_strings(n: int, *, seed: int = 7) -> list[str]:
    rng = random.Random(seed)
    rows = t.teachable_lesson_rows()[:2000]
    out = []
    while len(out) < n:
        row = rng.choice(rows)
        q = (row.get("question") or "").strip()
        a = (row.get("text") or "").strip()
        packed = t.pack_qa(q, a)
        if packed:
            out.append(packed[0])
    return out


def sample_token_batches(strings: list[str], batch_size: int, max_len: int):
    batches = []
    i = 0
    while i < len(strings):
        batch = []
        for _ in range(batch_size):
            if i >= len(strings):
                break
            ids = encode(strings[i])
            i += 1
            if len(ids) > max_len:
                ids = ids[-max_len:]
            if len(ids) >= 8:
                batch.append(ids)
        if batch:
            batches.append(batch)
    return batches


def pad_batch(batch: list[list[int]], pad_id: int = 0):
    m = max(len(x) for x in batch)
    out = []
    for seq in batch:
        out.append(seq + [pad_id] * (m - len(seq)))
    return out


def bench_numpy(steps: int, batch_size: int, seed: int) -> dict:
    """Legacy NumPy trainer (current 128-context arch — not tier M)."""
    model = t.load_installed()
    strings = sample_qa_strings(steps, seed=seed)
    t0 = time.perf_counter()
    losses = []
    for text in strings[:steps]:
        ids, answer_at = t.encode_ids(model, text, 0)
        if len(ids) < 2:
            continue
        loss, top, layer_grads = model.loss_and_backward(ids, answer_from=answer_at)
        model.apply(top, layer_grads, 0.001)
        losses.append(float(loss))
    elapsed = time.perf_counter() - t0
    n = max(1, len(losses))
    return {
        "backend": "numpy",
        "trainer": "train_stage3.py (legacy Stage3)",
        "architecture": f"{t.N_LAYERS}x{t.D_MODEL} heads={t.N_HEADS} max_len={t.MAX_LEN}",
        "params": int(sum(v.size for v in model.params.values()) + sum(x.size for layer in model.layers for x in layer.values())),
        "steps": n,
        "batch_size": 1,
        "seconds_total": round(elapsed, 3),
        "seconds_per_step": round(elapsed / n, 4),
        "mean_loss": round(sum(losses) / n, 4),
        "note": "Legacy stack only; tier M is not implemented in NumPy.",
    }


def pick_device():
    import torch

    if torch.backends.mps.is_available():
        return torch.device("mps")
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def bench_torch(steps: int, batch_size: int, tier: str, seed: int) -> dict:
    import torch
    from midel_torch import MidelLM

    cfg = TIERS[tier]
    load_tokenizer()
    device = pick_device()
    torch.manual_seed(seed)
    model = MidelLM(cfg).to(device)
    opt = torch.optim.AdamW(model.parameters(), lr=3e-4)
    strings = sample_qa_strings(steps * batch_size, seed=seed)
    batches = sample_token_batches(strings, batch_size, min(128, cfg.max_seq_len))
    if not batches:
        raise SystemExit("no training batches for torch benchmark")
    # warmup
    warm = pad_batch(batches[0])
    ids = torch.tensor(warm, dtype=torch.long, device=device)
    model.loss_on_batch(ids).backward()
    opt.step()
    if device.type == "mps":
        torch.mps.synchronize()
    elif device.type == "cuda":
        torch.cuda.synchronize()

    t0 = time.perf_counter()
    losses = []
    for batch in batches[:steps]:
        padded = pad_batch(batch)
        ids = torch.tensor(padded, dtype=torch.long, device=device)
        opt.zero_grad(set_to_none=True)
        loss = model.loss_on_batch(ids)
        loss.backward()
        opt.step()
        losses.append(float(loss.detach().cpu()))
        if device.type == "mps":
            torch.mps.synchronize()
        elif device.type == "cuda":
            torch.cuda.synchronize()
    elapsed = time.perf_counter() - t0
    n = max(1, len(losses))
    return {
        "backend": "pytorch",
        "trainer": "midel_torch.py (rebuild)",
        "tier": tier,
        "architecture": f"{cfg.n_layers}x{cfg.d_model} heads={cfg.n_heads} ff={cfg.d_ff} max_len={cfg.max_seq_len} tied={cfg.tied_embeddings}",
        "vocab_size": cfg.vocab_size,
        "params": model.count_params(),
        "params_estimate": cfg.param_estimate(),
        "device": str(device),
        "steps": n,
        "batch_size": batch_size,
        "seq_len_approx": "variable padded (≤128 tokens from corpus)",
        "seconds_total": round(elapsed, 3),
        "seconds_per_step": round(elapsed / n, 4),
        "mean_loss": round(sum(losses) / n, 4),
    }


def extrapolate_joint(seconds_per_step: float, *, lessons: int = 10026, variants: int = 5, epochs: int = 60) -> dict:
    steps = lessons * variants * epochs
    hours = seconds_per_step * steps / 3600
    return {
        "assumed_lessons": lessons,
        "variants_per_lesson": variants,
        "epochs": epochs,
        "training_steps_estimate": steps,
        "hours_estimate": round(hours, 2),
        "days_estimate": round(hours / 24, 2),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--steps", type=int, default=100)
    ap.add_argument("--batch-size", type=int, default=4)
    ap.add_argument("--tier", default="M", choices=sorted(TIERS))
    ap.add_argument("--numpy", action="store_true", help="include legacy NumPy benchmark")
    ap.add_argument("--torch-only", action="store_true")
    ap.add_argument("--out", type=Path, default=ROOT / "versions" / "trainer-benchmark-2026-10-23.json")
    args = ap.parse_args()

    report = {
        "runbookStep": 8,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "stepsRequested": args.steps,
        "batchSize": args.batch_size,
        "tier": args.tier,
        "benchmarks": [],
    }
    if not args.torch_only:
        try:
            report["benchmarks"].append(bench_numpy(args.steps, 1, seed=7))
        except Exception as e:
            report["benchmarks"].append({"backend": "numpy", "error": str(e)})
    try:
        torch_row = bench_torch(args.steps, args.batch_size, args.tier, seed=7)
        report["benchmarks"].append(torch_row)
        per_seq = torch_row["seconds_per_step"] / max(1, args.batch_size)
        report["jointTimeEstimate"] = extrapolate_joint(per_seq)
        report["jointTimeEstimate"]["note"] = (
            "Assumes one pack_qa sequence per step (batch_size normalized). PyTorch MPS, tier M."
        )
    except ImportError:
        report["benchmarks"].append(
            {
                "backend": "pytorch",
                "error": "torch not installed — create .venv-torch and pip install -r requirements-torch.txt",
            }
        )
    except Exception as e:
        report["benchmarks"].append({"backend": "pytorch", "error": str(e)})

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(report, indent=2) + "\n")
    print(f"wrote {args.out.relative_to(ROOT)}", flush=True)
    for b in report["benchmarks"]:
        if "error" in b:
            print(f"  {b['backend']}: ERROR {b['error']}", flush=True)
            continue
        print(
            f"  {b['backend']}: {b.get('architecture', b.get('tier', ''))} "
            f"{b['seconds_per_step']} s/step ({b['steps']} steps, device={b.get('device', 'cpu')})",
            flush=True,
        )
    j = report.get("jointTimeEstimate")
    if j:
        print(
            f"  rough full-joint estimate (tier {args.tier}): ~{j['hours_estimate']} h "
            f"({j['training_steps_estimate']} steps @ current batch=1 equivalent)",
            flush=True,
        )


if __name__ == "__main__":
    main()
