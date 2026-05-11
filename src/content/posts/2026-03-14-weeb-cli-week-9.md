---
layout: blog
title: "Weeb CLI Week 9: MPV Stability and i18n"
description: "Resolved MPV hang issues, added Polish support, and integrated Docchi."
date: 2026-03-14T12:00:00.000Z
---
Nothing is more frustrating than a video player that hangs right in the middle of an action scene. This week, I dove deep into the IPC (Inter-Process Communication) socket between Python and our underlying video player, MPV, to ensure flawless playback.

### What's New?
- Added **Polish (PL)** language support.
- Integrated the **Docchi** streaming provider.
- Resolved infinite loop and hang issues in the MPV player integration.

### Under the Hood
MPV is driven by Weeb CLI via a JSON-IPC socket. The issue was that if a single stream source died mid-playback, the Python loop wouldn't receive the `end-file` event properly, causing the CLI to hang indefinitely. 

To fix this, I implemented a robust socket polling mechanism using `select()`. Now, if the socket is silent for more than 5 seconds, a heartbeat ping is sent. If the heartbeat fails, Weeb CLI automatically kills the zombie MPV process and attempts to resume playback using the next available streaming mirror.

