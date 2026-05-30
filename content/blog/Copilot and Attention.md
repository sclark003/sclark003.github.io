---
title: Why Does Copilot 'Forget' Instructions? Part 2: Attention
topic: copilot
order: 4
date: 2026-05-21
excerpt: How Attention Affects Copilot Instructions
draft: true
---

## How attention affects Copilot instructions

### Tokenisation
In NLP, tokens are the smallest unit of text that an Al model processes - they can be whole words, characters like letters or punctation, or even parts of words such as common word stems.

### Vector Embeddings
In sophisicated models, words are converted into vectors (long lists of numbers) that represent meaning. These can be dense vector representations where semantically similar words occupy nearby regions in vector space. These embeddings capture both semantic & syntactic information. 
E. g. 'king' and 'queens appear close together 
Embeddings weights are learned during a model's training, using context. The core assumption of distributional semantics is that words appearing in similar contexts have similar meanings. This allows models to learn language structure automatically from raw text.

### Attention Mechanisms
Attention mechanisms allow models to focus on the most relevant parts of the input. E.g. attention means that models will weight the most relevant words of the input higher to improve the model response. The core idea is computing similarity scores between representations to determine relevance. 

### What attention means for Copilot
When Copilot generates responses, for each token that is generated a relevance score is computed between that position and every single token already in the context.

Each token in the sequence is transformed into three vectors:
- Query (Q) = 'what am I looking for?' 
- Key (K) = 'what do I contain?' 
- Value (V) = 'what information do I carry?'

To produce output at any position, the model computes a score between its Query & every key in the context. The score is converted into a probability distribution (weights sum to 1) . Each Value vector is weighted by the attention score & summed to produce the output for that position. 

This is a matrix multiplication that produces a score between every pair of tokens simultaneously. If your context has 50,000 tokens it would be a 50, 000 × 50,000 matrix of relevance scores.

Q, K and V are the learned parameters from model training. Training teaches Q to produce queries that ask useful questions, K to produce keys that advertise relevant properties, and V to produce values that carry the right information forward. The matrices aren't hand- designed, they emerge from billions of training examples.