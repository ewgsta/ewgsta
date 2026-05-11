---
layout: blog
title: "Weeb CLI Week 13: High-Performance Concurrency"
description: "Parallelized tracker sync, refactored caching, and transaction safety."
date: 2026-04-11T12:00:00.000Z
---
Speed, speed, speed! As the application grew, the startup time began to creep up, taking nearly 3 seconds just to render the main menu. Unacceptable! This week, I completely overhauled the concurrency model to make the CLI feel blazingly fast.

### What's New?
- Parallelized tracker synchronization at startup.
- Consolidated duplicate URL extraction logic.
- Implemented specific exception handling replacing broad try-catch blocks.

### Under the Hood
The bottleneck at startup was the sequential synchronization of MAL, AniList, and Kitsu APIs. I introduced a `ThreadPoolExecutor` to handle these network requests in parallel. Since the GIL (Global Interpreter Lock) doesn't block on I/O bound tasks, the startup time plummeted from 3.2s to 0.4s.

I also audited the SQLite database layer. By explicitly setting the isolation level to `EXCLUSIVE` during write-heavy operations and utilizing context managers (`with db.cursor() as cursor:`), I eliminated intermittent `database is locked` errors that occurred during high-concurrency downloads.

