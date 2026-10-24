# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""
Step 3: A Real Neural Network — Multiple Layers
=================================================

A single neuron can only learn simple (linearly separable) patterns.
For anything interesting, we need LAYERS of neurons.

Architecture we'll build:

    Input (2) → Hidden layer (4 neurons) → Output (1)

We'll teach it XOR — something a single neuron CANNOT learn:
    0 XOR 0 = 0
    0 XOR 1 = 1
    1 XOR 0 = 1
    1 XOR 1 = 0

Concepts introduced:
  • Hidden layers
  • Full backpropagation through multiple layers
  • Why depth matters (XOR is impossible with 1 neuron)

Run:
    python step3_network.py
"""

import numpy as np


# ── Activation ──────────────────────────────────────────────────────────

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def sigmoid_deriv(x):
    s = sigmoid(x)
    return s * (1 - s)


# ── The Network Class ──────────────────────────────────────────────────

class NeuralNetwork:
    """
    A simple 2-layer neural network:
        Input → Hidden → Output

    Everything is explicit so you can see exactly what happens.
    """

    def __init__(self, input_size, hidden_size, output_size):
        np.random.seed(42)

        # Layer 1: input → hidden
        self.w1 = np.random.randn(input_size, hidden_size) * 0.5
        self.b1 = np.zeros((1, hidden_size))

        # Layer 2: hidden → output
        self.w2 = np.random.randn(hidden_size, output_size) * 0.5
        self.b2 = np.zeros((1, output_size))

    def forward(self, X):
        """Forward pass — compute the output."""
        # Hidden layer
        self.z1 = X @ self.w1 + self.b1       # weighted sum
        self.a1 = sigmoid(self.z1)             # activation

        # Output layer
        self.z2 = self.a1 @ self.w2 + self.b2  # weighted sum
        self.a2 = sigmoid(self.z2)              # activation (final output)

        return self.a2

    def backward(self, X, y, learning_rate):
        """Backward pass — compute gradients and update weights."""
        m = X.shape[0]  # number of samples

        # ── Output layer gradients ──────────────────────────────────
        error2 = self.a2 - y                          # error at output
        delta2 = error2 * sigmoid_deriv(self.z2)      # gradient

        # ── Hidden layer gradients ──────────────────────────────────
        error1 = delta2 @ self.w2.T                   # propagate error back
        delta1 = error1 * sigmoid_deriv(self.z1)      # gradient

        # ── Update all weights and biases ───────────────────────────
        self.w2 -= (self.a1.T @ delta2) * learning_rate / m
        self.b2 -= np.sum(delta2, axis=0, keepdims=True) * learning_rate / m
        self.w1 -= (X.T @ delta1) * learning_rate / m
        self.b1 -= np.sum(delta1, axis=0, keepdims=True) * learning_rate / m

    def train(self, X, y, epochs, learning_rate, verbose=True):
        """Train the network on the given data."""
        for epoch in range(epochs):
            output = self.forward(X)
            loss = np.mean((y - output) ** 2)
            self.backward(X, y, learning_rate)

            if verbose and (epoch % 2000 == 0 or epoch == epochs - 1):
                print(f"  Epoch {epoch:>5} │ Loss: {loss:.6f}")

    def predict(self, X):
        """Make a prediction."""
        return self.forward(X)


# ── Training ────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # XOR training data
    X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y = np.array([[0], [1], [1], [0]])

    print("=" * 55)
    print("🧠  STEP 3: NEURAL NETWORK (XOR gate)")
    print("=" * 55)
    print()
    print("  Architecture: 2 inputs → 4 hidden neurons → 1 output")
    print()

    # First, show that a single neuron FAILS at XOR
    print("  ⚠️  A single neuron cannot learn XOR (try step2 with XOR data).")
    print("  That's why we need a HIDDEN LAYER — it creates intermediate")
    print("  features that the output neuron can combine.")
    print()

    # Create and train the network
    nn = NeuralNetwork(input_size=2, hidden_size=4, output_size=1)

    print("  Training...")
    print()
    nn.train(X, y, epochs=10_000, learning_rate=5.0)

    # Test
    print()
    print("-" * 55)
    print("📊  RESULTS:")
    print("-" * 55)
    print()

    predictions = nn.predict(X)
    print("  Input    │ Expected │ Predicted │ Rounded")
    print("  ─────────┼──────────┼───────────┼────────")
    all_correct = True
    for inputs, expected, predicted in zip(X, y, predictions):
        rounded = 1 if predicted[0] > 0.5 else 0
        mark = "✅" if rounded == expected[0] else "❌"
        if rounded != expected[0]:
            all_correct = False
        print(f"  {inputs}   │    {expected[0]}     │   {predicted[0]:.4f}  │   {rounded}  {mark}")

    print()
    if all_correct:
        print("  🎉 The network learned XOR perfectly!")
    else:
        print("  ⚠️  Not fully learned yet — try more epochs or adjust learning rate.")

    print()
    print("💡 Key takeaways:")
    print("   • A hidden layer lets the network learn NON-LINEAR patterns.")
    print("   • Backpropagation flows the error backward through all layers.")
    print("   • More neurons in the hidden layer = more capacity to learn.")
    print()
    print("Next: step4_interactive.py — teach a network from YOUR prompts!")
