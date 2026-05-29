---
title: Why Does Copilot 'Forget' Instructions? Part 1: Context
date: 2026-05-18
excerpt: How Context Affects Copilot Instructions
draft: false
---

## How Context Affects Copilot Instructions

Every model has a different 'context window. This is the number of tokens that can be processed by the model. For Copilot, the token budget is shared between system prompts, tool definitions, conversation history, retrieved file contents, and the actual response. Project instructions compete with all of these for space. 

## How Context works when writing Prompts

Even when you write helpful knowledge and custom agent files for Github copilot, not necessarily all of this context will be loaded into the context when you write a prompt. 
There are several architectural & practical reasons for this:

1. Context window budget - If your project instructions and prompt exceed the context window of Copilot's model then some instructions may get missed. 
2. Retrieval-based architecture - Agentic systems are designed to pull context on-demand via searching and file reads, rather than pre- loading everything. This is intentional so that the agent can decide what is relevant to the current task and fetch it. Even if files exist, they aren't automatically read and used as context.
3. Tiered loading design- When you enter a prompt, the most recent lines in the conversation memory load, session memory files are listed but not loaded & repo memory requires explicit reads. This is a deliberate trade-off to improve context & performance. 
4. Performance degradation at scale - Research shows that a 'lost in the middle' problems exists, where models can pay less attention to content in the middle of very long contexts. As a result, selectively loading only the relevant instructions often produces better results.
5. No guaranteed discovery - If the agent doesn't know that files exist it will not read them. Therefore files can be missed if they aren't in expected locations, aren't referenced by other files, or don't match search patterns. 

## How to mitigate context issues

- Place a root-level 'AGENTS. nd' or 'github/copilot-instructions. and'- these are convention recognised entry points.
- Use a manifest file that explicitly lists all instruction files.
- Keep instructions consise and avoid duplication 
- Structure files so that the most critical instructions appear at the top 
- Use naming conventions that can be discovered, e. g. '#instructions.md'

Agentic systems trade completeness for relevance and efficiency. If you need to follow instructions exactly, they will need to either fit into the auto-loaded context tier or be structured so that the agent reliably discovers them before acting.