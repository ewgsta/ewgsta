---
title: Weeb CLI
description: Terminalinizden reklamsız, dikkat dağıtıcı unsur olmadan kolay ve
  hızlı şekilde anime izlemenizi sağlayan Python aracı.
link: https://github.com/ewgsta/weeb-cli
tech:
  - Python
---
## Özellikler

### Çoklu Kaynak Desteği
- **Türkçe**: Animecix, Turkanime, Anizle
- **İngilizce**: HiAnime, AllAnime

### Akıllı İzleme
- MPV entegrasyonu ile yüksek kaliteli HLS/MP4 yayınları
- Kaldığınız yerden devam etme (dakika bazında)
- İzleme geçmişi ve istatistikler
- Tamamlanan (✓) ve devam eden (●) bölüm işaretleri

### Güçlü İndirme Sistemi
- **Aria2** ile çoklu bağlantılı hızlı indirme
- **yt-dlp** ile karmaşık yayın desteği
- Kuyruk sistemi ve eşzamanlı indirme
- Yarım kalan indirmeleri devam ettirme
- Akıllı dosya isimlendirme (`Anime Adı - S1B1.mp4`)

### Yerel Kütüphane
- İndirilen animeleri otomatik tarama
- Harici disk desteği (USB, HDD)
- Çevrimdışı anime indexleme
- Tüm kaynaklarda arama

### Ek Özellikler
- SQLite veritabanı (hızlı ve güvenilir)
- İndirme tamamlandığında sistem bildirimi
- Discord RPC entegrasyonu (izlediğiniz anime Discord'da görünsün)
- Arama geçmişi
- Debug modu ve loglama
- Otomatik güncelleme kontrolü

---

## Kurulum

### PyPI (Evrensel)
```bash
pip install weeb-cli
```

### Arch Linux (AUR)
```bash
yay -S weeb-cli
```

### Portable
[Releases](https://github.com/ewgsta/weeb-cli/releases) sayfasından platformunuza uygun dosyayı indirin.

### Geliştirici Kurulumu
```bash
git clone https://github.com/ewgsta/weeb-cli.git
cd weeb-cli
pip install -e .
```

[Daha fazlası için Github sayfasını ziyaret edin!](https://github.com/ewgsta/weeb-cli)
