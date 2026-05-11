---
layout: blog
title: "Weeb CLI Week 4: Security and Caching Layers"
description: "Major infrastructure improvements, caching systems, and stream fixes."
date: 2026-02-07T12:00:00.000Z
---
A stressful but ultimately rewarding week! When you rely on third-party streaming providers, you are at the mercy of their DOM changes and security updates. This week, one of our major providers completely changed their streaming logic, leading to some momentary panic. But we adapted, overcame, and built a stronger system because of it.

### What's New?
- Fixed critical stream extraction bugs for the AllAnime provider.
- Resolved file naming collisions during bulk downloads.
- Introduced a new caching system for faster load times.

### Under the Hood
The most significant addition is the **Security and Fingerprinting Layer**. Providers often use Cloudflare or custom JS challenges to block scraping. To bypass this, I integrated an HTTP client that mimics modern browser TLS fingerprints (using `curl_cffi`). This bypasses JA3 fingerprinting blocks without needing a headless browser.

On the caching front, I implemented an LRU (Least Recently Used) cache for search results and metadata queries. This cache is persisted locally via SQLite. Instead of doing expensive HTTP GET requests every time a user navigates back to a menu, the CLI now hits the local cache, reducing load times from ~1500ms down to ~5ms.

