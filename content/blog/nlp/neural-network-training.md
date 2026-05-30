---
title: Neural Network Training
topic: nlp
order: 6
date: 2026-05-30
excerpt: Training a neural network involves optimising its weights so predictions become increasingly accurate.
brain.
draft: false
---

Training a neural network involves optimizing its weights so predictions become increasingly accurate. This is achieved through gradient-based optimisation methods.

---
## The Training Process
Training a neural network fundamentally relies on an iterative four-step loop:
1. **Forward Pass:** Input data is fed through the network's layers. The model computes linear combinations of inputs and weights, applies non-linear activation functions, and outputs a prediction.
2. **Loss Calculation:** A loss function measures the discrepancy between the network's prediction and the actual ground truth (for example, Mean Squared Error for continuous data or Cross-Entropy Loss for classification).
3. **Backward Pass (Backpropagation):** The error is sent backward through the network. Using calculus, the algorithm calculates how much each weight and bias contributed to the error.
4. **Optimisation:** An optimisation algorithm—such as Stochastic Gradient Descent (SGD) or Adam—adjusts the weights and biases to minimize the loss in the next cycle.

---
## Training Concepts
---
### Epochs & Batch Size
- **Epoch:** An epoch is one complete pass through the entire training dataset. During a single epoch, the model processes every sample in the data exactly once, making predictions, calculating errors, and updating its internal weights to improve future performance.
- **Batch Size:** The number of training examples processed in a single forward and backward pass. Neural networks usually can't process all data at once, so data is split into smaller batches.

#### Why are multiple epochs needed?
Training a model for a single epoch is almost never enough. Neural networks learn slowly and incrementally. By cycling through the same dataset over multiple epochs (often dozens or hundreds of times), the model gradually corrects its mistakes and refines its understanding of the data's underlying patterns.

---
### Learning Rate
This hyperparameter dictates the step size the optimiser takes when updating weights. If it's too high, the model might overshoot the optimum; if too low, training will be painfully slow. In deep learning frameworks, optimisers generally use a default learning rate of 0.001.

---
### Overfitting & Regularisation
Overfitting happens when a network memorises the training data but fails to generalise to unseen data. Regularisation techniques (like dropout or weight decay) are used to prevent this

---
### Loss Functions
These mathematically evaluate how far off the model’s predictions are from actual targets (e.g., Mean Squared Error, Cross-Entropy Loss).

---
### Optimisers 
Algorithms that utilize these gradients to update parameters. 

Popular optimizers include:
- **Stochastic Gradient Descent (SGD):** Adjusts weights iteratively by taking steps proportional to the negative gradient.
- **Adam:** Combines the advantages of two other extensions (AdaGrad and RMSProp) by maintaining per-parameter learning rates that adapt based on the first and second moments of the gradients.