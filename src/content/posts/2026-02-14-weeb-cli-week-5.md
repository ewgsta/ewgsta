---
layout: blog
title: "Weeb CLI Week 5: Source Refactoring and Docs"
description: "Refactored media sources, improved package manager checks, and VHS demos."
date: 2026-02-14T12:00:00.000Z
---
Documentation and code cleanliness were the main themes this week. As the project grows and more people start using it, clear instructions are paramount. I spent a lot of time ensuring that the installation process is as foolproof as possible.

### What's New?
- Added **VHS Demo Tapes**: Cool, terminal-based GIF demos for the documentation.
- Improved the installation menu and package manager conflict checks.
- Cleaned up localized strings (i18n).

### Under the Hood
Architecturally, I completely decoupled the HTML templates from the core parsing logic. Providers now use isolated scraper classes adhering to a strict `BaseProvider` interface. This means adding a new source in the future only requires implementing three specific abstract methods (`search`, `get_episodes`, `extract_stream`), without touching the core UI code.

The package manager check was overhauled. The CLI now dynamically inspects the `$PATH` and environment variables to detect if the user is running within a `venv`, `pipx`, or system-wide `pip`, logging clear warnings if it detects permission issues or shadowed binaries.

