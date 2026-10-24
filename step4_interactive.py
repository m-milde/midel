# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""
Step 4: Interactive Learning — Teach the Network Yourself!
==========================================================

This is where it gets fun. You'll run this script and:

  1. Type a sentence (e.g., "I love this product")
  2. Tell the network if it's POSITIVE (1) or NEGATIVE (0)
  3. The network learns from YOUR labels in real time
  4. Then you can test it on new sentences!

How text becomes numbers (simplified):
  • We build a vocabulary from all words you type.
  • Each sentence becomes a "bag of words" vector:
    vocabulary = ["i", "love", "this", "hate", "bad"]
    "i love this" → [1, 1, 1, 0, 0]
    "this is bad"  → [0, 0, 1, 0, 1]

Run:
    python step4_interactive.py
"""

import numpy as np
import json
import os
import re

SAVE_FILE = "nn_brain.json"


# ── Activation ──────────────────────────────────────────────────────────

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def sigmoid_deriv(x):
    s = sigmoid(x)
    return s * (1 - s)


# ── Text → Numbers ─────────────────────────────────────────────────────

def tokenize(text):
    """Split text into lowercase words."""
    return re.findall(r'[a-z]+', text.lower())


class Vocabulary:
    """Maps words to indices in a fixed-size vector."""

    def __init__(self):
        self.word_to_idx = {}
        self.idx_to_word = {}

    def add_words(self, words):
        """Add new words to the vocabulary."""
        for word in words:
            if word not in self.word_to_idx:
                idx = len(self.word_to_idx)
                self.word_to_idx[word] = idx
                self.idx_to_word[idx] = word

    def encode(self, text):
        """Convert text to a bag-of-words vector."""
        words = tokenize(text)
        vector = np.zeros(len(self.word_to_idx))
        for word in words:
            if word in self.word_to_idx:
                vector[self.word_to_idx[word]] = 1
        return vector

    @property
    def size(self):
        return len(self.word_to_idx)


# ── Neural Network ─────────────────────────────────────────────────────

class InteractiveNetwork:
    """
    A network that can grow its input layer as vocabulary expands,
    and save/load its brain to disk.
    """

    def __init__(self, hidden_size=16):
        self.hidden_size = hidden_size
        self.vocab = Vocabulary()
        self.training_data = []  # list of (text, label) pairs
        self.w1 = None
        self.b1 = None
        self.w2 = None
        self.b2 = None
        self.is_trained = False

    def _init_weights(self, input_size):
        """Initialize or resize weights."""
        np.random.seed(42)
        self.w1 = np.random.randn(input_size, self.hidden_size) * 0.3
        self.b1 = np.zeros((1, self.hidden_size))
        self.w2 = np.random.randn(self.hidden_size, 1) * 0.3
        self.b2 = np.zeros((1, 1))

    def add_example(self, text, label):
        """Add a training example and retrain."""
        words = tokenize(text)
        self.vocab.add_words(words)
        self.training_data.append((text, label))

    def retrain(self, epochs=2000, learning_rate=2.0):
        """Retrain on ALL data (the vocab may have grown)."""
        if len(self.training_data) < 2:
            print("  ⏳ Need at least 2 examples to train. Keep teaching!")
            return

        # Rebuild all vectors with current vocabulary
        X = np.array([self.vocab.encode(text) for text, _ in self.training_data])
        y = np.array([[label] for _, label in self.training_data])

        # Reinitialize weights for the current vocab size
        self._init_weights(self.vocab.size)

        # Train
        for epoch in range(epochs):
            # Forward
            z1 = X @ self.w1 + self.b1
            a1 = sigmoid(z1)
            z2 = a1 @ self.w2 + self.b2
            a2 = sigmoid(z2)

            # Backward
            m = X.shape[0]
            error2 = a2 - y
            delta2 = error2 * sigmoid_deriv(z2)
            error1 = delta2 @ self.w2.T
            delta1 = error1 * sigmoid_deriv(z1)

            self.w2 -= (a1.T @ delta2) * learning_rate / m
            self.b2 -= np.sum(delta2, axis=0, keepdims=True) * learning_rate / m
            self.w1 -= (X.T @ delta1) * learning_rate / m
            self.b1 -= np.sum(delta1, axis=0, keepdims=True) * learning_rate / m

        loss = np.mean((y - a2) ** 2)
        self.is_trained = True
        print(f"  ✅ Trained on {len(self.training_data)} examples (loss: {loss:.4f})")

    def predict(self, text):
        """Predict sentiment for new text."""
        if not self.is_trained:
            return None

        x = self.vocab.encode(text).reshape(1, -1)
        z1 = x @ self.w1 + self.b1
        a1 = sigmoid(z1)
        z2 = a1 @ self.w2 + self.b2
        a2 = sigmoid(z2)
        return a2[0, 0]

    def save(self):
        """Save the brain to a JSON file."""
        data = {
            "vocab": self.vocab.word_to_idx,
            "training_data": self.training_data,
            "hidden_size": self.hidden_size,
        }
        # Save weights as lists if they exist
        if self.w1 is not None:
            data["w1"] = self.w1.tolist()
            data["b1"] = self.b1.tolist()
            data["w2"] = self.w2.tolist()
            data["b2"] = self.b2.tolist()
            data["is_trained"] = self.is_trained

        with open(SAVE_FILE, "w") as f:
            json.dump(data, f, indent=2)
        print(f"  💾 Brain saved to {SAVE_FILE}")

    def load(self):
        """Load a previously saved brain."""
        if not os.path.exists(SAVE_FILE):
            return False

        with open(SAVE_FILE) as f:
            data = json.load(f)

        self.vocab.word_to_idx = data["vocab"]
        self.vocab.idx_to_word = {int(v): k for k, v in data["vocab"].items()}
        self.training_data = [(t, l) for t, l in data["training_data"]]
        self.hidden_size = data.get("hidden_size", 16)

        if "w1" in data:
            self.w1 = np.array(data["w1"])
            self.b1 = np.array(data["b1"])
            self.w2 = np.array(data["w2"])
            self.b2 = np.array(data["b2"])
            self.is_trained = data.get("is_trained", True)

        print(f"  🧠 Loaded brain with {len(self.training_data)} memories!")
        return True


# ── Interactive Loop ────────────────────────────────────────────────────

def main():
    print()
    print("=" * 60)
    print("🧠  STEP 4: INTERACTIVE NEURAL NETWORK")
    print("=" * 60)
    print()
    print("  Teach a neural network to classify text as")
    print("  POSITIVE (1) or NEGATIVE (0) — from your own examples!")
    print()
    print("  Commands:")
    print("    teach    — add a new training example")
    print("    test     — test the network on new text")
    print("    status   — see training data & vocabulary")
    print("    save     — save the brain to disk")
    print("    load     — load a previously saved brain")
    print("    quit     — exit")
    print()

    nn = InteractiveNetwork(hidden_size=16)

    # Try to load existing brain
    if os.path.exists(SAVE_FILE):
        nn.load()

    while True:
        try:
            cmd = input("\n🤖 Command (teach/test/status/save/load/quit): ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print("\n  👋 Bye!")
            break

        if cmd == "quit" or cmd == "q":
            print("  👋 Bye!")
            break

        elif cmd == "teach" or cmd == "t":
            text = input("  📝 Enter a sentence: ").strip()
            if not text:
                continue

            while True:
                label = input("  🏷️  Is this POSITIVE (1) or NEGATIVE (0)? ").strip()
                if label in ("0", "1"):
                    break
                print("  ⚠️  Please enter 0 or 1")

            nn.add_example(text, int(label))
            print(f"  📚 Added! Total examples: {len(nn.training_data)}")

            # Retrain after every new example
            nn.retrain()

        elif cmd == "test" or cmd == "p":
            if not nn.is_trained:
                print("  ⚠️  Not trained yet. Teach me at least 2 examples first!")
                continue

            text = input("  📝 Enter a sentence to classify: ").strip()
            if not text:
                continue

            score = nn.predict(text)
            if score is None:
                print("  ⚠️  Not trained yet.")
                continue

            label = "POSITIVE ✅" if score > 0.5 else "NEGATIVE ❌"
            bar_len = int(score * 30)
            bar = "█" * bar_len + "░" * (30 - bar_len)

            print()
            print(f"  Score: {score:.4f}")
            print(f"  [{bar}]")
            print(f"  → {label} (confidence: {abs(score - 0.5) * 200:.0f}%)")
            print()

            # Offer correction
            correct = input("  Was this correct? (y/n/skip): ").strip().lower()
            if correct == "n":
                right_label = 1 if score <= 0.5 else 0
                nn.add_example(text, right_label)
                print(f"  📚 Got it! Corrected to {'POSITIVE' if right_label else 'NEGATIVE'}.")
                nn.retrain()

        elif cmd == "status" or cmd == "s":
            print()
            print(f"  📊 Training examples: {len(nn.training_data)}")
            print(f"  📖 Vocabulary size:   {nn.vocab.size} words")
            print(f"  🏋️  Trained:           {'Yes' if nn.is_trained else 'No'}")
            print()
            if nn.training_data:
                print("  Recent examples:")
                for text, label in nn.training_data[-5:]:
                    emoji = "👍" if label == 1 else "👎"
                    print(f"    {emoji} \"{text}\"")

        elif cmd == "save":
            nn.save()

        elif cmd == "load":
            nn.load()

        else:
            print("  ❓ Unknown command. Try: teach, test, status, save, load, quit")


if __name__ == "__main__":
    main()
