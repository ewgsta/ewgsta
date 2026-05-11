---
layout: blog
title: "Weeb CLI Week 8: Startup Optimization"
description: "New 'weeb' source, security patches, and startup crash fixes."
date: 2026-03-07T12:00:00.000Z
---
Reaching version 2.10.0 is a massive milestone! This week was heavily focused on the Turkish user base by adding a dedicated 'weeb' streaming source. I also spent countless hours squashing elusive bugs that were causing crashes on startup on certain Linux distributions.

### What's New?
- Integrated the new 'weeb' source for Turkish translations.
- Fixed stream and episode naming conventions during bulk downloads.
- Resolved a critical startup crash and improved error logging.

### Under the Hood
The startup crash was a nasty `NoneType` exception caused by race conditions during the initial configuration load. I resolved this by enforcing strict file-locking mechanisms using `fcntl` (on POSIX) when reading/writing the `config.json` file.

Additionally, I audited the codebase for security vulnerabilities. I completely removed all usage of Python's `pickle` module, which is notorious for arbitrary code execution vulnerabilities, replacing it with secure `JSON` serialization and `msgpack` for binary blobs. Stream sorting algorithms were also optimized from $O(n^2)$ complexity down to $O(n \log n)$.

