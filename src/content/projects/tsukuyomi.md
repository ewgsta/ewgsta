---
title: Tsukuyomi
description: Multi-platform supported, self-hosted music player.
featured: true
link: https://github.com/ewgsta/tsukuyomi
tech:
  - React
  - FastAPI
  - Expo
---
## Features

### Interface & Experience
*   **Modern Design:** Frosted glass effects, vibrant colors, and smooth animations.
*   **Responsive Layout:** Flawless look on desktop and mobile devices.
*   **Mini & Full Screen Player:** Keep the song control always at hand.

### Music Management
*   **Auto Scan & Watch:** Instantly detects changes in your selected folders (Watchdog integration).
*   **Smart Metadata Reading:** ID3 tags, cover images, and FLAC/MP3 support.
*   **Advanced Search:** Instant filtering by artist, album, or song name.
*   **Favorites & Playlists:** Create your own lists and manage your favorites.

### Mobile (Expo) (It's okay, I'm working on it a bit, not really usable right now.)
*   **Native Performance:** Smooth mobile experience developed with React Native.
*   **Synchronization:** Access your library from anywhere by connecting to the server on the same network.
*   **Background Play:** Enjoy music even when the app is closed (iOS/Android).

### Technical Specifications
*   **Streaming:** Range-request supported streaming that can play even large files without waiting.
*   **Live Lyrics:** Synchronized or plain lyrics with `lrclib.net` integration.
*   **Hot-Reload Database:** Fast data management based on SQLite.

---

## Installation and Running

The project consists of two main parts: Server and Client.

### Requirements
*   Python 3.9+
*   Node.js 18+ & Bun (or npm/yarn)

### 1. Server (Backend) Installation
The server scans music files and provides the API.

```bash
cd server

# Create a virtual environment (Recommended)
python -m venv venv
# For Windows:
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server (Default port: 8000)
python main.py
```

### 2. Client (Web/Desktop) Installation
Modern web / tauri interface.

```bash
cd client

# Install dependencies
bun install

# Start in development mode (Web)
bun run dev

# Start as Desktop App (Tauri)
bun run tauri dev
```

### 3. Mobile (Expo) App
To run on your mobile device.

```bash
cd client

# Start for Android (or just scan QR with 'bun run mobile')
bun run mobile -- --clear
```
_Note: Make sure your phone and computer are on the same Wi-Fi network._

[Visit the github page for more!](https://github.com/ewgsta/tsukuyomi)
