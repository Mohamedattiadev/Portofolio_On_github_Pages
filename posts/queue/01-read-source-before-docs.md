---
title: I read the source code before the docs
slug: read-source-before-docs
---

# I read the source code before the docs

When I start using a new library, I open the source code first. Docs come second.

This sounds slow. It is not. Docs explain *how* to use a tool. Source code explains *why* it was made. Once I see the why, the how is easy.

Small example: I used a date library for months and never knew it had a `clone()` function. The docs talked about formatting. The source had a folder called `helpers`. I opened it, found `clone`, and saved myself an hour of bugs.

Source code also shows you the parts the author is proud of. You can tell from comments, naming, and tests. That tells you if the project is alive or just polished on the outside.

Try this next time you install a package: open the `src/` folder for two minutes before you read the README. You will be surprised how much you learn.
