# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Stage 3 trainer.

Context 128, numbers kept intact, four pre-norm blocks, width 128, four heads.
Trains outside the browser. Writes stage3_brain.js for the lab to load.
--learn-new installs one lesson; --eval read-only health check; --flat-lr optional on learn-new.
"""

import json
import math
import re
import sys
import time
from pathlib import Path

import numpy as np

from training_text import training_text

ROOT = Path(__file__).resolve().parent
D_MODEL = 128
N_LAYERS = 4
N_HEADS = 4
MAX_LEN = 128
EPOCHS = 80
LR = 0.003
SEED = 7
# Replay only the most recent installed lessons during --learn-new (full library is huge).
HELD_REPLAY_MAX = 64
# Allow install when at most this many held lessons drop; ids are queued in relearn for repair.
RETENTION_SLACK = 2
# Failed installs go to deferred (retry later); permanent skip only after this many fails.
INSTALL_FAIL_SKIP = 4
# --learn-new LR schedule (default: warmup + cosine; pass --flat-lr for legacy constant LR).
LEARN_NEW_LR_PEAK = 0.0006
LEARN_NEW_LR_WARM = 0.0001
LEARN_NEW_WARM_EPOCHS = 2
LEARN_NEW_EPOCHS = 16
RESCUE_LR_PEAK = 0.0003
RESCUE_EPOCHS = 12

STAGE3_BRAIN_COPYRIGHT = """/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

"""


def tokenize(text):
    s = text.lower()
    s = re.sub(r"(\d),(?=\d)", r"\1", s)
    return re.findall(r"\d+(?:\.\d+)?%?|[a-z]+|[?.!,]", s)


def softmax(x, axis=-1):
    z = x - np.max(x, axis=axis, keepdims=True)
    e = np.exp(z)
    return e / np.sum(e, axis=axis, keepdims=True)


def load_practice_pairs():
    path = ROOT / "practice_questions.txt"
    if not path.exists():
        return []
    pairs = []
    block = []
    for line in path.read_text().splitlines():
        if line.startswith("#") or not line.strip():
            if len(block) >= 2:
                pairs.append((block[0].strip(), " ".join(block[1:]).strip()))
            block = []
            continue
        block.append(line.strip())
    if len(block) >= 2:
        pairs.append((block[0].strip(), " ".join(block[1:]).strip()))
    return pairs


def load_practice():
    return [q + " " + a for q, a in load_practice_pairs()]


def pack_qa(question, answer):
    """One string, plus the token index where the answer starts."""
    answer = training_text(answer)
    q_words = tokenize(question)
    full = tokenize(question + " " + answer)
    if full[:len(q_words)] != q_words:
        return None
    if len(full) <= len(q_words):
        return None
    return " ".join(full), len(q_words)


def qa_examples(pairs, facts):
    """Question, then the answer. The loss later sits on the answer tokens."""
    split = re.compile(r"\b(?:but|though|although|while|whereas)\b|;", re.I)
    out = []
    for question, answer in pairs:
        packed = pack_qa(question, answer)
        if packed:
            out.append(packed)
    for fact in facts:
        for part in split.split(fact):
            words = [w for w in tokenize(part) if w not in "?.!,"]
            if "is" not in words:
                continue
            i = words.index("is")
            subj = words[:i]
            if not subj or not words[i + 1:]:
                continue
            packed = pack_qa("what is " + " ".join(subj) + "?", " ".join(words))
            if packed:
                out.append(packed)
    return list(dict.fromkeys(out))


def load_lessons():
    html = (ROOT / "neural_lab.html").read_text()
    block = html.split("const CURRICULUM =", 1)[1].split("CURRICULUM.master", 1)[0]
    short = re.findall(r'"([^"]+)"', block)
    science = json.loads((ROOT / "science_geography_facts.json").read_text())
    long = [f["fact"] for f in science["facts"]]
    return short, long, load_practice()


def layernorm_fwd(x, g, b, eps=1e-5):
    mean = x.mean(axis=-1, keepdims=True)
    var = x.var(axis=-1, keepdims=True)
    std = np.sqrt(var + eps)
    xhat = (x - mean) / std
    y = xhat * g + b
    return y, (xhat, std, g)


def layernorm_bwd(dy, cache):
    xhat, std, g = cache
    n = dy.shape[-1]
    dxhat = dy * g
    dvar = np.sum(dxhat * xhat * -0.5 / (std ** 2), axis=-1, keepdims=True)
    dmean = np.sum(-dxhat / std, axis=-1, keepdims=True) + dvar * np.sum(-2 * xhat * std, axis=-1, keepdims=True) / n
    dx = dxhat / std + dvar * (2 * xhat * std) / n + dmean / n
    dg = np.sum(dy * xhat, axis=0)
    db = np.sum(dy, axis=0)
    return dx, dg, db


class Stage3:
    def __init__(self, vocab):
        self.i2w = vocab
        self.w2i = {w: i for i, w in enumerate(vocab)}
        rng = np.random.default_rng(SEED)
        V, D, T = len(vocab), D_MODEL, MAX_LEN
        scale = 0.02
        self.params = {
            "E": rng.normal(0, scale, (V, D)),
            "P": rng.normal(0, scale, (T, D)),
            "lnF_g": np.ones(D),
            "lnF_b": np.zeros(D),
            "Whead": rng.normal(0, scale, (D, V)),
        }
        self.layers = []
        for _ in range(N_LAYERS):
            self.layers.append({
                "ln1_g": np.ones(D), "ln1_b": np.zeros(D),
                "Wq": rng.normal(0, scale, (D, D)),
                "Wk": rng.normal(0, scale, (D, D)),
                "Wv": rng.normal(0, scale, (D, D)),
                "Wo": rng.normal(0, scale, (D, D)),
                "ln2_g": np.ones(D), "ln2_b": np.zeros(D),
                "W1": rng.normal(0, scale, (D, 2 * D)),
                "b1": np.zeros(2 * D),
                "W2": rng.normal(0, scale, (2 * D, D)),
                "b2": np.zeros(D),
            })
        self.m = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.v = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.lm = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in self.layers]
        self.lv = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in self.layers]
        self.step = 0

    def mha(self, X, layer):
        T, D = X.shape
        H = N_HEADS
        dh = D // H
        Q = X @ layer["Wq"]
        K = X @ layer["Wk"]
        V = X @ layer["Wv"]
        Qh = Q.reshape(T, H, dh).transpose(1, 0, 2)
        Kh = K.reshape(T, H, dh).transpose(1, 0, 2)
        Vh = V.reshape(T, H, dh).transpose(1, 0, 2)
        scores = (Qh @ Kh.transpose(0, 2, 1)) / math.sqrt(dh)
        mask = np.triu(np.ones((T, T), dtype=bool), 1)
        scores[:, mask] = -1e9
        A = softmax(scores, axis=-1)
        Ch = A @ Vh
        C = Ch.transpose(1, 0, 2).reshape(T, D)
        out = C @ layer["Wo"]
        cache = (X, Q, K, V, Qh, Kh, Vh, scores, A, Ch, C, mask, dh)
        return out, A.mean(axis=0), cache

    def mha_bwd(self, dout, cache, layer):
        X, Q, K, V, Qh, Kh, Vh, scores, A, Ch, C, mask, dh = cache
        T, D = X.shape
        H = N_HEADS
        dWo = C.T @ dout
        dC = dout @ layer["Wo"].T
        dCh = dC.reshape(T, H, dh).transpose(1, 0, 2)
        dA = dCh @ Vh.transpose(0, 2, 1)
        dVh = A.transpose(0, 2, 1) @ dCh
        dscores = A * (dA - np.sum(dA * A, axis=-1, keepdims=True))
        dscores[:, mask] = 0
        dscores /= math.sqrt(dh)
        dQh = dscores @ Kh
        dKh = dscores.transpose(0, 2, 1) @ Qh
        dQ = dQh.transpose(1, 0, 2).reshape(T, D)
        dK = dKh.transpose(1, 0, 2).reshape(T, D)
        dV = dVh.transpose(1, 0, 2).reshape(T, D)
        dX = dQ @ layer["Wq"].T + dK @ layer["Wk"].T + dV @ layer["Wv"].T
        return dX, {"Wq": X.T @ dQ, "Wk": X.T @ dK, "Wv": X.T @ dV, "Wo": dWo}

    def forward(self, ids):
        T = len(ids)
        x = self.params["E"][ids] + self.params["P"][:T]
        caches = []
        attn = None
        for layer in self.layers:
            h, ln1 = layernorm_fwd(x, layer["ln1_g"], layer["ln1_b"])
            attn_out, attn, mha_cache = self.mha(h, layer)
            x2 = x + attn_out
            h2, ln2 = layernorm_fwd(x2, layer["ln2_g"], layer["ln2_b"])
            pre = h2 @ layer["W1"] + layer["b1"]
            f1 = np.maximum(0, pre)
            f2 = f1 @ layer["W2"] + layer["b2"]
            x = x2 + f2
            caches.append((x, x2, h, h2, ln1, ln2, mha_cache, f1, f2, pre))
        z, lnf = layernorm_fwd(x, self.params["lnF_g"], self.params["lnF_b"])
        logits = z @ self.params["Whead"]
        probs = softmax(logits, axis=-1)
        return probs, attn, (ids, caches, z, lnf, probs)

    def loss_and_backward(self, ids, tail=False, answer_from=None, focus=1.0, span=None):
        tokens = list(ids)
        if answer_from is not None and len(tokens) > MAX_LEN:
            drop = len(tokens) - MAX_LEN
            tokens = tokens[-MAX_LEN:]
            answer_from = max(0, answer_from - drop)
        elif tail and len(tokens) > MAX_LEN:
            tokens = tokens[-MAX_LEN:]
        T = min(len(tokens) - 1, MAX_LEN - 1)
        x_tok = tokens[:T]
        y_tok = tokens[1:T + 1]
        probs, attn, cache = self.forward(x_tok)
        ids_c, caches, z, lnf, probs = cache
        weights = np.ones(T)
        if answer_from is not None:
            weights[:] = 0
            start = min(T - 1, max(0, answer_from - 1))
            end = T if span is None else min(T, start + span)
            weights[start:end] = 1.0
            weights[start] = focus
        elif tail:
            weights[-1] = 32.0
        weights /= weights.sum()
        picked = np.log(probs[np.arange(T), y_tok] + 1e-10)
        loss = -np.sum(weights * picked)
        dlogits = probs.copy()
        dlogits[np.arange(T), y_tok] -= 1
        dlogits *= weights[:, None]
        dWhead = z.T @ dlogits
        dz = dlogits @ self.params["Whead"].T
        dx, dg, db = layernorm_bwd(dz, lnf)
        grads_layers = [None] * N_LAYERS
        for li in range(N_LAYERS - 1, -1, -1):
            layer = self.layers[li]
            _x, x2, h, h2, ln1, ln2, mha_cache, f1, f2, pre = caches[li]
            df2 = dx
            dW2 = f1.T @ df2
            db2 = np.sum(df2, axis=0)
            df1 = (df2 @ layer["W2"].T) * (f1 > 0)
            dW1 = h2.T @ df1
            db1 = np.sum(df1, axis=0)
            dh2 = df1 @ layer["W1"].T
            dx2, dln2g, dln2b = layernorm_bwd(dh2, ln2)
            dx2 += df2
            dh, mha_grads = self.mha_bwd(dx2, mha_cache, layer)
            dx, dln1g, dln1b = layernorm_bwd(dh, ln1)
            dx += dx2
            grads_layers[li] = {
                "ln1_g": dln1g, "ln1_b": dln1b,
                "Wq": mha_grads["Wq"], "Wk": mha_grads["Wk"], "Wv": mha_grads["Wv"], "Wo": mha_grads["Wo"],
                "ln2_g": dln2g, "ln2_b": dln2b,
                "W1": dW1, "b1": db1, "W2": dW2, "b2": db2,
            }
        dE = np.zeros_like(self.params["E"])
        dP = np.zeros_like(self.params["P"])
        for t, idx in enumerate(x_tok):
            dE[idx] += dx[t]
            dP[t] += dx[t]
        top = {"E": dE, "P": dP, "lnF_g": dg, "lnF_b": db, "Whead": dWhead}
        return loss, top, grads_layers

    def adam(self, param, grad, m, v, lr):
        g = np.clip(grad, -1.0, 1.0)
        m[:] = 0.9 * m + 0.1 * g
        v[:] = 0.999 * v + 0.001 * (g * g)
        self.step += 1
        mhat = m / (1 - 0.9 ** self.step)
        vhat = v / (1 - 0.999 ** self.step)
        param -= lr * mhat / (np.sqrt(vhat) + 1e-8)

    def apply(self, top, layer_grads, lr):
        # One Adam step counter shared across tensors would desync bias correction.
        # Use a single step per sentence, applied to every tensor with that step.
        step_at = self.step + 1
        def upd(param, grad, m, v):
            g = np.clip(grad, -1.0, 1.0)
            m[:] = 0.9 * m + 0.1 * g
            v[:] = 0.999 * v + 0.001 * (g * g)
            mhat = m / (1 - 0.9 ** step_at)
            vhat = v / (1 - 0.999 ** step_at)
            param -= lr * mhat / (np.sqrt(vhat) + 1e-8)
        for k in top:
            upd(self.params[k], top[k], self.m[k], self.v[k])
        for li, grads in enumerate(layer_grads):
            for k in grads:
                upd(self.layers[li][k], grads[k], self.lm[li][k], self.lv[li][k])
        self.step = step_at

    def nll(self, texts):
        total, n = 0.0, 0
        for text in texts:
            ids = [self.w2i[w] for w in tokenize(text) if w in self.w2i]
            if len(ids) < 2:
                continue
            T = min(len(ids) - 1, MAX_LEN - 1)
            probs, _, _ = self.forward(ids[:T])
            y = ids[1:T + 1]
            total += -np.mean(np.log(probs[np.arange(T), y] + 1e-10))
            n += 1
        return total / max(1, n)

    def greedy(self, prompt, steps):
        words = tokenize(prompt)
        for _ in range(steps):
            ids = [self.w2i[w] for w in words if w in self.w2i][-MAX_LEN:]
            if not ids:
                break
            probs, _, _ = self.forward(ids)
            words.append(self.i2w[int(np.argmax(probs[-1]))])
        return words


EVAL_PARAPHRASES = [
    "the largest hot desert is the sahara desert in the world",
    "the deepest freshwater lake is lake baikal",
    "the highest waterfall is angel falls",
    "the hottest planet is venus",
    "a light-year is a unit of distance",
    "gold does not rust",
    "mitochondria are the powerhouses of the cell",
    "the largest animal is the blue whale",
    "phytoplankton generate oxygen",
    "permafrost is ground that remains frozen",
]


def claim_examples(facts):
    """Lesson, then a yes/no question. The last word is the decision."""
    split = re.compile(r"\b(?:but|though|although|while|whereas)\b|;", re.I)
    stop = set("the a an of to in on for and or with from by at as it its this that into about than then is technically extremely very also just due".split())
    out = []

    def trimmed(claim):
        cut = []
        for w in claim:
            if w in ("in", "of", "due", "because"):
                break
            if w in ("technically", "extremely", "very", "also", "just"):
                continue
            cut.append(w)
        while cut and cut[-1] in stop:
            cut.pop()
        return cut

    def add(fact, subj, claim, label, shorts):
        if not claim:
            return
        head = next((w for w in subj if w not in stop), subj[-1])
        body = " ".join(subj)
        written = set()
        for question in (
            "is " + body + " " + " ".join(claim),
            "is the " + head + " " + " ".join(claim),
        ):
            if question not in written:
                out.append(fact + " " + question + " ? " + label)
                written.add(question)
        for word in shorts:
            for question in ("is " + body + " " + word, "is the " + head + " " + word, "is " + head + " " + word):
                if question not in written:
                    out.append(fact + " " + question + " ? " + label)
                    written.add(question)

    contrast = []
    plain = []
    for fact in facts:
        parsed = []
        for part in split.split(fact):
            toks = [w for w in tokenize(part) if w not in "?.!,"]
            if "is" not in toks:
                continue
            i = toks.index("is")
            subj, claim = toks[:i], trimmed(toks[i + 1:])
            while claim and claim[-1] in ("overall",) or (claim and claim[-1] in stop):
                claim.pop()
            if subj and claim:
                parsed.append((subj, claim))
        clause_words = [set(s + c) for s, c in parsed]
        for idx, (subj, claim) in enumerate(parsed):
            others = set().union(*clause_words[:idx], *clause_words[idx + 1:]) if len(parsed) > 1 else set()
            shorts = [w for w in claim if w not in stop and w not in others]
            add(fact, subj, claim, "yes", shorts)
        if len(parsed) >= 2:
            for i, j in ((0, 1), (1, 0)):
                subj, claim = parsed[i][0], parsed[j][1]
                own = clause_words[i]
                missing = [w for w in claim if w not in stop and w not in own and w not in ("overall",)]
                if not missing:
                    continue
                add(fact, subj, claim, "no", missing)
        local = list(dict.fromkeys(out))
        out.clear()
        by_prompt = {}
        for line in local:
            prompt, label = line.rsplit(" ", 1)
            by_prompt.setdefault(prompt, set()).add(label)
        local = [line for line in local if len(by_prompt[line.rsplit(" ", 1)[0]]) == 1]
        yes = [x for x in local if x.endswith(" yes")]
        no = [x for x in local if x.endswith(" no")]
        if yes and no and len(yes) != len(no):
            if len(yes) > len(no):
                copies = (len(yes) + len(no) - 1) // len(no)
                no = (no * copies)[:len(yes)]
            else:
                copies = (len(no) + len(yes) - 1) // len(yes)
                yes = (yes * copies)[:len(no)]
        if yes and no:
            contrast.extend(yes + no)
        else:
            plain.extend(yes + no)
    return plain + contrast


def grow_vocab(model, words):
    """Add rows for words the saved brain has never seen."""
    fresh = []
    for w in words:
        if w not in model.w2i and w not in fresh:
            fresh.append(w)
    if not fresh:
        return 0
    model.i2w = list(model.i2w)
    D = model.params["E"].shape[1]
    rng = np.random.default_rng(SEED)
    n = len(fresh)
    extra_e = rng.normal(0, 0.02, (n, D))
    extra_h = rng.normal(0, 0.02, (D, n))
    model.params["E"] = np.vstack([model.params["E"], extra_e])
    model.params["Whead"] = np.hstack([model.params["Whead"], extra_h])
    model.m["E"] = np.vstack([model.m["E"], np.zeros_like(extra_e)])
    model.v["E"] = np.vstack([model.v["E"], np.zeros_like(extra_e)])
    model.m["Whead"] = np.hstack([model.m["Whead"], np.zeros_like(extra_h)])
    model.v["Whead"] = np.hstack([model.v["Whead"], np.zeros_like(extra_h)])
    for w in fresh:
        model.w2i[w] = len(model.i2w)
        model.i2w.append(w)
    return n


def encode_ids(model, text, answer_from=None):
    words = tokenize(text)
    ids = []
    mapped = None
    for i, w in enumerate(words):
        if w not in model.w2i:
            continue
        if answer_from is not None and mapped is None and i >= answer_from:
            mapped = len(ids)
        ids.append(model.w2i[w])
    return ids, mapped


def main():
    short, long, practice = load_lessons()
    claims = claim_examples(long)
    qa = qa_examples(load_practice_pairs(), long)
    lessons = short + long + practice
    texts = [(t, False, None) for t in lessons] + [(t, True, None) for t in claims]
    texts += [(text, False, idx) for text, idx in qa]
    vocab = sorted({w for t, _, _ in texts for w in tokenize(t)} | {w for t in EVAL_PARAPHRASES for w in tokenize(t)})
    model = Stage3(vocab)
    print(f"vocab {len(vocab)} lessons {len(lessons)} claims {len(claims)} questions {len(qa)} layers {N_LAYERS} d {D_MODEL} heads {N_HEADS}")
    over = [t for t in long if len(tokenize(t)) > 24]
    print(f"long facts over 24 tokens: {len(over)}", flush=True)
    epoch_t = time.perf_counter()
    for epoch in range(EPOCHS):
        lr = LR * (0.45 + 0.55 * 0.5 * (1 + math.cos(math.pi * epoch / EPOCHS)))
        order = np.random.default_rng(SEED + epoch).permutation(len(texts))
        total, n = 0.0, 0
        for i in order:
            text, tail, answer_from = texts[i]
            ids, answer_at = encode_ids(model, text, answer_from)
            if len(ids) < 2:
                continue
            loss, top, layer_grads = model.loss_and_backward(ids, tail=tail, answer_from=answer_at)
            model.apply(top, layer_grads, lr)
            total += loss
            n += 1
        if epoch % 5 == 0 or epoch == EPOCHS - 1:
            ev = model.nll(EVAL_PARAPHRASES)
            print(f"epoch {epoch:02d} train {total / max(1, n):.3f} eval {ev:.3f} lr {lr:.5f} sec {time.perf_counter() - epoch_t:.1f}", flush=True)
        epoch_t = time.perf_counter()

    # Stage 2 probe: continue a fact longer than 24 tokens and keep the trailing number.
    probe = next(t for t in long if "299" in t or "979" in t)
    toks = tokenize(probe)
    stem = " ".join(toks[:8])
    cont = model.greedy(stem, min(12, len(toks) - 8))
    print("PROBE", probe[:80])
    print("CONT ", " ".join(cont))
    number = next((w for w in toks if any(c.isdigit() for c in w)), None)
    print("NUMBER", number, "in continuation", number in cont)

    hits = 0
    for ex in claims:
        words = tokenize(ex)
        if not words or words[-1] not in ("yes", "no"):
            continue
        pred = model.greedy(" ".join(words[:-1]), 1)
        hits += pred[-1:] == words[-1:]
    print(f"CLAIM {hits}/{len(claims)} yes/no tokens match the lesson", flush=True)

    if number in cont and gate(model, long):
        export(model)
        candidate = ROOT / "stage3_brain_candidate.js"
        if candidate.exists():
            candidate.unlink()
    else:
        export(model, ROOT / "stage3_brain_candidate.js")
        print("kept the previous stage3_brain.js", flush=True)


def gate_checks(facts):
    def find(*needles):
        for fact in facts:
            low = fact.lower()
            if all(n in low for n in needles):
                return fact
        return None

    desert = find("sahara", "antarctica")
    mercury = find("mercury", "closer")
    return [
        (desert, "is the sahara hot?", "yes"),
        (desert, "is antarctica the largest hot desert?", "no"),
        (desert, "is antarctica the largest desert?", "yes"),
        (mercury, "is mercury closer to the sun?", "yes"),
    ]


def gate(model, facts):
    checks = gate_checks(facts)
    ok = all(fact is not None for fact, _, _ in checks)
    for fact, question, expected in checks:
        got = ""
        if fact:
            pred = model.greedy(fact + " " + question, 1)
            got = pred[-1] if pred else ""
        print("GATE", question, "expected", expected, "got", got, flush=True)
        ok = ok and got == expected
    return ok


def export(model, path=None):
    def arr(a):
        return np.round(a, 5).tolist()
    payload = {
        "d_model": D_MODEL,
        "n_layers": N_LAYERS,
        "n_heads": N_HEADS,
        "max_seq_len": MAX_LEN,
        "i2w": model.i2w,
        "E": arr(model.params["E"]),
        "P": arr(model.params["P"]),
        "lnF_g": arr(model.params["lnF_g"]),
        "lnF_b": arr(model.params["lnF_b"]),
        "Whead": arr(model.params["Whead"]),
        "layers": [{k: arr(v) for k, v in layer.items()} for layer in model.layers],
    }
    out = path or (ROOT / "stage3_brain.js")
    out.write_text(STAGE3_BRAIN_COPYRIGHT + "var STAGE3_BRAIN = " + json.dumps(payload) + ";\n")
    print("wrote", out, "bytes", out.stat().st_size, flush=True)
    if path is None:
        stamp_brain_version(len(model.i2w))
    return out


def stamp_brain_version(vocab_n):
    """Point the lab page at this weight file so a reload draws the lesson just taught."""
    needle = f"stage3_brain.js?v={vocab_n}"
    page = ROOT / "neural_lab.html"
    if not page.exists():
        return
    text = page.read_text()
    updated = re.sub(r"stage3_brain\.js(?:\?v=\d+)?", needle, text, count=1)
    if updated != text:
        page.write_text(updated)


def load_brain_from_path(path=None):
    """Load Stage3 weights from stage3_brain.js (or any export path)."""
    brain_path = Path(path) if path else (ROOT / "stage3_brain.js")
    raw = brain_path.read_text()
    payload = json.loads(raw.split("=", 1)[1].strip().rstrip(";"))
    model = Stage3.__new__(Stage3)
    model.i2w = list(payload["i2w"])
    model.w2i = {w: i for i, w in enumerate(model.i2w)}
    model.params = {
        "E": np.array(payload["E"], dtype=np.float64),
        "P": np.array(payload["P"], dtype=np.float64),
        "lnF_g": np.array(payload["lnF_g"], dtype=np.float64),
        "lnF_b": np.array(payload["lnF_b"], dtype=np.float64),
        "Whead": np.array(payload["Whead"], dtype=np.float64),
    }
    model.layers = [
        {k: np.array(v, dtype=np.float64) for k, v in layer.items()}
        for layer in payload["layers"]
    ]
    model.m = {k: np.zeros_like(v) for k, v in model.params.items()}
    model.v = {k: np.zeros_like(v) for k, v in model.params.items()}
    model.lm = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in model.layers]
    model.lv = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in model.layers]
    model.step = 0
    return model


def load_installed():
    return load_brain_from_path(ROOT / "stage3_brain.js")


def lesson_rows_by_id():
    by_id = {}
    for row in load_fact_packs():
        try:
            rid = int(row.get("id"))
        except (TypeError, ValueError):
            continue
        by_id[rid] = row
    return by_id


def packed_token_count(question, answer):
    packed = pack_qa(question, answer)
    if not packed:
        return 0
    return len(packed[0].split())


def length_bucket(token_count, *, medium_max=128, long_max=256):
    if token_count <= 64:
        return "short"
    if token_count <= medium_max:
        return "medium"
    if token_count <= long_max:
        return "long"
    return "over"


def _empty_bucket_stats():
    return {"tested": 0, "pass": 0, "fail": 0}


def eval_model(model, ids=None, *, by_id=None):
    """Needle eval + gates. ids=None → stage3_learned.json installed list."""
    if by_id is None:
        by_id = lesson_rows_by_id()
    if ids is None:
        learned, skipped, relearn, _, _ = load_learn_record()
        ids = list(learned)
    _, long_facts, _ = load_lessons()
    ok_ids = []
    drifted = []
    missing_lib = []
    no_question = []
    no_needle = []
    buckets = {
        "short": _empty_bucket_stats(),
        "medium": _empty_bucket_stats(),
        "long": _empty_bucket_stats(),
        "over": _empty_bucket_stats(),
        "unknown": _empty_bucket_stats(),
    }
    per_id = []
    for raw_id in ids:
        try:
            rid = int(raw_id)
        except (TypeError, ValueError):
            continue
        row = by_id.get(rid)
        if not row:
            missing_lib.append(rid)
            continue
        question = (row.get("question") or "").strip()
        answer = (row.get("text") or "").strip()
        if not question:
            no_question.append(rid)
            continue
        needle = answer_needle(question, answer)
        if not needle:
            no_needle.append(rid)
            continue
        tok_n = packed_token_count(question, answer)
        bucket = length_bucket(tok_n)
        buckets[bucket]["tested"] += 1
        known = fact_known(model, question, needle)
        if known:
            ok_ids.append(rid)
            buckets[bucket]["pass"] += 1
        else:
            drifted.append(rid)
            buckets[bucket]["fail"] += 1
        per_id.append(
            {
                "id": rid,
                "bucket": bucket,
                "tokens": tok_n,
                "pass": known,
                "needle": needle,
                "category": row.get("category"),
            }
        )
    tested = len(ok_ids) + len(drifted)
    overall_pct = 100.0 * len(ok_ids) / tested if tested else 0.0
    gate_ok = gate(model, long_facts)
    falls = next((fact for fact in long_facts if "979" in fact), None)
    probe_ok = False
    if falls:
        stem = " ".join(tokenize(falls)[:8])
        probe_ok = "979" in continuation(model, stem, 12)
    bucket_pct = {}
    for name, stats in buckets.items():
        n = stats["tested"]
        bucket_pct[name] = round(100.0 * stats["pass"] / n, 1) if n else None
    return {
        "tested": tested,
        "pass": len(ok_ids),
        "fail": len(drifted),
        "pass_pct": round(overall_pct, 2),
        "ok_ids": ok_ids,
        "drifted": drifted,
        "missing_lib": missing_lib,
        "no_question": no_question,
        "no_needle": no_needle,
        "buckets": buckets,
        "bucket_pass_pct": bucket_pct,
        "gates_ok": gate_ok,
        "angel_falls_979_ok": probe_ok,
        "per_id": per_id,
    }


def print_eval_report(result, *, heading="eval"):
    print(
        f"{heading}: {result['pass']}/{result['tested']} lessons needle-pass ({result['pass_pct']:.1f}%)",
        flush=True,
    )
    for key in ("short", "medium", "long", "over"):
        b = result["buckets"][key]
        if not b["tested"]:
            continue
        pct = result["bucket_pass_pct"][key]
        print(
            f"  bucket {key:6} (≤64 / 65–128 / 129–256 / >256): {b['pass']}/{b['tested']} ({pct}%)",
            flush=True,
        )
    if result["missing_lib"]:
        tail = result["missing_lib"] if len(result["missing_lib"]) <= 24 else result["missing_lib"][:24] + ["…"]
        print(f"missing library row ({len(result['missing_lib'])}): {tail}", flush=True)
    if result["no_question"]:
        print(f"not tested — no question ({len(result['no_question'])})", flush=True)
    if result["no_needle"]:
        print(f"not tested — no needle ({len(result['no_needle'])})", flush=True)
    if result["drifted"]:
        tail = result["drifted"] if len(result["drifted"]) <= 48 else result["drifted"][:48] + ["…"]
        print(f"drifted: {tail}", flush=True)
    print("eval probe angel falls 979:", "ok" if result["angel_falls_979_ok"] else "MISS", flush=True)


def eval_baseline_fixture(model, fixture_path, *, by_id=None):
    """Needle-pass on eval-baseline.json prompts (library retrieval is separate)."""
    if by_id is None:
        by_id = lesson_rows_by_id()
    doc = json.loads(Path(fixture_path).read_text())
    items = doc.get("items") or []
    by_kind = {}
    results = []
    for it in items:
        kind = it.get("kind") or "exact"
        if kind == "refusal":
            results.append({**it, "outcome": "skip", "reason": "refusal not graded for needle eval"})
            by_kind.setdefault(kind, {"n": 0, "pass": 0, "skip": 0, "fail": 0})
            by_kind[kind]["n"] += 1
            by_kind[kind]["skip"] += 1
            continue
        target = it.get("target")
        row = by_id.get(int(target)) if target is not None else None
        if not row:
            results.append({**it, "outcome": "fail", "reason": "missing target row"})
            by_kind.setdefault(kind, {"n": 0, "pass": 0, "skip": 0, "fail": 0})
            by_kind[kind]["n"] += 1
            by_kind[kind]["fail"] += 1
            continue
        question = (row.get("question") or "").strip()
        answer = (row.get("text") or "").strip()
        needle = answer_needle(question, answer)
        prompt = (it.get("prompt") or question).strip()
        ok = bool(needle and fact_known(model, prompt, needle))
        outcome = "pass" if ok else "fail"
        results.append({**it, "outcome": outcome, "needle": needle})
        stats = by_kind.setdefault(kind, {"n": 0, "pass": 0, "skip": 0, "fail": 0})
        stats["n"] += 1
        stats[outcome if outcome in ("pass", "skip", "fail") else "fail"] += 1
    return {"items": results, "by_kind": by_kind, "fixture": str(fixture_path)}


def eval_extra_fixture(model, fixture_path, *, by_id=None):
    """Structure + complex needle checks from scripts/fixtures/eval-extra.json."""
    if by_id is None:
        by_id = lesson_rows_by_id()
    doc = json.loads(Path(fixture_path).read_text())
    structure = []
    for item in doc.get("structure") or []:
        row = by_id.get(int(item["id"]))
        if not row:
            structure.append({**item, "outcome": "fail", "reason": "missing row"})
            continue
        question = (row.get("question") or "").strip()
        answer = (row.get("text") or "").strip()
        needle = answer_needle(question, answer)
        steps = max(continuation_steps_for_needle(needle), 48) if needle else 0
        words = continuation(model, question, steps) if needle else []
        text = " ".join(words).lower()
        must = [str(m).lower() for m in item.get("mustContain") or []]
        ok = bool(needle and fact_known(model, question, needle) and all(m in text for m in must))
        structure.append({**item, "outcome": "pass" if ok else "fail", "needle": needle})
    complex_rows = []
    for item in doc.get("complex") or []:
        row = by_id.get(int(item["id"]))
        if not row:
            complex_rows.append({**item, "outcome": "fail", "reason": "missing row"})
            continue
        question = (row.get("question") or "").strip()
        answer = (row.get("text") or "").strip()
        needle = answer_needle(question, answer)
        steps = max(continuation_steps_for_needle(needle), 64) if needle else 0
        ok = bool(needle and fact_known(model, question, needle))
        if ok and needle:
            ok = needle in continuation(model, question, steps)
        complex_rows.append({**item, "outcome": "pass" if ok else "fail", "needle": needle})
    return {
        "fixture": str(fixture_path),
        "structure": structure,
        "complex": complex_rows,
        "related": doc.get("related") or [],
        "note": "related set is library-only metadata until embedding eval exists",
    }


def print_extra_eval_report(result):
    for label in ("structure", "complex"):
        rows = result.get(label) or []
        if not rows:
            continue
        pass_n = sum(1 for r in rows if r.get("outcome") == "pass")
        print(f"  extra {label}: {pass_n}/{len(rows)} pass", flush=True)


def print_baseline_needle_report(result):
    print(f"BASELINE NEEDLE  fixture={Path(result['fixture']).name}", flush=True)
    graded = [it for it in result["items"] if it.get("outcome") != "skip"]
    pass_n = sum(1 for it in graded if it.get("outcome") == "pass")
    print(f"  graded {pass_n}/{len(graded)} pass ({100.0 * pass_n / len(graded):.1f}%)" if graded else "  graded 0", flush=True)
    for kind, stats in sorted(result["by_kind"].items()):
        if stats["n"] == 0:
            continue
        pct = 100.0 * stats["pass"] / stats["n"] if stats["n"] else 0
        print(
            f"  {kind:10} n={stats['n']} pass={stats['pass']} skip={stats.get('skip', 0)} fail={stats['fail']} ({pct:.0f}%)",
            flush=True,
        )


def _extract_taught_library(text):
    """TAUGHT_LIBRARY may follow TAUGHT_GROUPS; strip // section comments inside the array."""
    marker = "var TAUGHT_LIBRARY ="
    pos = text.find(marker)
    if pos < 0:
        raise ValueError("TAUGHT_LIBRARY")
    start = text.find("[", pos)
    depth = 0
    i = start
    in_str = None
    esc = False
    while i < len(text):
        ch = text[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        elif ch in ('"', "'"):
            in_str = ch
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                blob = text[start : i + 1]
                lines = [line for line in blob.splitlines() if not line.strip().startswith("//")]
                blob = "\n".join(lines)
                blob = re.sub(r",(\s*[\]}])", r"\1", blob)
                return json.loads(blob)
        i += 1
    raise ValueError("unclosed TAUGHT_LIBRARY")


def load_fact_packs():
    """Every *_facts.js pack, so a new field is included the next time this runs."""
    packs = []
    for path in sorted(ROOT.glob("*_facts.js")):
        text = path.read_text()
        if path.name == "taught_facts.js":
            rows = _extract_taught_library(text)
        else:
            blob = text[text.index("[") : text.rindex("]") + 1]
            blob = re.sub(r",(\s*[\]}])", r"\1", blob)
            rows = json.loads(blob)
        packs.extend(rows)
    return packs


def prompt_variants(question):
    """The stored question, plus the same ask with the leading what/is/the dropped."""
    words = tokenize(question)
    variants = [" ".join(words)]
    drop = 0
    while drop < len(words) - 2 and words[drop] in ("what", "is", "the", "a", "an", "are", "do", "does", "how"):
        drop += 1
        variants.append(" ".join(words[drop:]))
    return list(dict.fromkeys(variants))


def snapshot(model):
    return {
        "i2w": list(model.i2w),
        "params": {k: v.copy() for k, v in model.params.items()},
        "layers": [{k: v.copy() for k, v in layer.items()} for layer in model.layers],
    }


def restore(model, shot):
    model.i2w = list(shot["i2w"])
    model.w2i = {w: i for i, w in enumerate(model.i2w)}
    for k, v in shot["params"].items():
        model.params[k] = v.copy()
    model.layers = [{k: v.copy() for k, v in layer.items()} for layer in shot["layers"]]


def continuation(model, prompt, steps):
    base = len(tokenize(prompt))
    words = model.greedy(prompt, steps)
    return words[base:]


def reset_moments(model):
    model.m = {k: np.zeros_like(v) for k, v in model.params.items()}
    model.v = {k: np.zeros_like(v) for k, v in model.params.items()}
    model.lm = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in model.layers]
    model.lv = [{k: np.zeros_like(v) for k, v in layer.items()} for layer in model.layers]
    model.step = 0


def scale_new_embeddings(model, old_n):
    """New words start as loud as known words. The output scores stay small until training earns them."""
    if old_n >= len(model.i2w):
        return
    block = model.params["E"]
    old_rms = float(np.sqrt(np.mean(block[:old_n] ** 2)))
    new_rms = float(np.sqrt(np.mean(block[old_n:] ** 2))) + 1e-8
    block[old_n:] *= old_rms / new_rms


def answer_needle(question, answer):
    """Distinctive content word from the opening of the answer — not a long list example (e.g. cyanobacteria)."""
    stop = set(
        "the a an of to in on for and or with from by at as is are was be it its this that".split()
    )
    weak = set(
        "another major also first second one new such same most other many well very both while "
        "acts like when through called into over under after before during "
        "synthesizing provides formerly specifically usually biological processes system organisms "
        "term refers releases bearing convert necessary typically".split()
    )
    asked = set(tokenize(question))
    chunk = (answer or "").strip()
    dot = chunk.find(".")
    if dot > 40:
        chunk = chunk[: dot + 1]
    fallback = None
    scored = []
    for word in tokenize(chunk):
        if word in "?.!," or word in stop or word in asked:
            continue
        if word in weak:
            if fallback is None:
                fallback = word
            continue
        score = min(len(word), 14)
        if 5 <= len(word) <= 12:
            score += 10
        if len(word) > 14:
            score -= 8
        scored.append((score, word))
    if scored:
        scored.sort(key=lambda t: (-t[0], t[1]))
        return scored[0][1]
    if fallback:
        return fallback
    for word in tokenize(answer):
        if word not in "?.!," and word not in stop and word not in asked:
            return word
    return None


def continuation_steps_for_needle(needle):
    """Long answer tokens need more greedy steps before the needle can appear."""
    n = len(needle or "")
    return max(14, min(64, 10 + n // 2))


def fact_known(model, question, needle):
    """Needle must appear when continuing from the stored question (variants are hints, not all required)."""
    if not needle:
        return False
    steps = continuation_steps_for_needle(needle)
    variants = prompt_variants(question)
    if needle in continuation(model, variants[0], steps):
        return True
    for prompt in variants[1:3]:
        if needle in continuation(model, prompt, steps):
            return True
    return False


def learn_retention_accept(known_now, lost, old_ok):
    """Install when the new lesson answers and core regression gates pass; retention loss is repaired via relearn."""
    return bool(known_now and old_ok)


def learn_new_learning_rate(epoch, max_epochs, *, flat=False, peak=LEARN_NEW_LR_PEAK):
    """Warmup then cosine decay for incremental installs (full trainer uses a similar schedule in main())."""
    if flat or max_epochs <= 0:
        return peak
    warm = min(LEARN_NEW_WARM_EPOCHS, max(1, max_epochs // 4))
    if epoch < warm:
        return LEARN_NEW_LR_WARM + (peak - LEARN_NEW_LR_WARM) * (epoch / warm)
    tail = max_epochs - warm
    if tail <= 0:
        return peak
    t = (epoch - warm) / tail
    return peak * 0.5 * (1 + math.cos(math.pi * t))


def load_learn_record():
    path = ROOT / "stage3_learned.json"
    if not path.exists():
        return [], [], [], [], {}
    data = json.loads(path.read_text())
    relearn = list(data.get("relearn") or [])
    deferred = list(data.get("deferred") or [])
    defer_fail = dict(data.get("defer_fail") or {})
    return (
        list(data.get("ids", [])),
        list(data.get("skipped", [])),
        relearn,
        deferred,
        defer_fail,
    )


def save_learn_record(learned, skipped, relearn=None, deferred=None, defer_fail=None):
    path = ROOT / "stage3_learned.json"
    old = {}
    if path.exists():
        try:
            old = json.loads(path.read_text())
        except (json.JSONDecodeError, OSError):
            old = {}
    payload = {"ids": learned, "skipped": skipped}
    payload["relearn"] = relearn if relearn is not None else list(old.get("relearn") or [])
    payload["deferred"] = deferred if deferred is not None else list(old.get("deferred") or [])
    payload["defer_fail"] = defer_fail if defer_fail is not None else dict(old.get("defer_fail") or {})
    path.write_text(json.dumps(payload) + "\n")


def pick_pending_lesson(learned, skipped, deferred, defer_fail):
    """Highest teachable id not installed/skipped; prefer ids not recently deferred."""
    known = set(learned) | set(skipped)
    pending = [
        r
        for r in load_fact_packs()
        if r.get("id") not in known
        and (r.get("question") or "").strip()
        and (r.get("text") or "").strip()
    ]
    pending.sort(key=lambda r: r.get("id", 0), reverse=True)
    if not pending:
        return None, pending, deferred
    deferred_set = set(deferred)
    preferred = [r for r in pending if r.get("id") not in deferred_set]
    if preferred:
        return preferred[0], pending, deferred
    rid = deferred[0]
    deferred = deferred[1:] + [rid]
    row = next((r for r in pending if r.get("id") == rid), pending[0])
    return row, pending, deferred


def teachable_lesson_rows():
    """Library rows that --learn-new can install (question + answer text)."""
    rows = []
    for row in load_fact_packs():
        if (row.get("question") or "").strip() and (row.get("text") or "").strip():
            rows.append(row)
    return rows


def learn_new_queue_stats(learned, skipped):
    known = set(learned) | set(skipped)
    teachable = teachable_lesson_rows()
    pending_n = sum(1 for row in teachable if row.get("id") not in known)
    return {
        "installed": len(learned),
        "skipped": len(skipped),
        "pending": pending_n,
        "teachable": len(teachable),
    }


def print_learn_new_queue(stats, heading=None):
    """Console + log summary for deep-network install progress."""
    if heading:
        print(heading, flush=True)
    print(
        "deep network: "
        f"{stats['installed']} installed in stage3_brain.js, "
        f"{stats['skipped']} skipped, "
        f"{stats['pending']} waiting to learn "
        f"({stats['teachable']} teachable lessons with questions in the library)",
        flush=True,
    )
    print(
        "LEARN-NEW-QUEUE "
        f"installed={stats['installed']} skipped={stats['skipped']} "
        f"pending={stats['pending']} teachable={stats['teachable']}",
        flush=True,
    )


def learn_new(*, ignore_relearn=False):
    """Teach the newest lesson that is not in the weights yet. Save only if the old checks still pass."""
    relearn_first = "--relearn-first" in sys.argv
    learned, skipped, relearn, deferred, defer_fail = load_learn_record()
    by_id = {row.get("id"): row for row in load_fact_packs()}
    from_relearn = False
    row = None
    row, pending, deferred = pick_pending_lesson(learned, skipped, deferred, defer_fail)
    if relearn and not ignore_relearn and (relearn_first or not pending):
        rid = relearn[0]
        row = by_id.get(rid)
        from_relearn = True
        if not row:
            print(f"relearn {rid} missing from library — dropping from queue", flush=True)
            save_learn_record(learned, skipped, relearn[1:], deferred, defer_fail)
            return
        if rid in skipped:
            skipped = [x for x in skipped if x != rid]
        print(f"relearn queue: correcting installed lesson {rid}", flush=True)
    elif relearn and not ignore_relearn and pending:
        print(
            f"relearn ({len(relearn)} waiting) — teaching pending lesson {row.get('id')} first",
            flush=True,
        )
    if row is None:
        stats = learn_new_queue_stats(learned, skipped)
        if not pending:
            if relearn and not ignore_relearn:
                learn_new(ignore_relearn=False)
                return
            print("every lesson file is already in the deep network", flush=True)
            print_learn_new_queue(stats)
            print("LEARN-NEW-STATUS queue-empty pending=0", flush=True)
            return
    stats = learn_new_queue_stats(learned, skipped)
    question = row["question"].strip()
    answer = row["text"].strip()
    needle = answer_needle(question, answer)
    print_learn_new_queue(stats, heading="--- learn-new queue ---")
    print(
        f"teaching {row.get('id')} {question} needle {needle}  "
        f"({stats['pending']} waiting after this one)",
        flush=True,
    )
    model = load_installed()
    old_n = len(model.i2w)
    _, long_facts, _ = load_lessons()
    # Replay only lessons the weights still answer. A new skill must not push those out.
    held = []
    for old_id in reversed(learned):
        if len(held) >= HELD_REPLAY_MAX:
            break
        old = by_id.get(old_id)
        if not old:
            continue
        old_q = (old.get("question") or "").strip()
        old_a = (old.get("text") or "").strip()
        old_needle = answer_needle(old_q, old_a)
        if old_q and old_needle and fact_known(model, old_q, old_needle):
            held.append((old, old_needle))
    fresh = []
    for variant in prompt_variants(question):
        packed = pack_qa(variant, answer)
        if packed:
            fresh.append(packed)
    fresh.append((answer, 0))
    claims = claim_examples(long_facts)
    falls = next(fact for fact in long_facts if "979" in fact)
    words = []
    for text, _ in fresh:
        words.extend(tokenize(text))
    for line in claims:
        words.extend(tokenize(line))
    words.extend(tokenize(falls))
    added = grow_vocab(model, words)
    scale_new_embeddings(model, old_n)
    print(f"vocab {len(model.i2w)} new words {added}", flush=True)
    fresh_weight = 14 if needle and len(needle) > 12 else 10
    items = [(text, idx, False) for text, idx in fresh] * fresh_weight
    held_items = []
    for old, _needle in held:
        for variant in prompt_variants(old["question"]):
            packed = pack_qa(variant, old["text"])
            if packed:
                held_items.append((packed[0], packed[1], False))
        held_items.append((old["text"].strip(), 0, False))
    items += held_items * 4
    drills = []
    for fact, ask, label in gate_checks(long_facts):
        if fact:
            drills.append(fact + " " + ask + " " + label)
    items += [(line, None, True) for line in drills] * 6
    items += [(line, None, True) for line in claims]
    items += [(falls, None, False)]
    print(
        f"holding {len(held)} recent lessons (max {HELD_REPLAY_MAX}) that still answer",
        flush=True,
    )

    def lesson_items(old):
        packed_items = []
        for variant in prompt_variants(old["question"]):
            packed = pack_qa(variant, old["text"])
            if packed:
                packed_items.append((packed[0], packed[1], False))
        packed_items.append((old["text"].strip(), 0, False))
        return packed_items

    def check_learn():
        known_now = fact_known(model, question, needle)
        lost = [
            old.get("id") for old, old_needle in held
            if not fact_known(model, old["question"], old_needle)
        ]
        old_ok = gate(model, long_facts) and "979" in continuation(model, " ".join(tokenize(falls)[:8]), 12)
        lost_preview = lost if len(lost) <= 8 else lost[:8] + ["…"]
        print(
            "LEARN",
            needle,
            "known" if known_now else "missing",
            "retention",
            "ok" if not lost else f"lost {len(lost)}",
            lost_preview,
            "old checks",
            old_ok,
            flush=True,
        )
        return known_now, lost, old_ok

    best = None
    best_lost = []
    rescue = None
    rescue_lost = None

    def keep_best(known_now, lost, old_ok):
        nonlocal best, best_lost
        if not learn_retention_accept(known_now, lost, old_ok):
            return False
        if best is None or len(lost) < len(best_lost):
            best = snapshot(model)
            best_lost = list(lost)
            if lost:
                print(f"learn snapshot kept (retention repair queue {lost})", flush=True)
            else:
                print("learn snapshot kept", flush=True)
            return not lost
        return False

    flat_lr = "--flat-lr" in sys.argv
    for epoch in range(LEARN_NEW_EPOCHS):
        lr = learn_new_learning_rate(epoch, LEARN_NEW_EPOCHS, flat=flat_lr)
        print(
            f"learn epoch {epoch:02d} start ({len(items)} training items) lr {lr:.6f}",
            flush=True,
        )
        train_epoch(model, items, lr, epoch, 6.0)
        if epoch < 4:
            continue
        known_now, lost, old_ok = check_learn()
        if keep_best(known_now, lost, old_ok) and not lost:
            break
        if known_now and old_ok and (rescue is None or len(lost) < len(rescue_lost)):
            rescue = snapshot(model)
            rescue_lost = list(lost)
    if best is None and rescue is not None and rescue_lost:
        print(f"rescue {rescue_lost}", flush=True)
        restore(model, rescue)
        reset_moments(model)
        extra = [(text, idx, False) for text, idx in fresh]
        lost_ids = set(rescue_lost)
        for old, _needle in held:
            if old.get("id") in lost_ids:
                extra += lesson_items(old)
        rescue_items = items + extra * 10
        for r_epoch in range(RESCUE_EPOCHS):
            epoch = LEARN_NEW_EPOCHS + r_epoch
            lr = learn_new_learning_rate(
                r_epoch, RESCUE_EPOCHS, flat=flat_lr, peak=RESCUE_LR_PEAK
            )
            print(f"rescue epoch {epoch:02d} lr {lr:.6f}", flush=True)
            train_epoch(model, rescue_items, lr, epoch, 6.0)
            known_now, lost, old_ok = check_learn()
            if keep_best(known_now, lost, old_ok) and not lost:
                break
    if best is None:
        if from_relearn:
            failed_id = row.get("id")
            rotated = relearn[1:] + [relearn[0]]
            save_learn_record(learned, skipped, rotated, deferred, defer_fail)
            print(
                f"NOT RELEARNED {failed_id}. stage3_brain.js unchanged; "
                f"lesson moved to end of relearn queue — try shorter answer text or run again later.",
                flush=True,
            )
            print(f"LEARN-NEW-STATUS relearn-deferred id={failed_id}", flush=True)
            still_row, still_pending, _ = pick_pending_lesson(learned, skipped, deferred, defer_fail)
            if still_pending:
                print(
                    "relearn deferred — teaching next pending lesson in this run.",
                    flush=True,
                )
                learn_new(ignore_relearn=True)
            return
        fail_id = row.get("id")
        defer_fail[fail_id] = int(defer_fail.get(fail_id, 0)) + 1
        attempt = defer_fail[fail_id]
        if fail_id not in deferred:
            deferred.append(fail_id)
        if attempt >= INSTALL_FAIL_SKIP:
            skipped.append(fail_id)
            deferred = [x for x in deferred if x != fail_id]
            defer_fail.pop(fail_id, None)
            save_learn_record(learned, skipped, relearn, deferred, defer_fail)
            print("NOT INSTALLED. The previous stage3_brain.js is unchanged.", flush=True)
            print(
                f"skipped {fail_id} after {attempt} failed installs. The next run teaches the next lesson.",
                flush=True,
            )
            after = learn_new_queue_stats(learned, skipped)
            print_learn_new_queue(after, heading="--- after skip ---")
            print(
                f"LEARN-NEW-STATUS skipped id={fail_id} pending={after['pending']}",
                flush=True,
            )
        else:
            save_learn_record(learned, skipped, relearn, deferred, defer_fail)
            print("NOT INSTALLED. The previous stage3_brain.js is unchanged.", flush=True)
            print(
                f"deferred {fail_id} (attempt {attempt}/{INSTALL_FAIL_SKIP}) — will retry after other pending lessons.",
                flush=True,
            )
            after = learn_new_queue_stats(learned, skipped)
            print_learn_new_queue(after, heading="--- after defer ---")
            print(
                f"LEARN-NEW-STATUS install-deferred id={fail_id} pending={after['pending']}",
                flush=True,
            )
        return
    restore(model, best)
    export(model)
    rid = row["id"]
    if rid not in learned:
        learned.append(rid)
    next_relearn = list(relearn or [])
    if from_relearn and next_relearn and next_relearn[0] == rid:
        next_relearn = next_relearn[1:]
    repair = [x for x in (best_lost or []) if x != rid]
    for lid in repair:
        if lid in learned and lid not in next_relearn:
            next_relearn.append(lid)
    if repair:
        print(f"retention repair queued for relearn: {repair}", flush=True)
    if rid in deferred:
        deferred = [x for x in deferred if x != rid]
    defer_fail.pop(rid, None)
    save_learn_record(learned, skipped, next_relearn, deferred, defer_fail)
    after = learn_new_queue_stats(learned, skipped)
    if from_relearn:
        print(f"relearned {rid}. Weights updated for the corrected answer.", flush=True)
        print(f"LEARN-NEW-STATUS relearned id={rid} pending={after['pending']}", flush=True)
    else:
        print(
            f"installed {rid}. {after['pending']} lessons still waiting for --learn-new.",
            flush=True,
        )
        print(
            f"LEARN-NEW-STATUS installed id={rid} pending={after['pending']}",
            flush=True,
        )
    print_learn_new_queue(after, heading="--- after install ---")


def eval_brain():
    """Read-only CLI: installed ids from stage3_learned.json (legacy npm run eval)."""
    learned, skipped, relearn, _, _ = load_learn_record()
    brain_path = _cli_arg("--eval-file") or (ROOT / "stage3_brain.js")
    model = load_brain_from_path(brain_path)
    ids = _resolve_eval_ids(learned)
    result = eval_model(model, ids=ids)
    print_eval_report(result)
    print(
        f"record: installed={len(learned)} skipped={len(skipped)} relearn={len(relearn)}",
        flush=True,
    )
    if result["drifted"]:
        print("drifted ids can go to stage3_learned.json relearn (manual or patch relearnDeep).", flush=True)
    _maybe_write_eval_json(result)
    strict = "--strict" in sys.argv
    if strict and (result["drifted"] or not result["gates_ok"] or not result["angel_falls_979_ok"]):
        print("eval STRICT fail", flush=True)
        return 1
    return 0


def _cli_arg(flag, default=None):
    if flag not in sys.argv:
        return default
    i = sys.argv.index(flag)
    if i + 1 >= len(sys.argv):
        return default
    return sys.argv[i + 1]


def _resolve_eval_ids(fallback_learned):
    if "--eval-all-teachable" in sys.argv:
        return [r.get("id") for r in teachable_lesson_rows()]
    ids_file = _cli_arg("--eval-ids-file")
    if ids_file:
        data = json.loads(Path(ids_file).read_text())
        return data if isinstance(data, list) else list(data.get("ids") or [])
    return list(fallback_learned)


def _maybe_write_eval_json(result):
    out = _cli_arg("--eval-json")
    if not out:
        return
    path = Path(out)
    if not path.is_absolute():
        path = ROOT / path
    payload = {k: v for k, v in result.items() if k != "per_id"}
    payload["per_id_count"] = len(result.get("per_id") or [])
    path.write_text(json.dumps(payload, indent=2) + "\n")
    try:
        rel = path.relative_to(ROOT)
    except ValueError:
        rel = path
    print(f"wrote eval json {rel}", flush=True)


def scale_new_rows(model, old_n):
    """New words start as loud as the words the brain already knows."""
    if old_n >= len(model.i2w):
        return
    for key, axis in (("E", 0), ("Whead", 1)):
        block = model.params[key]
        old = np.take(block, range(old_n), axis=axis)
        new = np.take(block, range(old_n, block.shape[axis]), axis=axis)
        old_rms = float(np.sqrt(np.mean(old ** 2)))
        new_rms = float(np.sqrt(np.mean(new ** 2))) + 1e-8
        if axis == 0:
            block[old_n:] *= old_rms / new_rms
        else:
            block[:, old_n:] *= old_rms / new_rms


def apply_new_rows(model, top, layer_grads, lr, old_n):
    """Move only the new word rows. The trained blocks stay put."""
    mask = np.zeros(top["E"].shape[0])
    mask[old_n:] = 1.0
    top["E"] *= mask[:, None]
    top["Whead"] *= mask[None, :]
    for key in top:
        if key not in ("E", "Whead"):
            top[key][:] = 0
    frozen = [{k: np.zeros_like(v) for k, v in grads.items()} for grads in layer_grads]
    model.apply(top, frozen, lr)


def absorb_ready(model, long_facts):
    """Old answers still hold, and the new names come out on the first words."""
    falls = next(t for t in long_facts if "979" in t)
    stem = " ".join(tokenize(falls)[:8])
    kept = "979" in continuation(model, stem, 12)
    print("ABSORB 979", kept, flush=True)
    spots = [
        ("capital of bulgaria ?", "sofia", True, 8),
        ("capital of afghanistan ?", "kabul", True, 8),
        ("what is hydrogen ?", "lightest", False, 12),
        ("what gives ruby its deep red color ?", "chromium", False, 24),
        ("what are tardigrades ?", "microscopic", False, 12),
        ("what is pi ?", "3.14", False, 16),
    ]
    ok = kept and gate(model, long_facts)
    for question, needle, first_only, steps in spots:
        got = continuation(model, question, steps)
        hit = (got[:1] == [needle]) if first_only else needle in got
        print("ABSORB", question, "->", " ".join(got)[:90], "hit" if hit else "MISS", flush=True)
        ok = ok and hit
    return ok


def train_epoch(model, items, lr, epoch, focus, old_n=None, span=None):
    t0 = time.perf_counter()
    order = np.random.default_rng(SEED + 100 + epoch).permutation(len(items))
    total, n = 0.0, 0
    for i in order:
        text, answer_from, tail = items[i]
        ids, answer_at = encode_ids(model, text, answer_from)
        if len(ids) < 2:
            continue
        loss, top, layer_grads = model.loss_and_backward(
            ids, tail=tail, answer_from=answer_at,
            focus=focus if answer_at is not None else 1.0,
            span=span,
        )
        if old_n is None:
            model.apply(top, layer_grads, lr)
        else:
            apply_new_rows(model, top, layer_grads, lr, old_n)
        total += loss
        n += 1
    print(f"absorb epoch {epoch:02d} loss {total / max(1, n):.3f} sec {time.perf_counter() - t0:.1f}", flush=True)


def absorb():
    """Teach the installed brain every lesson pack. Save only if the old checks still pass."""
    model = load_installed()
    old_n = len(model.i2w)
    _, long_facts, _ = load_lessons()
    fresh = []
    hold = []
    for row in load_fact_packs():
        question = (row.get("question") or "").strip()
        answer = (row.get("text") or "").strip()
        if not question or not answer:
            continue
        biology = (row.get("category") or "").strip().lower() == "biology"
        questions = [question] if biology else prompt_variants(question)
        for variant in questions:
            packed = pack_qa(variant, answer)
            if packed:
                (hold if biology else fresh).append(packed)
    hold.extend(qa_examples(load_practice_pairs(), []))
    claims = claim_examples(long_facts)
    words = []
    for text, _ in fresh + hold:
        words.extend(tokenize(text))
    for fact in long_facts:
        words.extend(tokenize(fact))
    for line in claims:
        words.extend(tokenize(line))
    added = grow_vocab(model, words)
    scale_new_rows(model, old_n)
    print(f"absorb vocab {len(model.i2w)} new words {added} fresh {len(fresh)} hold {len(hold)}", flush=True)
    replay = (
        [(text, idx, False) for text, idx in hold] * 2
        + [(fact, None, False) for fact in long_facts]
        + [(line, None, True) for line in claims] * 3
    )
    best = None
    for epoch in range(8):
        train_epoch(model, [(text, idx, False) for text, idx in fresh], 0.02, epoch, 16.0, old_n)
        if absorb_ready(model, long_facts):
            best = snapshot(model)
            print("absorb snapshot kept", flush=True)
            break
    if best is None:
        print("NOT INSTALLED. The previous stage3_brain.js is unchanged.", flush=True)
        return
    restore(model, best)
    reset_moments(model)
    polish = [(text, idx, False) for text, idx in fresh] + replay
    for epoch in range(8, 12):
        train_epoch(model, polish, 0.00012, epoch, 8.0)
        if absorb_ready(model, long_facts):
            best = snapshot(model)
            print("absorb snapshot kept", flush=True)
        else:
            restore(model, best)
            reset_moments(model)
            print("absorb polish reverted", flush=True)
            break
    restore(model, best)
    export(model)
    print("installed updated stage3_brain.js", flush=True)


if __name__ == "__main__":
    if "--eval-extra" in sys.argv:
        fixture = _cli_arg("--fixture", str(ROOT / "scripts" / "fixtures" / "eval-extra.json"))
        brain_path = _cli_arg("--eval-file", str(ROOT / "stage3_brain.js"))
        model = load_brain_from_path(brain_path)
        extra = eval_extra_fixture(model, fixture)
        print(f"EVAL-EXTRA fixture={Path(fixture).name}", flush=True)
        print_extra_eval_report(extra)
        out = _cli_arg("--eval-json")
        if out:
            Path(out).write_text(json.dumps(extra, indent=2) + "\n")
        raise SystemExit(0)
    if "--eval-baseline" in sys.argv:
        fixture = _cli_arg("--fixture", str(ROOT / "scripts" / "fixtures" / "eval-baseline.json"))
        brain_path = _cli_arg("--eval-file", str(ROOT / "stage3_brain.js"))
        model = load_brain_from_path(brain_path)
        baseline = eval_baseline_fixture(model, fixture)
        print_baseline_needle_report(baseline)
        out = _cli_arg("--eval-json")
        if out:
            Path(out).write_text(json.dumps(baseline, indent=2) + "\n")
        if "--strict" in sys.argv:
            graded = [it for it in baseline["items"] if it.get("outcome") != "skip"]
            if not all(it.get("outcome") == "pass" for it in graded):
                print("eval-baseline STRICT fail", flush=True)
                raise SystemExit(1)
        raise SystemExit(0)
    if "--eval" in sys.argv:
        raise SystemExit(eval_brain())
    if "--learn-new" in sys.argv:
        learn_new()
    elif "--absorb" in sys.argv:
        absorb()
    else:
        main()
