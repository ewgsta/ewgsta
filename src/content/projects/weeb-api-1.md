---
title: Anime API
description: Anime API for my Weeb CLI project.
featured: true
link: https://github.com/ewgsta/weeb-api
tech:
  - Hono
---
# Weeb API
Anime API documentation developed for Weeb CLI.

## API Documentation

### Anime List (GET /animes)
Lists all animes with pagination.

**Parameters:**
- `page`: Page number (Default: 1)
- `limit`: Number of items per page (Default: 20)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "6781edaad8b0745f144982ef",
      "name": "Ubel Blatt",
      "slug": "ubel-blatt",
      "first_image": "https://...",
      "season_number": 1
    }
  ],
  "page": 1,
  "limit": 20
}
```

---

### Anime Details (GET /animes/:slug)
Fetches the full details of the specified anime (episodes, categories, related content, etc.).

**Parameters:**
- `:slug`: Unique slug value of the anime (e.g. `ubel-blatt`)

**Response (200 OK):**
```json
{
  "data": {
    "id": "6781edaad8b0745f144982ef",
    "name": "Ubel Blatt",
    "description": "An epic fantasy adventure...",
    "categories": ["Action", "Adventure"],
    "episodes": [
      {
        "episode_number": 1,
        "type": "TV",
        "sources": [
          { "label": "Primary (CDN)", "watch_url": "/watch/eyJpZCI6IjY3ODFlZGM3ZDhiMDc0NWYxNDQ5ODJmOSIsInNyYyI6ImJhY2tibGF6ZSIsInRzIjoxNzQxNTM4NTQzMTIxfQ==" },
          { "label": "Mirror 1", "watch_url": "/watch/..." }
        ]
      }
    ],
    "related_animes": [
      { "id": "...", "name": "...", "slug": "...", "first_image": "..." }
    ]
  }
}
```

---

### Video Stream (GET /watch/:token)

**Note:** This endpoint directly returns video data (binary). Tokens include a timestamp and are temporary. It is compatible with HTML5 Video players (Range header is supported).

---

### Search (GET /search)
Performs a quick name-based search.

**Parameters:**
- `q`: Search term (Must be at least 2 characters)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "...",
      "name": "One Piece",
      "slug": "one-piece",
      "first_image": "..."
    }
  ]
}
```

---

### Categories and Filtering

| Endpoint                        | Description                                      |
|:--------------------------------|:----------------------------------------------|
| GET /categories                 | Lists all categories and their IDs        |
| GET /categories/:id/animes      | Lists animes belonging to a specific category ID |

**Category ID Table:**
1: Action, 2: Military, 3: Sci-Fi, 4: Magic, 5: Supernatural, 6: Drama, 7: Ecchi, 8: Fantasy, 9: Thriller, 10: Mystery...  
(The full list can be obtained from the `/categories` endpoint.)

---

## Error Codes

- **400 Bad Request**: Missing or invalid parameters  
- **403 Forbidden**: IP banned or invalid token  
- **404 Not Found**: Record not found  
- **429 Too Many Requests**: Rate limit exceeded  
- **500 Internal Server Error**: Unexpected server error  
