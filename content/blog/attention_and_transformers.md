---
title: Attention and Transformers
topic: nlp
order: 5
date: 2026-05-26
excerpt: Attention allows a model to focus on the most relevant words when processing a sentence.
draft: true
---

## The Problem

Older models such as RNNs process text one word at a time.

Example:

The → cat → sat → on → the → mat

This makes it difficult to capture long-range relationships.

---

## Attention

Attention allows a model to focus on the most relevant words when processing a sentence.

Example:

Sentence:
> The animal didn't cross the road because it was tired.

To understand "it", the model should pay attention to "animal".

Attention helps the model determine which words matter most.

---

## Self-Attention

Self-attention compares every word with every other word in the sentence.

This allows the model to capture relationships regardless of distance.

Example:

"The cat sitting on the sofa chased the mouse."

The model can directly connect:

- cat
- chased

even though several words separate them.

---

## Transformers

Transformers are neural network architectures built around self-attention.

Key advantages:

- Parallel processing
- Better long-range understanding
- State-of-the-art performance

---

## Famous Transformer Models

- BERT
- GPT
- RoBERTa
- T5

These models transformed NLP and became the foundation of modern large language models.

---

## fastText vs Transformers

### fastText

- Very fast
- CPU friendly
- Simple
- Lower computational cost

### Transformers

- Higher accuracy
- Better language understanding
- More computationally expensive

A common lesson from NLP is to start with a strong baseline such as TF-IDF or fastText before moving to larger transformer models.
