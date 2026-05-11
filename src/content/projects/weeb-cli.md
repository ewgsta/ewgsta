---
title: Weeb CLI
description: A Python tool that allows you to watch anime easily and quickly from your terminal without ads and distractions.
featured: true
link: https://github.com/ewgsta/weeb-cli
tech:
  - Python
---
## Features

### Multi-Source Support
- **Turkish**: Animecix, Turkanime, Anizle
- **English**: HiAnime, AllAnime

### Smart Watching
- High-quality HLS/MP4 streams with MPV integration
- Resume from where you left off (minute-based)
- Watch history and statistics
- Completed (✓) and ongoing (●) episode markers

### Powerful Download System
- Fast multi-connection downloading with **Aria2**
- Complex stream support with **yt-dlp**
- Queue system and concurrent downloading
- Resume incomplete downloads
- Smart file naming (`Anime Name - S1E1.mp4`)

### Local Library
- Auto-scan downloaded animes
- External drive support (USB, HDD)
- Offline anime indexing
- Search across all sources

### Additional Features
- SQLite database (fast and reliable)
- System notification when download is complete
- Discord RPC integration (show the anime you are watching on Discord)
- Search history
- Debug mode and logging
- Auto update check

---

## Installation

### PyPI (Universal)
```bash
pip install weeb-cli
```

### Arch Linux (AUR)
```bash
yay -S weeb-cli
```

### Portable
Download the appropriate file for your platform from the [Releases](https://github.com/ewgsta/weeb-cli/releases) page.

### Developer Installation
```bash
git clone https://github.com/ewgsta/weeb-cli.git
cd weeb-cli
pip install -e .
```

[Visit the Github page for more!](https://github.com/ewgsta/weeb-cli)
