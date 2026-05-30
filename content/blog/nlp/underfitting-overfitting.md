---
title: Underfitting and Overfitting in ML
topic: nlp
order: 7
date: 2026-05-30
excerpt: When a model learns too little or too much, we get underfitting or overfitting.
brain.
draft: false
---
Machine learning models should learn useful patterns from training data. When a model learns too little or too much, we get underfitting or overfitting.

- **Underfitting** means that the model is too simple and does not cover all real patterns in the data.
- **Overfitting** means that the model learns not just the underlying pattern, but also noise or random quirks in the training data. The model memorises training data
- A good model finds the right spot, it is complex enough to capture real patterns, but not so complex that it “memorises” noise

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