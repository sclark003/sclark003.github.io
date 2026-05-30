---
title: Activation Functions
topic: nlp
order: 5
date: 2026-05-30
excerpt: An activation function is a mathematical formula applied to the output of a neuron in a neural network. It determines whether the neuron should be "fired" or activated.
draft: false
---
An activation function is a mathematical formula applied to the output of a neuron in a neural network. It determines whether the neuron should be "fired" or activated. Activation functions are essential because they introduce non-linearity into neural networks. Without them, even very deep networks would behave like simple linear transformations and would be unable to model complex patterns.

The choice of activation function significantly affects:
- Training speed
- Gradient flow
- Model stability
- Final accuracy

## Common Activation Functions

### Sigmoid (Logistic Function)
Translates incoming values into a range between \(0\) and \(1\).
- **Formula:** \(f(x) = \frac{1}{1 + e^{-x}}\)
- **Pros:** Great for the final output layer of binary classification tasks where you need a probability.
- **Cons:** The output doesn't zero-center, and its flat edges can cause "vanishing gradients" (slowing down the learning process).

Sigmoid activation was historically popular because its outputs resemble probabilities between 0 and 1. However, sigmoid saturates for very positive or negative inputs, causing gradients to become extremely small. This contributes to the vanishing gradient problem.

### Tanh (Hyperbolic Tangent)
Similar to the sigmoid, but translates values into a range between \(-1\) and \(1\).
- **Formula:** \(f(x) = \tanh(x)\)
- **Pros:** The output is zero-centered, which makes it easier for subsequent layers to learn and update weights.
- **Cons:** Can still cause vanishing gradient problems.

Tanh improved upon sigmoid because its outputs are centered around zero, which helps optimisation. However, tanh still suffers from gradient saturation.

### ReLU (Rectified Linear Unit)
The most widely used function, primarily in the hidden layers of networks.
- **Formula:** \(f(x) = \max(0, x)\)
- **Pros:** Highly efficient, prevents vanishing gradients, speeds up training significantly.
- **Cons:** Can suffer from "dying neurons" where some nodes stop updating entirely.

ReLU became dominant in deep learning because it is computationally simple and avoids many vanishing gradient issues. ReLU activates only positive values and sets negative values to zero, producing sparse activations that improve efficiency.

#### The Dying ReLU problem
The dying ReLU problem is a condition in neural networks where neurons become permanently inactive and only output zero for any input. This happens because the standard ReLU function has a derivative of zero in the negative range, meaning no gradient flows back to update the weights, causing the neuron to permanently "die".

**Why It Happens:**
- **Flat Negative Slope:** The standard Rectified Linear Unit (ReLU) function outputs \(x\) if \(x > 0\), but outputs \(0\) if \(x \le 0\).
- **Zero Gradients:** Because the slope of the line for negative values is strictly \(0\), the derivative of the function for negative inputs is also \(0\).
- **Permanent Inactivity:** If a large gradient update pushes a neuron's weights such that its inputs are constantly negative, it outputs \(0\). Because its gradient is zero, the weights cannot be updated during backpropagation, and the neuron can never recover.

When a significant percentage of neurons die, your model's effective capacity shrinks. You effectively end up with a much smaller, less capable neural network than you originally designed, wasting computational resources.

You can address the dying ReLU problem by:
- **Lower Learning Rates:** Sometimes, large spikes in learning can knock neurons into the dead zone. Reducing your learning rate can prevent overly aggressive weight updates.
- **ReLU Variant:** You can solve the dead neuron issue by choosing activation functions that allow for a small, non-zero gradient when inputs are negative

#### ReLU Variants
Variants of ReLU include:
- **Leaky ReLU:** Instead of outputting \(0\) for negative inputs, it multiplies them by a small, constant scalar \(\alpha \) (e.g., \(0.01\)), allowing a tiny gradient to flow and keeping the neuron alive.
- **Parametric ReLU (PReLU):**  Similar to Leaky ReLU, but treats the negative slope as a learnable parameter that the network optimizes during training.
- **Exponential Linear Unit (ELU):** Uses an exponential curve for negative values, which helps smooth out updates and pushes mean unit activations closer to zero.

### Softmax
Softmax is different because it is typically used only in output layers for multi-class classification. It converts raw scores into normalised probabilities, allowing models to estimate class likelihoods.
- **Formula:** Turns raw scores into probabilities that sum up to \(1.0\).
- **Pros:** Clearly defines the probabilities for multiple distinct categories.

## How to choose
#### Hidden Layers:
Start with **ReLU** as the default for almost all standard neural networks.

#### Output Layer:
Choose based on the desired output.
- Regression (continuous numbers): Use a **Linear** activation.
- Binary Classification (Yes/No, True/False): Use **Sigmoid**.
- Multi-class Classification (A, B, or C): Use **Softmax**.