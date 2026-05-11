---
layout: blog
title: "Weeb CLI Week 2: Reliability and QoL"
description: "Keyboard shortcuts, database backup/restore, and Discord RPC."
date: 2026-01-17T12:00:00.000Z
---
Development is moving at a breakneck pace! After getting the core tracking mechanics working last week, it was time to focus on Quality of Life (QoL). Nothing breaks the immersion of watching a good show like a clumsy interface or a sudden crash. This week, we focused on making the CLI feel like a premium tool.

### What's New?
- **Global Keyboard Shortcuts**: Control playback and menus without reaching for the mouse.
- **Discord Rich Presence (RPC)**: Let your friends know what you're watching directly on Discord.
- **Data Safety**: Introduced SQLite database backup and restore mechanisms.
- **Smart Downloads**: Pre-download disk space checks and automatic retry mechanisms for failed streams.

### Under the Hood
To handle the **Discord RPC**, I utilized an asynchronous IPC (Inter-Process Communication) connection to the local Discord client. This required writing a non-blocking wrapper to ensure the main application thread doesn't hang if Discord isn't running or crashes.

For reliability, the download engine now includes an exponential backoff retry logic. If a chunk fails during extraction, it no longer halts the entire queue. Instead, it isolates the failed chunk, logs the exception, and re-queues it. 

I also added a pre-flight disk space check using `os.statvfs` on POSIX systems to gracefully warn the user *before* initiating a 2GB download, preventing IO errors mid-stream.

