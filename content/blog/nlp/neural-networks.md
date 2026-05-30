---
title: Neural Networks Fundamentals
topic: nlp
order: 4
date: 2026-05-30
excerpt: Neural networks are computational systems inspired loosely by biological neurons in the human
brain.
draft: false
---

The 2000s ushered in the era of deep learning, significantly impacting NLP. These complex algorithms, inspired by the human brain, became the foundation of deep learning advancements in NLP.

---
## Rise of Neural Networks

Neural networks improved performance because they learn dense distributed representations automatically.

Deep learning brought major improvements because:
- Large datasets became available
- GPUs enabled faster training
- Better optimisation techniques emerged
- Larger neural architectures became feasible

Modern NLP systems are now typically pretrained on enormous datasets before being
fine-tuned for specific tasks. This transfer learning approach allows models to reuse general
language knowledge across many applications.

Major breakthrough areas:
- Speech recognition
- Computer vision
- Machine translation

---
## What are Neural Networks?

Neural networks are computational systems inspired loosely by biological neurons in the human brain. They consist of interconnected layers of artificial neurons that transform input data into useful representations through weighted connections.

The central idea behind neural networks is representation learning. Instead of manually defining useful features, neural networks learn internal representations automatically. Earlier layers may learn simple features, while deeper layers learn increasingly abstract patterns.

For example in NLP:
- Early layers may learn punctuation or word shapes
- Middle layers may learn syntax or grammar
- Deep layers may learn semantic meaning or discourse relationships

Neural networks learn through optimisation. During training:
1. Inputs are processed through the network
2. Predictions are produced
3. Errors are measured using a loss function
4. Weights are adjusted to reduce error

This process is repeated across many iterations until performance improves.

The depth of a network refers to the number of hidden layers. Deep networks are powerful because they can model highly complex non-linear relationships, but deeper networks are also harder to train due to optimisation challenges such as vanishing gradients.

---
## Artificial Neuron

An artificial neuron is the fundamental mathematical or physical building block of artificial neural networks (ANNs) and modern deep learning. Designed to loosely mimic the information-processing capabilities of biological brain cells, it receives inputs, calculates their significance, and passes the result onward.

### How It Works
1. **Inputs & Weights (\(x\) and \(w\)):** The neuron receives multiple inputs (data features). Each input is multiplied by a "weight," which represents how important or influential that specific piece of data is to the final decision.
2. **Summation & Bias (\(z\) and \(b\)):** The neuron calculates the weighted sum of all inputs and adds a "bias" term. The bias acts like a threshold; it shifts the outcome to ensure the neuron only "fires" if the total signal is meaningful.
> Mathematically, this looks like:\(z = \sum (x_i \cdot w_i) + b\)
3. **Activation Function (\(a\)):** The resulting sum is passed through a nonlinear mathematical function (such as ReLU or Sigmoid). This translates the raw number into an output signal, determining whether the neuron is "activated" and what value it passes to the next layer of the network.

### Intuition Behind Weights
Weights represent importance.
- Positive weight → excitatory influence
- Negative weight → inhibitory influence
Learning = adjusting weights to reduce error.

### Layers in Neural Networks
- Input Layer- Receives raw features.
- Hidden Layers- Learn intermediate representations/features.
- Output Layer- Produces final prediction.

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
\(f(z)=\begin{cases}1&\text{if\ }z\ge 0\\ 0&\text{otherwise}\end{cases}\)

### Linear Separability
Perceptrons only solve linearly separable problems.
E.g. Can solve:
- AND
- OR
Cannot solve:
- XOR
because XOR is not linearly separable.

---
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