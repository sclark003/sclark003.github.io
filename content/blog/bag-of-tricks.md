---
title: Bag of Tricks for Efficient Text Classification 
date: 2026-05-29
excerpt: Overview of the paper by Joulin et al. (fasttext, 2016)
draft: false
---

Test classification is an important task in Natural Language Processing (NLP), where text is categorised and labelled. Applications of text classification include spam detection, sentiment analysis and document categorisation.

## Problem addressed by this paper

Deep networks for texts were slow to train and overkill for many classification benchmarks. Joulin et al. asked how far can a simple embedding & linear model go with the right tricks?

## What does this paper propose?

This paper introduces fastText model which uses several ideas to enhance a traditional linear model:

1. Strong embedding-based averaging- instead of treating words as independent counts (traditional bag-of-words), fastText learns dense vector representations & averages them across the document. This preserves semantic information while remaining computationally cheap.
2. Word n-grams - A weakness of bag-of- words models is that they ignore word order. This paper addressed this by adding word n-gram features (especially bi-grams), allowing the model to capture phrases without a recurrent or convolutional architecture.
3. Hierarchical softmax- For problems with enormous numbers of labels, the paper used hierarchical softnax to dramatically reduce classification cost. The problem with standard softnax is that it computes a score for each class. When there are many classes you could end up with thousands and thousands of categories. For each class, computational costs grow. In hierarchical softmax, instead of treating classes as a flat list, they are arranged as a tree. Common classes get shorter paths, rare classes get longer paths. Since common classes are encountered more often during training, putting them closer to the root reduces the average computation.

## Why this paper is important 

Around 2015-2016, NLP research was heavily focused on CNNs and RNNs for tasks like sentiment analysis and topic classification. Many researchers assumed that sophisticated sequence models were necessary to capture meaning in text. This paper demonstrated that:

- A carefully engineered bag-of-words style approach could remain highly competitive. 
- Simple baselines were often underestimated
- Computational efficiency was a major research goal, not just accuracy.


5. Run `npm run build:pages` and push to GitHub
