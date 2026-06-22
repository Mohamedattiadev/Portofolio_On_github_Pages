---
title: Naming things — my one rule
slug: naming-one-rule
---

# Naming things — my one rule

People say naming is the hardest part of programming. I agree. So I made one rule for myself.

**The name should answer one question: "what does this do?" — not "what is this?"**

Bad: `data`, `manager`, `helper`, `utils`.
Better: `parseUserEmail`, `cancelStaleOrders`, `dropDuplicateRows`.

The first kind is a noun. The second kind is a verb. Verbs describe action. Action is what code does. Action names are easier to read at 2am when something is broken.

I also avoid words that mean nothing: *handle*, *process*, *system*. If I cannot remove the word and keep the meaning, the word is doing work. If I can remove it, I should.

Names that take ten seconds to write save ten minutes of reading later. That is the only trade I care about.
