// 3. ve 4. SINIF - Kapsamlı Müfredat
// MEB Özel Eğitim Programına Uygun

import { Subject, GradeLevel, DifficultyLevel, QuestionType, GameType } from '@prisma/client';

// ==================== 3. SINIF ====================
export const grade3Lessons = [
  // ==================== MATEMATİK 3 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_3,
    title: 'Bölme İşlemi',
    description: 'Bölme işleminin temellerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Bölme Nedir?',
        content: `# Bölme İşlemi ➗

## Bölme = Eşit Paylaştırma

6 elmayı 2 kişiye eşit bölelim:

🍎🍎🍎🍎🍎🍎 ÷ 2 kişi

Kişi 1: 🍎🍎🍎
Kişi 2: 🍎🍎🍎

Her kişi 3 elma alır!
**6 ÷ 2 = 3**

## ÷ İşareti

"÷" = bölü işareti
"bölü" diye okuruz.

12 ÷ 3 = "12 bölü 3"

## Çarpma ile İlişkisi

Bölme, çarpmanın tersidir!

3 × 4 = 12
12 ÷ 4 = 3
12 ÷ 3 = 4

## Örnekler

10 ÷ 2 = 5
8 ÷ 4 = 2
15 ÷ 3 = 5`,
        order: 1,
        images: ['division.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_3,
    title: 'Kesirler',
    description: 'Kesirleri tanıyalım ve kullanalım',
    order: 2,
    topics: [
      {
        title: 'Kesir Nedir?',
        content: `# Kesirler 🍕

## Kesir = Parça

Bir pizza 4 parçaya bölündü.
Sen 1 parça yedin.

**1/4** yedin!

1 → Pay (yediğin)
─
4 → Payda (toplam parça)

## Kesir Okuma

1/2 = "ikide bir" = YARIM
1/4 = "dörtte bir" = ÇEYREK
2/4 = "dörtte iki" = YARIM
3/4 = "dörtte üç"

## Görsel

🟨⬜ = 1/2 (yarısı dolu)
🟨⬜⬜⬜ = 1/4 (çeyreği dolu)
🟨🟨⬜⬜ = 2/4 = 1/2 (yarısı dolu)
🟨🟨🟨⬜ = 3/4

## Hayatta Kesirler

- Elmanın yarısı = 1/2
- Pizzanın çeyreği = 1/4
- Saatin yarısı = 30 dakika`,
        order: 1,
        images: ['fractions.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_3,
    title: 'Çarpım Tablosu',
    description: 'Çarpım tablosunu öğrenelim',
    order: 3,
    topics: [
      {
        title: '3, 4, 5 ile Çarpma',
        content: `# Çarpım Tablosu 📊

## 3 ile Çarpma

3 × 1 = 3
3 × 2 = 6
3 × 3 = 9
3 × 4 = 12
3 × 5 = 15
3 × 10 = 30

## 4 ile Çarpma

4 × 1 = 4
4 × 2 = 8
4 × 3 = 12
4 × 4 = 16
4 × 5 = 20
4 × 10 = 40

## 5 ile Çarpma

5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 10 = 50

**Kolay Yol:** 5 ile çarpınca
sonu hep 0 veya 5!

## 10 ile Çarpma

Sayının sonuna 0 ekle!
7 × 10 = 70
12 × 10 = 120`,
        order: 1,
        images: ['times-table.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 3 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_3,
    title: 'Okuma ve Anlama',
    description: 'Metinleri okuyup anlayalım',
    order: 1,
    topics: [
      {
        title: 'Paragraf Okuma',
        content: `# Paragraf Okuma 📖

## Paragraf Nedir?

Bir konu hakkında yazılmış
birkaç cümle = PARAGRAF

## Örnek Paragraf

"Bahar geldi. Hava ısındı.
Çiçekler açtı. Kuşlar
şarkı söylüyor. Çocuklar
dışarıda oynuyor."

## Anlama Soruları

1. Hangi mevsim geldi? → Bahar
2. Hava nasıl? → Isındı
3. Çiçekler ne yaptı? → Açtı
4. Çocuklar nerede? → Dışarıda

## Okuma Adımları

1️⃣ Başlığı oku
2️⃣ Yavaş yavaş oku
3️⃣ Anlamadığını işaretle
4️⃣ Tekrar oku
5️⃣ Sorulara cevap ver`,
        order: 1,
        images: ['reading.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_3,
    title: 'Yazma Becerileri',
    description: 'Düzgün ve anlamlı yazmayı öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Kompozisyon Yazma',
        content: `# Yazma 📝

## Kompozisyon Bölümleri

**1. GİRİŞ**
Konuyu tanıt.
"Bugün size tatilimi anlatacağım."

**2. GELİŞME**
Detayları yaz.
Ne yaptın? Nereye gittin?
Kiminle gittin? Neler gördün?

**3. SONUÇ**
Bitir.
"Çok güzel bir tatildi."

## Yazım Kuralları

✅ Büyük harfle başla
✅ Nokta ile bitir
✅ Düzgün yaz
✅ Boşluk bırak

## Örnek Konu

"Ailem"
- Giriş: Ailem 4 kişi.
- Gelişme: Annem, babam, kardeşim var...
- Sonuç: Ailemi çok seviyorum.`,
        order: 1,
        images: ['writing.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 3 ====================
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_3,
    title: 'Canlılar Dünyası',
    description: 'Canlı ve cansız varlıkları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Canlı ve Cansız',
        content: `# Canlı ve Cansız 🌱🪨

## Canlıların Özellikleri

✅ Beslenirler 🍽️
✅ Büyürler 📈
✅ Hareket ederler 🏃
✅ Nefes alırlar 💨
✅ Ürerler (çoğalırlar) 🐣

## Canlı Örnekleri

🌸 Çiçek
🌳 Ağaç
🐕 Köpek
🐈 Kedi
🦋 Kelebek
👦 İnsan

## Cansız Örnekleri

🪨 Taş
💧 Su
🪑 Sandalye
📱 Telefon
🚗 Araba

## Cansızlar:

❌ Beslenmezler
❌ Büyümezler
❌ Hareket edemezler
❌ Nefes almazlar
❌ Üremezler`,
        order: 1,
        images: ['living-nonliving.png'],
      },
      {
        title: 'Bitkiler',
        content: `# Bitkiler 🌱

## Bitki Bölümleri

**1. KÖK** 🌿
- Toprakta
- Su alır
- Bitkiyi tutar

**2. GÖVDE** 🪵
- Ortada
- Suyu taşır
- Yaprak taşır

**3. YAPRAK** 🍃
- Yeşil
- Güneş ışığı alır
- Fotosentez yapar

**4. ÇİÇEK** 🌸
- Renkli
- Güzel kokar
- Tohum yapar

**5. MEYVE** 🍎
- İçinde tohum var

## Fotosentez

Güneş ☀️ + Su 💧 + Hava 💨
= Besin 🌿

Bitkiler kendi besinini yapar!`,
        order: 2,
        images: ['plants.png'],
      },
      {
        title: 'Hayvanlar',
        content: `# Hayvanlar 🐾

## Hayvan Grupları

### 🐕 MEMELİLER
- Tüyleri var
- Yavrularını sütle besler
- Kedi, köpek, at, inek

### 🐦 KUŞLAR
- Tüyleri ve kanatları var
- Yumurtlarlar
- Serçe, kartal, tavuk

### 🐟 BALIKLAR
- Suda yaşar
- Yüzgeçleri var
- Solungaçla nefes alır

### 🦎 SÜRÜNGENLER
- Pulları var
- Soğuk kanlı
- Yılan, kaplumbağa, timsah

### 🐸 KURBAĞAGILLER
- Hem suda hem karada
- Nemli deri
- Kurbağa, semender

### 🐛 BÖCEKLER
- 6 bacak
- 3 bölüm vücut
- Karınca, arı, kelebek`,
        order: 3,
        images: ['animals.png'],
      },
    ],
  },
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_3,
    title: 'Duyu Organları',
    description: '5 duyu organımızı tanıyalım',
    order: 2,
    topics: [
      {
        title: 'Beş Duyumuz',
        content: `# Duyu Organları 👁️👂👃👅🖐️

## 5 DUYU

### 👁️ GÖRME - GÖZ
Ne yapar: Görürüz
Gördüklerimiz: Renk, şekil, hareket

### 👂 İŞİTME - KULAK
Ne yapar: Duyarız
Duyduklarımız: Ses, müzik, konuşma

### 👃 KOKLAMA - BURUN
Ne yapar: Koklarız
Kokladıklarımız: Çiçek, yemek kokusu

### 👅 TATMA - DİL
Ne yapar: Tadarız
Tatlar: Tatlı, ekşi, acı, tuzlu

### 🖐️ DOKUNMA - DERİ
Ne yapar: Hissederiz
Hissettiklerimiz: Sıcak, soğuk, sert, yumuşak

## Koruyalım!

👀 Güçlü ışığa bakma
👂 Çok yüksek ses dinleme
Duyu organlarımız değerli!`,
        order: 1,
        images: ['senses.png'],
      },
    ],
  },
  // ==================== SOSYAL BİLGİLER 3 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_3,
    title: 'Türkiye',
    description: 'Ülkemizi tanıyalım',
    order: 1,
    topics: [
      {
        title: 'Ülkemiz Türkiye',
        content: `# Türkiye 🇹🇷

## Türkiye Nerede?

🌍 Avrupa ve Asya kıtaları arasında
🌊 3 tarafı denizlerle çevrili:
- Karadeniz (kuzey)
- Ege Denizi (batı)
- Akdeniz (güney)

## Başkent

🏛️ **ANKARA**
Türkiye'nin başkenti

En büyük şehir: İstanbul

## Bayrağımız 🇹🇷

- Kırmızı zemin
- Beyaz ay ve yıldız
- Al bayrak diye de bilinir

## Atatürk 🎖️

Mustafa Kemal ATATÜRK
- Cumhuriyetimizin kurucusu
- Türkiye Cumhuriyeti'ni kurdu (1923)
- "Yurtta sulh, cihanda sulh"

## Bayramlarımız

🎈 23 Nisan - Çocuk Bayramı
🎖️ 19 Mayıs - Gençlik Bayramı
🇹🇷 29 Ekim - Cumhuriyet Bayramı`,
        order: 1,
        images: ['turkey.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 3 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_3,
    title: 'Para ve Bütçe',
    description: 'Parayı tanıyıp kullanmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Türk Lirası',
        content: `# Para 💰

## Türk Lirası (TL)

### Madeni Paralar 🪙
- 1 Kuruş
- 5 Kuruş
- 10 Kuruş
- 25 Kuruş
- 50 Kuruş
- 1 Lira

### Kağıt Paralar 💵
- 5 TL
- 10 TL
- 20 TL
- 50 TL
- 100 TL
- 200 TL

## Para Hesaplama

100 kuruş = 1 TL

5 TL + 5 TL = 10 TL
10 TL + 10 TL = 20 TL

## Alışveriş

Bir şey almak için para öderiz.
Para yetmezse alamayız.

## Birikim 🐷

Kumbarada para biriktir!
Hedef koy ve sabırlı ol!`,
        order: 1,
        images: ['money.png'],
      },
    ],
  },
];

// ==================== 4. SINIF ====================
export const grade4Lessons = [
  // ==================== MATEMATİK 4 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_4,
    title: 'Büyük Sayılar',
    description: 'Binlik ve daha büyük sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Binlik Sayılar',
        content: `# Büyük Sayılar 🔢

## Basamaklar

Birler → Onlar → Yüzler → **Binler**

## 1.234 Sayısını İnceleyelim

1️⃣.2️⃣3️⃣4️⃣

1 = Binler (1.000)
2 = Yüzler (200)
3 = Onlar (30)
4 = Birler (4)

1.234 = 1.000 + 200 + 30 + 4

## Büyük Sayıları Okuma

1.000 = bin
2.500 = iki bin beş yüz
3.456 = üç bin dört yüz elli altı
10.000 = on bin

## Örnekler

5.678 = Beş bin altı yüz yetmiş sekiz
9.999 = Dokuz bin dokuz yüz doksan dokuz
10.000 = On bin`,
        order: 1,
        images: ['thousands.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_4,
    title: 'Çarpma ve Bölme',
    description: 'Çok basamaklı çarpma ve bölme',
    order: 2,
    topics: [
      {
        title: 'Çarpım Tablosu Tam',
        content: `# Çarpım Tablosu 📊

## 6, 7, 8, 9 ile Çarpma

### 6'nın Katları
6×1=6, 6×2=12, 6×3=18
6×4=24, 6×5=30, 6×6=36
6×7=42, 6×8=48, 6×9=54
6×10=60

### 7'nin Katları
7×1=7, 7×2=14, 7×3=21
7×4=28, 7×5=35, 7×6=42
7×7=49, 7×8=56, 7×9=63
7×10=70

### 8'in Katları
8×1=8, 8×2=16, 8×3=24
8×4=32, 8×5=40, 8×6=48
8×7=56, 8×8=64, 8×9=72
8×10=80

### 9'un Katları
9×1=9, 9×2=18, 9×3=27
9×4=36, 9×5=45, 9×6=54
9×7=63, 9×8=72, 9×9=81
9×10=90

## 9'un Sırrı!

9×2=18 → 1+8=9
9×3=27 → 2+7=9
Rakamları topla, hep 9!`,
        order: 1,
        images: ['times-table-full.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_4,
    title: 'Geometri',
    description: 'Çevre ve alan hesaplama',
    order: 3,
    topics: [
      {
        title: 'Çevre Hesaplama',
        content: `# Çevre 📐

## Çevre Nedir?

Çevre = Şeklin etrafının uzunluğu

## Kare Çevresi

Tüm kenarlar eşit!
Çevre = 4 × kenar

⬜ Kenar = 5 cm
Çevre = 4 × 5 = 20 cm

## Dikdörtgen Çevresi

2 uzun, 2 kısa kenar
Çevre = 2 × (uzun + kısa)

▬ Uzun = 6 cm, Kısa = 4 cm
Çevre = 2 × (6 + 4) = 2 × 10 = 20 cm

## Üçgen Çevresi

3 kenarı topla!
Çevre = kenar1 + kenar2 + kenar3

🔺 3 + 4 + 5 = 12 cm`,
        order: 1,
        images: ['perimeter.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 4 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_4,
    title: 'Metin Türleri',
    description: 'Farklı metin türlerini tanıyalım',
    order: 1,
    topics: [
      {
        title: 'Metin Çeşitleri',
        content: `# Metin Türleri 📚

## 1. HİKAYE

- Olayları anlatır
- Kahramanlar var
- Başlangıç, gelişme, sonuç
- Örnek: Masallar, öyküler

## 2. ŞİİR

- Mısralardan oluşur
- Kafiye var
- Ritimli
- Duygular anlatılır

## 3. HABER

- Gerçek olayları anlatır
- 5N1K: Ne, Nerede, Ne zaman,
  Nasıl, Neden, Kim
- Gazete, TV haberleri

## 4. MEKTUP

- Birine yazılır
- Selamlama ile başlar
- İmza ile biter
- E-posta da mektup sayılır

## 5. GÜNLÜK

- Kişisel yazı
- Tarih atılır
- Her gün yazılabilir`,
        order: 1,
        images: ['text-types.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 4 ====================
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

## 3 HAL VAR

### 🧊 KATI
- Şekli VAR (değişmez)
- Sert
- Örnek: Buz, taş, masa, kalem

### 💧 SIVI
- Şekli YOK (kaba göre değişir)
- Akar
- Örnek: Su, süt, meyve suyu

### 💨 GAZ
- Şekli YOK
- Her yere yayılır
- Görünmez
- Örnek: Hava, buhar, oksijen

## Hal Değişimi

🧊 Buz (katı)
  ↓ Isıtınca = ERİME
💧 Su (sıvı)
  ↓ Isıtınca = BUHARLAŞMA
💨 Buhar (gaz)

💨 Buhar (gaz)
  ↓ Soğutunca = YOĞUŞMA
💧 Su (sıvı)
  ↓ Soğutunca = DONMA
🧊 Buz (katı)`,
        order: 1,
        images: ['states-of-matter.png'],
      },
    ],
  },
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_4,
    title: 'Işık ve Ses',
    description: 'Işık ve sesin özelliklerini öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Işık',
        content: `# Işık 💡

## Işık Kaynakları

### Doğal Işık Kaynakları
☀️ Güneş (en büyük!)
⭐ Yıldızlar
🔥 Ateş

### Yapay Işık Kaynakları
💡 Ampul
🔦 El feneri
📱 Telefon ekranı

## Işığın Özellikleri

- Doğru çizgide yayılır
- Çok hızlıdır
- Saydam maddelerden geçer
  (cam, su)
- Opak maddelerden geçemez
  (tahta, duvar)

## Gölge

Işık opak bir cismi aydınlatınca
arkasında GÖLGE oluşur.

☀️ → 🧍 → 👤 (gölge)`,
        order: 1,
        images: ['light.png'],
      },
      {
        title: 'Ses',
        content: `# Ses 🔊

## Ses Nasıl Oluşur?

Titreşim = SES

Gitar telini çek → titreşir → ses!
Davula vur → titreşir → ses!

## Ses Özellikleri

### Yüksek Ses - Alçak Ses
🗣️ Bağırmak = Yüksek
🤫 Fısıldamak = Alçak

### İnce Ses - Kalın Ses
🐭 Fare sesi = İnce
🦁 Aslan sesi = Kalın

## Ses Yayılması

Ses havada yayılır.
Katı, sıvı ve gazda yayılır.
Boşlukta (uzayda) yayılmaz!

## Yankı

Ses engele çarpıp geri döner.
Dağda bağır → "Hey!" → "Hey!"`,
        order: 2,
        images: ['sound.png'],
      },
    ],
  },
  // ==================== SOSYAL BİLGİLER 4 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
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
- Okula gitme hakkın var
- Öğrenme hakkın var
- Ücretsiz eğitim

### 🏥 SAĞLIK HAKKI
- Hasta olunca tedavi
- Aşı olma
- Sağlıklı yaşama

### 🏠 BARINMA HAKKI
- Güvenli bir evde yaşama

### 🍽️ BESLENME HAKKI
- Yeterli yemek yeme
- Temiz su içme

### 🎮 OYUN HAKKI
- Oyun oynamak senin hakkın!
- Eğlenmek hakkın!

### 🗣️ KONUŞMA HAKKI
- Fikrini söyleyebilirsin
- Seni dinlemeliler

### 👨‍👩‍👧 AİLE HAKKI
- Aileyle yaşama
- Sevgi görme

## Unutma!

Sen değerlisin! ⭐
Hakların korunur! 🛡️`,
        order: 1,
        images: ['child-rights.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 4 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_4,
    title: 'Zaman Yönetimi',
    description: 'Zamanı etkili kullanmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Günlük Plan',
        content: `# Zaman Yönetimi ⏰

## Günün Bölümleri

🌅 **SABAH** (06:00 - 12:00)
- Uyanma, hazırlanma
- Okul

🌞 **ÖĞLE** (12:00 - 18:00)
- Öğle yemeği
- Okul veya ev
- Ödev

🌙 **AKŞAM** (18:00 - 22:00)
- Akşam yemeği
- Aile zamanı
- Dinlenme
- Uyku hazırlığı

## Öncelik Sırası

1️⃣ Önce ÖNEMLİ işler (ödev)
2️⃣ Sonra DİĞER işler
3️⃣ En son EĞLENCE

## Günlük Program Örneği

07:00 - Uyan, hazırlan
08:00 - Okul
15:00 - Eve gel, dinlen
16:00 - Ödev yap
17:00 - Oyun oyna
19:00 - Akşam yemeği
20:00 - Kitap oku
21:00 - Uyku

## Plan Yap!

📝 Her akşam yarını planla
✅ Yapınca işaretle
⭐ Kendini ödüllendir!`,
        order: 1,
        images: ['time-management.png'],
      },
    ],
  },
  // ==================== İNGİLİZCE 4 ====================
  {
    subject: Subject.ENGLISH,
    grade: GradeLevel.GRADE_4,
    title: 'Greetings',
    description: 'İngilizce selamlaşma',
    order: 1,
    topics: [
      {
        title: 'Hello and Goodbye',
        content: `# Greetings 👋

## Selamlaşma

**Hello!** = Merhaba!
**Hi!** = Selam!
**Good morning!** = Günaydın!
**Good afternoon!** = Tünaydın!
**Good evening!** = İyi akşamlar!

## Vedalaşma

**Goodbye!** = Hoşça kal!
**Bye!** = Güle güle!
**See you!** = Görüşürüz!
**Good night!** = İyi geceler!

## Tanışma

**What's your name?**
İsmin ne?

**My name is Ali.**
Benim adım Ali.

**Nice to meet you!**
Tanıştığıma memnun oldum!

## Nasılsın?

**How are you?**
Nasılsın?

**I'm fine, thank you!**
İyiyim, teşekkürler!`,
        order: 1,
        images: ['greetings.png'],
      },
    ],
  },
];

// ==================== 3. SINIF QUİZLER ====================
export const grade3Quizzes = [
  {
    title: 'Bölme Quiz',
    description: 'Bölme işlemini test et!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_3,
    xpReward: 30,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '6 ÷ 2 = ?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '12 ÷ 4 = ?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
    ],
  },
  {
    title: 'Canlı-Cansız Quiz',
    description: 'Canlı ve cansızları ayırt et!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_3,
    xpReward: 30,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangisi canlıdır?',
        options: ['Taş', 'Masa', 'Ağaç', 'Bardak'],
        answer: 'Ağaç',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Bitkiler canlıdır.',
        answer: true,
        points: 10,
      },
    ],
  },
];

// ==================== 4. SINIF QUİZLER ====================
export const grade4Quizzes = [
  {
    title: 'Maddenin Halleri Quiz',
    description: 'Katı, sıvı, gaz!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_4,
    xpReward: 35,
    coinReward: 25,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Buz hangi haldedir?',
        options: ['Katı', 'Sıvı', 'Gaz'],
        answer: 'Katı',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Su ısınınca ne olur?',
        options: ['Donar', 'Buharlaşır', 'Katılaşır'],
        answer: 'Buharlaşır',
        points: 10,
      },
    ],
  },
];

// ==================== OYUNLAR ====================
export const grade3Games = [
  {
    title: 'Kesir Eşleştirme',
    description: 'Kesirleri görsellerle eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_3,
    xpReward: 30,
    coinReward: 20,
    config: {
      pairs: [
        { left: '1/2', right: 'Yarım' },
        { left: '1/4', right: 'Çeyrek' },
        { left: '3/4', right: 'Dörtte üç' },
      ],
    },
  },
  {
    title: 'Canlı-Cansız Sınıflandırma',
    description: 'Doğru kutuya yerleştir!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_3,
    xpReward: 30,
    coinReward: 20,
    config: {
      zones: ['Canlı', 'Cansız'],
      items: [
        { text: '🌸 Çiçek', zone: 'Canlı' },
        { text: '🪨 Taş', zone: 'Cansız' },
        { text: '🐕 Köpek', zone: 'Canlı' },
        { text: '📱 Telefon', zone: 'Cansız' },
      ],
    },
  },
];

export const grade4Games = [
  {
    title: 'Madde Halleri Oyunu',
    description: 'Maddeleri hallerine göre sınıfla!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.HARD,
    grade: GradeLevel.GRADE_4,
    xpReward: 40,
    coinReward: 30,
    config: {
      zones: ['Katı', 'Sıvı', 'Gaz'],
      items: [
        { text: '🧊 Buz', zone: 'Katı' },
        { text: '💧 Su', zone: 'Sıvı' },
        { text: '💨 Hava', zone: 'Gaz' },
        { text: '🪨 Taş', zone: 'Katı' },
        { text: '🥛 Süt', zone: 'Sıvı' },
      ],
    },
  },
];
