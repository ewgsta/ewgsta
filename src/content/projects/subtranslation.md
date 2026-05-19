---
title: SubTranslation
description: A simple API that translates SRT and VTT subtitle files into the
  desired language.
featured: false
link: https://github.com/ewgsta/subtranslation-api
tech:
  - Express.js
---
# AI Translation API

SRT and VTT subtitle files translator to Turkish.

## Installation

```bash
npm install
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_key
API_KEY=your_secret_key
PORT=3000
```

## Running

```bash
npm start
```

## API Usage

### Endpoint

```
POST /api/translate
```

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| x-api-key | Yes | API_KEY value from .env |
| Content-Type | Yes | multipart/form-data |

### Body

| Field | Type | Description |
|-------|------|-------------|
| file | File | .srt or .vtt file |

### Example Request (cURL)

```bash
curl -X POST http://localhost:3000/api/translate \
  -H "x-api-key: your_secret_key" \
  -F "file=@subtitle.vtt"
```

### Example Request (JavaScript)

```javascript
const formData = new FormData();
formData.append('file', file);
const response = await fetch('http://localhost:3000/api/translate', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_secret_key'
  },
  body: formData
});
const blob = await response.blob();
```

### Successful Response

- Status: 200
- Content-Type: text/plain
- Content-Disposition: attachment; filename="original_filename.vtt"
- Body: Translated subtitle content

### Error Responses

```json
{
  "error": {
    "code": 1001,
    "message": "File not uploaded"
  }
}
```

| Code | Description |
|------|-------------|
| 1001 | File not uploaded |
| 1002 | Unsupported format |
| 1003 | File could not be read |
| 1004 | File size too large (max 5MB) |
| 2001 | API key missing |
| 2002 | API key invalid |
| 3001 | OpenRouter API error |
| 3002 | Model did not respond |
| 3004 | Rate limit exceeded |

## Deploy to Vercel

1. Push to GitHub
2. Import on Vercel
3. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `API_KEY`
4. Deploy

```bash
npm i -g vercel
vercel
```

## Limits

- Max file size: 5MB
- Supported formats: .srt, .vtt

## Running with Docker and Local Domain

You can run the project in an isolated manner with Docker and test it using the `aiceviri-api.local` domain name.

1. Create your `.env` file:

```bash
cp .env.example .env
```

Add the required API keys. You can allow requests from external sources by adding the `CORS_ORIGINS` variable:

```env
CORS_ORIGINS=http://localhost:3000,https://aiceviri-api.local
```

2. Add the domain to your computer's `hosts` file:
   - **Linux/Mac**: Open `/etc/hosts` with `sudo nano /etc/hosts`.
   - **Windows**: Open `C:\Windows\System32\drivers\etc\hosts` as administrator.

   Add this line:

   ```text
   127.0.0.1 aiceviri-api.local
   ```

3. Start with Docker Compose:

```bash
docker-compose up -d
```

Your API will now be available at `https://aiceviri-api.local/api/translate`. Caddy will automatically create its own SSL certificate (tls internal) for local development. If your browser shows a security warning, you can proceed from the advanced tab.
