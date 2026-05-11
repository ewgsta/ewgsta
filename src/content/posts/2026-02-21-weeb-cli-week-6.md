---
layout: blog
title: "Weeb CLI Week 6: Open Source and Serve Mode"
description: "GPL-3.0 licensing, i18n support, and initial API infrastructure."
date: 2026-02-21T12:00:00.000Z
---
Weeb CLI is officially ready for the public eye! This week, I polished the repository, finalized the open-source licensing, and started laying the groundwork for a massive new feature: allowing the CLI to act as a local streaming server.

### What's New?
- Re-licensed the project under **GPL-3.0** to ensure it remains free and open.
- Separated the READMEs into dedicated English and Turkish versions.
- Added comprehensive social media badges and contribution guidelines.

### Under the Hood
The most exciting technical work was the foundation of the `api-and-serve` module. The goal is to let the CLI run as a headless background process. 

I implemented a lightweight HTTP server using `FastAPI` and `uvicorn` that wraps our core scraping engine. This allows external applications (like a web UI or a mobile app) to query `http://localhost:8000/api/v1/search?q=naruto` and receive standardized JSON responses. This decoupled architecture turns Weeb CLI from a simple terminal app into a powerful backend engine.

