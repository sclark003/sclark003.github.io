---
title: Multi-Layer Neural Networks
topic: nlp
order: 4
date: 2026-05-30
excerpt: From perceptrons to multilayer neural networks
brain.
draft: false
---
## Perceptrons

The perceptron was one of the earliest neural models and represents the foundation of modern neural networks. Introduced by Frank Rosenblatt in the 1950s, it was designed as a simple binary classifier capable of learning decision boundaries from data. 

A perceptron computes a weighted sum of inputs and applies an activation threshold to determine output class membership. During training, the perceptron adjusts its weights when predictions are incorrect. This learning process was historically important because it demonstrated that machines could learn from examples rather than explicit programming.

However, perceptrons have severe limitations. They can only solve linearly separable problems, meaning the data must be separable using a straight line (or hyperplane in higher dimensions). This became famous with the XOR problem, which perceptrons cannot solve.

The inability of perceptrons to solve XOR led to criticism of neural networks in the 1970s and temporarily slowed AI research. Interest returned once researchers developed multi-layer networks and backpropagation, which overcame these limitations.

Although perceptrons themselves are simple, they remain conceptually important because modern deep learning architectures are built from the same basic principles:
- Weighted inputs
- Activation functions
- Learned parameter

### Single-Layer Perceptron
The perceptron:
- Computes weighted sum
- Applies threshold function
- Produces binary output

Decision rule:
$$
\(f(z)=\begin{cases}1&\text{if\ }z\ge 0\\ 0&\text{otherwise}\end{cases}\)
$$

### Linear Separability
Perceptrons only solve linearly separable problems.
E.g. Can solve:
- AND
- OR
Cannot solve:
- XOR
because XOR is not linearly separable.

## Multi-Layer Neural Networks

Multi-layer neural networks overcome the limitations of single-layer perceptrons by introducing hidden layers between input and output. These hidden layers allow networks to learn non-linear patterns and hierarchical representations.

The addition of hidden layers dramatically increases expressive power. Rather than simply learning linear boundaries, deep networks can learn:
- curves
- clusters
- abstract concepts
- high-dimensional relationships

Each hidden layer transforms the representation learned by the previous layer. This process creates progressively richer representations of the input.

For example in NLP:
- First layer may learn character or word patterns
- Intermediate layers may capture grammar
- Deeper layers may learn semantic meaning

One of the key theoretical ideas is the Universal Approximation Theorem, which states that a neural network with at least one sufficiently large hidden layer can approximate any continuous function. In practice, however, deeper networks often learn more efficiently than shallow
networks with extremely large layers.

Training deep networks introduces challenges:
- Overfitting
- Vanishing gradients
- Computational cost
- Large data requirements

Regularisation techniques such as dropout and weight decay help improve generalisation