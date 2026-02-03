// Comprehensive Educational Content Seed Data
// Turkish Curriculum aligned content for special education

import { PrismaClient, Subject, GradeLevel, GameType, DifficultyLevel, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

// ==================== LESSON CONTENT ====================

const lessonsData = [
  // ==================== MATEMATIK ====================
  // 1. Sınıf Matematik
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_1,
    title: 'Sayıları Tanıyalım',
    description: '1-20 arası sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: '1-10 Arası Sayılar',
        content: `# 1-10 Arası Sayılar 🔢

Merhaba küçük matematikçi! Bugün sayıları öğreneceğiz.

## Sayıları Tanıyalım

**1** - Bir 👆
**2** - İki ✌️
**3** - Üç 🤟
**4** - Dört
**5** - Beş 🖐️
**6** - Altı
**7** - Yedi
**8** - Sekiz
**9** - Dokuz
**10** - On 🔟

## Sayma Pratiği

Parmakların ile sayalım:
- Bir parmağını kaldır: **1**
- İki parmağını kaldır: **2**
- Üç parmağını kaldır: **3**

## Eğlenceli Aktivite

Odandaki nesneleri say:
- Kaç tane oyuncağın var?
- Kaç tane kitabın var?
- Kaç tane kalem var?`,
        order: 1,
        images: ['numbers-1-10.png'],
      },
      {
        title: '11-20 Arası Sayılar',
        content: `# 11-20 Arası Sayılar 🔢

Şimdi daha büyük sayıları öğrenelim!

## Sayıları Tanıyalım

**11** - On bir
**12** - On iki
**13** - On üç
**14** - On dört
**15** - On beş
**16** - On altı
**17** - On yedi
**18** - On sekiz
**19** - On dokuz
**20** - Yirmi

## Dikkat!

On bir = 10 + 1
On iki = 10 + 2
On beş = 10 + 5

## Sayma Oyunu

20'ye kadar say:
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20!

🎉 Aferin! Başardın!`,
        order: 2,
        images: ['numbers-11-20.png'],
      },
      {
        title: 'Sayı Sıralaması',
        content: `# Sayıları Sıralayalım 📊

## Küçükten Büyüğe

1 < 2 < 3 < 4 < 5

"<" işareti "küçüktür" demek.

## Büyükten Küçüğe

5 > 4 > 3 > 2 > 1

">" işareti "büyüktür" demek.

## Pratik Yapalım

Hangisi daha büyük?
- 3 🍎 mı, 5 🍎 mi? → 5 daha büyük!
- 7 🌟 mı, 4 🌟 mü? → 7 daha büyük!

## Hatırla!

- Ağzı açık olan taraf büyük sayıya bakar
- 5 > 3 (5 büyüktür 3'ten)
- 2 < 8 (2 küçüktür 8'den)`,
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

## Toplama Ne Demek?

Toplama, sayıları bir araya getirmektir.

## Örnek

🍎 + 🍎 = 🍎🍎

1 elma + 1 elma = 2 elma

**1 + 1 = 2**

## Daha Fazla Örnek

🌟🌟 + 🌟 = 🌟🌟🌟
**2 + 1 = 3**

🎈🎈🎈 + 🎈🎈 = 🎈🎈🎈🎈🎈
**3 + 2 = 5**

## "+" İşareti

"+" işareti toplama işareti.
Sayıları toplarken kullanırız.`,
        order: 1,
        images: ['addition-intro.png'],
      },
      {
        title: 'Parmaklarla Toplama',
        content: `# Parmaklarla Toplama 🖐️

## Nasıl Yapılır?

1. Sol elinde bir sayı kadar parmak kaldır
2. Sağ elinde diğer sayı kadar parmak kaldır
3. Tüm parmakları say!

## Örnek: 2 + 3

Sol el: ✌️ (2 parmak)
Sağ el: 🤟 (3 parmak)

Toplam: 5 parmak!

**2 + 3 = 5** ✅

## Pratik Yap!

- 1 + 2 = ? (Sol: 1, Sağ: 2) = 3
- 3 + 1 = ? (Sol: 3, Sağ: 1) = 4
- 2 + 2 = ? (Sol: 2, Sağ: 2) = 4
- 4 + 1 = ? (Sol: 4, Sağ: 1) = 5`,
        order: 2,
        images: ['finger-counting.png'],
      },
    ],
  },
  // 2. Sınıf Matematik
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_2,
    title: 'Çarpma İşlemine Giriş',
    description: 'Çarpma işleminin temellerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Çarpma Nedir?',
        content: `# Çarpma İşlemi ✖️

## Çarpma Ne Demek?

Çarpma, bir sayıyı tekrar tekrar toplamaktır.

## Örnek

3 + 3 + 3 = 9

Bunu daha kolay yazabiliriz:
**3 × 3 = 9**

## Görsel Örnek

🍎🍎🍎
🍎🍎🍎
🍎🍎🍎

3 sıra var, her sırada 3 elma.
**3 × 3 = 9** elma!

## "×" İşareti

"×" işareti çarpma işareti.
"Kere" veya "çarpı" diye okuruz.

3 × 4 = "3 kere 4" veya "3 çarpı 4"`,
        order: 1,
        images: ['multiplication-intro.png'],
      },
      {
        title: '2 ile Çarpma',
        content: `# 2 ile Çarpma Tablosu ✖️2️⃣

## 2'nin Katları

2 × 1 = 2
2 × 2 = 4
2 × 3 = 6
2 × 4 = 8
2 × 5 = 10

## Kolay Yol

2 ile çarpmak = sayıyı iki kere toplamak!

2 × 3 = 3 + 3 = 6
2 × 5 = 5 + 5 = 10

## Görsel

🦶🦶 - 1 çift ayak = 2 ayak
🦶🦶 🦶🦶 - 2 çift ayak = 4 ayak
🦶🦶 🦶🦶 🦶🦶 - 3 çift ayak = 6 ayak

## Pratik

2 × 6 = ?
2 × 7 = ?
2 × 8 = ?
2 × 9 = ?
2 × 10 = ?`,
        order: 2,
        images: ['times-2.png'],
      },
    ],
  },
  // 3. Sınıf Matematik
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

## Bölme Ne Demek?

Bölme, bir şeyi eşit parçalara ayırmaktır.

## Örnek

6 elmayı 2 kişiye eşit paylaştıralım:

🍎🍎🍎🍎🍎🍎 ➗ 2 kişi

Kişi 1: 🍎🍎🍎
Kişi 2: 🍎🍎🍎

Her kişi 3 elma alır.

**6 ÷ 2 = 3**

## "÷" İşareti

"÷" işareti bölme işareti.
"Bölü" diye okuruz.

12 ÷ 3 = "12 bölü 3"

## Önemli Kural

Bölme, çarpmanın tersidir!

3 × 4 = 12
12 ÷ 4 = 3
12 ÷ 3 = 4`,
        order: 1,
        images: ['division-intro.png'],
      },
    ],
  },

  // ==================== TÜRKÇE ====================
  // 1. Sınıf Türkçe
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_1,
    title: 'Harfleri Tanıyalım',
    description: 'Türk alfabesindeki harfleri öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Sesli Harfler',
        content: `# Sesli Harfler 🗣️

## Türkçede 8 Sesli Harf Var

**A a** - Arı 🐝
**E e** - Elma 🍎
**I ı** - Irmak 🌊
**İ i** - İnek 🐄
**O o** - Okul 🏫
**Ö ö** - Ördek 🦆
**U u** - Uçak ✈️
**Ü ü** - Üzüm 🍇

## Neden "Sesli"?

Sesli harfleri söylerken ağzımız açık kalır.
"Aaaaaa" de - ağzın açık!
"Eeeee" de - ağzın açık!

## Şarkı ile Öğren

🎵 A, E, I, İ, O, Ö, U, Ü
Sesli harfler bunlar
Söyle sen de bir bir 🎵`,
        order: 1,
        images: ['vowels.png'],
      },
      {
        title: 'Sessiz Harfler',
        content: `# Sessiz Harfler 🤫

## Türkçede 21 Sessiz Harf Var

B, C, Ç, D, F, G, Ğ, H, J, K, L, M, N, P, R, S, Ş, T, V, Y, Z

## Örnekler

**B b** - Balon 🎈
**C c** - Ceylan 🦌
**K k** - Kedi 🐱
**M m** - Masa
**S s** - Su 💧

## Neden "Sessiz"?

Sessiz harfleri söylerken bir sesli harfin yardımına ihtiyaç duyarız.

"B" harfini söylerken "Be" deriz.
"M" harfini söylerken "Me" deriz.

## Dikkat!

Sessiz harfler tek başına okunamaz.
Sesli harflerle birleşince hece olur!

B + A = BA
K + E = KE`,
        order: 2,
        images: ['consonants.png'],
      },
      {
        title: 'Hece Oluşturma',
        content: `# Hece Oluşturma 📝

## Hece Nedir?

Bir solukta çıkan ses grubuna hece denir.

## Hece Nasıl Oluşur?

Sessiz + Sesli = Hece

**B + A = BA**
**K + A = KA**
**L + E = LE**

## Kelime Yapalım

BA + BA = **BABA** 👨
AN + NE = **ANNE** 👩
KE + DI = **KEDİ** 🐱

## Pratik

Bu heceleri birleştir:
- EV = ? (Tek hece, kelime!)
- E + LMA = ELMA 🍎
- KA + LEM = KALEM ✏️
- O + KUL = OKUL 🏫`,
        order: 3,
        images: ['syllables.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_1,
    title: 'İlk Kelimelerim',
    description: 'Basit kelimeleri okuyup yazalım',
    order: 2,
    topics: [
      {
        title: 'Aile Kelimeleri',
        content: `# Aile Kelimeleri 👨‍👩‍👧‍👦

## Ailemizi Tanıyalım

**ANNE** 👩 - An-ne (2 hece)
**BABA** 👨 - Ba-ba (2 hece)
**DEDE** 👴 - De-de (2 hece)
**NINE** 👵 - Ni-ne (2 hece)
**ABLA** 👧 - Ab-la (2 hece)
**ABI** 👦 - A-bi (2 hece)

## Cümle Kuralım

- Ben annemi seviyorum. ❤️
- Babam çok güçlü. 💪
- Dedem hikaye anlatır. 📖

## Yazalım

Aile kelimelerini defterine yaz.
Her kelimeyi 3 kez yaz.`,
        order: 1,
        images: ['family-words.png'],
      },
    ],
  },

  // ==================== FEN BİLİMLERİ ====================
  // 3. Sınıf Fen
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_3,
    title: 'Canlılar Dünyası',
    description: 'Canlıların özelliklerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Canlı ve Cansız',
        content: `# Canlı ve Cansız Varlıklar 🌱🪨

## Canlı Varlıklar

Canlılar:
- Beslenirler 🍽️
- Büyürler 📈
- Hareket ederler 🏃
- Nefes alırlar 💨
- Ürerler (yavru yaparlar) 🐣

## Canlı Örnekleri

🌸 Çiçek
🌳 Ağaç
🐕 Köpek
🐈 Kedi
🦋 Kelebek
👦 İnsan

## Cansız Varlıklar

Cansızlar:
- Beslenmezler
- Büyümezler
- Hareket edemezler (kendiliğinden)
- Nefes almazlar
- Üremezler

## Cansız Örnekleri

🪨 Taş
💧 Su
🪑 Sandalye
📱 Telefon
🚗 Araba`,
        order: 1,
        images: ['living-nonliving.png'],
      },
      {
        title: 'Bitkiler',
        content: `# Bitkiler 🌱

## Bitkilerin Bölümleri

1. **Kök** - Toprakta, su alır
2. **Gövde** - Ortada, suyu taşır
3. **Yaprak** - Yeşil, güneş ışığı alır
4. **Çiçek** - Renkli, tohum yapar
5. **Meyve** - İçinde tohum var

## Bitkiler Ne Yer?

Bitkiler kendi besinlerini yapar!
- Güneş ışığı ☀️
- Su 💧
- Hava 💨

= Besin 🌿

Buna **fotosentez** denir.

## Dikkat!

Bitkilere su vermeyi unutma!
Güneş ışığı alsınlar!`,
        order: 2,
        images: ['plants.png'],
      },
      {
        title: 'Hayvanlar',
        content: `# Hayvanlar 🐾

## Hayvan Grupları

### Memeliler 🐕
- Yavrularını sütle besler
- Tüyleri var
- Örnek: Kedi, köpek, at

### Kuşlar 🐦
- Tüyleri ve kanatları var
- Yumurtlarlar
- Örnek: Serçe, kartal, tavuk

### Balıklar 🐟
- Suda yaşar
- Solungaçları var
- Örnek: Balık, köpekbalığı

### Sürüngenler 🦎
- Pulları var
- Soğuk kanlı
- Örnek: Yılan, kertenkele, timsah

### Böcekler 🐛
- 6 bacakları var
- Küçükler
- Örnek: Karınca, arı, kelebek

## Evcil ve Vahşi

**Evcil**: Kedi, köpek, tavşan
**Vahşi**: Aslan, kaplan, ayı`,
        order: 3,
        images: ['animals.png'],
      },
    ],
  },

  // ==================== YAŞAM BECERİLERİ ====================
  // 1. Sınıf Yaşam Becerileri
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_1,
    title: 'Günlük Rutinler',
    description: 'Günlük aktivitelerimizi öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Sabah Rutini',
        content: `# Sabah Rutini ☀️

## Sabah Kalktığımızda

1. **Uyan** ⏰
   - Alarm çaldığında uyan
   - Gözlerini aç, esne

2. **Yatağını Topla** 🛏️
   - Yorganı düzelt
   - Yastığı koy

3. **Tuvalete Git** 🚽
   - İhtiyacını gider
   - Sifonu çek

4. **El Yüz Yıka** 🧼
   - Ellerini sabunla
   - Yüzünü yıka
   - Kurula

5. **Dişlerini Fırçala** 🪥
   - Macun sık
   - 2 dakika fırçala

6. **Giyinin** 👕
   - Temiz kıyafet giy
   - Ayakkabını giy

7. **Kahvaltı Yap** 🍳
   - Masaya otur
   - Yavaş yavaş ye

## Aferin! Güne hazırsın! 🌟`,
        order: 1,
        images: ['morning-routine.png'],
      },
      {
        title: 'Temizlik Alışkanlıkları',
        content: `# Temizlik Alışkanlıkları 🧼

## El Yıkama Adımları

1. Ellerini ıslat 💧
2. Sabun al 🧴
3. Köpürt 🫧
4. 20 saniye ovala
5. Durula
6. Kurula

## Ne Zaman El Yıkamalıyız?

✅ Yemekten önce
✅ Yemekten sonra
✅ Tuvaletten sonra
✅ Dışarıdan gelince
✅ Oyun oynadıktan sonra

## Diş Fırçalama

🦷 Sabah kahvaltıdan sonra
🦷 Akşam yatmadan önce
🦷 Günde 2 kez!

## Neden Önemli?

🦠 Mikropları yok eder
💪 Sağlıklı kalırız
😊 Temiz ve mutlu oluruz`,
        order: 2,
        images: ['hygiene.png'],
      },
    ],
  },

  // ==================== OKUL ÖNCESİ ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Renkler ve Şekiller',
    description: 'Temel renkleri ve şekilleri öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Renkler',
        content: `# Renkler 🌈

## Ana Renkler

🔴 **KIRMIZI** - Elma, çilek
🔵 **MAVİ** - Gökyüzü, deniz
🟡 **SARI** - Güneş, muz

## Diğer Renkler

🟢 **YEŞİL** - Yaprak, çimen
🟠 **TURUNCU** - Portakal, havuç
🟣 **MOR** - Patlıcan, üzüm
⚫ **SİYAH** - Gece, karga
⚪ **BEYAZ** - Kar, süt

## Renk Oyunu

Odana bak!
- Kırmızı bir şey bul 🔴
- Mavi bir şey bul 🔵
- Yeşil bir şey bul 🟢

## Şarkı

🎵 Kırmızı, mavi, sarı
Renkler çok güzel yarı
Yeşil, turuncu, mor
Hepsini seviyorum çok! 🎵`,
        order: 1,
        images: ['colors.png'],
      },
      {
        title: 'Şekiller',
        content: `# Şekiller 🔷

## Temel Şekiller

⭕ **DAİRE** - Yuvarlak
- Top gibi
- Güneş gibi

⬜ **KARE** - 4 eşit kenarı var
- Pencere gibi
- Kutu gibi

🔺 **ÜÇGEN** - 3 kenarı var
- Çatı gibi
- Pizza dilimi gibi

▬ **DİKDÖRTGEN** - 2 uzun, 2 kısa kenar
- Kapı gibi
- Kitap gibi

## Etrafımızdaki Şekiller

Daire: Saat, tabak, tekerlek
Kare: Pencere, televizyon
Üçgen: Çatı, karpuz dilimi
Dikdörtgen: Kapı, telefon

## Şekil Avı

Evinde şekil ara!
Kaç tane daire buldun?
Kaç tane kare buldun?`,
        order: 2,
        images: ['shapes.png'],
      },
    ],
  },
];

// ==================== QUIZ DATA ====================

const quizzesData = [
  {
    title: '1-10 Sayılar Quiz',
    description: 'Sayıları ne kadar iyi biliyorsun?',
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🍎🍎🍎 Kaç tane elma var?',
        options: ['1', '2', '3', '4'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '5 sayısından sonra hangi sayı gelir?',
        options: ['4', '5', '6', '7'],
        answer: '6',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: '7, 5\'ten büyüktür.',
        answer: true,
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'En büyük sayı hangisi?',
        options: ['3', '7', '2', '9'],
        answer: '9',
        points: 10,
      },
      {
        type: QuestionType.FILL_BLANK,
        text: '1, 2, 3, ___, 5',
        answer: '4',
        hint: '3\'ten sonra hangi sayı gelir?',
        points: 10,
      },
    ],
  },
  {
    title: 'Toplama Quiz',
    description: 'Toplama işlemini test et!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 25,
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
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1 + 1 = ?',
        options: ['1', '2', '3', '4'],
        answer: '2',
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
        text: '🍎 + 🍎🍎 = ?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
    ],
  },
  {
    title: 'Sesli Harfler Quiz',
    description: 'Sesli harfleri test et!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangi harf sesli harf DEĞİLDİR?',
        options: ['A', 'E', 'B', 'İ'],
        answer: 'B',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: '"O" harfi sesli harftir.',
        answer: true,
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Türkçede kaç tane sesli harf var?',
        options: ['5', '6', '7', '8'],
        answer: '8',
        points: 10,
      },
    ],
  },
  {
    title: 'Renkler Quiz',
    description: 'Renkleri tanı!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Güneşin rengi nedir?',
        options: ['Mavi', 'Kırmızı', 'Sarı', 'Yeşil'],
        answer: 'Sarı',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Yaprakların rengi nedir?',
        options: ['Sarı', 'Yeşil', 'Mavi', 'Mor'],
        answer: 'Yeşil',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Gökyüzü hangi renk?',
        options: ['Yeşil', 'Kırmızı', 'Mavi', 'Turuncu'],
        answer: 'Mavi',
        points: 10,
      },
    ],
  },
  {
    title: 'Canlı - Cansız Quiz',
    description: 'Canlı ve cansız varlıkları ayırt et!',
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangisi CANLI bir varlıktır?',
        options: ['Taş', 'Su', 'Ağaç', 'Masa'],
        answer: 'Ağaç',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Bitkiler canlıdır.',
        answer: true,
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Canlılar ne YAPMAZ?',
        options: ['Beslenir', 'Büyür', 'Uçar', 'Nefes alır'],
        answer: 'Uçar',
        hint: 'Her canlı uçamaz!',
        points: 10,
      },
    ],
  },
];

// ==================== GAMES DATA ====================

const gamesData = [
  {
    title: 'Sayı Eşleştirme',
    description: 'Sayıları ve miktarları eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    config: {
      pairs: [
        { left: '1', right: '🍎' },
        { left: '2', right: '🍎🍎' },
        { left: '3', right: '🍎🍎🍎' },
        { left: '4', right: '🍎🍎🍎🍎' },
        { left: '5', right: '🍎🍎🍎🍎🍎' },
      ],
    },
  },
  {
    title: 'Renk Hafıza Oyunu',
    description: 'Renk kartlarını eşleştir!',
    type: GameType.MEMORY,
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 10,
    config: {
      cards: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'],
      gridSize: 3,
    },
  },
  {
    title: 'Harf Sıralama',
    description: 'Harfleri doğru sıraya koy!',
    type: GameType.SORTING,
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    config: {
      items: ['A', 'B', 'C', 'D', 'E'],
      correctOrder: ['A', 'B', 'C', 'D', 'E'],
    },
  },
  {
    title: 'Canlı Cansız Ayırma',
    description: 'Canlı ve cansızları doğru kutuya koy!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 25,
    coinReward: 15,
    config: {
      zones: ['Canlı', 'Cansız'],
      items: [
        { text: '🌸 Çiçek', zone: 'Canlı' },
        { text: '🪨 Taş', zone: 'Cansız' },
        { text: '🐕 Köpek', zone: 'Canlı' },
        { text: '🪑 Sandalye', zone: 'Cansız' },
        { text: '🌳 Ağaç', zone: 'Canlı' },
        { text: '📱 Telefon', zone: 'Cansız' },
      ],
    },
  },
  {
    title: 'Toplama Arcade',
    description: 'Doğru cevapları yakala!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.EASY,
    xpReward: 30,
    coinReward: 20,
    config: {
      questions: [
        { question: '1+1', answer: 2, wrong: [1, 3, 4] },
        { question: '2+2', answer: 4, wrong: [2, 3, 5] },
        { question: '3+2', answer: 5, wrong: [4, 6, 7] },
      ],
    },
  },
];

// ==================== ACHIEVEMENTS DATA ====================

const achievementsData = [
  {
    name: 'İlk Adım',
    description: 'İlk dersini tamamladın!',
    icon: '🎯',
    criteria: { type: 'lessons_completed', value: 1 },
    xpReward: 50,
    coinReward: 25,
  },
  {
    name: 'Öğrenme Yolcusu',
    description: '5 ders tamamladın!',
    icon: '🚀',
    criteria: { type: 'lessons_completed', value: 5 },
    xpReward: 100,
    coinReward: 50,
  },
  {
    name: 'Bilgi Ustası',
    description: '10 ders tamamladın!',
    icon: '🏆',
    criteria: { type: 'lessons_completed', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Quiz Şampiyonu',
    description: 'İlk quizinde %100 aldın!',
    icon: '⭐',
    criteria: { type: 'quiz_perfect', value: 1 },
    xpReward: 75,
    coinReward: 50,
  },
  {
    name: 'Oyuncu',
    description: '5 oyun oynadın!',
    icon: '🎮',
    criteria: { type: 'games_played', value: 5 },
    xpReward: 50,
    coinReward: 25,
  },
  {
    name: 'Hafıza Uzmanı',
    description: 'Hafıza oyununda 100 puan!',
    icon: '🧠',
    criteria: { type: 'game_score', game: 'memory', value: 100 },
    xpReward: 100,
    coinReward: 50,
  },
  {
    name: 'Günlük Çalışkan',
    description: '7 gün üst üste giriş yaptın!',
    icon: '📅',
    criteria: { type: 'streak', value: 7 },
    xpReward: 150,
    coinReward: 75,
  },
  {
    name: 'Matematik Dehası',
    description: 'Tüm matematik quizlerinde %80+ aldın!',
    icon: '🔢',
    criteria: { type: 'subject_master', subject: 'MATH', value: 80 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Okuma Yıldızı',
    description: 'Tüm Türkçe derslerini tamamladın!',
    icon: '📚',
    criteria: { type: 'subject_complete', subject: 'TURKISH' },
    xpReward: 250,
    coinReward: 125,
  },
  {
    name: 'Doğa Kaşifi',
    description: 'Fen Bilimleri derslerini tamamladın!',
    icon: '🌿',
    criteria: { type: 'subject_complete', subject: 'SCIENCE' },
    xpReward: 250,
    coinReward: 125,
  },
];

// ==================== SEED FUNCTION ====================

export async function seedContent() {
  console.log('🌱 Starting comprehensive content seed...');

  // Create Lessons with Topics
  for (const lessonData of lessonsData) {
    const { topics, ...lesson } = lessonData;

    const createdLesson = await prisma.lesson.upsert({
      where: {
        subject_grade_order: {
          subject: lesson.subject,
          grade: lesson.grade,
          order: lesson.order,
        },
      },
      update: {
        title: lesson.title,
        description: lesson.description,
      },
      create: lesson,
    });

    console.log(`📚 Created lesson: ${createdLesson.title}`);

    // Create topics for this lesson
    for (const topicData of topics) {
      await prisma.topic.upsert({
        where: {
          id: `${createdLesson.id}-topic-${topicData.order}`,
        },
        update: {
          title: topicData.title,
          content: topicData.content,
          images: topicData.images || [],
        },
        create: {
          id: `${createdLesson.id}-topic-${topicData.order}`,
          lessonId: createdLesson.id,
          title: topicData.title,
          content: topicData.content,
          order: topicData.order,
          images: topicData.images || [],
        },
      });
      console.log(`  📖 Created topic: ${topicData.title}`);
    }
  }

  // Create Quizzes with Questions
  for (const quizData of quizzesData) {
    const { questions, ...quiz } = quizData;

    const createdQuiz = await prisma.quiz.upsert({
      where: { id: `quiz-${quiz.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: quiz,
      create: {
        id: `quiz-${quiz.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...quiz,
      },
    });

    console.log(`📝 Created quiz: ${createdQuiz.title}`);

    // Create questions for this quiz
    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];
      await prisma.question.upsert({
        where: { id: `${createdQuiz.id}-q-${i + 1}` },
        update: {
          text: questionData.text,
          type: questionData.type,
          options: questionData.options || null,
          answer: questionData.answer,
          hint: questionData.hint || null,
          points: questionData.points,
        },
        create: {
          id: `${createdQuiz.id}-q-${i + 1}`,
          quizId: createdQuiz.id,
          type: questionData.type,
          text: questionData.text,
          options: questionData.options || null,
          answer: questionData.answer,
          hint: questionData.hint || null,
          points: questionData.points,
          order: i + 1,
        },
      });
    }
  }

  // Create Games
  for (const gameData of gamesData) {
    const createdGame = await prisma.game.upsert({
      where: { id: `game-${gameData.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: gameData,
      create: {
        id: `game-${gameData.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...gameData,
      },
    });
    console.log(`🎮 Created game: ${createdGame.title}`);
  }

  // Create Achievements
  for (const achievementData of achievementsData) {
    await prisma.achievement.upsert({
      where: { name: achievementData.name },
      update: achievementData,
      create: achievementData,
    });
    console.log(`🏆 Created achievement: ${achievementData.name}`);
  }

  console.log('✅ Content seed completed!');
}

// Run if called directly
if (require.main === module) {
  seedContent()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
