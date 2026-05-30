---
title: Vanishing and Exploding Gradients
topic: nlp
order: 8
date: 2026-05-30
excerpt: Vanishing and exploding gradients are primary obstacles in training deep neural networks.
brain.
draft: false
---

Vanishing and exploding gradients are primary obstacles in training deep neural networks. They occur during backpropagation when the derivatives used to update network weights shrink exponentially toward zero or grow uncontrollably toward infinity.

## What Causes the Problem
During backpropagation, weight updates are calculated using the chain rule, which multiplies gradients across multiple layers. Mathematically, if you multiply many values together across a network's depth, the final gradient is a product of these derivatives:
\(\frac{\partial L}{\partial W} = \frac{\partial L}{\partial a_L} \cdot \frac{\partial a_L}{\partial a_{L-1}} \cdot \dots \cdot \frac{\partial a_2}{\partial a_1} \cdot \frac{\partial a_1}{\partial W}\)

### Vanishing Gradients
- **What happens:** If the gradients being multiplied are smaller than \(1\) (e.g., \(0.1\)), multiplying them across dozens of layers causes the overall gradient to shrink exponentially until it approaches zero.
- **The effect:** The weights in the earliest layers barely update, meaning the model stops learning or loses the ability to track long-term dependencies (a severe issue in RNNs).

### Exploding Gradients
- **What happens:** If the derivatives being multiplied are larger than \(1\), repeated multiplication causes the gradient to grow exponentially, resulting in massive, unstable weight updates.
- **The effect:** The model parameters oscillate wildly, often causing the loss function to diverge or resulting in \(\text{NaN}\) (Not a Number) errors because the values become too large to compute.

## How to Address The Problem
Several architectural and training techniques can mitigate or solve these issues:
- **Proper Weight Initialisation:** Initialising weights randomly with proper scaling ensures that activations and gradients remain in a stable, healthy range.
- **Non-Saturating Activation Functions:** Functions like ReLU avoid the flat tails of older functions (like Sigmoid or Tanh), ensuring derivatives do not shrink to zero during the forward and backward passes.
- **Gradient Clipping:** Setting a strict threshold on the maximum value a gradient can take during backpropagation prevents exploding gradients. This is heavily utilised in RNN and LSTM models.
- **Advanced Architectures:** Using structures like Residual Networks (ResNets) in deep feedforward networks, or LSTMs/GRUs in sequence models, allows gradients to flow directly through skip connections or gating mechanisms without repeated multiplication.
- **Batch Normalisation:** Normalising layer inputs keeps activations in check, preventing scaling issues as data propagates through the network layer.