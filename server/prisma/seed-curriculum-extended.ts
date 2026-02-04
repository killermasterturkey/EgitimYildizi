// Extended Special Education Curriculum Content
// MEB Özel Eğitim Müfredatına Uygun Kapsamlı İçerik
// Tüm sınıf seviyeleri için eksiksiz müfredat

import { Subject, GradeLevel, DifficultyLevel, QuestionType, GameType } from '@prisma/client';

// ==================== OKUL ÖNCESİ (PRESCHOOL) ====================
export const preschoolLessons = [
  // Matematik - Sayı Öncesi Kavramlar
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Büyük - Küçük',
    description: 'Büyüklük kavramlarını öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Büyük ve Küçük Nedir?',
        content: `# Büyük ve Küçük 📏

## Büyük Ne Demek?

Büyük şeyler fazla yer kaplar.

🐘 Fil BÜYÜK
🏠 Ev BÜYÜK
🚌 Otobüs BÜYÜK

## Küçük Ne Demek?

Küçük şeyler az yer kaplar.

🐜 Karınca KÜÇÜK
🍓 Çilek KÜÇÜK
🔑 Anahtar KÜÇÜK

## Karşılaştıralım

🐘 > 🐁 (Fil fareden BÜYÜK)
🏀 > 🎾 (Basketbol topu tenis topundan BÜYÜK)

## Oyun Zamanı!

Odana bak:
- En BÜYÜK şey ne?
- En KÜÇÜK şey ne?`,
        order: 1,
        images: ['big-small.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Uzun - Kısa',
    description: 'Uzunluk kavramlarını öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Uzun ve Kısa',
        content: `# Uzun ve Kısa 📐

## Uzun Ne Demek?

📏 Cetvel UZUN
🐍 Yılan UZUN
🛤️ Tren rayları UZUN

## Kısa Ne Demek?

✏️ Kalem ucu KISA
🐛 Tırtıl KISA
🥄 Çay kaşığı KISA

## Karşılaştıralım

🦒 Zürafanın boynu UZUN
🐢 Kaplumbağanın boynu KISA

## Pratik

Ellerini uzat! ➡️
Ellerini kısalt! ⬅️

Ayağa kalk - UZUN oldun!
Çömel - KISA oldun!`,
        order: 1,
        images: ['long-short.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Çok - Az',
    description: 'Miktar kavramlarını öğrenelim',
    order: 4,
    topics: [
      {
        title: 'Çok ve Az',
        content: `# Çok ve Az 🔢

## Çok Ne Demek?

🍎🍎🍎🍎🍎 = ÇOK elma
⭐⭐⭐⭐⭐⭐ = ÇOK yıldız

## Az Ne Demek?

🍎 = AZ elma
⭐⭐ = AZ yıldız

## Karşılaştıralım

🍪🍪🍪🍪🍪 ve 🍪🍪

Hangisi ÇOK? Sol taraf!
Hangisi AZ? Sağ taraf!

## Oyun

Anne/baba ile oyna:
- "Masada kaç bardak var?"
- "ÇOK mu AZ mı?"`,
        order: 1,
        images: ['many-few.png'],
      },
    ],
  },
  // Türkçe - Okul Öncesi
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Sesler ve Ritim',
    description: 'Sesleri tanıyalım ve ritim tutalım',
    order: 1,
    topics: [
      {
        title: 'Hayvan Sesleri',
        content: `# Hayvan Sesleri 🐾

## Hayvanlar Ne Der?

🐕 Köpek: HAV HAV!
🐈 Kedi: MİYAV!
🐄 İnek: MÖÖ!
🐓 Horoz: Ü-Ü-RÜÜÜ!
🐑 Koyun: MEE!
🦆 Ördek: VAK VAK!

## Tahmin Oyunu

Gözlerini kapat!
Anne/baba hayvan sesi çıkarsın.
Hangi hayvan?

## Tekrarla

Köpek gibi havla: HAV HAV!
Kedi gibi miyavla: MİYAV!

## Şarkı

🎵 Çiftlikte sabah oldu
Horoz öttü: Ü-ü-rüüü!
İnek uyandı: Möööö!
Köpek havladı: Hav hav! 🎵`,
        order: 1,
        images: ['animal-sounds.png'],
      },
      {
        title: 'Ritim Tutalım',
        content: `# Ritim Tutalım 🥁

## Ritim Nedir?

Ritim = Düzenli ses tekrarı

## El Çırpma Ritmi

👏 ... 👏 ... 👏 ...
Yavaş yavaş çırp!

👏👏 ... 👏👏 ... 👏👏
İkişer çırp!

## Ayak Vurma

🦶 Sol ayak vur
🦶 Sağ ayak vur
🦶🦶 Sol-Sağ, Sol-Sağ!

## Müzikle Ritim

Sevdiğin şarkıyı aç!
Müzikle birlikte:
- El çırp 👏
- Ayak vur 🦶
- Kafa salla 🙂`,
        order: 2,
        images: ['rhythm.png'],
      },
    ],
  },
  // Yaşam Becerileri - Okul Öncesi
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Kendimi Tanıyorum',
    description: 'Vücut bölümlerimi öğreniyorum',
    order: 1,
    topics: [
      {
        title: 'Vücut Bölümlerim',
        content: `# Vücut Bölümlerim 🧍

## Başım

👤 BAŞ - En üstte
👁️ GÖZ - Görürüz (2 tane)
👂 KULAK - Duyarız (2 tane)
👃 BURUN - Koklarız
👄 AĞIZ - Yeriz, konuşuruz

## Gövdem

🫁 GÖĞÜS - Kalbimiz burada
🫃 KARIN - Midemiz burada
⬅️➡️ KOL - 2 tane
🖐️ EL - 2 tane, 10 parmak

## Bacaklarım

🦵 BACAK - 2 tane
🦶 AYAK - 2 tane

## Şarkı ile Öğren

🎵 Başım, omuzlarım
Dizlerim, ayaklarım
Gözlerim, kulaklarım
Ağzım ve burnum! 🎵`,
        order: 1,
        images: ['body-parts.png'],
      },
    ],
  },
];

// ==================== 1. SINIF DERS İÇERİKLERİ ====================
export const grade1Lessons = [
  // Matematik - Eksik Konular
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: 'Çıkarma İşlemi',
    description: 'Basit çıkarma işlemlerini öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Çıkarma Nedir?',
        content: `# Çıkarma İşlemi ➖

## Çıkarma Ne Demek?

Çıkarma = Azaltma, eksiltme

## Örnek

🍎🍎🍎🍎🍎 - 5 elma var
🍎🍎 yedim
🍎🍎🍎 kaldı

**5 - 2 = 3**

## "-" İşareti

"-" işareti çıkarma işareti.
"Eksi" diye okuruz.

## Parmaklarla Çıkarma

5 - 2 = ?
1. 5 parmak kaldır 🖐️
2. 2 parmak indir ✌️
3. Kaç kaldı? 3! 🤟

## Pratik

4 - 1 = ?
3 - 2 = ?
5 - 3 = ?`,
        order: 1,
        images: ['subtraction-intro.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: 'Geometrik Şekiller',
    description: 'Temel geometrik şekilleri tanıyalım',
    order: 4,
    topics: [
      {
        title: 'Şekilleri Tanıyalım',
        content: `# Geometrik Şekiller 🔷

## Daire ⭕

- Yuvarlak
- Köşesi yok
- Örnekler: Top, saat, pizza

## Kare ⬜

- 4 kenarı var
- Tüm kenarlar EŞİT
- Örnekler: Pencere, kutu

## Üçgen 🔺

- 3 kenarı var
- 3 köşesi var
- Örnekler: Çatı, karpuz dilimi

## Dikdörtgen ▬

- 4 kenarı var
- 2 uzun, 2 kısa kenar
- Örnekler: Kapı, kitap

## Şekil Avı

Sınıfında bul:
- 1 daire
- 1 kare
- 1 üçgen`,
        order: 1,
        images: ['shapes-intro.png'],
      },
    ],
  },
  // Hayat Bilgisi - 1. Sınıf
  {
    subject: Subject.SOCIAL,
    grade: GradeLevel.GRADE_1,
    title: 'Okulumuz',
    description: 'Okulumuzu tanıyalım',
    order: 1,
    topics: [
      {
        title: 'Okula Hoş Geldin',
        content: `# Okulumuz 🏫

## Okul Nedir?

Okul = Öğrendiğimiz yer

## Okulda Kimler Var?

👨‍🏫 ÖĞRETMEN - Bize öğretir
👦👧 ÖĞRENCİLER - Biz!
👨‍💼 MÜDÜR - Okulu yönetir
🧹 HİZMETLİ - Okulu temiz tutar

## Okulda Nereler Var?

📚 SINIF - Ders işleriz
📖 KÜTÜPHANE - Kitap okuruız
🏃 BAHÇE - Oyun oynarız
🍽️ YEMEKHANE - Yemek yeriz

## Okul Kuralları

✅ Zamanında gel
✅ Öğretmeni dinle
✅ Arkadaşlarına iyi davran
✅ Eşyalarına sahip çık`,
        order: 1,
        images: ['school.png'],
      },
    ],
  },
  {
    subject: Subject.SOCIAL,
    grade: GradeLevel.GRADE_1,
    title: 'Ailem',
    description: 'Ailemi tanıyorum ve seviyorum',
    order: 2,
    topics: [
      {
        title: 'Aile Üyeleri',
        content: `# Ailem 👨‍👩‍👧‍👦

## Aile Nedir?

Aile = Bizi seven, koruyan insanlar

## Aile Üyeleri

👩 ANNE - Bizi doğurur, sever
👨 BABA - Bizi korur, sever
👧 KARDEŞ - Birlikte oynarız
👴 DEDE - Babanın babası
👵 NİNE/ANNEANNE - Hikaye anlatır

## Ailemde Neler Yaparız?

🍽️ Birlikte yemek yeriz
📺 Birlikte TV izleriz
🎮 Birlikte oyun oynarız
🤗 Birbirimizi severiz

## Aile Kuralları

❤️ Birbirimize saygı
🗣️ Nazik konuşuruz
🤝 Yardımlaşırız
🧹 İşleri paylaşırız`,
        order: 1,
        images: ['family.png'],
      },
    ],
  },
];

// ==================== 2. SINIF DERS İÇERİKLERİ ====================
export const grade2Lessons = [
  // Matematik
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_2,
    title: 'Toplama ve Çıkarma',
    description: 'İki basamaklı sayılarla işlemler',
    order: 2,
    topics: [
      {
        title: 'Onluk ve Birlik',
        content: `# Onluk ve Birlik 🔢

## Basamak Nedir?

Sayılarda rakamların yeri önemli!

## 23 Sayısı

2️⃣3️⃣
↑  ↑
|  Birler (3 tane bir)
Onlar (2 tane on)

23 = 20 + 3
23 = 🔵🔵 + 🟢🟢🟢
(2 onluk) + (3 birlik)

## Örnek: 45

4️⃣5️⃣
4 onluk = 40
5 birlik = 5
45 = 40 + 5

## Pratik

56 = ? onluk + ? birlik
78 = ? onluk + ? birlik
34 = ? onluk + ? birlik`,
        order: 1,
        images: ['place-value.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_2,
    title: 'Saat Okuma',
    description: 'Saatleri okumayı öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Tam Saatler',
        content: `# Saat Okuma ⏰

## Saatin Bölümleri

- KISA İBRE = Saat gösterir
- UZUN İBRE = Dakika gösterir

## Tam Saatler

Uzun ibre 12'de ise = TAM SAAT

🕐 Saat 1
🕑 Saat 2
🕒 Saat 3
🕓 Saat 4
🕔 Saat 5
🕕 Saat 6

## Nasıl Okuruz?

1. Kısa ibreye bak
2. Hangi sayıda?
3. "Saat ..." de!

## Günlük Saatler

⏰ 7:00 - Uyanma zamanı
⏰ 8:00 - Okul başlıyor
⏰ 12:00 - Öğle yemeği
⏰ 21:00 - Uyku zamanı`,
        order: 1,
        images: ['clock.png'],
      },
    ],
  },
  // Türkçe - 2. Sınıf
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_2,
    title: 'Cümle Kurma',
    description: 'Basit cümleler kuralım',
    order: 1,
    topics: [
      {
        title: 'Cümle Nedir?',
        content: `# Cümle Kurma 📝

## Cümle Nedir?

Cümle = Anlamlı söz dizisi

## Cümle Yapısı

**Kim? + Ne yapıyor?**

👦 Ali + okula gidiyor.
🐈 Kedi + süt içiyor.
👧 Ayşe + top oynuyor.

## Örnekler

✅ Kuş uçuyor.
✅ Anne yemek yapıyor.
✅ Çocuklar oynuyor.

## Cümle Sonunda

. (nokta) = Normal cümle
? (soru işareti) = Soru
! (ünlem) = Şaşırma

Ali okula gidiyor.
Ali okula gidiyor mu?
Ali okula gidiyor!`,
        order: 1,
        images: ['sentences.png'],
      },
    ],
  },
  // Hayat Bilgisi - 2. Sınıf
  {
    subject: Subject.SOCIAL,
    grade: GradeLevel.GRADE_2,
    title: 'Yılın Mevsimleri',
    description: 'Dört mevsimi öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Mevsimler',
        content: `# Mevsimler 🌸🌞🍂❄️

## 4 Mevsim Var

### 🌸 İLKBAHAR
- Çiçekler açar
- Kuşlar gelir
- Hava ılır
- Aylar: Mart, Nisan, Mayıs

### ☀️ YAZ
- Hava sıcak
- Tatil zamanı
- Denize gireriz
- Aylar: Haziran, Temmuz, Ağustos

### 🍂 SONBAHAR
- Yapraklar döker
- Hava serin
- Okul başlar
- Aylar: Eylül, Ekim, Kasım

### ❄️ KIŞ
- Kar yağar
- Hava soğuk
- Kalın giyiniriz
- Aylar: Aralık, Ocak, Şubat

## Hangi Mevsimdeyiz?

Bugün dışarıya bak!
Hangi mevsim?`,
        order: 1,
        images: ['seasons.png'],
      },
    ],
  },
];

// ==================== 3. SINIF DERS İÇERİKLERİ ====================
export const grade3Lessons = [
  // Matematik
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_3,
    title: 'Kesirler',
    description: 'Kesirleri tanıyalım',
    order: 2,
    topics: [
      {
        title: 'Kesir Nedir?',
        content: `# Kesirler 🍕

## Kesir Ne Demek?

Kesir = Parça

## Pizza Örneği 🍕

Bir pizza 4 parçaya bölündü.
Sen 1 parça yedin.

1/4 yedin!
↑ ↑
| Toplam parça (4)
Yediğin parça (1)

## Kesir Okuma

1/2 = "İkide bir" = Yarım
1/4 = "Dörtte bir" = Çeyrek
3/4 = "Dörtte üç"

## Görsel

🟨⬜ = 1/2 (yarısı sarı)
🟨⬜⬜⬜ = 1/4 (çeyreği sarı)
🟨🟨🟨⬜ = 3/4 (dörtte üçü sarı)

## Hayatta Kesirler

- Elmanın yarısı = 1/2
- Pastanın çeyreği = 1/4
- Saatin yarısı = 30 dakika`,
        order: 1,
        images: ['fractions.png'],
      },
    ],
  },
  // Fen Bilimleri - 3. Sınıf Ek Konular
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_3,
    title: 'Duyu Organlarımız',
    description: '5 duyu organımızı tanıyalım',
    order: 2,
    topics: [
      {
        title: 'Beş Duyumuz',
        content: `# Duyu Organlarımız 👁️👂👃👅🖐️

## 5 Duyumuz Var

### 👁️ GÖRME - Gözlerimiz
Ne yapar: Görürüz
Örnek: Renkler, şekiller

### 👂 İŞİTME - Kulaklarımız
Ne yapar: Duyarız
Örnek: Müzik, konuşma

### 👃 KOKLAMA - Burnumuz
Ne yapar: Koklarız
Örnek: Çiçek kokusu, yemek kokusu

### 👅 TATMA - Dilimiz
Ne yapar: Tadarız
Tatlar: Tatlı, ekşi, acı, tuzlu

### 🖐️ DOKUNMA - Derimiz
Ne yapar: Hissederiz
Örnek: Sıcak, soğuk, sert, yumuşak

## Deney Zamanı!

Gözlerini kapat.
Bir şey kokla.
Ne olduğunu tahmin et!`,
        order: 1,
        images: ['senses.png'],
      },
    ],
  },
  // Sosyal Bilgiler - 3. Sınıf
  {
    subject: Subject.SOCIAL,
    grade: GradeLevel.GRADE_3,
    title: 'Ülkemiz Türkiye',
    description: 'Türkiye\'yi tanıyalım',
    order: 1,
    topics: [
      {
        title: 'Türkiye',
        content: `# Ülkemiz Türkiye 🇹🇷

## Türkiye Nerede?

🌍 Avrupa ve Asya arasında
🌊 3 tarafı denizlerle çevrili

## Başkentimiz

🏛️ ANKARA
Türkiye'nin başkenti

## Bayrağımız 🇹🇷

- Kırmızı zemin
- Beyaz ay ve yıldız
- Çok değerli, saygı gösteririz

## Atatürk 🎖️

Mustafa Kemal ATATÜRK
- Cumhuriyetimizin kurucusu
- "Yurtta sulh, cihanda sulh"
- Çocukları çok severdi

## 23 Nisan

🎈 Çocuk Bayramı
🎉 Tüm dünya çocuklarının bayramı
🇹🇷 Atatürk çocuklara armağan etti`,
        order: 1,
        images: ['turkey.png'],
      },
    ],
  },
];

// ==================== 4. SINIF DERS İÇERİKLERİ ====================
export const grade4Lessons = [
  // Matematik - 4. Sınıf
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_4,
    title: 'Doğal Sayılar',
    description: 'Büyük sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Binlik ve Yüzlük',
        content: `# Büyük Sayılar 🔢

## Basamaklar

Birler → Onlar → Yüzler → Binler

## 1234 Sayısı

1️⃣2️⃣3️⃣4️⃣
↑ ↑ ↑ ↑
|  |  |  Birler (4)
|  |  Onlar (3) = 30
|  Yüzler (2) = 200
Binler (1) = 1000

1234 = 1000 + 200 + 30 + 4

## Büyük Sayıları Okuma

1.000 = BİN
2.500 = İki bin beş yüz
3.456 = Üç bin dört yüz elli altı

## Pratik

5.678 nasıl okunur?
Beş bin altı yüz yetmiş sekiz ✅`,
        order: 1,
        images: ['large-numbers.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_4,
    title: 'Çarpma İşlemi',
    description: 'İki basamaklı çarpma',
    order: 2,
    topics: [
      {
        title: 'Çarpma Tablosu',
        content: `# Çarpma Tablosu 📊

## Çarpım Tablosu Önemi

Çarpım tablosunu ezberle!
Matematik kolaylaşır.

## 5 ile Çarpma

5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 6 = 30

## Kolay Yol

5 ile çarpınca:
Sonuç 0 veya 5 ile biter!

## 10 ile Çarpma

10 × 3 = 30
10 × 5 = 50
10 × 7 = 70

Kolay! Sona 0 ekle!

## Pratik

6 × 7 = ?
8 × 4 = ?
9 × 3 = ?`,
        order: 1,
        images: ['multiplication-table.png'],
      },
    ],
  },
  // Türkçe - 4. Sınıf
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_4,
    title: 'Paragraf Okuma',
    description: 'Paragrafları anlayarak okuyalım',
    order: 1,
    topics: [
      {
        title: 'Paragraf Nedir?',
        content: `# Paragraf Okuma 📖

## Paragraf Nedir?

Paragraf = Bir konu hakkında cümleler

## Örnek Paragraf

"Ali her sabah erken kalkar. Önce
dişlerini fırçalar. Sonra kahvaltısını
yapar. Okula zamanında gider."

## Paragrafı Anlamak

1. Yavaş oku
2. Anlamadığın kelimeyi sor
3. Kim? Ne yapıyor? diye düşün

## Sorular

- Kim erken kalkar? → Ali
- Ali ne yapar? → Dişlerini fırçalar
- Nereye gider? → Okula

## Pratik

Bir paragraf oku.
3 soru sor kendine.
Cevapla!`,
        order: 1,
        images: ['paragraph.png'],
      },
    ],
  },
  // Fen Bilimleri - 4. Sınıf
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_4,
    title: 'Maddenin Halleri',
    description: 'Katı, sıvı ve gaz hallerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Üç Hal',
        content: `# Maddenin Halleri 🧊💧💨

## 3 Hal Var

### 🧊 KATI
- Şekli var
- Sert
- Örnek: Buz, taş, masa

### 💧 SIVI
- Şekli yok (kaba göre değişir)
- Akar
- Örnek: Su, süt, meyve suyu

### 💨 GAZ
- Şekli yok
- Her yere yayılır
- Görünmez
- Örnek: Hava, buhar

## Dönüşümler

🧊 Buz (katı)
  ↓ ısıtınca
💧 Su (sıvı)
  ↓ ısıtınca
💨 Buhar (gaz)

## Deney

Buzdolabından buz al.
Bekle ve izle!
Ne oluyor?`,
        order: 1,
        images: ['states-of-matter.png'],
      },
    ],
  },
  // Sosyal Bilgiler - 4. Sınıf
  {
    subject: Subject.SOCIAL,
    grade: GradeLevel.GRADE_4,
    title: 'Haklarımız',
    description: 'Çocuk haklarını öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Çocuk Hakları',
        content: `# Çocuk Hakları 👶

## Her Çocuğun Hakkı Var!

### 📚 EĞİTİM HAKKI
Okula gitme hakkın var!
Okumak, yazmak öğrenirsin.

### 🏥 SAĞLIK HAKKI
Hasta olunca doktora gidersin.
İlaç alırsın.

### 🏠 BARINMA HAKKI
Evde güvende yaşarsın.

### 🍽️ BESLENME HAKKI
Yeterli yemek yersin.
Su içersin.

### 🎮 OYUN HAKKI
Oyun oynamak hakkın!
Eğlenmek hakkın!

### 🗣️ KONUŞMA HAKKI
Fikrini söyleyebilirsin.
Seni dinlemeliler.

## Unutma!

Sen değerlisin! ⭐
Hakların korunur! 🛡️`,
        order: 1,
        images: ['child-rights.png'],
      },
    ],
  },
];

export const allLessons = [
  ...preschoolLessons,
  ...grade1Lessons,
  ...grade2Lessons,
  ...grade3Lessons,
  ...grade4Lessons,
];
