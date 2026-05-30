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

The process begins with a forward pass, where inputs propagate through the network to produce predictions. The predictions are compared to the true labels using a loss function. The loss quantifies how wrong the network is.

Backpropagation computes gradients of the loss with respect to every parameter in the network using the chain rule from calculus. These gradients indicate how weights should change to reduce error.

Gradient descent then updates weights incrementally. The learning rate is crucial because it determines step size:
- Too small → slow learning
- Too large → unstable learning

## Underfitting in NLP
The model fails to learn the grammar, semantics, or context of the language, resulting in blind guessing.

#### Causes:
- Using a model that is too simple for the task (e.g., trying to use a basic Naive Bayes classifier to summarize an article).
- Feature extraction is too basic (e.g., strictly relying on bag-of-words without utilizing word embeddings or \(N\)-grams).
- Training time is too short.

#### NLP Examples: 
A sentiment analysis model that predicts "neutral" for nearly every review because it hasn't learned that words like "terrible" or "excellent" hold strong sentiment weight.

#### How to Fix:
- Switch to more complex model architectures (e.g., LSTMs or Transformer models like BERT).
- Increase training epochs so the model has more time to learn.
- Improve feature representation by using pre-trained embeddings (e.g., Word2Vec, GloVe) or fine-tuning a Large Language Model (LLM)

## Overfitting in NLP
The model essentially "memorises" the exact sentences from the training set instead of learning the underlying linguistic rules.

#### Causes:
- The dataset is too small, unrepresentative, or highly imbalanced.
- The model has too many parameters (e.g., a massive deep neural network) relative to the amount of training data.
- Over-training on a specific domain (e.g., a model that understands medical transcripts but fails at conversational queries).

#### NLP Examples:
A text-generation model that hallucinates random personal names or outputs exact copied sentences from the training text whenever it is prompted.

#### How to Fix:
- Dropout: Randomly ignore a percentage of neurons during training to prevent models from relying too heavily on specific pathways.
- Data Augmentation: Expand your dataset by rephrasing, translating, or adding noise to text.
- Early Stopping: Halt model training when performance on the validation dataset stops improving.
- Weight Regularisation: Apply methods like L1 or L2 regularisation to penalise overly complex word-weightings in the model architecture.