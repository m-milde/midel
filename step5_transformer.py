# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""
Step 5: The Transformer — Attention & Generative Language Model
===============================================================

Why did the Bag-of-Words model fail when asked:
    "what is the sky during the day?"  -> NEGATIVE 94%

Because it had:
  1. NO word order (it couldn't tell "blue day" from "dark day")
  2. NO context mechanism (it couldn't link "day" to "blue" vs "night" to "dark")
  3. NO generative capability (it could only vote 0 or 1, not output words)

This script builds a REAL Causal Self-Attention Transformer (Micro-GPT)
from scratch in pure NumPy — the exact architecture behind ChatGPT and Gemini!

Concepts introduced:
  • Token Embeddings (representing words as continuous vectors)
  • Positional Encodings (giving words a sense of sequence order)
  • Self-Attention (Query, Key, Value matrices and Causal Mask)
  • Autoregressive Next-Token Prediction (Cross-Entropy Loss)
  • Adam Optimizer (fast gradient descent)

Run:
    python step5_transformer.py
"""

import numpy as np
import re


def softmax(x, axis=-1):
    ex = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return ex / np.sum(ex, axis=axis, keepdims=True)


def tokenize(text):
    """Clean tokenization keeping punctuation marks like ? and . separated."""
    text = text.lower().strip()
    return re.findall(r"[a-z0-9]+|[?.!,]", text)


class MicroTransformerLM:
    """
    A 1-layer Causal Transformer Language Model built with pure NumPy.
    Architecture:
      Token + Position Embeddings -> Causal Self-Attention -> Residual -> MLP -> LM Head
    """
    def __init__(self, d_model=24, max_seq_len=20, lr=0.01):
        self.d_model = d_model
        self.max_seq_len = max_seq_len
        self.lr = lr

        self.w2i = {}
        self.i2w = {}
        self.params = {}
        self.m = {}
        self.v = {}
        self.step = 0
        self.loss_history = []
        self.is_trained = False

    def build_vocab(self, texts):
        unique_tokens = sorted(list(set(
            token for text in texts for token in tokenize(text)
        )))
        self.w2i = {w: i for i, w in enumerate(unique_tokens)}
        self.i2w = {i: w for w, i in self.w2i.items()}
        self._init_params()

    def _init_params(self):
        np.random.seed(42)
        V, D, T = len(self.w2i), self.d_model, self.max_seq_len
        self.params = {
            "E": np.random.randn(V, D) * 0.1,          # Token Embeddings
            "P": np.random.randn(T, D) * 0.1,          # Learned Position Embeddings
            "Wq": np.random.randn(D, D) * 0.1,         # Query Projection
            "Wk": np.random.randn(D, D) * 0.1,         # Key Projection
            "Wv": np.random.randn(D, D) * 0.1,         # Value Projection
            "Wo": np.random.randn(D, D) * 0.1,         # Attention Output Projection
            "W1": np.random.randn(D, 2 * D) * 0.1,     # MLP Feedforward Layer 1
            "b1": np.zeros(2 * D),
            "W2": np.random.randn(2 * D, D) * 0.1,     # MLP Feedforward Layer 2
            "b2": np.zeros(D),
            "Whead": np.random.randn(D, V) * 0.1,      # Language Model Head (Vocab Logits)
        }
        self.m = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.v = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.step = 0

    def forward(self, token_ids):
        """Forward pass for a sequence of token IDs."""
        T = len(token_ids)
        D = self.d_model

        # 1. Embeddings + Position
        X = self.params["E"][token_ids] + self.params["P"][:T]

        # 2. Self-Attention (Query, Key, Value)
        Q = X @ self.params["Wq"]
        K = X @ self.params["Wk"]
        V_mat = X @ self.params["Wv"]

        scale = np.sqrt(D)
        scores = (Q @ K.T) / scale

        # Causal mask (tokens can only look backward, not forward into the future)
        mask = np.triu(np.ones((T, T)), k=1).astype(bool)
        scores[mask] = -1e9
        A = softmax(scores, axis=-1)   # Attention weights matrix (T x T)
        C = A @ V_mat
        H = C @ self.params["Wo"] + X  # Residual connection

        # 3. Feedforward MLP
        F1 = np.maximum(0, H @ self.params["W1"] + self.params["b1"])
        F2 = F1 @ self.params["W2"] + self.params["b2"]
        Z = F2 + H                     # Residual connection

        # 4. Output projection to vocabulary logits
        logits = Z @ self.params["Whead"]
        probs = softmax(logits, axis=-1)

        cache = (token_ids, X, Q, K, V_mat, A, C, H, F1, F2, Z, probs, mask)
        return probs, A, cache

    def train_epoch(self, texts):
        total_loss = 0.0
        beta1, beta2, eps = 0.9, 0.999, 1e-8
        D = self.d_model

        for text in texts:
            tokens = [self.w2i[w] for w in tokenize(text) if w in self.w2i]
            if len(tokens) < 2:
                continue

            T = min(len(tokens) - 1, self.max_seq_len - 1)
            x_tok = tokens[:T]
            y_tok = tokens[1:T+1]

            probs, A, cache = self.forward(x_tok)
            token_ids, X, Q, K, V_mat, A, C, H, F1, F2, Z, probs, mask = cache

            # Cross-entropy loss on target tokens
            loss = -np.mean(np.log(probs[np.arange(T), y_tok] + 1e-10))
            total_loss += loss

            # ── Backward Pass ─────────────────────────────────────────
            dlogits = probs.copy()
            dlogits[np.arange(T), y_tok] -= 1
            dlogits /= T

            dWhead = Z.T @ dlogits
            dZ = dlogits @ self.params["Whead"].T

            dF2 = dZ
            dH = dZ.copy()
            dF1 = (dF2 @ self.params["W2"].T) * (F1 > 0)
            dW2 = F1.T @ dF2
            db2 = np.sum(dF2, axis=0)
            dW1 = H.T @ dF1
            db1 = np.sum(dF1, axis=0)
            dH += dF1 @ self.params["W1"].T

            dC = dH @ self.params["Wo"].T
            dWo = C.T @ dH
            dX = dH.copy()
            dV_mat = A.T @ dC
            dA = dC @ V_mat.T

            # Softmax backward
            dscores = A * (dA - np.sum(dA * A, axis=-1, keepdims=True))
            dscores[mask] = 0
            dscores /= np.sqrt(D)

            dQ = dscores @ K
            dK = dscores.T @ Q
            dX += dQ @ self.params["Wq"].T + dK @ self.params["Wk"].T + dV_mat @ self.params["Wv"].T
            dWq = X.T @ dQ
            dWk = X.T @ dK
            dWv = X.T @ dV_mat

            grads = {
                "Whead": dWhead, "W2": dW2, "b2": db2, "W1": dW1, "b1": db1,
                "Wo": dWo, "Wq": dWq, "Wk": dWk, "Wv": dWv
            }

            self.step += 1
            for k in grads:
                self.m[k] = beta1 * self.m[k] + (1 - beta1) * grads[k]
                self.v[k] = beta2 * self.v[k] + (1 - beta2) * (grads[k]**2)
                m_hat = self.m[k] / (1 - beta1**self.step)
                v_hat = self.v[k] / (1 - beta2**self.step)
                self.params[k] -= self.lr * m_hat / (np.sqrt(v_hat) + eps)

            for t, idx in enumerate(x_tok):
                self.params["E"][idx] -= self.lr * dX[t]
                self.params["P"][t] -= self.lr * dX[t]

        avg_loss = total_loss / max(1, len(texts))
        return avg_loss

    def predict_next(self, prompt, top_k=5):
        """Predict probability distribution for the next token after prompt."""
        tokens = [self.w2i[w] for w in tokenize(prompt) if w in self.w2i]
        if not tokens:
            return [], None

        tokens = tokens[-self.max_seq_len:]
        probs, A, _ = self.forward(tokens)
        last_probs = probs[-1]

        top_indices = np.argsort(last_probs)[::-1][:top_k]
        results = [
            (self.i2w[i], float(last_probs[i]))
            for i in top_indices if last_probs[i] > 0.0001
        ]
        return results, A

    def generate(self, prompt, max_new_tokens=4):
        """Generate subsequent words token by token."""
        current_text = prompt
        generated = []
        for _ in range(max_new_tokens):
            preds, _ = self.predict_next(current_text, top_k=1)
            if not preds:
                break
            next_word, prob = preds[0]
            if next_word in [".", "!", "?"] and generated:
                generated.append(next_word)
                break
            generated.append(next_word)
            current_text += " " + next_word
        return " ".join(generated)


# ── Interactive Demonstration ──────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("🧠  STEP 5: THE CAUSAL TRANSFORMER (Micro-GPT)")
    print("=" * 60)
    print()

    # Expanded Master Curriculum (83 facts across 6 domains)
    knowledge = [
        # 1. Nature & Celestial
        "what is the sky during the day ? blue",
        "what is the sky during the night ? dark",
        "the sky is blue during the day",
        "the sky is dark during the night",
        "what shines during the day ? sun",
        "what shines during the night ? moon",
        "the sun shines during the day",
        "the moon shines during the night",
        "stars shine during the night",
        "rain falls from the clouds",
        "where does rain fall from ? clouds",

        # 2. Colors & Objects
        "what color is grass ? green",
        "what color is snow ? white",
        "what color is coal ? black",
        "what color is the ocean ? blue",
        "what color are bananas ? yellow",
        "what color are flamingos ? pink",
        "roses are red",
        "violets are blue",
        "grass is green",
        "snow is white",
        "bananas are yellow",

        # 3. Science & Properties
        "what is fire ? hot",
        "what is ice ? cold",
        "what is water ? wet",
        "what is sugar ? sweet",
        "what is lemon ? sour",
        "fire is hot",
        "ice is cold",
        "water is wet",
        "sugar is sweet",
        "lemons are sour",

        # 4. Animals & Sounds & Actions
        "what do dogs say ? woof",
        "what do cats say ? meow",
        "what do cows say ? moo",
        "what do lions say ? roar",
        "what do birds say ? chirp",
        "what do bees say ? buzz",
        "what do frogs say ? croak",
        "what do ducks say ? quack",
        "what do sheep say ? baa",
        "what do wolves say ? howl",
        "dogs say woof",
        "cats say meow",
        "cows say moo",
        "lions say roar",
        "birds say chirp",
        "bees say buzz",
        "frogs say croak",
        "ducks say quack",
        "sheep say baa",
        "wolves say howl",
        "where do birds fly ? sky",
        "where do fish swim ? water",
        "where do moles dig ? earth",
        "birds fly in the sky",
        "fish swim in the water",

        # 5. Geography & Capitals
        "what is the capital of france ? paris",
        "what is the capital of japan ? tokyo",
        "what is the capital of italy ? rome",
        "what is the capital of germany ? berlin",
        "what is the capital of spain ? madrid",
        "what is the capital of egypt ? cairo",
        "what is the capital of england ? london",
        "what is the capital of canada ? ottawa",
        "the capital of france is paris",
        "the capital of japan is tokyo",
        "the capital of italy is rome",
        "the capital of germany is berlin",
        "the capital of spain is madrid",
        "the capital of egypt is cairo",
        "the capital of england is london",
        "the capital of canada is ottawa",

        # 6. Opposites & Duals
        "the opposite of hot is cold",
        "the opposite of cold is hot",
        "the opposite of day is night",
        "the opposite of night is day",
        "the opposite of big is small",
        "the opposite of small is big",
        "the opposite of up is down",
        "the opposite of down is up",
        "the opposite of happy is sad",
        "the opposite of fast is slow"
    ]

    print("📚 Teaching facts into the transformer:")
    for item in knowledge:
        print(f"  • {item}")
    print()

    lm = MicroTransformerLM(d_model=24, lr=0.015)
    lm.build_vocab(knowledge)
    print(f"  Vocabulary size: {len(lm.w2i)} words")
    print("  Training with Self-Attention & Adam optimizer...")

    for epoch in range(120):
        loss = lm.train_epoch(knowledge)
        if epoch % 30 == 0 or epoch == 119:
            print(f"    Epoch {epoch:>3} │ Loss: {loss:.4f}")

    print()
    print("-" * 60)
    print("🔮 TESTING PROMPT GENERATION & ATTENTION:")
    print("-" * 60)

    test_prompts = [
        "what is the sky during the day ?",
        "what is the sky during the night ?",
        "the sky is blue during the",
        "the sky is dark during the",
        "roses are",
    ]

    for p in test_prompts:
        preds, A = lm.predict_next(p, top_k=3)
        completion = lm.generate(p, max_new_tokens=1)
        print(f"\n  Prompt:     \"{p}\"")
        print(f"  Completion: ➜ \"{completion}\"")
        print("  Top Next-Word Probabilities:")
        for w, prob in preds:
            bar = "█" * int(prob * 25)
            print(f"    • {w:<8} {prob*100:>5.1f}%  {bar}")

    print()
    print("=" * 60)
    print("💡 Notice the difference from the Bag-of-Words model:")
    print("   • It doesn't output 'NEGATIVE 94%'!")
    print("   • It uses SELF-ATTENTION to connect 'day' -> 'blue' and 'night' -> 'dark'!")
    print("   • It generates the actual answering word!")
    print("=" * 60)
