---
title: Context and Commands
date: 2026-05-18
excerpt: Using context and commands in Github Copilot
draft: false
---

In Artificial Intelligence, the field of study relating to processing text (e.g. chatbots, language translation, LL Mss) is known as Natural Language Processing (NLP).

In NLP context refers to the surrounding information that helps the computer understand the meaning and intent behind human language. Context helps distinguish between ambiguities such as words with multiple meanings, understanding sentiment, resolving entities (e-g. pronouns). In terms of Github Copilot, we can think of context as it's short term memory that it is using to make decisions. 

Context is very important in terms of getting a good output. For example, if you were going to ask a human a question, the more context you are able to provide, the more likely it is you will get a relevant and helpful answer. The same is true of Copilot - without context Copilot 't know what you are referring to. The more context you provide, the more accurate and helpful copilot's responses will be. For Copilot, context can include selected code, file references, specific questions and knowledge bases to namea few. 

##  Adding Context

When you are prompting Copilot, you can add files to your chat context. In Intelli, the file you have currently open is automatically shared as context. In Uscode you have to explicitly add it -the current file is highlighted in the chat window but you need to press the 't' to add to context. In both IDES you can also add other files to context by clicking the plus symbol in the chat window and selecting the files you want to add. 

You can also reference files by dragging and dropping the file from the Explorer into the chat input.
Alternatively you can reference a file in the chat using this command: 
> /# file: filename 

When you are using Copilot it's a good idea to start a new Copilot chat session for unrelated changes. This means that previous conversations won't influence your responses (as they won't be used as context. 
When you start a new chat copilot automatically discovers your project files & indexes your workspace in the background so it already has context about your codebase structure, classes & dependencies.

## Writing good Prompts

The more specific your prompt, the more accurate your response is likely to be.

- Specify what, where and how 
- Tell copilot what NOT to do, eg- don't modify business logic
- Use specifics, e. g. behaviours, frameworks, file name, naming conventions, output format
- Consider role-based prompting, e.g. assign a role: 'Act as a testing expert' 
- Describe behaviour: Focus on what code should do, not implementation details 
- Specify edge cases: Guide Copilot to consider error paths & boundaries. 
- Ask to plan before executing if you want to review changes more easily and make sure copilot is executing the correct thing., e. g. 'Do not make any changes yet' 
