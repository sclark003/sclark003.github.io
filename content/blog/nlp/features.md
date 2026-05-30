---
title: Text Representation & Feature Engineering
topic: nlp
order: 3
date: 2026-05-20
excerpt: Before mathematical models can analyse text, raw text must be cleaned to minimise noise and standardise the data.
draft: false
---

Text representation and feature engineering in NLP involve converting raw, unstructured human language into numerical vectors that machine learning algorithms can process. This conversion is vital because algorithms cannot process text natively. The process generally follows a standardised pipeline of preprocessing, extraction, and representation

---
# Preprocessing
Natural Language Processing (NLP) preprocessing is the critical first step in an NLP pipeline. It transforms raw, unstructured, and messy text into clean, standardised, and machine-readable data, vastly improving the accuracy and computational efficiency of downstream machine learning and AI models.

The preprocessing pipeline generally follows these core steps:

---
## 1. Text Cleaning
The initial phase removes unnecessary noise from the text. This may include:
- **HTML/URL Removal:** Strips out web code and links.
- **Punctuation & Special Character Removal:** Cleans symbols (like @, #, !) to focus solely on the text.
- **Contraction Expansion:** Converts abbreviations (e.g., "don't" becomes "do not") to maintain consistency

---
## 2. Text Normalisation
This phase standardises the text so the model treats syntactically different but semantically identical words as the same entity. This may include:
- **Lowercasing:** Converts all letters to lowercase so the model doesn't treat "apple" and "Apple" as distinct words.
- **Spelling Correction:** Auto-corrects typos so the model can process unusual or misspelled inputs.

---
## 3. Tokenisation
This fundamental step breaks down a continuous stream of text (like a paragraph or sentence) into smaller, meaningful units called tokens (words, sub-words, or characters).

>Example: "I love NLP" becomes ["I", "love", "NLP"]

---
## 4. Stopword Removal
This step filters out highly frequent, grammatically necessary words that carry very little semantic weight (e.g., "the", "is", "and", "in"). Removing them reduces dimensionality and speeds up model training

---
## 5. Word Stemming and Lemmatisation
These techniques reduce words to their root forms to normalise vocabulary.
- **Stemming:** Uses simple, fast, rule-based heuristics to chop off word endings. It is fast but can produce non-dictionary words (e.g., "studies" becomes "studi").
- **Lemmatisation:** Uses grammatical rules and context to reduce words to their actual dictionary base form, or lemma (e.g., "studies" becomes "study").

---
## 6. Part of Speech (POS) Tagging
This step assigns grammatical tags to each token (e.g., noun, verb, adjective) to help the model understand the structural relationship of words within a sentence.

---
# Feature Extraction

---
## Bag of Words (BoW)
The Bag of Words (BoW) model simplifies text by representing it as an unordered collection of words, disregarding grammar and word order but keeping track of frequency to convert text into numbers for machine learning.

### How It Works
1. **Build the Vocabulary:** Compile a list of all unique words across your entire text dataset.
2. **Count Frequencies:** For each document (or sentence), count how many times each word from the vocabulary appears.
3. **Create the Vector:** Represent each document as a numeric array (or vector), where the index of the array corresponds to a specific word and its value is the count.

### Example
Take two documents:
- **Document 1:** "The cat is on the mat."
- **Document 2:** "The dog is in the fog."

First, extract the **Vocabulary**: ["cat", "dog", "fog", "in", "is", "mat", "on", "the"]

Next, count the occurrences to build the **BoW Vectors**:
- **Document 1 vector:** [1, 0, 0, 0, 1, 1, 1, 2]
- **Document 2 vector:** [0, 1, 1, 1, 1, 0, 0, 2]

### Pros and Cons
- **Pros:** Simple to implement, computationally efficient, and highly interpretable. It is highly effective for tasks like spam filtering, sentiment analysis, and topic classification where word frequency is a strong indicator.
- **Cons:** It completely ignores word order, context, and meaning. Because every unique word creates a new dimension, large datasets produce massive, sparse vectors (mostly filled with zeros), which can slow down processing.

---
## N-Grams
An n-gram is a contiguous sequence of \(N\) items (like words, letters, or syllables) extracted from a given text or speech corpus. In Natural Language Processing (NLP), n-grams can be used as features to build predictive models, allowing machines to capture word context and order.

### Common Types of N-grams
- **Unigrams (\(N=1\)):** Individual words (e.g., "very", "good").
- **Bigrams (\(N=2\)):** Pairs of consecutive words (e.g., "very good", "not good").
- **Trigrams (\(N=3\)):** Triplets of consecutive words (e.g., "not very good").
- **Character N-grams:** Sequences of letters/characters (useful for detecting prefixes, suffixes, or handling typos)

Using unigrams alone treats text as an unordered "bag," missing vital information like negations or idioms. By using n-grams, models can easily capture:
- **Negation:** Recognizing the difference between "good" and "not good".
- **Intensity:** Identifying phrases like "extremely happy".
- **Domain-specific concepts:** Detecting multi-word entities like "machine learning" or "customer service".

### Pros and Cons
- **Context Retention:** Higher \(N\)-values capture more sequential nuance and semantic meaning.
- **Curse of Dimensionality:** As \(N\) increases, the number of unique sequences explodes, leading to massive memory usage and extremely sparse feature matrices.
- **Data Sparsity:** Longer phrases occur less frequently, making models susceptible to overfitting on rare n-grams.
- **Best Practice:** Data scientists often use a combination of ranges (e.g., setting the feature extractor to include both unigrams and bigrams simultaneously, often called a \(1-2\) gram range) to balance context and memory

---
## TF-IDF (Term Frequency–Inverse Document Frequency)

TF-IDF is a classic technique for representing text numerically. Its goal is to identify words that are **important to a particular document** while down-weighting words that appear everywhere. Before word embeddings and transformers became dominant, TF-IDF was one of the most widely used features for text classification, search engines, and information retrieval.

### How It Works
The score is calculated as the product of two metrics:
1. Term Frequency: How often a term appears in a document, normalized by document length
> TF(word, document) = “number of occurrences of the word in the document” / “number of words in the document”

2. Inverse Document Frequency: Measures how rare a term is across all documents. Common words get low IDF. Smoothed formula prevents division by zero.
> IDF(word) = log(number of documents / number of documents that contain the word)

> TF-IDF Score: TF-IDF(t, d) = TF(t, d) × IDF(t)

High TF-IDF = term is frequent in this document but rare across the corpus (distinctive).

## Example

Consider three documents:
- **Document 1**: "The cat is on the mat"
- **Document 2**: "My dog and cat are the best"
- **Document 3**: "The locals are playing"

For the query: "The cat":

*Calculate Term Frequency:*
> TF(“the”, D1) = 2/6 = 0.33
> TF(“the”, D2) = 1/7 = 0.14
> TF(“the”, D3) = 1/4 = 0.25

> TF(“cat”, D1) = 1/6 = 0.17
> TF(“cat”, D2) = 1/7 = 0.14
> TF(“cat”, D3) = 0/4 = 0

*Calculate Inverse Document Frequency:*
> IDF(“the”) = log(3/3) = log(1) = 0

> IDF(“cat”) = log(3/2) = 0.18

*Calculate TF-IDF Scores:*
> TF-IDF(“the”, D1) = 0.33 * 0 = 0
> TF-IDF(“the, D2) = 0.14 * 0 = 0
> TF-IDF(“the”, D3) = 0.25 * 0 = 0

> TF-IDF(“cat”, D1) = 0.17 * 0.18= 0.0306
> TF-IDF(“cat, D2) = 0.14 * 0.18= 0.0252
> TF-IDF(“cat”, D3) = 0 * 0 = 0

The next step is to use a ranking function to order the documents according to the TF-IDF scores of their words. We can use the average TF-IDF word scores over each document to get the ranking of D1, D2, and D3 with respect to the query Q.

*Calculate Average TF-IDF Scores for each Document:*
> Average TF-IDF of D1 = (0 + 0.0306) / 2 = 0.0153
> Average TF-IDF of D2 = (0 + 0.0252) / 2 = 0.0126
> Average TF-IDF of D3 = (0 + 0) / 2 = 0

Looks like the word “the” does not contribute to the TF-IDF scores of each document. This is because “the” appears in all of the documents and thus it is considered a not-relevant word.

As a conclusion, when performing the query “The cat” over the collection of documents D1, D2, and D3, the ranked results would be:
1. D1: The cat is on the mat.
2. D2: My dog and cat are the best.
3. D3: The locals are playing.

### Pros and Cons
- **Pros:** Simple, fast, interpretable, works surprisingly well on many tasks.
- **Cons:** No understanding of meaning, "car" and "automobile" are unrelated, produces huge sparse vectors, ignores word order.

