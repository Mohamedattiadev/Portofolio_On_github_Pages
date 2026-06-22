---
title: The smallest CLI I ever shipped
slug: smallest-cli
---

# The smallest CLI I ever shipped

It had three lines. It was useful for two years.

I needed to print my current Git branch in big letters before each commit. So I wrote:

```bash
#!/bin/bash
figlet "$(git branch --show-current)"
```

I put it in `~/bin/branch`, ran `chmod +x`, and used it 50 times a week.

Big tools are fun to build. Small tools are easier to keep. I never had to update this one. It never broke. It did one thing.

The lesson I keep learning: not every problem needs a framework. Sometimes three lines and a shell are enough. Save the big projects for the days you have real energy.

Most of my best tools fit on one screen.
