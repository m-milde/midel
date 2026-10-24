# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""PyTorch rebuild trainer — joint trial (step 9) and full joint (step 10). Never writes live stage3_brain.js."""

from __future__ import annotations

import argparse
import json
import math
import random
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import torch

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

import train_stage3 as t  # noqa: E402
from midel_data import (  # noqa: E402
    build_training_items,
    corpus_counts,
    load_eval_rows,
    load_frozen_corpus_rows,
    load_trial_rows,
    pack_qa_ids,
    verify_frozen_manifest,
)
from midel_tiers import TIERS  # noqa: E402
from midel_tokenizer_v2 import decode, encode, load as load_tokenizer  # noqa: E402
from midel_torch import MidelLM  # noqa: E402

PASS_BAR_PCT = 80.0
DEFAULT_MANIFEST = ROOT / "versions" / "corpus-manifest-2026-10-23.json"


def _rel_manifest(manifest: Path) -> str:
    try:
        return str(manifest.relative_to(ROOT))
    except ValueError:
        return str(manifest)


def pick_device():
    if torch.backends.mps.is_available():
        return torch.device("mps")
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def log(msg: str) -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)


def cosine_lr(epoch: int, total_epochs: int, peak: float, *, warmup_epochs: int = 1) -> float:
    if total_epochs <= 0:
        return peak
    warm = max(1, min(warmup_epochs, total_epochs // 10))
    if epoch < warm:
        return peak * (epoch + 1) / warm
    progress = (epoch - warm) / max(1, total_epochs - warm)
    return peak * 0.5 * (1.0 + math.cos(math.pi * progress))


def fmt_duration(sec: float) -> str:
    sec = max(0, int(sec))
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h}h{m:02d}m"
    if m:
        return f"{m}m{s:02d}s"
    return f"{s}s"


def pad_batch(batch: list[tuple[list[int], int, float]], pad_id: int = 0):
    max_t = max(len(x[0]) for x in batch)
    ids_rows = []
    starts = []
    weights = []
    for seq, ans, w in batch:
        ids_rows.append(seq + [pad_id] * (max_t - len(seq)))
        starts.append(min(ans, max_t - 1))
        weights.append(w)
    return (
        torch.tensor(ids_rows, dtype=torch.long),
        torch.tensor(starts, dtype=torch.long),
        torch.tensor(weights, dtype=torch.float32),
    )


def atomic_torch_save(payload: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    torch.save(payload, tmp)
    tmp.replace(path)


@torch.no_grad()
def greedy_continuation(model: MidelLM, prompt_ids: list[int], steps: int, device) -> list[int]:
    cfg = model.cfg
    ids = list(prompt_ids)
    for _ in range(steps):
        chunk = ids[-cfg.max_seq_len :]
        x = torch.tensor([chunk], dtype=torch.long, device=device)
        logits = model.forward(x)
        next_id = int(logits[0, -1].argmax().item())
        next_id = max(0, min(next_id, cfg.vocab_size - 1))
        ids.append(next_id)
    return ids


def fact_known_torch(model, question: str, needle: str, device) -> bool:
    if not needle:
        return False
    steps = t.continuation_steps_for_needle(needle)
    for prompt in t.prompt_variants(question)[:3]:
        ids = encode(prompt)
        out = greedy_continuation(model, ids, steps, device)
        text = decode(out).lower()
        if needle in text:
            return True
    return False


def eval_trial(
    model,
    rows: list[dict],
    device,
    *,
    label: str = "eval",
    log_every: int = 40,
) -> dict:
    ok = []
    drifted = []
    buckets = {k: {"tested": 0, "pass": 0} for k in ("short", "medium", "long", "over")}
    to_test = []
    for row in rows:
        q = (row.get("question") or "").strip()
        a = (row.get("text") or "").strip()
        if t.answer_needle(q, a):
            to_test.append(row)
    if to_test:
        log(f"{label}: needle-checking {len(to_test)} lessons …")
    t_eval = time.perf_counter()
    for ti, row in enumerate(to_test):
        q = (row.get("question") or "").strip()
        a = (row.get("text") or "").strip()
        needle = t.answer_needle(q, a)
        if not needle:
            continue
        packed = pack_qa_ids(q, a, max_len=model.cfg.max_seq_len)
        tok_n = len(packed[0]) if packed else 0
        bucket = t.length_bucket(tok_n, medium_max=128, long_max=256)
        buckets.setdefault(bucket, {"tested": 0, "pass": 0})
        buckets[bucket]["tested"] += 1
        rid = int(row["id"])
        if fact_known_torch(model, q, needle, device):
            ok.append(rid)
            buckets[bucket]["pass"] += 1
        else:
            drifted.append(rid)
        tested = len(ok) + len(drifted)
        if log_every > 0 and tested % log_every == 0:
            pct = 100.0 * len(ok) / tested
            elapsed = time.perf_counter() - t_eval
            eta = elapsed / tested * (len(to_test) - tested)
            log(
                f"{label}: {tested}/{len(to_test)} ({100 * tested / len(to_test):.0f}%) "
                f"pass {len(ok)} ({pct:.1f}%) eta {fmt_duration(eta)}"
            )
    tested = len(ok) + len(drifted)
    pct = 100.0 * len(ok) / tested if tested else 0.0
    bucket_pct = {
        k: round(100.0 * v["pass"] / v["tested"], 1) if v["tested"] else None for k, v in buckets.items()
    }
    return {
        "tested": tested,
        "pass": len(ok),
        "pass_pct": round(pct, 2),
        "drifted": drifted[:80],
        "buckets": buckets,
        "bucket_pass_pct": bucket_pct,
    }


def sample_eval_rows(all_rows: list[dict], n: int, seed: int) -> list[dict]:
    if n <= 0 or n >= len(all_rows):
        return list(all_rows)
    rng = random.Random(seed)
    return rng.sample(all_rows, n)


def run_epoch_batches(
    model: MidelLM,
    opt: torch.optim.Optimizer,
    items: list[tuple[list[int], int, int, float]],
    *,
    device: torch.device,
    batch_size: int,
    epoch: int,
    epochs_total: int,
    log_interval: int,
    answer_focus_len: int = 0,
) -> float:
    random.shuffle(items)
    losses: list[float] = []
    n_batches = (len(items) + batch_size - 1) // batch_size
    epoch_t0 = time.perf_counter()
    log(f"epoch {epoch + 1}/{epochs_total} start — {len(items)} packs, {n_batches} batches @ {batch_size}")
    for bi, i in enumerate(range(0, len(items), batch_size)):
        batch = items[i : i + batch_size]
        seqs = [(x[0], x[1], x[3]) for x in batch]
        ids, starts, weights = pad_batch(seqs)
        ids = ids.to(device)
        starts = starts.to(device)
        weights = weights.to(device)
        opt.zero_grad(set_to_none=True)
        loss = model.loss_on_batch(
            ids,
            starts,
            sample_weights=weights,
            answer_focus_len=answer_focus_len,
        )
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        opt.step()
        losses.append(float(loss.detach().cpu()))
        if device.type == "mps":
            torch.mps.synchronize()
        batch_no = bi + 1
        if log_interval > 0 and (batch_no % log_interval == 0 or batch_no == n_batches):
            elapsed = time.perf_counter() - epoch_t0
            pct = 100.0 * batch_no / n_batches
            eta = elapsed / batch_no * (n_batches - batch_no)
            bps = batch_no / elapsed if elapsed > 0 else 0.0
            log(
                f"epoch {epoch + 1}/{epochs_total} batch {batch_no}/{n_batches} ({pct:.0f}%) "
                f"loss {losses[-1]:.3f} avg {sum(losses) / len(losses):.3f} "
                f"{bps:.2f} batch/s eta {fmt_duration(eta)}"
            )
    mean_loss = sum(losses) / max(1, len(losses))
    log(f"epoch {epoch + 1}/{epochs_total} done — loss {mean_loss:.3f} in {fmt_duration(time.perf_counter() - epoch_t0)}")
    return mean_loss


def joint_trial(
    *,
    tier: str,
    lessons: int,
    epochs: int,
    out: Path,
    batch_size: int,
    lr: float,
    seed: int,
    log_interval: int = 100,
):
    load_tokenizer()
    cfg = TIERS[tier]
    device = pick_device()
    torch.manual_seed(seed)
    random.seed(seed)

    rows = load_trial_rows(limit=lessons)
    log(f"building training packs for {len(rows)} lessons …")
    t_pack = time.perf_counter()
    items = build_training_items(rows, max_len=cfg.max_seq_len)
    log(f"packs ready: {len(items)} in {fmt_duration(time.perf_counter() - t_pack)}")
    if not items:
        raise SystemExit("no training items")
    log(f"JOINT-TRIAL tier={tier} lessons={len(rows)} packs={len(items)} epochs={epochs} device={device}")

    model = MidelLM(cfg).to(device)
    log(f"model params ~{model.count_params() / 1e6:.1f}M")
    opt = torch.optim.AdamW(model.parameters(), lr=lr)
    t0 = time.perf_counter()
    for ep in range(epochs):
        run_epoch_batches(
            model,
            opt,
            items,
            device=device,
            batch_size=batch_size,
            epoch=ep,
            epochs_total=epochs,
            log_interval=log_interval,
        )
    train_sec = time.perf_counter() - t0
    payload = {
        "kind": "joint-trial",
        "tier": tier,
        "cfg": cfg.__dict__,
        "lessons": len(rows),
        "epochs": epochs,
        "epoch_done": epochs,
        "train_seconds": round(train_sec, 1),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "manifest": DEFAULT_MANIFEST.name,
        "tokenizer": "versions/midel-tokenizer-v2.json",
    }
    atomic_torch_save({"model": model.state_dict(), "meta": payload, "optimizer": opt.state_dict()}, out)
    print(f"wrote trial weights {out} ({out.stat().st_size // 1024} KB)", flush=True)

    eval_result = eval_trial(model, rows, device)
    print(
        f"TRIAL-EVAL {eval_result['pass']}/{eval_result['tested']} ({eval_result['pass_pct']:.1f}%)",
        flush=True,
    )
    for key in ("short", "medium", "long", "over"):
        b = eval_result["buckets"].get(key, {})
        if b.get("tested"):
            print(
                f"  bucket {key}: {b['pass']}/{b['tested']} ({eval_result['bucket_pass_pct'].get(key)}%)",
                flush=True,
            )
    eval_path = out.with_suffix(".eval.json")
    eval_path.write_text(json.dumps({"meta": payload, "eval": eval_result}, indent=2) + "\n")
    print(f"wrote {eval_path.name}", flush=True)
    return eval_result


def joint_full(
    *,
    tier: str,
    epochs: int,
    out: Path,
    batch_size: int,
    lr: float,
    seed: int,
    manifest: Path,
    checkpoint_every: int,
    eval_every: int,
    eval_sample: int,
    eval_full: bool,
    resume: Path | None,
    include_core: bool,
    include_short: bool,
    log_interval: int = 300,
    eval_log_every: int = 40,
    skip_eval_start: bool = False,
    lr_schedule: str = "cosine",
    answer_focus_len: int = 64,
):
    load_tokenizer()
    if manifest.is_file():
        verify_frozen_manifest(manifest)
        log(f"manifest OK {manifest.name}")
    else:
        log(f"WARN no manifest at {manifest} — skipping hash check")

    cfg = TIERS[tier]
    device = pick_device()
    torch.manual_seed(seed)
    random.seed(seed)

    log("loading frozen corpus rows …")
    corpus_rows = load_frozen_corpus_rows(include_core=include_core, include_short=include_short)
    counts = corpus_counts(corpus_rows)
    log(f"corpus rows {len(corpus_rows)} {counts}")
    log("building BPE training packs (~1–2 min) …")
    t_pack = time.perf_counter()
    items = build_training_items(corpus_rows, max_len=cfg.max_seq_len)
    log(f"training packs {len(items)} built in {fmt_duration(time.perf_counter() - t_pack)}")
    eval_all = load_eval_rows()
    eval_rows = sample_eval_rows(eval_all, eval_sample, seed) if eval_sample else eval_all

    if not items:
        raise SystemExit("no training items")

    epoch_start = 0
    model = MidelLM(cfg).to(device)
    opt = torch.optim.AdamW(model.parameters(), lr=lr)
    meta = {
        "kind": "joint-full",
        "tier": tier,
        "cfg": cfg.__dict__,
        "corpus_counts": counts,
        "training_packs": len(items),
        "epochs_planned": epochs,
        "epoch_done": 0,
        "manifest": _rel_manifest(manifest),
        "tokenizer": "versions/midel-tokenizer-v2.json",
        "include_core": include_core,
        "include_short": include_short,
        "eval_sample": eval_sample,
        "lr_schedule": lr_schedule,
        "answer_focus_len": answer_focus_len,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    if resume and resume.is_file():
        ckpt = torch.load(resume, map_location="cpu", weights_only=False)
        model.load_state_dict(ckpt["model"])
        if ckpt.get("optimizer"):
            opt.load_state_dict(ckpt["optimizer"])
        meta = {**meta, **ckpt.get("meta", {})}
        epoch_start = int(meta.get("epoch_done") or 0)
        log(f"resumed from {resume.name} at epoch {epoch_start}")

    stem = out.name.replace(".pt", "")
    ckpt_dir = out.parent

    log(
        f"JOINT-FULL tier={tier} packs={len(items)} epochs {epoch_start}→{epochs} "
        f"device={device} batch={batch_size} log_every={log_interval} batches"
    )
    log(f"model params ~{model.count_params() / 1e6:.1f}M")

    t0 = time.perf_counter()
    last_eval = None
    if epoch_start == 0 and not skip_eval_start:
        last_eval = eval_trial(
            model, eval_rows, device, label="eval@start", log_every=eval_log_every
        )
        log(f"eval@start {last_eval['pass']}/{last_eval['tested']} ({last_eval['pass_pct']:.1f}%)")
    elif epoch_start == 0 and skip_eval_start:
        log("skipping eval@start (--skip-eval-start)")

    peak_lr = lr
    for epoch in range(epoch_start, epochs):
        if lr_schedule == "cosine":
            cur_lr = cosine_lr(epoch, epochs, peak_lr)
            for pg in opt.param_groups:
                pg["lr"] = cur_lr
        elif lr_schedule == "flat":
            cur_lr = peak_lr
        else:
            cur_lr = peak_lr
        log(f"epoch {epoch + 1}/{epochs} lr {cur_lr:.2e} answer_focus={answer_focus_len or 'off'}")
        mean_loss = run_epoch_batches(
            model,
            opt,
            items,
            device=device,
            batch_size=batch_size,
            epoch=epoch,
            epochs_total=epochs,
            log_interval=log_interval,
            answer_focus_len=answer_focus_len,
        )

        meta["epoch_done"] = epoch + 1
        meta["train_seconds"] = round(time.perf_counter() - t0, 1)
        meta["last_loss"] = round(mean_loss, 4)
        done_epochs = epoch + 1 - epoch_start
        if done_epochs > 0:
            avg_epoch = (time.perf_counter() - t0) / done_epochs
            log(
                f"progress {epoch + 1}/{epochs} epochs — "
                f"train time {fmt_duration(time.perf_counter() - t0)}, "
                f"~{fmt_duration(avg_epoch * (epochs - epoch - 1))} remaining (avg/epoch {fmt_duration(avg_epoch)})"
            )

        if checkpoint_every > 0 and (epoch + 1) % checkpoint_every == 0:
            ck_path = ckpt_dir / f"{stem}.epoch{epoch + 1:03d}.pt"
            atomic_torch_save({"model": model.state_dict(), "meta": meta, "optimizer": opt.state_dict()}, ck_path)
            atomic_torch_save({"model": model.state_dict(), "meta": meta, "optimizer": opt.state_dict()}, out)
            log(f"checkpoint saved {ck_path.name} + {out.name}")

        if eval_every > 0 and (epoch + 1) % eval_every == 0:
            last_eval = eval_trial(
                model,
                eval_rows,
                device,
                label=f"eval@epoch{epoch + 1}",
                log_every=eval_log_every,
            )
            log(f"eval@{epoch + 1} {last_eval['pass']}/{last_eval['tested']} ({last_eval['pass_pct']:.1f}%)")
            snap = out.with_suffix(f".epoch{epoch + 1:03d}.eval.json")
            snap.write_text(json.dumps({"meta": meta, "eval": last_eval}, indent=2) + "\n")

    meta["train_seconds"] = round(time.perf_counter() - t0, 1)
    atomic_torch_save({"model": model.state_dict(), "meta": meta, "optimizer": opt.state_dict()}, out)
    log(f"wrote joint weights {out.name} ({out.stat().st_size // 1024 // 1024} MB)")

    if eval_full:
        last_eval = eval_trial(
            model, eval_all, device, label="eval@full", log_every=eval_log_every
        )
    elif last_eval is None:
        last_eval = eval_trial(
            model, eval_rows, device, label="eval@final", log_every=eval_log_every
        )

    log(f"JOINT-EVAL {last_eval['pass']}/{last_eval['tested']} ({last_eval['pass_pct']:.1f}%)")
    for key in ("short", "medium", "long", "over"):
        b = last_eval["buckets"].get(key, {})
        if b.get("tested"):
            log(f"  bucket {key}: {b['pass']}/{b['tested']} ({last_eval['bucket_pass_pct'].get(key)}%)")

    eval_path = out.with_suffix(".eval.json")
    eval_path.write_text(json.dumps({"meta": meta, "eval": last_eval}, indent=2) + "\n")

    accepted = last_eval["pass_pct"] >= PASS_BAR_PCT
    status = "accepted" if accepted else "rejected"
    log(f"JOINT-STATUS {status} pass={last_eval['pass_pct']:.1f}% bar={PASS_BAR_PCT:.0f}% tier={tier} epochs={epochs}")
    status_path = out.parent / f"joint-status-{datetime.now(timezone.utc).strftime('%Y-%m-%d')}.json"
    status_path.write_text(
        json.dumps(
            {
                "status": status,
                "pass_pct": last_eval["pass_pct"],
                "bar_pct": PASS_BAR_PCT,
                "weights": str(out),
                "eval": str(eval_path),
                "meta": meta,
            },
            indent=2,
        )
        + "\n"
    )
    return last_eval


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--joint-trial", action="store_true")
    ap.add_argument("--joint", action="store_true", help="full frozen-corpus joint (step 10)")
    ap.add_argument("--eval-checkpoint", type=Path, help="load .pt and run trial eval only")
    ap.add_argument("--tier", default="M", choices=sorted(TIERS))
    ap.add_argument("--lessons", type=int, default=500)
    ap.add_argument("--epochs", type=int, default=15)
    ap.add_argument("--batch-size", type=int, default=4)
    ap.add_argument("--lr", type=float, default=3e-4)
    ap.add_argument("--seed", type=int, default=7)
    ap.add_argument("--out", type=Path, default=None)
    ap.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    ap.add_argument("--checkpoint-every", type=int, default=5)
    ap.add_argument("--eval-every", type=int, default=5)
    ap.add_argument("--eval-sample", type=int, default=800, help="needle eval subset during training (0=all)")
    ap.add_argument("--eval-full", action="store_true", help="full fact-pack needle eval at end")
    ap.add_argument("--resume", type=Path, default=None)
    ap.add_argument("--no-core", action="store_true")
    ap.add_argument("--no-short", action="store_true")
    ap.add_argument(
        "--log-interval",
        type=int,
        default=300,
        help="log every N batches during training (0=epoch summary only)",
    )
    ap.add_argument(
        "--eval-log-every",
        type=int,
        default=40,
        help="log every N lessons during needle eval (0=quiet)",
    )
    ap.add_argument(
        "--skip-eval-start",
        action="store_true",
        help="skip pre-training needle eval (saves time on resume)",
    )
    ap.add_argument(
        "--lr-schedule",
        choices=("cosine", "flat"),
        default="cosine",
        help="learning rate schedule for full joint",
    )
    ap.add_argument(
        "--answer-focus-len",
        type=int,
        default=64,
        help="2x loss weight on first N answer tokens (needle region); 0=off",
    )
    ap.add_argument(
        "--packs-only",
        action="store_true",
        help="fact packs + science core only (skip short_added.js)",
    )
    args = ap.parse_args()
    if args.packs_only:
        args.no_short = True

    if args.eval_checkpoint:
        load_tokenizer()
        ckpt = torch.load(args.eval_checkpoint, map_location="cpu", weights_only=False)
        meta = ckpt["meta"]
        tier = meta["tier"]
        cfg = TIERS[tier]
        device = pick_device()
        model = MidelLM(cfg).to(device)
        model.load_state_dict(ckpt["model"])
        if meta.get("kind") == "joint-trial":
            rows = load_trial_rows(limit=meta.get("lessons", args.lessons))
        else:
            rows = load_eval_rows()
            if args.eval_sample and len(rows) > args.eval_sample:
                rows = sample_eval_rows(rows, args.eval_sample, args.seed)
        eval_result = eval_trial(
            model, rows, device, label="eval-checkpoint", log_every=args.eval_log_every
        )
        log(f"TRIAL-EVAL {eval_result['pass']}/{eval_result['tested']} ({eval_result['pass_pct']:.1f}%)")
        for key in ("short", "medium", "long", "over"):
            b = eval_result["buckets"].get(key, {})
            if b.get("tested"):
                print(
                    f"  bucket {key}: {b['pass']}/{b['tested']} ({eval_result['bucket_pass_pct'].get(key)}%)",
                    flush=True,
                )
        out_eval = args.eval_checkpoint.with_suffix(".eval.json")
        out_eval.write_text(json.dumps({"meta": meta, "eval": eval_result}, indent=2) + "\n")
        raise SystemExit(0)

    live = (ROOT / "stage3_brain.js").resolve()
    if args.out and args.out.name == "stage3_brain.js" and args.out.resolve() == live:
        raise SystemExit("refusing to write live stage3_brain.js")

    if args.joint:
        if not args.out:
            raise SystemExit("--out required for --joint")
        if "joint" not in args.out.name:
            print("WARN output path should contain 'joint' (never deploy trial/joint weights as live brain)", flush=True)
        joint_full(
            tier=args.tier,
            epochs=args.epochs,
            out=args.out,
            batch_size=args.batch_size,
            lr=args.lr,
            seed=args.seed,
            manifest=args.manifest,
            checkpoint_every=args.checkpoint_every,
            eval_every=args.eval_every,
            eval_sample=args.eval_sample,
            eval_full=args.eval_full,
            resume=args.resume,
            include_core=not args.no_core,
            include_short=not args.no_short,
            log_interval=args.log_interval,
            eval_log_every=args.eval_log_every,
            skip_eval_start=args.skip_eval_start,
            lr_schedule=args.lr_schedule,
            answer_focus_len=args.answer_focus_len,
        )
        raise SystemExit(0)

    if not args.joint_trial:
        ap.print_help()
        raise SystemExit(2)
    if not args.out:
        raise SystemExit("--out required for --joint-trial")
    joint_trial(
        tier=args.tier,
        lessons=args.lessons,
        epochs=args.epochs,
        out=args.out,
        batch_size=args.batch_size,
        lr=args.lr,
        seed=args.seed,
        log_interval=args.log_interval,
    )


if __name__ == "__main__":
    main()
