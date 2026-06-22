---
title: The git command I use most
slug: git-command-most
---

# The git command I use most

It is not `commit`. It is not `push`. It is `git log --oneline -20`.

I run it twenty times a day. Before I start coding, I read the last twenty commits. It takes ten seconds. After ten seconds I know:

- What changed yesterday
- Whether my teammate already touched my file
- Where I left off

This habit replaced standup meetings for me. The log tells the story better than I can.

I aliased it: `git lg`. Now it is four keys.

```bash
git config --global alias.lg "log --oneline -20"
```

Try it for a week. You will start writing better commit messages because you read your own log every morning. Better messages make the next morning easier. It is a small loop that gets better with time.

Most days, the only tool I really need is a clean log.
