# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""
Step 1: A Single Neuron — The Building Block
=============================================

A neuron is just a tiny math function:

    output = activation( (input₁ × weight₁) + (input₂ × weight₂) + ... + bias )

That's it. No magic.

Concepts introduced:
  • Inputs, weights, bias
  • Weighted sum
  • Activation function (sigmoid — squashes any number into 0–1)

Run:
    python step1_single_neuron.py
"""

import math


# ── 1. The activation function ──────────────────────────────────────────
# Sigmoid squashes any number into the range (0, 1).
# Big positive → close to 1,  big negative → close to 0.

def sigmoid(x):
    """σ(x) = 1 / (1 + e^(−x))"""
    return 1 / (1 + math.exp(-x))


# ── 2. A single neuron ─────────────────────────────────────────────────

def neuron(inputs, weights, bias):
    """
    One neuron:
      1. Multiply each input by its weight.
      2. Sum everything up + the bias.
      3. Pass through the activation function.
    """
    # Step 1 + 2: weighted sum
    total = sum(i * w for i, w in zip(inputs, weights)) + bias

    # Step 3: activation
    output = sigmoid(total)
    return output


# ── 3. Let's try it! ────────────────────────────────────────────────────

if __name__ == "__main__":
    # Imagine we have 2 inputs (like: "temperature" and "humidity")
    inputs = [0.5, 0.8]

    # Weights control HOW MUCH each input matters
    weights = [0.4, 0.6]

    # Bias shifts the decision boundary (like a threshold)
    bias = -0.1

    result = neuron(inputs, weights, bias)

    print("=" * 50)
    print("🧠  STEP 1: A SINGLE NEURON")
    print("=" * 50)
    print()
    print(f"  Inputs:  {inputs}")
    print(f"  Weights: {weights}")
    print(f"  Bias:    {bias}")
    print()

    # Show the math step by step
    weighted = [i * w for i, w in zip(inputs, weights)]
    total = sum(weighted) + bias
    print("  Math breakdown:")
    for idx, (i, w, p) in enumerate(zip(inputs, weights, weighted)):
        print(f"    input[{idx}] × weight[{idx}] = {i} × {w} = {p}")
    print(f"    Sum of products = {sum(weighted)}")
    print(f"    + bias ({bias})  = {total}")
    print(f"    sigmoid({total:.2f})    = {result:.4f}")
    print()
    print(f"  ➜ Neuron output: {result:.4f}")
    print()

    # ── 4. Experiment! Change the values and see what happens ───────────
    print("-" * 50)
    print("🔬  EXPERIMENT: What happens with different weights?")
    print("-" * 50)
    print()

    experiments = [
        ([1.0, 0.0], [0.5, 0.8], 0.0,  "Only weight[0] matters"),
        ([0.0, 1.0], [0.5, 0.8], 0.0,  "Only weight[1] matters"),
        ([5.0, 5.0], [0.5, 0.8], 0.0,  "Large weights → output near 1"),
        ([-5.0, -5.0], [0.5, 0.8], 0.0, "Large negative weights → output near 0"),
    ]

    for w, inp, b, label in experiments:
        out = neuron(inp, w, b)
        print(f"  weights={w}, inputs={inp} → {out:.4f}  ({label})")

    print()
    print("💡 Key takeaway: Weights decide what the neuron pays attention to.")
    print("   The activation function decides how 'excited' the neuron gets.")
    print()
    print("Next: step2_learning.py — teach the neuron to learn on its own!")
