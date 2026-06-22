---
title: Delete code or comment it out?
slug: delete-vs-comment
---

# Delete code or comment it out?

Delete. Almost always delete.

Commented-out code is a small lie. It tells the next reader: *this might come back, be careful*. Most of the time it never comes back. But everyone slows down to read it anyway.

You have git. Git remembers everything. If you need the old code, it is one `git log -p` away. Your repo is the time machine. Your file is for the present.

I keep two exceptions:

1. **One-line examples in tests** — `// expect(x).toBe(5)` near a tricky case is fine.
2. **Temporary debug prints during a session** — but I remove them before commit, no exception.

If you find yourself writing `// TODO: remove this`, just remove it now. Future-you is busier than today-you.

Smaller files = fewer places for bugs to hide.
