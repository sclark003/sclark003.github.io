---
title: Machine Learning in NLP
topic: nlp
order: 2
date: 2026-05-30
excerpt: Machine learning revolutionized NLP by replacing manually designed rules with systems that
learn statistical patterns from data.
draft: false
---

Machine learning revolutionized NLP by replacing manually designed rules with systems that learn statistical patterns from data. Traditional NLP systems required extensive feature engineering, where researchers manually designed features such as word counts, suffixes, grammatical patterns, or dictionaries. These approaches worked reasonably well for limited tasks but struggled with scalability and language variability.

Machine learning models instead learn patterns automatically from examples. If given enough labelled data, models can identify relationships between words, contexts, and meanings without explicit programming. Early machine learning approaches in NLP included:
- Naive Bayes
- Logistic Regression
- Hidden Markov Models (HMMs)
- Conditional Random Fields (CRFs)

These methods often relied on sparse hand-engineered features. 

## Naive Bayes Classifiers
Naive Bayes is a machine learning classification algorithm that predicts the category of a data point using probability. It  assumes that all features are independent of each other. Naive Bayes performs well in many real-world applications such as spam filtering, document categorisation and sentiment analysis.

Based on Bayes' Theorem, it calculates the probability of a data point belonging to a specific class. It is called "naive" because it makes the simplifying assumption that all input features are independent of one another.

### How It Works
The algorithm uses the probability of past data to predict the class of new, unseen data. It calculates the posterior probability for each possible class and assigns the label with the highest probability.

The core calculation follows this logic:
$$
Posterior Probability = \frac{Prior Probability \times Likelihood}{Evidence}
$$

- Prior Probability: The historical frequency of each class in the dataset.
- Likelihood: The probability of a feature occurring given a specific class.
- Evidence: The overall probability of the features (this is constant across all classes, so it is often ignored when comparing).

## Logistic Regression

Logistic Regression is a supervised machine learning algorithm used for classification problems. Unlike linear regression, which predicts continuous values it predicts the probability that an input belongs to a specific class. 

### How It Works
It calculates the probability of an input text belonging to a specific class, e.g:
$$
 \(P(\text{Positive} \vert{} \text{Text})\)) by passing a linear combination of its features through a sigmoid function.
$$
- It is used for binary classification where the output can be one of two possible categories such as Yes/No, True/False or 0/1.
- It uses sigmoid function to convert inputs into a probability value between 0 and 1.

## Hidden Markov Models
A Hidden Markov Model (HMM) is a statistical AI framework that infers invisible, underlying states from a sequence of observable data. It operates on the "Markov property," assuming the next state depends only on the current state, making it a foundational tool for sequential language tasks.

### How It Works
HMMs bridge the gap between what you can see and what you need to understand. They rely on two main mechanisms:
1. Hidden States: The invisible, underlying categories (e.g., grammatical tags like noun or verb).
2. Observable Events: The visible data you are measuring (e.g., words in a sentence).

A Hidden Markov Model is defined by

    λ=(A,B,π)
    λ=(A,B,π)

where

    AA (Transition Matrix): Probability of moving from one hidden state to another (e.g., the chance a noun follows an adjective)
    BB (Emission Matrix): Probability of observing a symbol given a hidden state (e.g., the chance the hidden state verb generates the word "run")
    ππ (Initial State Distribution): Probability of starting in each hidden state.

### Conditional Random Fields
Conditional Random Fields (CRFs) are widely used in NLP for Part-of-Speech (POS) tagging where each word in a sentence is assigned a grammatical label such as noun, verb or adjective. As probabilistic sequence-labeling models, CRFs capture contextual and dependency relationships between neighboring words and tags, allowing more accurate labeling of entire sentences rather than individual words.

CRFs model the entire sequence as a single structured prediction problem and assign scores to possible tag sequences. They select the most probable global label sequence by combining feature weights and transition dependencies across the sentence. CRF Probability:
$$
    P(Y \mid X) = \frac{1}{Z(X)} \exp\left( \sum_i \sum_k \lambda_k\, f_k(y_{i-1}, y_i, x_i) \right)
$$
where
- X: input words
- Y: output tags
- f_k(): feature functions
- \lambda_k: learned weights
- Z(X): normalization factor

 Instead of modeling the underlying joint distribution like Hidden Markov Models (HMMs), CRFs model the conditional probability \(P(Y\vert{}X)\) directly, allowing them to handle complex, overlapping features without making strict independence assumptions.

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
