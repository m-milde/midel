#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Quick checkpoint diagnostics (teacher-forcing + sample generations).
 */

import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const ckpt = process.argv[2] || 'versions/stage3_brain.joint.M-2026-10-24.pt';
const exe = resolvePython('torch');

const script = `
import torch
import train_stage3 as t
from midel_tokenizer_v2 import load as lt, decode
from midel_tiers import TIERS
from midel_torch import MidelLM
from midel_data import load_trial_rows, pack_qa_ids
from train_midel_torch import pick_device, greedy_continuation, fact_known_torch, sample_eval_rows, load_eval_rows, eval_trial

lt()
path = "${ckpt.replace(/"/g, '')}"
ckpt = torch.load(path, map_location="cpu", weights_only=False)
device = pick_device()
model = MidelLM(TIERS[ckpt["meta"]["tier"]]).to(device)
model.load_state_dict(ckpt["model"])
rows = load_trial_rows(limit=200)
correct = total = 0
import torch as T
with T.no_grad():
    for row in rows:
        q, a = row["question"].strip(), row["text"].strip()
        packed = pack_qa_ids(q, a, max_len=256)
        if not packed: continue
        ids, ans_at = packed
        if ans_at >= len(ids) - 1: continue
        x = T.tensor([ids[:-1]], device=device)
        logits = model.forward(x)
        for pos in range(ans_at, min(ans_at + 8, len(ids) - 1)):
            if int(logits[0, pos].argmax()) == ids[pos + 1]:
                correct += 1
            total += 1
print(f"teacher-forced (8 ans tokens, 200 lessons): {100*correct/max(1,total):.1f}%")
sub = sample_eval_rows(load_eval_rows(), 100, 7)
ev = eval_trial(model, sub, device, label="diagnose", log_every=25)
print(f"needle sample 100: {ev['pass']}/{ev['tested']} ({ev['pass_pct']}%)")
for row in sub[:3]:
    q = row["question"].strip()
    needle = t.answer_needle(q, row["text"].strip())
    gen = greedy_continuation(model, __import__('midel_tokenizer_v2').encode(t.prompt_variants(q)[0]), 40, device)
    print("---")
    print("Q:", q[:70])
    print("needle:", needle, "hit:", needle and needle in decode(gen).lower())
    print("gen:", decode(gen)[len(q):][:100])
`;

const r = spawnSync(exe, ['-c', script], { cwd: ROOT, stdio: 'inherit' });
process.exit(r.status ?? 1);
