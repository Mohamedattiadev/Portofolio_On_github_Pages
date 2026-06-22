---
title: Write the commit message first
slug: commit-message-first
---

# Write the commit message first

Before I write the code, I open a fake commit message in my head:

> fix: handle empty cart in checkout total

Then I ask: is that one sentence? Does it describe one thing? If yes, I start coding. If not, I split the work.

This trick saves me from "big messy patch" syndrome. When I cannot summarise the change in one line, the change is too big. Smaller changes are easier to review, easier to revert, and easier to remember.

I learned this from older engineers who write five-word commits like `fix off-by-one in batch loop` and somehow ship the right thing every time. Their secret is not magic. They decided what they were doing *before* they did it.

Commit messages are not paperwork. They are a planning tool that doubles as documentation.

Type yours before you type your code.
