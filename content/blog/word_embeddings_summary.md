---
title: Word Embeddings: A Practical Summary
date: 2026-05-24
excerpt: Word embeddings are dense numerical vector representations of words that capture their meaning based on how they are used in language.
draft: false
---

## Word Embeddings: A Practical Summary

## What Are Word Embeddings?

Word embeddings are dense numerical vector representations of words that capture their meaning based on how they are used in language.

Instead of representing words as isolated symbols, embeddings place words in a continuous vector space where words with similar meanings tend to be located near one another.

For example:

- king ≈ queen
- cat ≈ dog
- happy ≈ joyful
- car ≈ automobile

This allows machine learning models to understand relationships between words that traditional text representations cannot capture.

---

## Why Do We Need Word Embeddings?

Traditional text representations such as one-hot encoding treat every word as completely independent.

For example:

| Word | One-Hot Representation |
|--------|--------|
| cat | [1, 0, 0] |
| dog | [0, 1, 0] |
| car | [0, 0, 1] |

In this representation:

- "cat" is no closer to "dog" than it is to "car"
- No semantic relationships are captured
- The vectors become extremely large for realistic vocabularies

Word embeddings solve this by learning compact numerical representations.

---

## The Core Idea

Each word is represented by a vector of numbers.

For example:

| Word | Embedding (Simplified) |
|--------|--------|
| cat | [0.8, 0.2, 0.1] |
| dog | [0.7, 0.3, 0.2] |
| car | [0.1, 0.8, 0.9] |

Real embeddings often contain:

- 50 dimensions
- 100 dimensions
- 300 dimensions
- or more

Words that appear in similar contexts learn similar vectors.

---

## How Embeddings Learn Meaning

A famous principle in linguistics states:

> "You shall know a word by the company it keeps."

Words that appear in similar contexts often have similar meanings.

For example:

- The cat sat on the mat.
- The dog sat on the mat.

Because "cat" and "dog" frequently appear in similar contexts, their vectors become similar.

This process allows models to learn semantic relationships automatically from large text corpora.

---

## Measuring Similarity

One common way to compare embeddings is cosine similarity.

Two words pointing in similar directions have a high similarity score.

Examples:

| Word Pair | Similarity |
|------------|------------|
| cat – dog | High |
| cat – kitten | Very High |
| cat – airplane | Low |

This makes embeddings useful for search, recommendation systems, and language understanding.

---

## Famous Embedding Models

### Word2Vec

Introduced by researchers at Google in 2013.

Two main training approaches:

- Continuous Bag of Words (CBOW)
- Skip-Gram

Word2Vec demonstrated that useful semantic relationships could be learned directly from text.

---

### GloVe

Developed at Stanford University.

GloVe combines:

- Global word co-occurrence statistics
- Local contextual information

It became a widely used alternative to Word2Vec.

---

### fastText

Developed by Meta.

Unlike Word2Vec, fastText learns embeddings for character n-grams as well as complete words.

Advantages include:

- Better handling of rare words
- Better handling of misspellings
- Strong performance on many languages

This was a key component of the paper *Bag of Tricks for Efficient Text Classification*.

---

## Famous Example: Word Analogies

One of the most surprising properties of embeddings is that relationships can be encoded mathematically.

A classic example is:

```text
king - man + woman ≈ queen
```

Although not perfect, this demonstrated that embeddings can capture meaningful linguistic structure.

---

## Document Embeddings

Word embeddings can also be combined to represent larger pieces of text.

A simple approach is averaging:

```text
Document Vector
= Average(Word Embedding 1,
          Word Embedding 2,
          ...
          Word Embedding N)
```

This idea is used by fastText to create efficient document representations.

---

## Limitations of Traditional Word Embeddings

Traditional embeddings assign one vector per word.

For example:

- "bank" (river bank)
- "bank" (financial institution)

Both meanings receive the same vector.

This can cause ambiguity.

---

## Contextual Embeddings

Modern language models solve this problem using contextual embeddings.

Examples include:

- BERT
- GPT
- RoBERTa

These models generate different representations depending on context.

For example:

- "I deposited money in the bank."
- "I sat on the river bank."

The word "bank" receives different embeddings in each sentence.

---

## Word Embeddings vs TF-IDF

### TF-IDF

Advantages:

- Simple
- Fast
- Highly interpretable

Disadvantages:

- No understanding of meaning
- Treats similar words as unrelated
- Produces sparse vectors

### Word Embeddings

Advantages:

- Capture semantic similarity
- Dense representations
- Better generalization

Disadvantages:

- Less interpretable
- More computationally expensive to train

---

## Why Word Embeddings Were Important

Word embeddings represented a major shift in Natural Language Processing.

They enabled:

- Semantic search
- Improved text classification
- Machine translation
- Question answering systems
- Modern language models

They also provided the foundation for later advances such as contextual embeddings and transformer-based models.

Even today, understanding word embeddings is essential because they bridge the gap between traditional NLP techniques such as TF-IDF and modern systems such as BERT, GPT, and other large language models.
