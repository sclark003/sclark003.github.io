---
title: Using Github Copilot
topic: copilot
order: 1
date: 2026-05-11
excerpt: Setting up Github Copilot
draft: false
---

## IDE Set Up

You use Github Copilot from the chat panel that appears on the right of your IDE (at least this is true for VSCode and Intellij - I have not had it in any other IDEs).

### Copilot Modes & Models

You can choose between three different modes in Copilot to change how it responds. 
1) Ask = Answers questions without making changes 
2) Edit = Focuses on generating & modifying code 
3) Agent = For multi-step tasks and complex workflows across multiple files. 

Ask mode should not make any code changes so it is a good way to try out using Copilot if you are afraid of Al making any changes just yet! On the other side, agent mode is able to completely look at your project and figure out how to make complicated changes across your codebase with just a bit of prompting from the user. Be careful that you've understood what it's done though! Al can be very convincing, but despite the name it is not actually 'intelligent'. A' works off of statistical prediction so it is not always right no matter how confident it may present an answer, and it can miss things. Therefore it's probably best to use agent mode only if you know what you're doing!

You can also choose between different models on Copilot - this is the large language Model (LLM) copilot is using to parse prompts. Some models are only available via a subscription (these tend to be the more accurate ones!) but you can still get somewhere with the free models. 

N. B.- When you use models you can track your usage such as token consumption & premium requests. Depending on your subscription you get a quota of model usage. If

###  Running Commands

To use Copilot you write questions or 'prompts' into the chat input. Depending on how you write your prompts you may get different outputs, so learning how to write good prompt can be beneficial. 
If you are in agent mode, the agent may want to run terminal commands. The agent will ask in the chat panel if it can run these commands. You should be able to select 'Allow' or 'Skip' to either allow or block the agent from running the command. This is where it's a good idea to be careful and make sure you understand the commands the agent is trying to run as they may modify your system, install packages or access external resources. 

Instead of pressing 'Allow' for each command often you can select the option 'Allow all in Session! Again - be cautious with this!

When copilot modifies your code you will also see the option to 'keep' or 'Undo' the changes for each file. There is also a 'keep All' and 'Undo All' option. This allows you to review copilots suggestions before blindly accepting what it has done. If you don't like a change you can edit it here, or prompt copilot to make a change.