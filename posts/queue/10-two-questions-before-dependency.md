---
title: Two questions before I add a dependency
slug: two-questions-dependency
---

# Two questions before I add a dependency

Adding a package is easy. Removing one is hard. So I always ask two questions first:

**1. Can I write the part I actually need in 30 lines?**

Most libraries do ten things. I usually need one. If the one thing I need fits in half a screen, I write it. No npm install. No update. No security alert at 2am.

**2. Will I still want this in six months?**

If a library has 200 stars, no commits in a year, and one maintainer, I am the next maintainer. That is a job, not a feature.

If the answer to question one is yes, I write it.
If the answer to question two is no, I keep looking.

I am not against dependencies. I just want each one to earn its place. My package.json should look like a small team of friends, not a crowd of strangers.

Less code I do not own = less code I have to debug at midnight.
