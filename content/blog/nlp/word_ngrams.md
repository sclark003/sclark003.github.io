---
title: Word N-Grams
topic: nlp
order: 1
date: 2026-05-22
excerpt: An n-gram is a sequence of n consecutive words.
draft: true
---

## What Are N-Grams?

An n-gram is a sequence of n consecutive words.

Examples:

Sentence:
> The cat sat on the mat

- Unigrams (n=1): the, cat, sat, on, the, mat
- Bigrams (n=2): the cat, cat sat, sat on, on the, the mat
- Trigrams (n=3): the cat sat, cat sat on, sat on the, on the mat

---

## Why Are N-Grams Useful?

Single words often miss important context.

For example:

- "good"
- "not good"

A bag-of-words model sees both words individually and may incorrectly classify the phrase as positive.

A bigram feature captures:

- "not good"

allowing the model to learn its negative meaning.

---

## N-Grams in fastText

The fastText paper adds word n-grams to averaged word embeddings.

This allows the model to capture local word order while remaining computationally efficient.

Examples:

- New York
- machine learning
- very happy
- not good

This was one of the key "tricks" that made fastText competitive with more complex neural networks.
