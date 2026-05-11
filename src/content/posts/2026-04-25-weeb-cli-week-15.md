---
layout: blog
title: "Weeb CLI Week 15: Connection Pooling and SDK"
description: "SQLite connection pooling, lazy properties, and SDK expansion."
date: 2026-04-25T12:00:00.000Z
---
Another massive performance leap this week! By deeply analyzing the profiling data of the application, I identified key bottlenecks in how we handled data and properties. The results? A dramatically faster, smoother experience.

### What's New?
- Added **Desktop Shortcut Creation** for easy launching.
- Implemented **Database Connection Pooling**.
- Expanded SDK documentation across multiple languages.

### Under the Hood
SQLite is fast, but constantly opening and closing connections is not. I implemented a custom lightweight Connection Pool wrapper around `sqlite3`. By maintaining 5 persistent connections, bulk metadata updates (like indexing a local folder of 500 episodes) saw a 60% reduction in execution time.

I also heavily utilized the `@lazy_property` pattern. Expensive DOM parsers and compiled regex patterns are now only evaluated the first time they are accessed, rather than at class initialization. This simple change, combined with caching the provider discovery module, reduced the overall UI rendering latency to near-zero.

