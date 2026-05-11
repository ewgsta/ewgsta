---
layout: blog
title: "Weeb CLI Week 7: Offline Sync and Kitsu"
description: "Kitsu provider integration and offline tracker synchronization."
date: 2026-02-28T12:00:00.000Z
---
What happens when you want to watch episodes on a plane or a long train ride? This week, I tackled the challenge of offline viewing. By expanding our tracker integrations and implementing a robust offline synchronization queue, Weeb CLI is now the ultimate travel companion.

### What's New?
- Added **Kitsu** as a tracking provider, alongside MAL and AniList.
- **Offline Tracking Sync**: Watch offline, sync when you're back online.
- Feature to add anime to your local library without downloading.

### Under the Hood
The offline sync mechanism required a complete rewrite of how we handle state changes. Instead of sending an HTTP POST request to MAL/AniList immediately after an episode finishes, the event is now pushed to a local SQLite `pending_sync` table.

A background daemon thread periodically checks for internet connectivity using a lightweight DNS resolution ping. Once a connection is established, it processes the `pending_sync` queue asynchronously, handling rate limits using a token bucket algorithm to ensure we don't get IP-banned by the tracking APIs.

