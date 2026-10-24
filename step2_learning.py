# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""
Step 2: Learning — How a Neuron Teaches Itself
===============================================

The neuron starts with random weights. We give it examples with known
correct answers, and it adjusts its weights little by little.

Concepts introduced:
  • Training data (input → expected output)
  • Loss / error  (how wrong is the neuron?)
  • Gradient descent  (nudge weights in the direction that reduces error)
  • Learning rate  (how big each nudge is)
  • Epochs  (how many times we loop over the data)

We'll teach ONE neuron to learn the AND logic gate:
    0 AND 0 = 0
    0 AND 1 = 0
    1 AND 0 = 0
    1 AND 1 = 1

Run:
    pip install numpy     (only needed once)
    python step2_learning.py
"""

import numpy as np


# ── 1. Activation + its derivative ─────────────────────────────────────

def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def sigmoid_derivative(x):
    """
    If s = sigmoid(x), then  ds/dx = s × (1 − s).
    We need this to know WHICH DIRECTION to nudge the weights.
    """
    s = sigmoid(x)
    return s * (1 - s)


# ── 2. Training data: AND gate ─────────────────────────────────────────

# Each row: [input1, input2]
X = np.array([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
])

# Expected outputs (AND truth table)
y = np.array([
    [0],
    [0],
    [0],
    [1],
])


# ── 3. Initialize with random weights ──────────────────────────────────

np.random.seed(42)  # for reproducibility
weights = np.random.randn(2, 1) * 0.5   # 2 inputs → 1 output
bias = np.random.randn(1) * 0.5

learning_rate = 2.0   # how big each adjustment is
epochs = 10_000       # how many times we loop over the data


# ── 4. Training loop ───────────────────────────────────────────────────

print("=" * 55)
print("🧠  STEP 2: TEACHING A NEURON (AND gate)")
print("=" * 55)
print()
print(f"  Initial weights: {weights.flatten()}")
print(f"  Initial bias:    {bias}")
print(f"  Learning rate:   {learning_rate}")
print(f"  Epochs:          {epochs}")
print()

for epoch in range(epochs):
    # ── Forward pass: compute the output ────────────────────────────
    z = X @ weights + bias          # weighted sum (@ = matrix multiply)
    prediction = sigmoid(z)         # activation

    # ── Compute error ───────────────────────────────────────────────
    error = y - prediction          # how far off are we?
    loss = np.mean(error ** 2)      # mean squared error

    # ── Backward pass: compute gradients ────────────────────────────
    # "How much should each weight change to reduce the error?"
    d_prediction = error * sigmoid_derivative(z)

    # ── Update weights and bias ─────────────────────────────────────
    weights += X.T @ d_prediction * learning_rate
    bias += np.sum(d_prediction) * learning_rate

    # Print progress every 2000 epochs
    if epoch % 2000 == 0 or epoch == epochs - 1:
        print(f"  Epoch {epoch:>5} │ Loss: {loss:.6f}")


# ── 5. Test the trained neuron ──────────────────────────────────────────

print()
print("-" * 55)
print("📊  RESULTS after training:")
print("-" * 55)
print()
print(f"  Learned weights: {weights.flatten().round(3)}")
print(f"  Learned bias:    {bias.round(3)}")
print()

final = sigmoid(X @ weights + bias)
print("  Input    │ Expected │ Predicted │ Rounded")
print("  ─────────┼──────────┼───────────┼────────")
for inputs, expected, predicted in zip(X, y, final):
    rounded = 1 if predicted[0] > 0.5 else 0
    mark = "✅" if rounded == expected[0] else "❌"
    print(f"  {inputs}   │    {expected[0]}     │   {predicted[0]:.4f}  │   {rounded}  {mark}")

print()
print("💡 Key takeaways:")
print("   • The neuron started with RANDOM weights and knew nothing.")
print("   • By seeing examples + adjusting weights, it LEARNED the AND gate.")
print("   • 'Learning' = finding the right weights through gradient descent.")
print()
print("Next: step3_network.py — combine multiple neurons into a network!")
