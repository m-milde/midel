# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Corpus capacity audit (read-only).

Measures how long every teachable lesson is once packed for training
(question + answer, same tokenizer and packing as train_stage3.py) and compares
it with the deep network's context window (MAX_LEN, 128 by default).

Answers one question before any joint training: does the library fit the
network, or must the context / network grow first?

Nothing is trained, nothing in the library or the brain is changed. Optional
--json / --csv write a report only to the path you give (never to a *_facts.js
or stage3_* file).

Run from this folder:  npm run corpus:stats
                       npm run corpus:stats -- --top 25 --max-len 256
"""

import argparse
import csv
import json
import math
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import train_stage3 as t  # noqa: E402  (defines functions only; training runs under __main__)
from training_text import training_text  # noqa: E402

BUCKETS = ((64, "short  <=64"), (128, "medium 65-128"))
CONTEXT_STEPS = (128, 192, 256, 384, 512, 768, 1024)
PROTECTED = ("_facts.js", "stage3_brain", "stage3_learned", "taught_facts")


def percentile(sorted_vals, pct):
    if not sorted_vals:
        return 0
    rank = max(1, math.ceil(pct / 100 * len(sorted_vals)))
    return sorted_vals[rank - 1]


def bucket_of(tokens, max_len):
    if tokens <= 64:
        return "short"
    if tokens <= max_len:
        return "medium"
    return "long"


def check_out_path(raw):
    path = Path(raw).expanduser()
    name = path.name
    if any(p in name for p in PROTECTED):
        sys.exit(f"refusing to write {name}: report files must not look like library or brain files")
    return path


def measure(max_len):
    rows = t.teachable_lesson_rows()
    measured, failed = [], []
    vocab = Counter()
    for row in rows:
        question = (row.get("question") or "").strip()
        raw_answer = (row.get("text") or "").strip()
        text = training_text(raw_answer)
        q_tokens = t.tokenize(question)
        a_tokens = t.tokenize(text)
        vocab.update(q_tokens)
        vocab.update(a_tokens)
        packed = t.pack_qa(question, raw_answer)
        if packed is None:
            failed.append(row)
            continue
        joined, q_len = packed
        total = len(joined.split())
        drop = max(0, total - max_len)
        measured.append(
            {
                "id": row.get("id"),
                "category": row.get("category") or "(none)",
                "tokens": total,
                "q_tokens": q_len,
                "a_tokens": total - q_len,
                "bucket": bucket_of(total, max_len),
                "question_cut": drop > 0,
                "question_gone": drop >= q_len,
                "question": question,
            }
        )
    return rows, measured, failed, vocab


def verdict_for(lengths, max_len):
    if not lengths:
        return "EMPTY"
    median = percentile(lengths, 50)
    over = sum(1 for n in lengths if n > max_len) / len(lengths)
    if median > max_len or over > 0.5:
        return "MISFIT"
    if over > 0:
        return "LONG-TAIL"
    return "FIT"


def smallest_context(lengths, target=0.95):
    for size in CONTEXT_STEPS:
        if sum(1 for n in lengths if n <= size) / len(lengths) >= target:
            return size
    return None


def main():
    ap = argparse.ArgumentParser(description="Read-only corpus length audit for the deep network.")
    ap.add_argument("--max-len", type=int, default=t.MAX_LEN, help="context window to test (default: trainer MAX_LEN)")
    ap.add_argument("--top", type=int, default=10, help="how many of the longest rows to list (default 10)")
    ap.add_argument("--json", metavar="PATH", help="also write a machine-readable report to PATH")
    ap.add_argument("--csv", metavar="PATH", help="also write one line per lesson to PATH")
    args = ap.parse_args()
    max_len = args.max_len

    json_path = check_out_path(args.json) if args.json else None
    csv_path = check_out_path(args.csv) if args.csv else None

    rows, measured, failed, vocab = measure(max_len)
    lengths = sorted(m["tokens"] for m in measured)
    n = len(lengths)
    if not n:
        print("no teachable lessons found")
        return 1

    over = [m for m in measured if m["tokens"] > max_len]
    gone = [m for m in measured if m["question_gone"]]
    counts = Counter(m["bucket"] for m in measured)
    ids = Counter(r.get("id") for r in rows)
    dup_ids = sorted(i for i, c in ids.items() if c > 1 and i is not None)
    verdict = verdict_for(lengths, max_len)
    need = smallest_context(lengths)
    singles = sum(1 for c in vocab.values() if c == 1)

    print(f"Corpus capacity audit  (context window tested: {max_len} tokens)")
    print(f"teachable lessons: {len(rows)}   packable: {n}   not packable: {len(failed)}")
    print()
    print("Packed length in tokens (question + answer)")
    print(
        f"  median {percentile(lengths, 50)}   p75 {percentile(lengths, 75)}   "
        f"p90 {percentile(lengths, 90)}   p95 {percentile(lengths, 95)}   "
        f"max {lengths[-1]}   mean {sum(lengths) / n:.0f}"
    )
    print()
    print("Length buckets (the same buckets the stratified eval will use)")
    for key, label in (("short", BUCKETS[0][1]), ("medium", BUCKETS[1][1]), ("long", f"long   >{max_len}")):
        print(f"  {label:<16} {counts[key]:>6}  {counts[key] / n:>6.1%}")
    print()
    print("Share of lessons that fit each context size")
    for size in CONTEXT_STEPS:
        fit = sum(1 for x in lengths if x <= size)
        print(f"  {size:>5} tokens  {fit / n:>6.1%}  ({n - fit} lessons too long)")
    print()
    print(
        f"Over {max_len}: {len(over)} lessons. Training keeps the END of a long pack, so the start of the "
        f"question is cut off for these; the whole question is lost for {len(gone)} of them."
    )
    if failed:
        print(f"Not packable (question words are not a prefix of the full text, or empty answer): {len(failed)}")
        print("  first ids: " + ", ".join(str(r.get("id")) for r in failed[:12]))
    if dup_ids:
        print(f"Duplicate ids in the library: {len(dup_ids)}  first: {', '.join(str(i) for i in dup_ids[:12])}")
    print(
        f"Vocabulary: {len(vocab)} distinct tokens, {singles} appear only once ({singles / len(vocab):.0%}) "
        "-- rare words grow the embedding table without helping the network"
    )

    by_cat = defaultdict(list)
    for m in measured:
        by_cat[m["category"]].append(m["tokens"])
    print()
    print("By category (largest first; share over the window)")
    ranked = sorted(by_cat.items(), key=lambda kv: -len(kv[1]))
    for cat, vals in ranked[:15]:
        vals.sort()
        share = sum(1 for x in vals if x > max_len) / len(vals)
        print(f"  {cat[:28]:<28} {len(vals):>5}  median {percentile(vals, 50):>4}  over {share:>5.0%}")
    if len(ranked) > 15:
        print(f"  ... {len(ranked) - 15} more categories (use --csv for the full list)")

    if args.top > 0:
        print()
        print(f"Longest {args.top} lessons")
        for m in sorted(measured, key=lambda x: -x["tokens"])[: args.top]:
            print(f"  id {str(m['id']):>6}  {m['tokens']:>4} tokens  {m['question'][:70]}")

    print()
    print("Decision (rule from CURSOR_DEEP_NETWORK_FIXES.md, Step 1b)")
    if verdict == "MISFIT":
        print(
            f"  MISFIT: median is above {max_len} or more than half the lessons exceed it. "
            "Do Step 7 (bigger context) BEFORE a full joint run."
        )
    elif verdict == "LONG-TAIL":
        print(
            f"  LONG-TAIL: most lessons fit {max_len}, {len(over)} do not. Joint training with chunk packs for "
            "those ids, or keep them library-only in chat; read the long bucket in the stratified eval."
        )
    else:
        print(f"  FIT: every lesson fits {max_len} tokens.")
    if need and need > max_len:
        print(f"  A context of {need} tokens would cover at least 95% of lessons.")
    elif need is None:
        print(f"  Even {CONTEXT_STEPS[-1]} tokens covers less than 95%: chunk the long answers.")
    print()
    print(
        f"CORPUS-STATS rows={len(rows)} packable={n} median={percentile(lengths, 50)} "
        f"p95={percentile(lengths, 95)} over={len(over)} max_len={max_len} verdict={verdict}"
    )

    if json_path:
        report = {
            "max_len": max_len,
            "rows": len(rows),
            "packable": n,
            "not_packable_ids": [r.get("id") for r in failed],
            "duplicate_ids": dup_ids,
            "tokens": {
                "median": percentile(lengths, 50),
                "p75": percentile(lengths, 75),
                "p90": percentile(lengths, 90),
                "p95": percentile(lengths, 95),
                "max": lengths[-1],
            },
            "buckets": dict(counts),
            "over_max_len": len(over),
            "question_fully_cut": len(gone),
            "vocab_distinct": len(vocab),
            "vocab_singletons": singles,
            "verdict": verdict,
        }
        json_path.write_text(json.dumps(report, indent=2) + "\n")
        print(f"wrote {json_path}")
    if csv_path:
        with csv_path.open("w", newline="") as fh:
            w = csv.writer(fh)
            w.writerow(["id", "category", "tokens", "question_tokens", "answer_tokens", "bucket", "question_cut"])
            for m in measured:
                w.writerow([m["id"], m["category"], m["tokens"], m["q_tokens"], m["a_tokens"], m["bucket"], int(m["question_cut"])])
        print(f"wrote {csv_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
