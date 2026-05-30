---
title: Natural Language Processing
topic: nlp
order: 1
date: 2026-05-30
excerpt: NLP attempts to bridge the gap between human communication and machine understanding
draft: false
---

Natural Language Processing is one of the most important areas of Artificial Intelligence because it focuses on human language, which is highly complex, ambiguous, and constantly changing. Unlike programming languages, human languages contain irregular grammar, multiple meanings, sarcasm, implied context, and emotional nuance. NLP attempts to bridge the gap between human communication and machine understanding.

Modern NLP systems rely heavily on machine learning and deep learning rather than manually programmed linguistic rules. Earlier NLP systems depended on hand-crafted grammar rules and dictionaries, but these systems struggled to generalise across different contexts and languages. Deep learning transformed NLP by allowing systems to automatically learn patterns from enormous amounts of text data.

NLP pipelines often involve several stages:
- Tokenisation (splitting text into words/subwords)
- Normalisation (lowercasing, stemming, lemmatisation)
- Syntactic analysis (grammar structure)
- Semantic analysis (meaning)
- Pragmatic understanding (context and intention)

---
## Challenges in NLP

A major challenge in NLP is that language understanding often requires world knowledge and commonsense reasoning. For example:

> “The trophy would not fit into the suitcase because it was too big.”

Humans understand “it” refers to the trophy, but this requires reasoning about object size and
physical relationships.

---
### Ambiguity

Language can have multiple meanings at different levels.

#### Lexical Ambiguity

A word has multiple meanings. For example, the word "bank" could refer to a "river bank" or a "financial bank".

#### Syntactic Ambiguity

Sentence structures can be unclear. For example, “I saw the man with the telescope.” Who has the telescope?

#### Semantic Ambiguity

Sentence meaning itself can be unclear. For example, “Visiting relatives can be annoying.”

---
### Dynamic Nature of Language

Language constantly evolves, e.g. slang, internet abbreviations, new terminology. This means that models will struggle with new language and data needs to be updated to keep up with this.

---
### Noisy Data

Data used to train models may not be perfect text. Human text often contains things like typos, emojis, informal grammar and abbreviations. E.g. “omg that movie was sooo good 😭”

---
### Zipf's Law
Zipf's law describes the relationship between the frequency of words in language corpus and their rank in a frequency sorted list. In natural language texts, it has been observed that:

- The second most used word appears half as often as the most used word.
- The third most used word appears one-third the number of times the most used word appears, and so on.

Zipf proposed that such a distribution was observed because we tend to frequently use words that we are more comfortable with. We try to communicate as efficiently as possible by putting in the least amount of effort.

In NLP terms, a very small number of words occur frequently, while most occur rarely. This means that for some words there is sparse data so it can be difficult to get data that covers a whole vocabulary. This can lead to probelms in models related to rare words.
