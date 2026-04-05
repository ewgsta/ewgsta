---
title: Anime API
description: Weeb CLI projem için, Anime API.
featured: true
link: https://github.com/ewgsta/weeb-api
tech:
  - Hono
---
# Weeb API
Weeb CLI için geliştirilen anime API dokümantasyonu.

## API Dokümantasyonu

### Anime Listesi (GET /animes)
Tüm animeleri sayfalı olarak listeler.

**Parametreler:**
- `page`: Sayfa numarası (Varsayılan: 1)
- `limit`: Sayfa başına öğe sayısı (Varsayılan: 20)

**Yanıt (200 OK):**
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

### Anime Detayı (GET /animes/:slug)
Belirtilen animenin tam detaylarını getirir (bölümler, kategoriler, ilgili içerikler vb.).

**Parametreler:**
- `:slug`: Animedenin benzersiz slug değeri (ör: `ubel-blatt`)

**Yanıt (200 OK):**
```json
{
  "data": {
    "id": "6781edaad8b0745f144982ef",
    "name": "Ubel Blatt",
    "description": "Epik bir fantastik macera...",
    "categories": ["Aksiyon", "Macera"],
    "episodes": [
      {
        "episode_number": 1,
        "type": "TV",
        "sources": [
          { "label": "Birincil (CDN)", "watch_url": "/watch/eyJpZCI6IjY3ODFlZGM3ZDhiMDc0NWYxNDQ5ODJmOSIsInNyYyI6ImJhY2tibGF6ZSIsInRzIjoxNzQxNTM4NTQzMTIxfQ==" },
          { "label": "Ayna 1", "watch_url": "/watch/..." }
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

### Video Akışı (GET /watch/:token)

**Not:** Bu uç nokta doğrudan video verisi (binary) döndürür. Token’lar zaman damgası içerir ve geçicidir. HTML5 Video oynatıcı ile uyumludur (Range header desteği vardır).

---

### Arama (GET /search)
Hızlı isim tabanlı arama yapar.

**Parametreler:**
- `q`: Arama terimi (En az 2 karakter olmalı)

**Yanıt (200 OK):**
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

### Kategoriler ve Filtreleme

| Uç Nokta                        | Açıklama                                      |
|:--------------------------------|:----------------------------------------------|
| GET /categories                 | Tüm kategorileri ve ID’lerini listeler        |
| GET /categories/:id/animes      | Belirli bir kategori ID’sine ait animeleri listeler |

**Kategori ID Tablosu:**
1: Aksiyon, 2: Askeri, 3: Bilim Kurgu, 4: Büyü, 5: Doğaüstü, 6: Dram, 7: Ecchi, 8: Fantastik, 9: Gerilim, 10: Gizem...  
(Tam liste `/categories` uç noktasından alınabilir.)

---

## Hata Kodları

- **400 Bad Request**: Eksik veya geçersiz parametreler  
- **403 Forbidden**: IP yasaklanmış veya geçersiz token  
- **404 Not Found**: Kayıt bulunamadı  
- **429 Too Many Requests**: Rate limit aşıldı  
- **500 Internal Server Error**: Beklenmeyen sunucu hatası  
