// OKUL ÖNCESİ (PRESCHOOL) - Kapsamlı Müfredat
// MEB Özel Eğitim Programına Uygun

import { Subject, GradeLevel, DifficultyLevel, QuestionType, GameType } from '@prisma/client';

export const preschoolLessons = [
  // ==================== MATEMATİK ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Renkler',
    description: 'Ana renkleri ve ara renkleri öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Ana Renkler',
        content: `# Ana Renkler 🎨

## 3 Ana Renk Var

🔴 **KIRMIZI**
- Elma kırmızı
- Çilek kırmızı
- Kalp kırmızı ❤️

🔵 **MAVİ**
- Gökyüzü mavi
- Deniz mavi
- Balon mavi 🎈

🟡 **SARI**
- Güneş sarı ☀️
- Muz sarı 🍌
- Limon sarı 🍋

## Renk Şarkısı

🎵 Kırmızı, mavi, sarı
Bu üç renk ana renk
Karıştır, karıştır
Yeni renkler çıkar! 🎵

## Oyun Zamanı!

Odanda bul:
- 1 kırmızı şey
- 1 mavi şey
- 1 sarı şey`,
        order: 1,
        images: ['primary-colors.png'],
      },
      {
        title: 'Ara Renkler',
        content: `# Ara Renkler 🌈

## Renkleri Karıştıralım!

🔴 + 🟡 = 🟠 **TURUNCU**
Kırmızı + Sarı = Turuncu
Portakal turuncu! 🍊

🔵 + 🟡 = 🟢 **YEŞİL**
Mavi + Sarı = Yeşil
Yaprak yeşil! 🍃

🔴 + 🔵 = 🟣 **MOR**
Kırmızı + Mavi = Mor
Patlıcan mor! 🍆

## Diğer Renkler

⚫ SİYAH - Gece, karga
⚪ BEYAZ - Kar, süt
🟤 KAHVERENGİ - Toprak, çikolata

## Gökkuşağı 🌈

Kırmızı, turuncu, sarı,
Yeşil, mavi, mor!
7 renk yan yana
Gökkuşağı olur!`,
        order: 2,
        images: ['secondary-colors.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Şekiller',
    description: 'Temel geometrik şekilleri tanıyalım',
    order: 2,
    topics: [
      {
        title: 'Daire ve Kare',
        content: `# Daire ve Kare ⭕⬜

## DAİRE ⭕

- Yuvarlak
- Köşesi YOK
- Kenarı YOK

Daire gibi şeyler:
🔴 Top
⏰ Saat
🍕 Pizza
🌕 Ay

## KARE ⬜

- 4 kenarı var
- 4 köşesi var
- Tüm kenarlar EŞİT

Kare gibi şeyler:
🪟 Pencere
📦 Kutu
🧇 Waffle
🎲 Zar

## Fark

Daire yuvarlar → ⭕
Kare köşeli → ⬜

## El ile Çiz

Havada daire çiz! 🔄
Havada kare çiz! ◻️`,
        order: 1,
        images: ['circle-square.png'],
      },
      {
        title: 'Üçgen ve Dikdörtgen',
        content: `# Üçgen ve Dikdörtgen 🔺▬

## ÜÇGEN 🔺

- 3 kenarı var
- 3 köşesi var
- Sivri uçları var

Üçgen gibi şeyler:
🏔️ Dağ
🎄 Çam ağacı
🍕 Pizza dilimi
📐 Cetvel

## DİKDÖRTGEN ▬

- 4 kenarı var
- 4 köşesi var
- 2 uzun, 2 kısa kenar

Dikdörtgen gibi şeyler:
🚪 Kapı
📱 Telefon
📺 Televizyon
📖 Kitap

## Sayalım

Üçgenin kaç köşesi var? 3️⃣
Dikdörtgenin kaç kenarı var? 4️⃣`,
        order: 2,
        images: ['triangle-rectangle.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Sayı Öncesi Kavramlar',
    description: 'Büyük-küçük, uzun-kısa, çok-az kavramlarını öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Büyük ve Küçük',
        content: `# Büyük ve Küçük 📏

## BÜYÜK

Fazla yer kaplar.

🐘 Fil BÜYÜK
🏠 Ev BÜYÜK
🚌 Otobüs BÜYÜK
🌳 Ağaç BÜYÜK

## KÜÇÜK

Az yer kaplar.

🐜 Karınca KÜÇÜK
🍓 Çilek KÜÇÜK
🐁 Fare KÜÇÜK
🔑 Anahtar KÜÇÜK

## Karşılaştır

🐘 > 🐁
Fil fareden BÜYÜK

🍎 > 🫐
Elma yaban mersininden BÜYÜK

## Oyun

Anne/babandan iste:
"Bana BÜYÜK bir şey göster!"
"Bana KÜÇÜK bir şey göster!"`,
        order: 1,
        images: ['big-small.png'],
      },
      {
        title: 'Uzun ve Kısa',
        content: `# Uzun ve Kısa 📐

## UZUN

📏 Cetvel UZUN
🐍 Yılan UZUN
🦒 Zürafanın boynu UZUN
🛤️ Tren yolu UZUN

## KISA

✏️ Kalem ucu KISA
🐛 Tırtıl KISA
🐢 Kaplumbağanın boynu KISA
🥄 Çay kaşığı KISA

## Vücudumuzla Öğrenelim

🙆 Ellerini yukarı uzat = UZUN
🙋 Ellerini indir = KISA

Parmakların:
👆 İşaret parmağı UZUN
👍 Baş parmak KISA

## Pratik

İp al:
- Uzun ip kes
- Kısa ip kes
- Hangisi uzun?`,
        order: 2,
        images: ['long-short.png'],
      },
      {
        title: 'Çok ve Az',
        content: `# Çok ve Az 🔢

## ÇOK

🍎🍎🍎🍎🍎 = ÇOK elma
⭐⭐⭐⭐⭐⭐ = ÇOK yıldız
👧👧👧👧 = ÇOK çocuk

## AZ

🍎 = AZ elma
⭐⭐ = AZ yıldız
👧 = AZ çocuk

## Karşılaştır

🍪🍪🍪🍪🍪 ve 🍪🍪

Sol taraf ÇOK! ✅
Sağ taraf AZ! ✅

## Günlük Hayat

"Tabağımda ÇOK yemek var"
"Bardağımda AZ su var"

## Oyun

Legoları say:
- Hangi renk ÇOK?
- Hangi renk AZ?`,
        order: 3,
        images: ['many-few.png'],
      },
      {
        title: 'Ağır ve Hafif',
        content: `# Ağır ve Hafif ⚖️

## AĞIR

Taşıması zor.

🪨 Taş AĞIR
📚 Kitap yığını AĞIR
🍉 Karpuz AĞIR

## HAFİF

Taşıması kolay.

🪶 Tüy HAFİF
🎈 Balon HAFİF
📄 Kağıt HAFİF

## Deney Yap

Sol eline kitap al.
Sağ eline kalem al.

Hangisi AĞIR? 📖
Hangisi HAFİF? ✏️

## Vücudunla Hisset

Ağır şey tutunca → 😤 zorlanırsın
Hafif şey tutunca → 😊 kolay`,
        order: 4,
        images: ['heavy-light.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.PRESCHOOL,
    title: '1-5 Sayıları',
    description: '1den 5e kadar sayıları öğrenelim',
    order: 4,
    topics: [
      {
        title: 'Sayıları Tanıyalım',
        content: `# 1-5 Sayıları 🔢

## 1️⃣ BİR

👆 1 parmak
🍎 1 elma
⭐ 1 yıldız

## 2️⃣ İKİ

✌️ 2 parmak
👀 2 göz
👂 2 kulak

## 3️⃣ ÜÇ

🤟 3 parmak
🚦 3 renk (trafik ışığı)
🔺 3 köşe (üçgen)

## 4️⃣ DÖRT

🖖 4 parmak
🚗 4 teker
⬜ 4 köşe (kare)

## 5️⃣ BEŞ

🖐️ 5 parmak
⭐⭐⭐⭐⭐ 5 yıldız
🖐️ 1 el = 5 parmak

## Şarkı

🎵 1, 2, 3, 4, 5
Beş parmağım var
Sol el, sağ el
Hepsi on parmak! 🎵`,
        order: 1,
        images: ['numbers-1-5.png'],
      },
    ],
  },
  // ==================== TÜRKÇE ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.PRESCHOOL,
    title: 'Dinleme ve Konuşma',
    description: 'Dinleme ve konuşma becerilerini geliştirelim',
    order: 1,
    topics: [
      {
        title: 'Sesleri Tanıyalım',
        content: `# Sesler 🔊

## Hayvan Sesleri

🐕 Köpek: HAV HAV!
🐈 Kedi: MİYAV!
🐄 İnek: MÖÖÖÖ!
🐓 Horoz: Ü-Ü-RÜÜÜ!
🐑 Koyun: MEEE!
🦆 Ördek: VAK VAK!
🐷 Domuz: OİNK OİNK!

## Doğa Sesleri

🌧️ Yağmur: ŞIR ŞIR
💨 Rüzgar: VUUUU
⚡ Gök gürültüsü: GÜM GÜM
🌊 Deniz: ŞARRR

## Ev Sesleri

🚪 Kapı: TOK TOK
📞 Telefon: ZIRR ZIRR
⏰ Saat: TIK TAK

## Oyun

Gözlerini kapat!
Hangi sesi duyuyorsun?
Tahmin et!`,
        order: 1,
        images: ['sounds.png'],
      },
      {
        title: 'Tekerlemeler',
        content: `# Tekerlemeler 🗣️

## Tekerleme 1

🐝 Arı vız vız vız
Kovandan bal damlıyor
Tatlı tatlı bal
Herkes bal seviyor!

## Tekerleme 2

🐸 Kurbağa VRAK VRAK
Göl kenarında
Sinek gördü HAP!
Yuttu karnına

## Tekerleme 3

🌧️ Yağmur yağıyor
Seller akıyor
Çocuklar evde
Oyun oynuyor

## Nasıl Söyleriz?

1. Yavaş başla
2. Tekrar tekrar söyle
3. Hızlan!

## Senin Sıran

Bir tekerleme seç.
3 kez söyle!
Her seferinde daha hızlı!`,
        order: 2,
        images: ['tongue-twisters.png'],
      },
    ],
  },
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.PRESCHOOL,
    title: 'İlk Kelimeler',
    description: 'Temel kelimeleri öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Aile Kelimeleri',
        content: `# Ailem 👨‍👩‍👧‍👦

## Aile Üyeleri

👩 **ANNE**
Beni doğuran, seven

👨 **BABA**
Beni koruyan, seven

👧 **ABLA**
Benden büyük kız kardeş

👦 **ABI**
Benden büyük erkek kardeş

👶 **BEBEK**
Küçük kardeş

👴 **DEDE**
Babanın babası

👵 **NİNE / ANNEANNE**
Annenin annesi

## Cümle Kuralım

"Annemi seviyorum" ❤️
"Babam güçlü" 💪
"Kardeşimle oynuyorum" 🎮

## Aileni Anlat

Ailende kimler var?
Anneni tarif et!
Babanı tarif et!`,
        order: 1,
        images: ['family-words.png'],
      },
      {
        title: 'Günlük Kelimeler',
        content: `# Günlük Kelimeler 📅

## Sabah Kelimeleri

☀️ GÜNAYIN - Sabah selamı
🛏️ YATAK - Uyuduğumuz yer
🍳 KAHVALTI - Sabah yemeği

## Öğle Kelimeleri

🍽️ ÖĞLE YEMEĞİ
😴 UYKU - Öğle uykusu
🎮 OYUN

## Akşam Kelimeleri

🌙 İYİ AKŞAMLAR
🍝 AKŞAM YEMEĞİ
📺 TELEVİZYON
🛁 BANYO
😴 İYİ GECELER

## Nazik Kelimeler

🙏 LÜTFEN - Rica ederken
😊 TEŞEKKÜRLER - Memnun olunca
😔 ÖZÜR DİLERİM - Hata yapınca

## Pratik

Her gün bu kelimeleri kullan!`,
        order: 2,
        images: ['daily-words.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Vücudumu Tanıyorum',
    description: 'Vücut bölümlerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Baş Bölümleri',
        content: `# Başım 👤

## Başımda Neler Var?

👤 BAŞ - En üstte

👀 GÖZLER (2 tane)
- Görürüz
- Renkleri görürüz
- Sağ göz, sol göz

👂 KULAKLAR (2 tane)
- Duyarız
- Müzik dinleriz
- Sağ kulak, sol kulak

👃 BURUN (1 tane)
- Koklarız
- Nefes alırız

👄 AĞIZ (1 tane)
- Yeriz
- Konuşuruz
- Güleriz 😊

## Şarkı

🎵 Başım, gözüm, kulağım
Burnum, ağzım, dudağım
Hepsi benim organım
Onları koruyorum! 🎵`,
        order: 1,
        images: ['head-parts.png'],
      },
      {
        title: 'Gövde ve Bacaklar',
        content: `# Gövdem ve Bacaklarım 🧍

## GÖVDE

🫁 GÖĞÜS
- Kalbimiz burada
- Ciğerlerimiz burada

🫃 KARIN
- Midemiz burada
- Yemek buraya gider

⬅️➡️ KOLLAR (2 tane)
- Tutarız
- Kucaklarız
- Sağ kol, sol kol

🖐️ ELLER (2 tane)
- 5+5 = 10 parmak
- Yazarız, çizeriz

## BACAKLAR

🦵 BACAKLAR (2 tane)
- Yürürüz
- Koşarız
- Sağ bacak, sol bacak

🦶 AYAKLAR (2 tane)
- 5+5 = 10 parmak
- Ayakta dururuz

## Hareket Et!

Ellerini kaldır! 🙌
Ayaklarını vur! 🦶
Kafanı salla! 🙂`,
        order: 2,
        images: ['body-parts.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Temizlik Alışkanlıkları',
    description: 'Kişisel temizlik becerilerini öğrenelim',
    order: 2,
    topics: [
      {
        title: 'El Yıkama',
        content: `# El Yıkama 🧼

## Ne Zaman Yıkarız?

✅ Yemekten ÖNCE
✅ Yemekten SONRA
✅ Tuvaletten SONRA
✅ Dışarıdan gelince
✅ Oynadıktan SONRA

## Adımlar

1️⃣ Ellerini ıslat 💧
2️⃣ Sabun al 🧴
3️⃣ Köpürt 🫧
4️⃣ Ovala ovala (20 saniye)
5️⃣ Durula 💦
6️⃣ Kurula 🧻

## 20 Saniye Nasıl?

🎵 "İyi ki doğdun" şarkısını
2 kez söyle! 🎵

## Mikroplar

🦠 Mikroplar çok küçük
Gözle göremeyiz
Ama sabun onları öldürür!
💪 Sağlıklı kalırız!`,
        order: 1,
        images: ['hand-washing.png'],
      },
      {
        title: 'Diş Fırçalama',
        content: `# Diş Fırçalama 🦷

## Ne Zaman Fırçalarız?

🌅 Sabah (kahvaltıdan sonra)
🌙 Akşam (yatmadan önce)

= Günde 2 KEZ!

## Adımlar

1️⃣ Diş fırçanı al
2️⃣ Macun sık (bezelye kadar)
3️⃣ Ağzını ıslat
4️⃣ Üst dişleri fırçala
5️⃣ Alt dişleri fırçala
6️⃣ Dili fırçala
7️⃣ Ağzını çalkala
8️⃣ Tükür

## Ne Kadar Süre?

⏱️ 2 DAKİKA!
Kum saati veya şarkı kullan!

## Neden Önemli?

🦷 Dişler sağlıklı kalır
😁 Güzel gülümseriz
🍭 Çürük olmaz`,
        order: 2,
        images: ['tooth-brushing.png'],
      },
      {
        title: 'Tuvalet Kullanımı',
        content: `# Tuvalet Kullanımı 🚽

## Ne Zaman Giderim?

- Çişim gelince
- Karnım sıkışınca
- HEMEN git, bekleme!

## Adımlar

1️⃣ Tuvalete git
2️⃣ Kapıyı KAPAT
3️⃣ Pantolonu/eteği indir
4️⃣ Otur
5️⃣ İhtiyacını gider
6️⃣ Tuvalet kağıdı kullan
7️⃣ SİFONU ÇEK
8️⃣ Elbiseni giy
9️⃣ ELLERİNİ YIKA!

## Önemli!

🚪 Kapıyı kapat
🧻 Kağıt kullan
🚿 Sifonu çek
🧼 Ellerini yıka

## İyi Yapıyorsun! ⭐

Kendi başına yapabilirsin!`,
        order: 3,
        images: ['toilet-training.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Giyinme ve Soyunma',
    description: 'Kendi başına giyinmeyi öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Kıyafetleri Tanıyalım',
        content: `# Kıyafetler 👕

## Üst Giysi

👕 TİŞÖRT - Yazın giyeriz
🧥 CEKET - Dışarıda giyeriz
🧤 ELDİVEN - Eller üşümesin
🧣 ATKI - Boyun üşümesin
🎩 ŞAPKA - Baş üşümesin

## Alt Giysi

👖 PANTOLON
👗 ETEK (kızlar)
🩳 ŞORT - Yazın

## Ayak Giysi

🧦 ÇORAP
👟 AYAKKABI
🥾 BOT - Kışın

## İç Çamaşırı

🩲 İç çamaşırı
🎽 Fanila/Atlet

## Mevsime Göre

☀️ YAZ: Tişört, şort, sandalet
❄️ KIŞ: Kazak, mont, bot, eldiven`,
        order: 1,
        images: ['clothes.png'],
      },
      {
        title: 'Giyinme Adımları',
        content: `# Giyinme 👔

## SIRA ÖNEMLİ!

1️⃣ İç çamaşırı
2️⃣ Çorap
3️⃣ Pantolon / Etek
4️⃣ Tişört / Gömlek
5️⃣ Ayakkabı

## Tişört Giyme

1. Tişörtü tut
2. Kafa deliğini bul
3. Başını geçir
4. Kolları sok
5. Aşağı çek

## Pantolon Giyme

1. Otur
2. Bir bacağını sok
3. Diğer bacağını sok
4. Ayağa kalk
5. Yukarı çek

## Ayakkabı Giyme

👟 Sol ayak → Sol ayakkabı
👟 Sağ ayak → Sağ ayakkabı

## Aferin! 🌟

Kendi başına giyindin!`,
        order: 2,
        images: ['dressing-steps.png'],
      },
    ],
  },
];

// ==================== OKUL ÖNCESİ QUİZLER ====================
export const preschoolQuizzes = [
  {
    title: 'Renkler Quiz',
    description: 'Renkleri ne kadar biliyorsun?',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Elmanın rengi nedir?',
        options: ['Mavi', 'Kırmızı', 'Yeşil', 'Sarı'],
        answer: 'Kırmızı',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Gökyüzü hangi renk?',
        options: ['Kırmızı', 'Sarı', 'Mavi', 'Yeşil'],
        answer: 'Mavi',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Muz hangi renk?',
        options: ['Sarı', 'Mavi', 'Mor', 'Turuncu'],
        answer: 'Sarı',
        points: 10,
      },
    ],
  },
  {
    title: 'Şekiller Quiz',
    description: 'Şekilleri tanıyor musun?',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '⭕ Bu hangi şekil?',
        options: ['Kare', 'Daire', 'Üçgen', 'Dikdörtgen'],
        answer: 'Daire',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🔺 Bu şeklin kaç köşesi var?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Toplar daire şeklindedir.',
        answer: true,
        points: 10,
      },
    ],
  },
  {
    title: 'Vücut Bölümleri Quiz',
    description: 'Vücudunu tanıyor musun?',
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Kaç tane gözümüz var?',
        options: ['1', '2', '3', '4'],
        answer: '2',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangi organla koklarız?',
        options: ['Göz', 'Kulak', 'Burun', 'Ağız'],
        answer: 'Burun',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Bir elimizde kaç parmak var?',
        options: ['3', '4', '5', '6'],
        answer: '5',
        points: 10,
      },
    ],
  },
];

// ==================== OKUL ÖNCESİ OYUNLAR ====================
export const preschoolGames = [
  {
    title: 'Renk Eşleştirme',
    description: 'Renkleri nesnelerle eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 15,
    coinReward: 10,
    config: {
      pairs: [
        { left: '🔴', right: 'Kırmızı' },
        { left: '🔵', right: 'Mavi' },
        { left: '🟡', right: 'Sarı' },
        { left: '🟢', right: 'Yeşil' },
        { left: '🟠', right: 'Turuncu' },
      ],
    },
  },
  {
    title: 'Şekil Hafıza Oyunu',
    description: 'Aynı şekilleri bul!',
    type: GameType.MEMORY,
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 20,
    coinReward: 15,
    config: {
      cards: ['⭕', '⬜', '🔺', '▬'],
      gridSize: 2,
    },
  },
  {
    title: 'Büyük-Küçük Sınıflandırma',
    description: 'Büyük ve küçük nesneleri ayır!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.EASY,
    grade: GradeLevel.PRESCHOOL,
    xpReward: 20,
    coinReward: 15,
    config: {
      zones: ['Büyük', 'Küçük'],
      items: [
        { text: '🐘 Fil', zone: 'Büyük' },
        { text: '🐜 Karınca', zone: 'Küçük' },
        { text: '🏠 Ev', zone: 'Büyük' },
        { text: '🔑 Anahtar', zone: 'Küçük' },
      ],
    },
  },
];
