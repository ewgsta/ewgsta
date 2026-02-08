---
title: Tsukuyomi
description: Çoklu platform destekli, self hosted müzik çalar.
featured: true
link: https://github.com/ewgsta/tsukuyomi
tech:
  - React
  - FastAPI
  - Expo
---
##  Özellikler

### Arayüz & Deneyim
*   **Modern Tasarım:** Buzlu cam efektleri, canlı renkler ve akıcı animasyonlar.
*   **Duyarlı (Responsive) Yapı:** Masaüstü ve mobil cihazlarda kusursuz görünüm.
*   **Mini & Tam Ekran Oynatıcı:** Şarkı kontrolünü her an elinizin altında tutun.

### Müzik Yönetimi
*   **Otomatik Tarama & İzleme:** Belirlediğiniz klasörlerdeki değişikleri anlık algılar (Watchdog entegrasyonu).
*   **Akıllı Meta Veri Okuma:** ID3 tagları, kapak resimleri ve FLAC/MP3 desteği.
*   **Gelişmiş Arama:** Sanatçı, albüm veya şarkı ismine göre anlık filtreleme.
*   **Favoriler & Çalma Listeleri:** Kendi listelerinizi oluşturun, favorilerinizi yönetin.

### Mobil (Expo) (Eh işte, biraz biraz yapıyorum şuan kullanılabilecek gibi değil.)
*   **Native Performans:** React Native ile geliştirilmiş akıcı mobil deneyim.
*   **Senkronizasyon:** Aynı ağ üzerindeki sunucuya bağlanarak kütüphanenize heryerden erişim.
*   **Arka Planda Çalma:** Uygulama kapalıyken bile müzik keyfi (iOS/Android).

### Teknik Özellikler
*   **Streaming:** Büyük dosyaları bile beklemeden oynatabilen range-request destekli streaming.
*   **Canlı Şarkı Sözleri:** `lrclib.net` entegrasyonu ile senkronize veya düz şarkı sözleri.
*   **Hot-Reload Database:** SQLite tabanlı hızlı veri yönetimi.

---

## Kurulum ve Çalıştırma

Proje Sunucu (Server) ve İstemci (Client) olmak üzere iki ana parçadan oluşur.

### Gereksinimler
*   Python 3.9+
*   Node.js 18+ & Bun (veya npm/yarn)

### 1. Sunucu (Backend) Kurulumu
Sunucu, müzik dosyalarını tarar ve API sağlar.

```bash
cd server

# Sanal ortam oluşturma (Önerilir)
python -m venv venv
# Windows için:
.\venv\Scripts\activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# Sunucuyu başlat (Varsayılan port: 8000)
python main.py
```

### 2. İstemci (Web/Desktop) Kurulumu
Modern web / tauri arayüzü.

```bash
cd client

# Bağımlılıkları yükle
bun install

# Geliştirme modunda başlat (Web)
bun run dev

# Masaüstü Uygulaması (Tauri) olarak başlat
bun run tauri dev
```

### 3. Mobil (Expo) Uygulama
Mobil cihazınızda çalıştırmak için.

```bash
cd client

# Android için başlat (veya sadece 'bun run mobile' ile QR okut)
bun run mobile -- --clear
```
_Not: Telefonunuzun ve bilgisayarınızın aynı Wi-Fi ağında olduğundan emin olun._

[Daha fazlası için github sayfasını ziyaret edin!](https://github.com/ewgsta/tsukuyomi)
