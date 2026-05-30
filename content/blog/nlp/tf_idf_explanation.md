---
title: Term Frequency-Inverse Document Frequency
topic: nlp
order: 2
date: 2026-05-20
excerpt: Before word embeddings and transformers became dominant, TF-IDF was one of the most widely used features for text classification, search engines, and information retrieval.
draft: false
---

## TF-IDF (Term Frequency–Inverse Document Frequency)

TF-IDF is a classic technique for representing text numerically. Its goal is to identify words that are **important to a particular document** while down-weighting words that appear everywhere.

Before word embeddings and transformers became dominant, TF-IDF was one of the most widely used features for text classification, search engines, and information retrieval.

## The Intuition

Suppose you have a collection of documents:

**Document 1**
> Cats are playful pets.

**Document 2**
> Dogs are loyal pets.

**Document 3**
> Cats and dogs are popular pets.

The word **"pets"** appears in every document, so it doesn't tell us much about which document we're looking at.

The word **"loyal"** appears only in Document 2, so it's much more informative.

TF-IDF gives:

- Low weight to common words
- High weight to distinctive words

---

## Part 1: Term Frequency (TF)

Term Frequency measures how often a word appears in a document.

A simple version is:

```math
TF(t,d) = count of term t in document d
```

For:

> "cat cat dog"

| Word | TF |
|------|----|
| cat | 2 |
| dog | 1 |

Sometimes TF is normalized by document length.

---

## Part 2: Inverse Document Frequency (IDF)

IDF measures how rare a word is across the entire corpus.

A common formula is:

```math
IDF(t) = log(N / DF(t))
```

where:

- **N** = total number of documents
- **DF(t)** = number of documents containing term *t*

### Example

Suppose we have 1,000 documents.

| Word | Appears in | IDF |
|------|------------|-----|
| the | 1000 docs | very low |
| dog | 100 docs | moderate |
| quantum | 2 docs | high |

Rare words receive larger weights.

---

## Combining Them

TF-IDF is simply:

```math
TF-IDF(t,d) = TF(t,d) × IDF(t)
```

A word gets a high score when:

- It appears frequently in a document
- It appears rarely in the overall corpus

---

## Example

Consider three documents:

**D1**
> cat cat cat pet

**D2**
> dog pet

**D3**
> fish pet

There are 3 documents total.

### TF

In D1:

| Word | TF |
|------|----|
| cat | 3 |
| pet | 1 |

### IDF

| Word | Document Frequency |
|------|-------------------|
| cat | 1 |
| dog | 1 |
| fish | 1 |
| pet | 3 |

Using:

```math
IDF = log(3 / DF)
```

we get:

- cat ≈ 1.10
- dog ≈ 1.10
- fish ≈ 1.10
- pet = 0

### TF-IDF

For D1:

| Word | TF-IDF |
|------|--------|
| cat | 3 × 1.10 = 3.30 |
| pet | 1 × 0 = 0 |

The model learns that "cat" is informative and "pet" is not.

---

## How TF-IDF Represents a Document

Every unique word becomes a dimension.

Suppose the vocabulary is:

```text
[cat, dog, fish, pet]
```

Then D1 becomes:

```text
[3.30, 0, 0, 0]
```

D2 becomes:

```text
[0, 1.10, 0, 0]
```

This creates a large sparse vector that can be fed into classifiers such as:

- Logistic Regression
- Naive Bayes
- Support Vector Machines

---

## TF-IDF vs. Embeddings

### TF-IDF

**Advantages**
- Simple
- Fast
- Interpretable
- Works surprisingly well on many tasks

**Disadvantages**
- No understanding of meaning
- "car" and "automobile" are unrelated
- Produces huge sparse vectors
- Ignores word order

### Embeddings (fastText, Word2Vec, BERT)

**Advantages**
- Capture semantic similarity
- Dense representations
- Better generalization

**Disadvantages**
- More complex
- Harder to interpret

For example:

| Phrase | TF-IDF |
|---------|---------|
| "great movie" | unrelated to "excellent film" |

But embeddings place:

- great ≈ excellent
- movie ≈ film

close together in vector space.

---

## Why TF-IDF Is Still Important

Even in the era of large language models, TF-IDF remains useful because:

- It is an excellent baseline.
- It works well on small datasets.
- It is computationally cheap.
- Many search engines still use TF-IDF-inspired ranking methods.
- It helps explain the evolution from traditional NLP to embedding-based approaches like fastText.

