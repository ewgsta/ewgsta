---
layout: blog
title: "Weeb CLI Week 1: Foundation and Integrations"
description: "Initial setup, OAuth code grant flows for AniList, and MAL integration."
date: 2026-01-10T12:00:00.000Z
---
Welcome to the very first development log of Weeb CLI! Every great project starts with a solid foundation, and this week was all about laying down the tracks. My primary goal was to ensure that users could seamlessly sync their watch history without jumping through hoops. It's incredibly satisfying to see the terminal prompt spring to life for the first time.

### What's New?
- Integrated MyAnimeList (MAL) and AniList for automatic watch progress tracking.
- Added promotional drafts and project documentation.
- Unified the tracker menus for a smoother user experience.

### Under the Hood
The core challenge this week was handling OAuth flows securely within a terminal environment. 

For **AniList** and **MAL**, I implemented the OAuth 2.0 Authorization Code Grant flow. Since the CLI runs locally, I created an ephemeral socket-based callback server that listens on a local port. Once the user authorizes the app in their browser, the redirect hits `localhost`, allowing the CLI to capture the token seamlessly without requiring manual copy-pasting.

Additionally, I resolved strict version incompatibilities with `prompt_toolkit`. By locking the dependency tree and adjusting the event loop policy, the UI no longer blocks during asynchronous network requests.

