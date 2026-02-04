// 1. ve 2. SINIF - Kapsamlı Müfredat
// MEB Özel Eğitim Programına Uygun

import { Subject, GradeLevel, DifficultyLevel, QuestionType, GameType } from '@prisma/client';

// ==================== 1. SINIF ====================
export const grade1Lessons = [
  // ==================== MATEMATİK 1 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: '1-10 Sayıları',
    description: '1den 10a kadar sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: '1-5 Sayıları',
        content: `# 1-5 Sayıları 🔢

## Sayıları Öğrenelim

**1️⃣ BİR**
👆 1 parmak
🍎 1 elma

**2️⃣ İKİ**
✌️ 2 parmak
👀 2 göz

**3️⃣ ÜÇ**
🤟 3 parmak
🚦 3 trafik ışığı rengi

**4️⃣ DÖRT**
🖖 4 parmak
🚗 4 tekerlek

**5️⃣ BEŞ**
🖐️ 5 parmak = 1 el

## Sayma Pratiği

Parmakların ile say:
1... 2... 3... 4... 5!

## Yazma Pratiği

Her sayıyı 5 kez yaz:
1 1 1 1 1
2 2 2 2 2
...`,
        order: 1,
        images: ['numbers-1-5.png'],
      },
      {
        title: '6-10 Sayıları',
        content: `# 6-10 Sayıları 🔢

## Devam Edelim

**6️⃣ ALTI**
🖐️👆 5+1 parmak
🎲🎲 Zarda 6

**7️⃣ YEDİ**
🖐️✌️ 5+2 parmak
🌈 7 gökkuşağı rengi

**8️⃣ SEKİZ**
🖐️🤟 5+3 parmak
🐙 Ahtapotun 8 kolu

**9️⃣ DOKUZ**
🖐️🖖 5+4 parmak

**🔟 ON**
🖐️🖐️ 2 el = 10 parmak

## Büyük Sayılar

10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2 > 1

## Şarkı

🎵 1, 2, 3, 4, 5
6, 7, 8, 9, 10
Sayıları öğrendim
Hepsini biliyorum! 🎵`,
        order: 2,
        images: ['numbers-6-10.png'],
      },
      {
        title: 'Sayı Sıralaması',
        content: `# Sayıları Sıralayalım 📊

## Küçükten Büyüğe

1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

En küçük: 1
En büyük: 10

## Büyükten Küçüğe

10 → 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2 → 1

## Karşılaştırma

5 ☐ 3 → 5 > 3 (5 büyük)
2 ☐ 7 → 2 < 7 (2 küçük)
4 ☐ 4 → 4 = 4 (eşit)

## Hatırla!

> "Büyüktür" (ağız büyük tarafa bakar)
< "Küçüktür"
= "Eşittir"

## Pratik

Boşluğu doldur:
3 ☐ 5
8 ☐ 2
6 ☐ 6`,
        order: 3,
        images: ['number-order.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: 'Toplama İşlemi',
    description: 'Basit toplama işlemlerini öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Toplama Nedir?',
        content: `# Toplama İşlemi ➕

## Toplama = Birleştirme

🍎 + 🍎 = 🍎🍎
1 + 1 = 2

## + İşareti

"+" = artı = toplama
Sayıları birleştirir.

## Örnekler

🌟🌟 + 🌟 = 🌟🌟🌟
2 + 1 = 3

🎈🎈🎈 + 🎈🎈 = 🎈🎈🎈🎈🎈
3 + 2 = 5

## Parmaklarla Toplama

2 + 3 = ?

Sol el: ✌️ (2 parmak)
Sağ el: 🤟 (3 parmak)
Toplam: 5 parmak!

2 + 3 = 5 ✅`,
        order: 1,
        images: ['addition-intro.png'],
      },
      {
        title: 'Toplama Pratiği',
        content: `# Toplama Pratiği ➕

## Kolay Toplamalar

1 + 1 = 2
1 + 2 = 3
2 + 2 = 4
2 + 3 = 5
3 + 3 = 6
4 + 4 = 8
5 + 5 = 10

## Sıra Önemli Değil!

2 + 3 = 5
3 + 2 = 5

İkisi de aynı!

## Problem Çözelim

Ali'nin 3 🍎 var.
Annesi 2 🍎 daha verdi.
Ali'nin kaç elması oldu?

3 + 2 = 5 🍎

## Pratik

4 + 2 = ?
1 + 5 = ?
3 + 4 = ?`,
        order: 2,
        images: ['addition-practice.png'],
      },
    ],
  },
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

## Çıkarma = Azaltma

🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎
5 - 2 = 3

## - İşareti

"-" = eksi = çıkarma
Sayıyı azaltır.

## Örnekler

⭐⭐⭐⭐ - ⭐ = ⭐⭐⭐
4 - 1 = 3

🎈🎈🎈🎈🎈 - 🎈🎈🎈 = 🎈🎈
5 - 3 = 2

## Parmaklarla Çıkarma

5 - 2 = ?

🖐️ 5 parmak kaldır
✌️ 2 parmak indir
🤟 3 parmak kaldı!

5 - 2 = 3 ✅`,
        order: 1,
        images: ['subtraction-intro.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: 'Geometrik Şekiller',
    description: 'Temel şekilleri ve özelliklerini öğrenelim',
    order: 4,
    topics: [
      {
        title: 'Şekil Özellikleri',
        content: `# Şekillerin Özellikleri 📐

## Kenar ve Köşe

KENAR = Şeklin çizgisi
KÖŞE = Kenarların birleştiği nokta

## ⭕ DAİRE
- Kenar: YOK
- Köşe: YOK
- Yuvarlak

## ⬜ KARE
- Kenar: 4 (hepsi eşit)
- Köşe: 4

## 🔺 ÜÇGEN
- Kenar: 3
- Köşe: 3

## ▬ DİKDÖRTGEN
- Kenar: 4 (2 uzun, 2 kısa)
- Köşe: 4

## Sayalım

🔺 + ⬜ = Kaç köşe?
3 + 4 = 7 köşe!`,
        order: 1,
        images: ['shape-properties.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 1 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_1,
    title: 'Sesli Harfler',
    description: 'Türkçenin 8 sesli harfini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Sesli Harfler',
        content: `# Sesli Harfler 🔤

## 8 Sesli Harf

**A a** - 🐝 Arı
**E e** - 🏠 Ev
**I ı** - 🌡️ Isı
**İ i** - 🧵 İğne
**O o** - 🎯 Ok
**Ö ö** - 🦆 Ördek
**U u** - ✈️ Uçak
**Ü ü** - 🍇 Üzüm

## Neden "Sesli"?

Tek başına söylenebilir!
"Aaaaa" de - ağzın açık!
"Eeeee" de - ağzın açık!

## Kalın ve İnce

KALIN: A, I, O, U
İNCE: E, İ, Ö, Ü

## Şarkı

🎵 A, E, I, İ
O, Ö, U, Ü
Sesli harfler bunlar
Ezberle hepsini! 🎵`,
        order: 1,
        images: ['vowels.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_1,
    title: 'Sessiz Harfler',
    description: 'Sessiz harfleri öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Sessiz Harfler',
        content: `# Sessiz Harfler 🔤

## 21 Sessiz Harf

B C Ç D F G Ğ H J K L M N P R S Ş T V Y Z

## Örneklerle

**B b** - 🎈 Balon
**C c** - 🦌 Ceylan
**D d** - 🏔️ Dağ
**K k** - 🐱 Kedi
**M m** - 🍌 Muz
**S s** - 💧 Su
**T t** - 🐇 Tavşan

## Neden "Sessiz"?

Tek başına söylenemez!
"B" değil "Be" deriz
"K" değil "Ke" deriz

## Hece Yapımı

Sessiz + Sesli = Hece

B + A = BA
K + E = KE
M + U = MU`,
        order: 1,
        images: ['consonants.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_1,
    title: 'Hece ve Kelime',
    description: 'Hece oluşturmayı ve kelime okumayı öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Hece Oluşturma',
        content: `# Hece Oluşturma 📖

## Hece Nedir?

Bir solukta çıkan ses = HECE

## Hece Türleri

**Açık Hece** (sesli ile biter)
BA - KA - NE - Sİ

**Kapalı Hece** (sessiz ile biter)
BAL - KAR - NEF - SİL

## Kelime Yapalım

BA + BA = BABA 👨
AN + NE = ANNE 👩
E + LMA = ELMA 🍎
KE + Dİ = KEDİ 🐱

## Hece Sayısı

EV = 1 hece
AN-NE = 2 hece
E-LMA = 2 hece
KA-LEM = 2 hece
TE-LE-FON = 3 hece

## Kural

Kelimede kaç sesli harf varsa
o kadar hece var!`,
        order: 1,
        images: ['syllables.png'],
      },
      {
        title: 'İlk Kelimelerim',
        content: `# İlk Kelimelerim 📚

## Aile Kelimeleri

**ANNE** 👩 - AN-NE
**BABA** 👨 - BA-BA
**DEDE** 👴 - DE-DE
**NİNE** 👵 - Nİ-NE
**ABLA** 👧 - AB-LA
**ABI** 👦 - A-Bİ

## Ev Kelimeleri

**EV** 🏠
**ODA** 🚪 - O-DA
**MASA** 🪑 - MA-SA
**KAPI** 🚪 - KA-PI

## Okul Kelimeleri

**OKUL** 🏫 - O-KUL
**SINIF** 📚 - SI-NIF
**KALEM** ✏️ - KA-LEM
**KİTAP** 📖 - Kİ-TAP

## Cümle Kuralım

Ben annemi seviyorum.
Bu benim kalemim.`,
        order: 2,
        images: ['first-words.png'],
      },
    ],
  },
  // ==================== HAYAT BİLGİSİ 1 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_1,
    title: 'Okulumuz',
    description: 'Okulumuzu ve okul kurallarını öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Okuldaki Kişiler',
        content: `# Okulumuz 🏫

## Okuldaki Kişiler

👨‍🏫 **ÖĞRETMEN**
- Bize ders anlatır
- Sorularımıza cevap verir
- Bizi korur

👧👦 **ÖĞRENCİLER**
- Biz öğrenciyiz!
- Ders dinleriz
- Öğreniriz

👨‍💼 **MÜDÜR**
- Okulu yönetir
- Tüm okulla ilgilenir

🧹 **HİZMETLİ**
- Okulu temiz tutar
- Bize yardım eder

## Okul Kuralları

✅ Zamanında gel
✅ Sessiz ol
✅ El kaldır
✅ Sırana otur
✅ Temiz tut`,
        order: 1,
        images: ['school.png'],
      },
    ],
  },
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_1,
    title: 'Ailem',
    description: 'Aile üyelerini ve aile içi ilişkileri öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Aile Üyeleri',
        content: `# Ailem 👨‍👩‍👧‍👦

## Çekirdek Aile

👩 **ANNE** - Bizi doğuran
👨 **BABA** - Bizi koruyan
👧👦 **KARDEŞ** - Birlikte büyüdüğümüz

## Geniş Aile

👴 **DEDE** - Babanın babası
👵 **NİNE** - Babanın annesi
👵 **ANNEANNE** - Annenin annesi
👴 **BABAANNE** - (Nineye de denir)

👨 **AMCA** - Babanın erkek kardeşi
👩 **HALA** - Babanın kız kardeşi
👨 **DAYI** - Annenin erkek kardeşi
👩 **TEYZE** - Annenin kız kardeşi

## Aile İçinde

❤️ Birbirimizi severiz
🤝 Yardımlaşırız
🍽️ Birlikte yeriz
🗣️ Nazik konuşuruz`,
        order: 1,
        images: ['family.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 1 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_1,
    title: 'Günlük Rutinler',
    description: 'Sabah ve akşam rutinlerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Sabah Rutini',
        content: `# Sabah Rutini ☀️

## Sırayla Yapalım

1️⃣ **UYAN** ⏰
- Alarm çalar
- Gözlerini aç

2️⃣ **YATAĞI TOPLA** 🛏️
- Yorganı düzelt
- Yastığı koy

3️⃣ **TUVALETE GİT** 🚽
- İhtiyacını gider
- Ellerini yıka

4️⃣ **YÜZÜNÜ YIKA** 🧼
- Sabunla yıka
- Kurula

5️⃣ **DİŞLERİNİ FIRÇALA** 🦷
- 2 dakika fırçala

6️⃣ **GİYİN** 👕
- Okul kıyafeti giy

7️⃣ **KAHVALTI YAP** 🍳
- Sağlıklı ye

8️⃣ **OKULA GİT** 🎒
- Çantanı al

## Aferin! 🌟`,
        order: 1,
        images: ['morning-routine.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_1,
    title: 'Trafik ve Güvenlik',
    description: 'Trafik kurallarını ve güvenliği öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Trafik Kuralları',
        content: `# Trafik Güvenliği 🚦

## Trafik Işıkları

🔴 **KIRMIZI** = DUR!
Kesinlikle geçme!

🟡 **SARI** = HAZIRLAN!
Dikkatli ol!

🟢 **YEŞİL** = GEÇ!
Sağa sola bak, sonra geç.

## Yaya Kuralları

✅ Kaldırımda yürü
✅ Yaya geçidini kullan
✅ Sağa-sola bak
✅ Yeşil ışıkta geç
✅ Koşma, yürü
✅ Büyüğünün elini tut

## Tehlikeler

❌ Yolda oynama
❌ Topun arkasından koşma
❌ Araçlara yaklaşma

## Acil Numaralar

📞 112 - Acil yardım
📞 155 - Polis
📞 110 - İtfaiye`,
        order: 1,
        images: ['traffic.png'],
      },
    ],
  },
];

// ==================== 2. SINIF ====================
export const grade2Lessons = [
  // ==================== MATEMATİK 2 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_2,
    title: '11-100 Sayıları',
    description: 'İki basamaklı sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Onluk ve Birlik',
        content: `# Onluk ve Birlik 🔢

## Basamak Değeri

Her rakamın bir yeri var!

**23** sayısını inceleyelim:
2️⃣3️⃣
↑  ↑
|  BİRLER basamağı (3)
ONLAR basamağı (2)

23 = 2 onluk + 3 birlik
23 = 20 + 3

## Görsel

🔵🔵 = 2 onluk = 20
🟢🟢🟢 = 3 birlik = 3
Toplam = 23

## Örnekler

45 = 4 onluk + 5 birlik = 40 + 5
67 = 6 onluk + 7 birlik = 60 + 7
89 = 8 onluk + 9 birlik = 80 + 9

## Pratik

56 = ? onluk + ? birlik
32 = ? onluk + ? birlik`,
        order: 1,
        images: ['place-value.png'],
      },
      {
        title: 'Onluk Sayılar',
        content: `# Onluk Sayılar 🔟

## 10'ar 10'ar Sayalım

10, 20, 30, 40, 50, 60, 70, 80, 90, 100

## İsimleri

10 = ON
20 = YİRMİ
30 = OTUZ
40 = KIRK
50 = ELLİ
60 = ALTMIŞ
70 = YETMİŞ
80 = SEKSEN
90 = DOKSAN
100 = YÜZ

## Sayı Okuma

23 = Yirmi üç
45 = Kırk beş
78 = Yetmiş sekiz
99 = Doksan dokuz

## 100 Özel!

100 = Yüz
100 = 10 tane 10
100 = 100 tane 1`,
        order: 2,
        images: ['tens.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_2,
    title: 'Çarpma İşlemine Giriş',
    description: 'Çarpma işleminin temellerini öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Çarpma Nedir?',
        content: `# Çarpma İşlemi ✖️

## Çarpma = Tekrarlı Toplama

2 + 2 + 2 = 6

Bunu daha kolay yazabiliriz:
**3 × 2 = 6**

"3 kere 2" veya "3 çarpı 2"

## Görsel

🍎🍎
🍎🍎
🍎🍎

3 sıra × 2 elma = 6 elma
3 × 2 = 6

## Örnekler

2 × 3 = 2 + 2 + 2 = 6
4 × 2 = 4 + 4 = 8
5 × 3 = 5 + 5 + 5 = 15

## × İşareti

"×" = çarpı işareti
Tekrarlı toplamayı gösterir.`,
        order: 1,
        images: ['multiplication-intro.png'],
      },
      {
        title: '2 ile Çarpma',
        content: `# 2 ile Çarpma 2️⃣

## 2'nin Katları

2 × 1 = 2
2 × 2 = 4
2 × 3 = 6
2 × 4 = 8
2 × 5 = 10
2 × 6 = 12
2 × 7 = 14
2 × 8 = 16
2 × 9 = 18
2 × 10 = 20

## Kolay Yol!

2 ile çarpmak = İKİ KEZ toplamak

2 × 5 = 5 + 5 = 10
2 × 7 = 7 + 7 = 14

## Çift Sayılar

2, 4, 6, 8, 10, 12, 14, 16, 18, 20

2 ile çarpınca hep ÇİFT sayı çıkar!`,
        order: 2,
        images: ['times-2.png'],
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

- **KISA İBRE** → Saat gösterir
- **UZUN İBRE** → Dakika gösterir

## Tam Saatler

Uzun ibre 12'de → TAM SAAT

🕐 Saat 1
🕑 Saat 2
🕒 Saat 3
🕓 Saat 4
🕔 Saat 5
🕕 Saat 6
🕖 Saat 7
🕗 Saat 8
🕘 Saat 9
🕙 Saat 10
🕚 Saat 11
🕛 Saat 12

## Günlük Saatler

⏰ 07:00 - Uyanma
⏰ 08:00 - Okul
⏰ 12:00 - Öğle yemeği
⏰ 15:00 - Okul çıkışı
⏰ 21:00 - Uyku`,
        order: 1,
        images: ['clock.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 2 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_2,
    title: 'Cümle Kurma',
    description: 'Doğru cümle kurmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Cümle Yapısı',
        content: `# Cümle Kurma 📝

## Cümle Nedir?

Anlamlı söz dizisi = CÜMLE

## Cümle Yapısı

**KİM? + NE YAPIYOR?**

👦 Ali + okula gidiyor.
🐈 Kedi + süt içiyor.
👧 Ayşe + top oynuyor.

## Cümle Sonları

**.** (nokta) - Normal cümle
Elma kırmızıdır.

**?** (soru işareti) - Soru
Elma kırmızı mı?

**!** (ünlem) - Heyecan
Ne güzel elma!

## Pratik

Cümle kur:
Anne + yemek yapıyor = ?
Kuş + uçuyor = ?`,
        order: 1,
        images: ['sentences.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_2,
    title: 'Hikaye Okuma',
    description: 'Kısa hikayeleri okuyup anlayalım',
    order: 2,
    topics: [
      {
        title: 'Hikaye Anlama',
        content: `# Hikaye Okuma 📖

## Örnek Hikaye

"Ali sabah erken kalktı. Önce dişlerini
fırçaladı. Sonra kahvaltı yaptı.
Okula zamanında gitti. Öğretmeni
Ali'yi tebrik etti."

## Anlama Soruları

1. Kim erken kalktı? → Ali
2. Ali ne yaptı? → Dişlerini fırçaladı
3. Nereye gitti? → Okula
4. Öğretmen ne yaptı? → Tebrik etti

## Hikaye Okuma Adımları

1️⃣ Yavaş oku
2️⃣ Anlamadığını sor
3️⃣ Tekrar oku
4️⃣ Sorulara cevap ver

## Kendi Hikayeni Anlat!

Bugün ne yaptın?
1. ...
2. ...
3. ...`,
        order: 1,
        images: ['story-reading.png'],
      },
    ],
  },
  // ==================== HAYAT BİLGİSİ 2 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_2,
    title: 'Mevsimler',
    description: '4 mevsimi ve özelliklerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Dört Mevsim',
        content: `# Mevsimler 🌸☀️🍂❄️

## 🌸 İLKBAHAR

Aylar: Mart, Nisan, Mayıs

- Çiçekler açar
- Kuşlar döner
- Hava ılır
- Doğa canlanır

## ☀️ YAZ

Aylar: Haziran, Temmuz, Ağustos

- Hava sıcak
- Tatil zamanı
- Denize gireriz
- Günler uzun

## 🍂 SONBAHAR

Aylar: Eylül, Ekim, Kasım

- Yapraklar döker
- Hava serin
- Okul başlar
- Meyveler olgunlaşır

## ❄️ KIŞ

Aylar: Aralık, Ocak, Şubat

- Kar yağar
- Hava soğuk
- Kalın giyiniriz
- Günler kısa`,
        order: 1,
        images: ['seasons.png'],
      },
    ],
  },
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_2,
    title: 'Meslekler',
    description: 'Farklı meslekleri tanıyalım',
    order: 2,
    topics: [
      {
        title: 'Meslekleri Tanıyalım',
        content: `# Meslekler 👷

## Sağlık Meslekleri

👨‍⚕️ **DOKTOR** - Hastaları iyileştirir
👩‍⚕️ **HEMŞİRE** - Hastalara bakar
🦷 **DİŞÇİ** - Dişleri tedavi eder

## Eğitim Meslekleri

👨‍🏫 **ÖĞRETMEN** - Öğretir
👩‍🏫 **ÖĞRETİM ÜYESİ** - Üniversitede

## Güvenlik Meslekleri

👮 **POLİS** - Korur, güvenlik sağlar
🧑‍🚒 **İTFAİYECİ** - Yangın söndürür

## Diğer Meslekler

👨‍🍳 **AŞÇI** - Yemek yapar
🧑‍🔧 **TAMİRCİ** - Tamir eder
👨‍🌾 **ÇİFTÇİ** - Tarım yapar
🧑‍✈️ **PİLOT** - Uçak kullanır

## Sen Ne Olmak İstersin?`,
        order: 1,
        images: ['professions.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 2 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_2,
    title: 'Arkadaşlık',
    description: 'İyi bir arkadaş olmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'İyi Arkadaş',
        content: `# Arkadaşlık 🤝

## İyi Arkadaş Ne Yapar?

😊 Gülümser
👂 Dinler
🤝 Paylaşır
💪 Yardım eder
🗣️ Nazik konuşur
🤗 Destek olur

## Arkadaşlık Kuralları

✅ "Merhaba" de
✅ İsmini söyle
✅ "Oynayalım mı?" sor
✅ Sırayla oyna
✅ Oyuncaklarını paylaş
✅ "Teşekkürler" de

## Problem Çözme

😠 Kavga olursa:
1. Sakinleş
2. Konuş
3. Dinle
4. Anlaş
5. Barış 🤝

## Yapma!

❌ Vurma
❌ İtme
❌ Alay etme
❌ Dışlama`,
        order: 1,
        images: ['friendship.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_2,
    title: 'Duygularımız',
    description: 'Duyguları tanımayı ve ifade etmeyi öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Duyguları Tanıma',
        content: `# Duygularımız 💝

## Temel Duygular

😊 **MUTLU**
İyi hissediyorum!
Oyun oynarken, hediye alınca

😢 **ÜZGÜN**
Kötü hissediyorum
Arkadaşım gidince, bir şey kırılınca

😠 **KIZGIN**
Sinirli hissediyorum
Haksızlık olunca

😨 **KORKMUŞ**
Tedirgin hissediyorum
Karanlıkta, yüksek seslerde

😲 **ŞAŞKIN**
Beklemiyordum!
Sürpriz olunca

## İfade Etme

"Ben ... hissediyorum"
"... olunca mutlu oluyorum"
"Bu beni üzdü"

## Tüm Duygular Normal!

Her duygu olabilir.
Önemli olan ifade etmek!`,
        order: 1,
        images: ['emotions.png'],
      },
    ],
  },
];

// ==================== 1. SINIF QUİZLER ====================
export const grade1Quizzes = [
  {
    title: 'Sayılar 1-10 Quiz',
    description: 'Sayıları test et!',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.GRADE_1,
    xpReward: 20,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '5 sayısından sonra hangisi gelir?',
        options: ['4', '5', '6', '7'],
        answer: '6',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🍎🍎🍎 Kaç elma var?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: '8, 5ten büyüktür.',
        answer: true,
        points: 10,
      },
    ],
  },
  {
    title: 'Toplama Quiz',
    description: 'Toplama işlemini test et!',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.GRADE_1,
    xpReward: 20,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '2 + 3 = ?',
        options: ['4', '5', '6', '7'],
        answer: '5',
        points: 10,
      },
      {
        type: QuestionType.FILL_BLANK,
        text: '4 + 2 = ___',
        answer: '6',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1 + 1 = ?',
        options: ['1', '2', '3', '4'],
        answer: '2',
        points: 10,
      },
    ],
  },
  {
    title: 'Sesli Harfler Quiz',
    description: 'Sesli harfleri test et!',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.GRADE_1,
    xpReward: 20,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangisi sesli harf değildir?',
        options: ['A', 'E', 'B', 'İ'],
        answer: 'B',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Türkçede kaç sesli harf var?',
        options: ['5', '6', '7', '8'],
        answer: '8',
        points: 10,
      },
    ],
  },
];

// ==================== 2. SINIF QUİZLER ====================
export const grade2Quizzes = [
  {
    title: 'Saat Okuma Quiz',
    description: 'Saatleri oku!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_2,
    xpReward: 25,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🕒 Saat kaç?',
        options: ['Saat 2', 'Saat 3', 'Saat 4', 'Saat 5'],
        answer: 'Saat 3',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Kısa ibre saati gösterir.',
        answer: true,
        points: 10,
      },
    ],
  },
  {
    title: 'Mevsimler Quiz',
    description: 'Mevsimleri test et!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_2,
    xpReward: 25,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Kar hangi mevsimde yağar?',
        options: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
        answer: 'Kış',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Çiçekler hangi mevsimde açar?',
        options: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
        answer: 'İlkbahar',
        points: 10,
      },
    ],
  },
];

// ==================== OYUNLAR ====================
export const grade1Games = [
  {
    title: 'Toplama Arcade',
    description: 'Doğru cevapları yakala!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.GRADE_1,
    xpReward: 25,
    coinReward: 15,
    config: {
      questions: [
        { question: '1+1', answer: 2, wrong: [1, 3, 4] },
        { question: '2+2', answer: 4, wrong: [2, 3, 5] },
        { question: '3+2', answer: 5, wrong: [4, 6, 7] },
      ],
    },
  },
  {
    title: 'Harf Eşleştirme',
    description: 'Harfleri resimlerle eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.GRADE_1,
    xpReward: 20,
    coinReward: 10,
    config: {
      pairs: [
        { left: 'A', right: '🐝 Arı' },
        { left: 'E', right: '🏠 Ev' },
        { left: 'O', right: '🎯 Ok' },
        { left: 'U', right: '✈️ Uçak' },
      ],
    },
  },
];

export const grade2Games = [
  {
    title: 'Çarpma Oyunu',
    description: '2 ile çarpma!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_2,
    xpReward: 30,
    coinReward: 20,
    config: {
      questions: [
        { question: '2×2', answer: 4, wrong: [2, 3, 5] },
        { question: '2×3', answer: 6, wrong: [4, 5, 8] },
        { question: '2×5', answer: 10, wrong: [8, 12, 15] },
      ],
    },
  },
  {
    title: 'Mevsim Sıralama',
    description: 'Mevsimleri sırala!',
    type: GameType.SORTING,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_2,
    xpReward: 25,
    coinReward: 15,
    config: {
      items: ['🌸 İlkbahar', '☀️ Yaz', '🍂 Sonbahar', '❄️ Kış'],
      correctOrder: ['🌸 İlkbahar', '☀️ Yaz', '🍂 Sonbahar', '❄️ Kış'],
    },
  },
];
