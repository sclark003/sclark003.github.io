---
title: Neural Networks Fundamentals
topic: nlp
order: 3
date: 2026-05-30
excerpt: Neural networks are computational systems inspired loosely by biological neurons in the human
brain.
draft: false
---

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