---
layout: blog
title: Weeb CLI için yenilikler
description: Üzerinde çalıştığım Weeb CLI projesinde uzun süredir açıp
  güncellemedim biraz yenilik ve iyileştirme vakti gelmişti.
date: 2026-02-09T17:23:56.385Z
---
Her aramada "ne zaman sonuç gelecek amk" diye beklemiyoruz. cache sistemi sayesinde biraz daha hızlı olacak artık.
Dosya isimlerindeki garip karakterler veya hatalı URL'ler artık sanitizer katmanı sayesinde sorun çıkarmayacak
Hata Yönetimi: Eskiden bir şey bozulunca "niye bozuldu bu?" diyorduk. Şimdi ise spesifik hata mesajlarımız var, sorun nerede anında anlıyoruz.
"Bende çalışıyor" dememek için. 22 tane test yazdım ve bunları GitHub Actionsa bağladım. Artık her güncellemede Windowsta, Linuxta ve Macte otomatik test ediliyor.
