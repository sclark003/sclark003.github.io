---
title: Statistical NLP
topic: nlp
order: 2
date: 2026-05-30
excerpt: Machine learning revolutionized NLP by replacing manually designed rules with systems that learn statistical patterns from data.
draft: false
---
Early NLP relied heavily on hand-coded grammatical rules and dictionaries created by linguists. Machine learning revolutionized NLP by replacing manually designed rules with systems that learn statistical patterns from data. 

---
# The Shift to Statistical NLP
Traditional NLP systems required extensive feature engineering, where researchers manually designed features such as word counts, suffixes, grammatical patterns, or dictionaries. These approaches worked reasonably well for limited tasks but struggled with scalability and language variability.

- **The Rule-Based Era (1950s–1970s):** Early NLP relied on linguists hand-coding rules (e.g., if "X" follows "Y", do "Z"). These symbolic systems were inflexible and failed in real-world, ambiguous environments.
- **The Statistical Revolution (1980s–1990s):** Fueled by increasing computational power and the availability of large text datasets (corpora), the field shifted to probability. Researchers began utilizing machine learning to assign weights to linguistic features, allowing systems to make soft, probabilistic decisions rather than strict true/false declarations.
- **Key Milestones:** Pioneered by IBM’s early statistical machine translation models in the late 1980s and 1990s, followed by N-gram models and Hidden Markov Models (HMMs) used for part-of-speech tagging and speech recognition.

Machine learning models instead learn patterns automatically from examples. If given enough labelled data, models can identify relationships between words, contexts, and meanings without explicit programming. These methods often relied on sparse hand-engineered features. 

---
# Classification Models
These standard machine learning algorithms take the vector representations and assign them to specific categories or classes.

---
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

### Strengths & Limitations
- **Pros:** It is incredibly fast, computationally lightweight, performs well on high-dimensional datasets, and requires less training data to converge than complex neural networks.
- **Cons:** The conditional independence assumption is rarely true in reality, which means it can be outperformed by more advanced algorithms if there are heavily correlated features.

---
## Logistic Regression

Logistic Regression is a supervised machine learning algorithm used for classification problems. Unlike linear regression, which predicts continuous values it predicts the probability that an input belongs to a specific class. 

### How It Works
It calculates the probability of an input text belonging to a specific class, e.g: \(P(\text{Positive} \vert{} \text{Text})\)) by passing a linear combination of its features through a sigmoid function.
- It is used for binary classification where the output can be one of two possible categories such as Yes/No, True/False or 0/1.
- It uses sigmoid function to convert inputs into a probability value between 0 and 1.

### Strengths & Limitations
- **Pros:** Highly interpretable, fast to compute, and very efficient for linearly separable datasets.
- **Cons:** Cannot easily solve non-linear or highly complex problems without heavily engineered features. For deeper AI tasks like computer vision or LLMs, deep neural networks are used instead.

---
## Support Vector Machine

A Support Vector Machine (SVM) is a powerful supervised machine learning algorithm primarily used for classification. In Natural Language Processing (NLP), SVMs are highly effective for categorising unstructured text into distinct groups by finding the optimal "hyperplane" (decision boundary) that maximises the distance between categories in a multi-dimensional space.

### How It Works
- **The Hyperplane:** SVM draws a decision boundary—a line in 2D space or a flat plane in higher dimensions—that separates different categories of data.
- **Maximising the Margin:** The goal is to find the "optimal" hyperplane that sits as far away as possible from the nearest data points of both classes. The distance between the boundary and the closest points is called the margin.
- **Support Vectors:** These are the specific data points that sit closest to the decision boundary. They "support" and define the position of the optimal margin, meaning the rest of the data points are essentially ignored.

### Strengths & Limitations
- **Pros:** Highly accurate, very effective with high-dimensional data (e.g., thousands of features), and less prone to overfitting on smaller, structured datasets.
- **Cons:** Computationally expensive and slow to train on massive datasets, less intuitive to tune than deep learning models, and struggles with very noisy data.

---
# Probabilistic & Sequence Models
These models were developed to understand the temporal flow, syntax, and adjacent relationships of language tokens.

---
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

- AA (Transition Matrix): Probability of moving from one hidden state to another (e.g., the chance a noun follows an adjective)
- BB (Emission Matrix): Probability of observing a symbol given a hidden state (e.g., the chance the hidden state verb generates the word "run")
- ππ (Initial State Distribution): Probability of starting in each hidden state.

### Strengths & Limitations
- **Pros:** They require significantly less training data than neural networks, work exceptionally well on smaller datasets, easy to understand and you can trace exactly why a prediction was made.
- **Cons:** HMMs assume the current state only depends on the immediate previous state. This limits their ability to capture long-range dependencies across paragraphs or complex sentences. 

---
## Conditional Random Fields
Conditional Random Fields (CRFs) are a class of discriminative statistical modeling methods used primarily for structured prediction tasks. Unlike standard classifiers that predict a label for a single sample independently, CRFs consider the context and dependencies of neighboring samples, making them ideal for sequential data like text or biological sequences. 

Conditional Random Fields (CRFs) are widely used in NLP for Part-of-Speech (POS) tagging where each word in a sentence is assigned a grammatical label such as noun, verb or adjective. As probabilistic sequence-labeling models, CRFs capture contextual and dependency relationships between neighboring words and tags, allowing more accurate labeling of entire sentences rather than individual words.

### How It Works
- **Discriminative Model:** Unlike generative models (like Hidden Markov Models), CRFs model the conditional probability \(P(Y\vert{}X)\) of the target labels (\(Y\)) given the observed input sequence (\(X\)) directly.
- **No Independence Assumptions:** Traditional sequence models assume that each step is independent of the others. CRFs overcome this by allowing you to define rich, overlapping, and arbitrary features across the entire sequence.
- **Linear-Chain CRFs:** The most common form is the linear-chain CRF, where each prediction (e.g., a word tag) depends only on its immediate neighboring tags.
- **Feature Functions:** CRFs evaluate potential functions based on feature values, such as the current word, surrounding words, capitalisation, and adjacent labels. A mathematical weight is learned for each feature function to maximize the likelihood of the correct sequence.

**CRF Probability:**
$$
    P(Y \mid X) = \frac{1}{Z(X)} \exp\left( \sum_i \sum_k \lambda_k\, f_k(y_{i-1}, y_i, x_i) \right)
$$
where
- X: input words
- Y: output tags
- f_k(): feature functions
- $\lambda_k$: learned weights
- Z(X): normalisation factor

### Strengths & Limitations
- **Pros:** They resolve the "label bias" problem found in maximum entropy Markov models and handle correlated input features effortlessly.
- **Cons:** They require extensive manual feature engineering, can be computationally expensive to train, and are generally outperformed by modern deep learning models like BiLSTMs or Transformers unless the dataset is very small.

---
## N-Gram Language Models
An \(N\)-gram language model is a foundational statistical model that predicts the probability of a word based solely on the \(N-1\) preceding words in a sequence. It relies heavily on corpus frequency counts, making it highly efficient for basic text prediction and spelling correction.

### How It Works
The model assumes that the probability of a word depends only on its immediate history (the Markov assumption). For example, a Bigram (\(N=2\)) looks at the previous 1 word, while a Trigram (\(N=3\)) looks at the previous 2 words.

Using conditional probability, the probability of an entire sequence of words \(P(w_1, w_2, \dots, w_n)\) is approximated by multiplying the probabilities of each individual word given its context:
$$
    P(w_n | w_1, w_2, \dots, w_{n-1}) \approx \frac{Count(w_1, w_2, \dots, w_n)}{Count(w_1, w_2, \dots, w_{n-1})}
$$

### Strengths & Limitations
- **Pros:** Computationally lightweight, easy to understand, and fast to train on small datasets. Unlike Hidden Markov Models (HMMs), CRFs allow the use of rich, overlapping, and arbitrary features (e.g., capitalisation, prefixes, or multi-word context) without making strict independence assumptions about the input data.
- **Cons:** Struggles with long-term memory and "data sparsity" (if a specific word sequence never appears in the training data, its probability drops to zero).