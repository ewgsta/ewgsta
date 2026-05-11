---
layout: blog
title: "Weeb CLI Week 10: AniSkip Integration"
description: "Automated OP/ED skipping via AniSkip and security policy updates."
date: 2026-03-21T12:00:00.000Z
---
Binge-watching just got a massive upgrade! We've all been there: you're 50 episodes deep into a series and manually skipping the intro every single time becomes a chore. Enter AniSkip. This week, I fully integrated automatic Opening and Ending skipping.

### What's New?
- **AniSkip Integration**: Automatically bypass OP/ED themes.
- Standardized repository documentation (Code of Conduct, Security Policy).
- Optimized GitHub Actions path filters.

### Under the Hood
The AniSkip integration relies on querying the `api.aniskip.com` database using the anime's MAL ID and episode number. 

Once the start and end timestamps for the intro are retrieved, I use MPV's command interface to inject dynamic chapters and a Lua script payload. When the playback time hits the `op_start` timestamp, MPV automatically seeks to `op_end`. 

This required precise synchronization. Because streams often have 5-10 seconds of varying sponsor screens, I implemented a slight fuzzy-matching offset that users can adjust in their config file to ensure the skip always lands perfectly on the start of the episode.

