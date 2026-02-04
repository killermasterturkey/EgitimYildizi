// 5-8. SINIF - Kapsamlı Müfredat (Ortaokul)
// MEB Özel Eğitim Programına Uygun

import { Subject, GradeLevel, DifficultyLevel, QuestionType, GameType } from '@prisma/client';

// ==================== 5. SINIF ====================
export const grade5Lessons = [
  // ==================== MATEMATİK 5 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_5,
    title: 'Doğal Sayılar',
    description: 'Çok basamaklı doğal sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'On Binler ve Yüz Binler',
        content: `# Büyük Sayılar 🔢

## Basamak Sırası

Birler → Onlar → Yüzler → Binler →
**On Binler** → **Yüz Binler**

## Örnek: 123.456

1️⃣2️⃣3️⃣.4️⃣5️⃣6️⃣

1 = Yüz binler (100.000)
2 = On binler (20.000)
3 = Binler (3.000)
4 = Yüzler (400)
5 = Onlar (50)
6 = Birler (6)

## Okuma

10.000 = On bin
50.000 = Elli bin
100.000 = Yüz bin
123.456 = Yüz yirmi üç bin
          dört yüz elli altı

## 1 Milyon

1.000.000 = Bir milyon
= 1000 tane bin
= 10 tane yüz bin`,
        order: 1,
        images: ['large-numbers.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_5,
    title: 'Kesir İşlemleri',
    description: 'Kesirlerle toplama ve çıkarma',
    order: 2,
    topics: [
      {
        title: 'Paydaları Eşit Kesirler',
        content: `# Kesir Toplama ➕

## Paydalar Aynıysa

Payları topla, payda aynı kalır!

1/4 + 2/4 = 3/4
🟨⬜⬜⬜ + 🟨🟨⬜⬜ = 🟨🟨🟨⬜

## Örnekler

2/5 + 1/5 = 3/5
3/8 + 4/8 = 7/8
1/6 + 2/6 = 3/6 = 1/2

## Kesir Çıkarma ➖

Payları çıkar, payda aynı kalır!

3/4 - 1/4 = 2/4 = 1/2
🟨🟨🟨⬜ - 🟨⬜⬜⬜ = 🟨🟨⬜⬜

## Sadeleştirme

2/4 = 1/2 (ikiye böl)
4/8 = 1/2 (dörde böl)
3/6 = 1/2 (üçe böl)`,
        order: 1,
        images: ['fraction-operations.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_5,
    title: 'Ondalık Sayılar',
    description: 'Ondalık sayıları tanıyalım',
    order: 3,
    topics: [
      {
        title: 'Ondalık Kesir',
        content: `# Ondalık Sayılar 🔢

## Ondalık Kesir Nedir?

Virgüllü sayı = Ondalık kesir

**0,5** = Sıfır virgül beş = 1/2
**0,25** = Sıfır virgül yirmi beş = 1/4

## Virgülün Önemi

Virgülden ÖNCE = Tam kısım
Virgülden SONRA = Kesir kısım

**3,5** = 3 tam, 5 onda = 3 + 1/2

## Örnekler

0,1 = Onda bir = 1/10
0,5 = Onda beş = 5/10 = 1/2
0,25 = Yüzde yirmi beş = 25/100 = 1/4
0,75 = Yüzde yetmiş beş = 75/100 = 3/4

## Hayatta

1,5 litre su = 1 buçuk litre
2,50 TL = 2 lira 50 kuruş`,
        order: 1,
        images: ['decimals.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 5 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_5,
    title: 'Sözcük Türleri',
    description: 'İsim, fiil ve sıfatları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'İsim ve Fiil',
        content: `# Sözcük Türleri 📖

## İSİM (Ad)

Varlıkların adı = İSİM

👦 Ali, Ayşe (özel isim)
🏠 ev, masa, kitap (cins isim)
💭 sevgi, mutluluk (soyut isim)

## FİİL (Eylem)

İş, oluş, hareket bildiren = FİİL

🏃 koşmak, yürümek, oynamak
📖 okumak, yazmak, dinlemek
😊 sevmek, gülmek, ağlamak

## SIFAT

İsimlerin özelliğini anlatan = SIFAT

🔴 kırmızı elma
📏 uzun boy
🌟 güzel çiçek

## Örnekler

"Güzel kız koşuyor"
- güzel = sıfat
- kız = isim
- koşuyor = fiil`,
        order: 1,
        images: ['word-types.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 5 ====================
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_5,
    title: 'Vücudumuz',
    description: 'Vücudumuzun sistemlerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Sindirim Sistemi',
        content: `# Sindirim Sistemi 🍎

## Sindirim Nedir?

Besinlerin parçalanması = SİNDİRİM

## Sindirim Yolu

1️⃣ **AĞIZ** 👄
   Çiğneme başlar
   Tükürük karışır

2️⃣ **YEMEK BORUSU**
   Yutkunma

3️⃣ **MİDE**
   Mide suları karışır
   Besin parçalanır

4️⃣ **İNCE BAĞIRSAK**
   Besinler emilir
   Kana karışır

5️⃣ **KALIN BAĞIRSAK**
   Su emilir
   Atık oluşur

## Sağlıklı Sindirim

✅ Yavaş ye
✅ İyi çiğne
✅ Su iç
✅ Sebze meyve ye`,
        order: 1,
        images: ['digestive-system.png'],
      },
    ],
  },
  // ==================== SOSYAL BİLGİLER 5 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_5,
    title: 'Bölgelerimiz',
    description: 'Türkiyenin coğrafi bölgelerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Yedi Bölge',
        content: `# Türkiye Bölgeleri 🗺️

## 7 Coğrafi Bölge

### 1. MARMARA BÖLGESİ
- En kalabalık bölge
- İstanbul burada
- Sanayi gelişmiş

### 2. EGE BÖLGESİ
- Zeytincilik
- Turizm
- İzmir önemli şehir

### 3. AKDENİZ BÖLGESİ
- Sıcak iklim
- Turunçgiller
- Antalya, Mersin

### 4. İÇ ANADOLU BÖLGESİ
- Başkent Ankara
- Tahıl üretimi
- Step iklimi

### 5. KARADENİZ BÖLGESİ
- Yağışlı iklim
- Çay, fındık
- Yeşillik

### 6. DOĞU ANADOLU BÖLGESİ
- Soğuk kışlar
- Hayvancılık
- Van Gölü

### 7. GÜNEYDOĞU ANADOLU BÖLGESİ
- Sıcak, kurak
- GAP projesi
- Tarım`,
        order: 1,
        images: ['turkey-regions.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 5 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_5,
    title: 'İletişim Becerileri',
    description: 'Etkili iletişim kurmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Etkili İletişim',
        content: `# İletişim 🗣️

## İyi İletişim

✅ **Göz teması kur**
   Konuşurken göz göze gel

✅ **Dinle**
   Karşındakini dinle
   Sözünü kesme

✅ **Anlaşılır konuş**
   Net ve açık ol
   Yavaş konuş

✅ **Saygılı ol**
   Nazik kelimeler kullan
   Bağırma

## Beden Dili

😊 Gülümse
👀 Göz teması
🤝 Açık duruş
❌ Kolları kavuşturma

## Çatışma Çözme

1. Sakinleş
2. Dinle
3. Fikrini söyle
4. Çözüm ara
5. Anlaş

## "Ben" Dili

❌ "Sen hep yanlış yapıyorsun"
✅ "Ben üzüldüm çünkü..."`,
        order: 1,
        images: ['communication.png'],
      },
    ],
  },
  // ==================== İNGİLİZCE 5 ====================
  {
    subject: Subject.ENGLISH,
    grade: GradeLevel.GRADE_5,
    title: 'Numbers and Colors',
    description: 'Sayılar ve renkler',
    order: 1,
    topics: [
      {
        title: 'Numbers 1-20',
        content: `# Numbers 🔢

## 1-10

1 = one (van)
2 = two (tu)
3 = three (tıri)
4 = four (for)
5 = five (fayv)
6 = six (siks)
7 = seven (sevın)
8 = eight (eyt)
9 = nine (nayn)
10 = ten (ten)

## 11-20

11 = eleven (ilevın)
12 = twelve (tvelv)
13 = thirteen (törtiin)
14 = fourteen (fortiin)
15 = fifteen (fiftiin)
16 = sixteen (sikstiin)
17 = seventeen (sevıntiin)
18 = eighteen (eytiin)
19 = nineteen (nayntiin)
20 = twenty (tventi)

## Practice

How old are you?
I am ten years old.`,
        order: 1,
        images: ['numbers-english.png'],
      },
      {
        title: 'Colors',
        content: `# Colors 🌈

## Basic Colors

🔴 red (red) = kırmızı
🔵 blue (blu) = mavi
🟡 yellow (yelou) = sarı
🟢 green (griin) = yeşil
🟠 orange (orinc) = turuncu
🟣 purple (pörpıl) = mor
⚫ black (blek) = siyah
⚪ white (vayt) = beyaz
🟤 brown (braun) = kahverengi
🩷 pink (pink) = pembe

## Questions

What color is it?
It is red.

What is your favorite color?
My favorite color is blue.

## Practice

The apple is red. 🍎
The sky is blue. 🌤️
The sun is yellow. ☀️`,
        order: 2,
        images: ['colors-english.png'],
      },
    ],
  },
];

// ==================== 6. SINIF ====================
export const grade6Lessons = [
  // ==================== MATEMATİK 6 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_6,
    title: 'Tam Sayılar',
    description: 'Pozitif ve negatif sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Tam Sayılar',
        content: `# Tam Sayılar 🔢

## Tam Sayı Nedir?

... -3, -2, -1, 0, +1, +2, +3 ...

## Pozitif ve Negatif

**Pozitif (+):** Sıfırdan büyük
+1, +2, +3, +4 ...

**Negatif (-):** Sıfırdan küçük
-1, -2, -3, -4 ...

**Sıfır (0):** Ne pozitif ne negatif

## Sayı Doğrusu

←─┼─┼─┼─┼─┼─┼─┼─→
 -3 -2 -1  0 +1 +2 +3

## Hayatta Negatif

🌡️ Sıcaklık: -5°C (sıfırın altı)
🏠 Kat: -1 (bodrum)
⚽ Gol averajı: -2

## Karşılaştırma

+5 > +2 (5 büyük)
-2 > -5 (dikkat! -2 büyük)
+3 > -3`,
        order: 1,
        images: ['integers.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_6,
    title: 'Oran ve Orantı',
    description: 'Oran ve orantı kavramlarını öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Oran Nedir?',
        content: `# Oran ve Orantı ⚖️

## Oran Nedir?

İki sayının bölümü = ORAN

A oranı B = A/B veya A:B

## Örnek

Sınıfta 12 kız, 8 erkek var.

Kız/Erkek oranı = 12/8 = 3/2
"3'e 2" diye okuruz.

## Orantı Nedir?

İki oranın eşitliği = ORANTI

2/4 = 3/6 (orantılı)
1/2 = 1/2 ✅

## Hayatta Oran

Tarif: 2 bardak un, 1 bardak su
Un/Su = 2/1

Harita: 1 cm = 100 km
Ölçek = 1:10.000.000`,
        order: 1,
        images: ['ratio.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 6 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_6,
    title: 'Cümle Bilgisi',
    description: 'Cümle çeşitlerini öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Cümle Çeşitleri',
        content: `# Cümle Çeşitleri 📝

## Anlamına Göre

**1. Olumlu Cümle**
Ali okula gitti. ✅

**2. Olumsuz Cümle**
Ali okula gitmedi. ❌

**3. Soru Cümlesi**
Ali okula gitti mi? ❓

**4. Ünlem Cümlesi**
Ne güzel bir gün! ❗

**5. Emir Cümlesi**
Otur! Gel! Yaz!

## Yüklemine Göre

**İsim Cümlesi**
Yüklem isim: "Ali öğrenci**dir**."

**Fiil Cümlesi**
Yüklem fiil: "Ali koşu**yor**."

## Cümle Ögeleri

Özne: Kim? Ne?
Yüklem: Ne yaptı?
Nesne: Kimi? Neyi?
Tümleç: Nereye? Ne zaman?`,
        order: 1,
        images: ['sentence-types.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 6 ====================
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_6,
    title: 'Hücre',
    description: 'Canlıların yapı taşı hücreyi öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Hücre Yapısı',
        content: `# Hücre 🔬

## Hücre Nedir?

Canlıların en küçük yapı taşı = HÜCRE

Tüm canlılar hücrelerden oluşur!

## Hücre Bölümleri

**1. HÜCRE ZARI**
- Hücreyi sarar
- Korur
- Madde alışverişi

**2. SİTOPLAZMA**
- Jel gibi sıvı
- Organeller burada

**3. ÇEKİRDEK**
- Hücrenin beyni
- DNA burada
- Yönetim merkezi

## Bitki vs Hayvan Hücresi

| Bitki | Hayvan |
|-------|--------|
| Hücre duvarı VAR | YOK |
| Kloroplast VAR | YOK |
| Kare şekilli | Yuvarlak |

## Organeller

- Mitokondri (enerji)
- Ribozom (protein)
- Golgi (paketleme)`,
        order: 1,
        images: ['cell.png'],
      },
    ],
  },
  // ==================== SOSYAL BİLGİLER 6 ====================
  {
    subject: Subject.SOCIAL_STUDIES,
    grade: GradeLevel.GRADE_6,
    title: 'Demokrasi',
    description: 'Demokrasi ve vatandaşlık',
    order: 1,
    topics: [
      {
        title: 'Demokrasi Nedir?',
        content: `# Demokrasi 🗳️

## Demokrasi Nedir?

Halkın yönetimi = DEMOKRASİ

Halk seçer, halk karar verir.

## Türkiye Cumhuriyeti

🇹🇷 Demokratik bir devlet
📅 1923'te kuruldu
👤 Atatürk kurdu

## Seçim ve Oy

- 18 yaşından büyükler oy verir
- Gizli oy, açık sayım
- Seçimle yöneticiler belirlenir

## Vatandaşlık Hakları

✅ Seçme ve seçilme
✅ Eğitim hakkı
✅ Sağlık hakkı
✅ Düşünce özgürlüğü
✅ Çalışma hakkı

## Vatandaşlık Görevleri

📚 Eğitim almak
⚖️ Yasalara uymak
🪖 Askerlik (erkekler)
💰 Vergi vermek`,
        order: 1,
        images: ['democracy.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 6 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_6,
    title: 'Stres Yönetimi',
    description: 'Stresle başa çıkmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Stresi Yönetme',
        content: `# Stres Yönetimi 😌

## Stres Nedir?

Baskı hissi = STRES

Sınav, sorun, değişiklik stresi artırır.

## Stres Belirtileri

😰 Endişe
😤 Sinirlilik
😴 Uyku problemi
🤕 Baş ağrısı
💓 Hızlı kalp

## Stresle Başa Çıkma

### 1. Derin Nefes
4 saniye nefes al
4 saniye tut
4 saniye ver

### 2. Egzersiz 🏃
Hareket et, spor yap

### 3. Konuş 🗣️
Güvendiğin biriyle paylaş

### 4. Dinlen 😴
Yeterli uyu

### 5. Hobi 🎨
Sevdiğin şeylerle uğraş

## Unutma!

Stres normaldir!
Yönetilebilir! 💪`,
        order: 1,
        images: ['stress-management.png'],
      },
    ],
  },
  // ==================== İNGİLİZCE 6 ====================
  {
    subject: Subject.ENGLISH,
    grade: GradeLevel.GRADE_6,
    title: 'Daily Routines',
    description: 'Günlük rutinler',
    order: 1,
    topics: [
      {
        title: 'My Day',
        content: `# Daily Routines 📅

## Morning

I **wake up** at 7.
(Saat 7'de uyanırım)

I **brush my teeth**.
(Dişlerimi fırçalarım)

I **have breakfast**.
(Kahvaltı yaparım)

I **go to school**.
(Okula giderim)

## Afternoon

I **have lunch**.
(Öğle yemeği yerim)

I **do homework**.
(Ödev yaparım)

I **play games**.
(Oyun oynarım)

## Evening

I **have dinner**.
(Akşam yemeği yerim)

I **watch TV**.
(TV izlerim)

I **go to bed**.
(Yatağa giderim)

## Question

What time do you wake up?
I wake up at 7 o'clock.`,
        order: 1,
        images: ['daily-routines.png'],
      },
    ],
  },
];

// ==================== 7. SINIF ====================
export const grade7Lessons = [
  // ==================== MATEMATİK 7 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_7,
    title: 'Rasyonel Sayılar',
    description: 'Rasyonel sayıları öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Rasyonel Sayı',
        content: `# Rasyonel Sayılar 🔢

## Rasyonel Sayı Nedir?

a/b şeklinde yazılabilen sayılar
(b ≠ 0)

## Örnekler

1/2 = rasyonel ✅
-3/4 = rasyonel ✅
5 = 5/1 = rasyonel ✅
0,75 = 3/4 = rasyonel ✅

## Sayı Doğrusunda

←─┼───┼───┼───┼───┼─→
  -1  -1/2   0   1/2   1

## İşlemler

**Toplama:**
1/4 + 2/4 = 3/4

**Çıkarma:**
3/4 - 1/4 = 2/4 = 1/2

**Çarpma:**
1/2 × 1/3 = 1/6
(Pay×pay, payda×payda)

**Bölme:**
1/2 ÷ 1/4 = 1/2 × 4/1 = 2
(Ters çevir, çarp)`,
        order: 1,
        images: ['rational-numbers.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_7,
    title: 'Yüzde Hesaplama',
    description: 'Yüzde hesaplamayı öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Yüzde',
        content: `# Yüzde (%) 💯

## Yüzde Nedir?

Yüzde = 100'de kaç

%25 = 25/100 = 1/4
%50 = 50/100 = 1/2
%75 = 75/100 = 3/4
%100 = 100/100 = 1 (tam)

## Yüzde Hesaplama

200'ün %25'i kaç?

Yol 1: 200 × 25/100 = 50
Yol 2: 200 × 0,25 = 50

## Yüzde Bulma

50, 200'ün yüzde kaçı?

50/200 × 100 = 25
Cevap: %25

## Hayatta Yüzde

🏷️ %20 indirim
📊 %80 başarı
🔋 %50 şarj`,
        order: 1,
        images: ['percentage.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 7 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_7,
    title: 'Yazım Kuralları',
    description: 'Doğru yazım kurallarını öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Yazım Kuralları',
        content: `# Yazım Kuralları ✍️

## Büyük Harf

✅ Cümle başı: **B**ugün hava güzel.
✅ Özel isimler: **A**li, **T**ürkiye
✅ Unvanlar: **D**r., **P**rof.

## Noktalama

**.** Cümle sonu
**,** Ara verme
**?** Soru
**!** Ünlem
**:** Açıklama önce
**;** Bağımsız cümleler arası
**"..."** Alıntı

## "de" ve "da"

Ayrı yazılır (bağlaç):
Ben **de** geldim.
O **da** geldi.

Bitişik yazılır (hal eki):
Ev**de** kaldım.
Okul**da** gördüm.

## "-ki"

Bitişik: Dünkü, bugünkü
Ayrı: Biliyorum ki gelecek`,
        order: 1,
        images: ['spelling-rules.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 7 ====================
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_7,
    title: 'Kuvvet ve Hareket',
    description: 'Kuvvet ve hareket kavramlarını öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Kuvvet',
        content: `# Kuvvet ve Hareket 💪

## Kuvvet Nedir?

İtme veya çekme = KUVVET

Birimi: Newton (N)

## Kuvvet Çeşitleri

**Yerçekimi Kuvveti**
Dünya bizi çeker.
Düşme nedeni.

**Sürtünme Kuvveti**
Hareketi yavaşlatır.
Fren bu sayede çalışır.

**Manyetik Kuvvet**
Mıknatıs çeker/iter.

## Hareket

Yer değiştirme = HAREKET

**Hız = Yol / Zaman**

100 km / 2 saat = 50 km/saat

## Newton Kanunu

Kuvvet yoksa:
- Duran durur
- Hareket eden hızını korur

Bu: Eylemsizlik`,
        order: 1,
        images: ['force.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 7 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_7,
    title: 'Hedef Belirleme',
    description: 'Hedef belirleme ve planlama',
    order: 1,
    topics: [
      {
        title: 'SMART Hedefler',
        content: `# Hedef Belirleme 🎯

## İyi Hedef Nasıl Olur?

**S**pecific - Belirli
**M**easurable - Ölçülebilir
**A**chievable - Ulaşılabilir
**R**elevant - İlgili
**T**ime-bound - Zamanlı

## Kötü vs İyi Hedef

❌ "Daha iyi olacağım"
✅ "Bu dönem matematik notumu
    70'den 85'e çıkaracağım"

## Hedef Türleri

**Kısa vadeli:** 1 hafta - 1 ay
"Bu hafta 3 kitap okuyacağım"

**Orta vadeli:** 1-6 ay
"Dönem sonuna kadar yüzmeyi öğreneceğim"

**Uzun vadeli:** 1 yıl +
"Üniversiteye gideceğim"

## Plan Yap

1. Hedefi yaz
2. Adımları belirle
3. Takvim oluştur
4. Takip et
5. Ödüllendir`,
        order: 1,
        images: ['goal-setting.png'],
      },
    ],
  },
];

// ==================== 8. SINIF ====================
export const grade8Lessons = [
  // ==================== MATEMATİK 8 ====================
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_8,
    title: 'Denklemler',
    description: 'Birinci dereceden denklemler',
    order: 1,
    topics: [
      {
        title: 'Denklem Çözme',
        content: `# Denklemler ⚖️

## Denklem Nedir?

Eşitlik içeren ifade = DENKLEM

x + 3 = 7

x = bilinmeyen (bulmak istediğimiz)

## Denklem Çözme

**x + 3 = 7**

Her iki taraftan 3 çıkar:
x + 3 - 3 = 7 - 3
x = 4 ✅

**2x = 10**

Her iki tarafı 2'ye böl:
2x/2 = 10/2
x = 5 ✅

## Kontrol

x = 4 doğru mu?
4 + 3 = 7 ✅

## Örnekler

x - 5 = 3 → x = 8
3x = 12 → x = 4
x/2 = 6 → x = 12`,
        order: 1,
        images: ['equations.png'],
      },
    ],
  },
  {
    subject: Subject.MATH,
    grade: GradeLevel.GRADE_8,
    title: 'Üçgenler',
    description: 'Üçgenlerin özellikleri',
    order: 2,
    topics: [
      {
        title: 'Üçgen Özellikleri',
        content: `# Üçgenler 🔺

## Üçgen Nedir?

3 kenar, 3 köşe, 3 açı

## Üçgen Türleri (Kenar)

**Eşkenar Üçgen**
3 kenar eşit
3 açı = 60°

**İkizkenar Üçgen**
2 kenar eşit
2 açı eşit

**Çeşitkenar Üçgen**
Hiçbir kenar eşit değil

## Üçgen Türleri (Açı)

**Dar Açılı**
Tüm açılar < 90°

**Dik Açılı**
Bir açı = 90°

**Geniş Açılı**
Bir açı > 90°

## Önemli Kural

Üçgenin iç açıları toplamı:
**180°**

60° + 60° + 60° = 180° ✅`,
        order: 1,
        images: ['triangles.png'],
      },
    ],
  },
  // ==================== TÜRKÇE 8 ====================
  {
    subject: Subject.TURKISH,
    grade: GradeLevel.GRADE_8,
    title: 'Kompozisyon',
    description: 'Kompozisyon yazma teknikleri',
    order: 1,
    topics: [
      {
        title: 'Kompozisyon Yazma',
        content: `# Kompozisyon 📝

## Kompozisyon Bölümleri

### 1. GİRİŞ
- Konuyu tanıt
- Dikkat çek
- 1-2 paragraf

### 2. GELİŞME
- Ana fikri açıkla
- Örnekler ver
- Detaylar ekle
- 2-4 paragraf

### 3. SONUÇ
- Özet yap
- Son düşünce
- 1 paragraf

## İpuçları

✅ Plan yap
✅ Taslak oluştur
✅ Düzgün yaz
✅ Kontrol et
✅ Düzelt

## Örnek Konular

- Çevre sorunları
- Teknoloji
- Dostluk
- Hayallerim`,
        order: 1,
        images: ['essay.png'],
      },
    ],
  },
  // ==================== FEN BİLİMLERİ 8 ====================
  {
    subject: Subject.SCIENCE,
    grade: GradeLevel.GRADE_8,
    title: 'Elektrik',
    description: 'Elektrik ve devreler',
    order: 1,
    topics: [
      {
        title: 'Elektrik Devreleri',
        content: `# Elektrik ⚡

## Elektrik Nedir?

Elektronların hareketi = ELEKTRİK

## Elektrik Devresi

Devre = Elektriğin aktığı yol

### Devre Elemanları

🔋 **Pil** - Enerji kaynağı
💡 **Ampul** - Işık verir
🔌 **Kablo** - Bağlantı
🔘 **Anahtar** - Açma/kapama

## Devre Türleri

**Seri Devre**
Elemanlar arka arkaya
Biri bozulursa hepsi söner

**Paralel Devre**
Elemanlar yan yana
Biri bozulursa diğerleri yanar

## Elektrik Güvenliği

⚠️ Islak elle dokunma
⚠️ Prize parmak sokma
⚠️ Hasarlı kablo kullanma
✅ Dikkatli ol!`,
        order: 1,
        images: ['electricity.png'],
      },
    ],
  },
  // ==================== YAŞAM BECERİLERİ 8 ====================
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_8,
    title: 'Kariyer Planlama',
    description: 'Gelecek için kariyer planlama',
    order: 1,
    topics: [
      {
        title: 'Meslek Seçimi',
        content: `# Kariyer Planlama 🎓

## Kendini Tanı

**İlgi alanların neler?**
- Sanat mı? Bilim mi?
- İnsanlarla mı? Tek başına mı?

**Yeteneklerin neler?**
- Matematik iyi mi?
- İletişim güçlü mü?

**Değerlerin neler?**
- Para mı önemli?
- Yardım etmek mi?

## Meslek Grupları

👨‍⚕️ Sağlık: Doktor, hemşire
👨‍🏫 Eğitim: Öğretmen
👨‍💼 İş: Yönetici, muhasebeci
👨‍🔧 Teknik: Mühendis, teknisyen
🎨 Sanat: Ressam, müzisyen
👨‍💻 Teknoloji: Programcı

## Lise Seçimi

📚 Fen Lisesi
📖 Anadolu Lisesi
🔧 Meslek Lisesi
🎨 Güzel Sanatlar

## Planlama

1. Kendini tanı
2. Meslekleri araştır
3. Lise seç
4. Çalış!`,
        order: 1,
        images: ['career.png'],
      },
    ],
  },
];

// ==================== QUİZLER ====================
export const grade5Quizzes = [
  {
    title: 'Ondalık Sayılar Quiz',
    description: 'Ondalık sayıları test et!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_5,
    xpReward: 35,
    coinReward: 25,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '0,5 kaça eşittir?',
        options: ['1/4', '1/2', '1/3', '2/3'],
        answer: '1/2',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1/4 ondalık olarak kaç?',
        options: ['0,25', '0,5', '0,75', '0,4'],
        answer: '0,25',
        points: 10,
      },
    ],
  },
];

export const grade6Quizzes = [
  {
    title: 'Tam Sayılar Quiz',
    description: 'Pozitif ve negatif!',
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_6,
    xpReward: 35,
    coinReward: 25,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '-5 ile +3 arasında hangisi büyük?',
        options: ['-5', '+3', 'Eşit', 'Bilinemez'],
        answer: '+3',
        points: 10,
      },
    ],
  },
];

export const grade7Quizzes = [
  {
    title: 'Yüzde Quiz',
    description: 'Yüzde hesaplama!',
    difficulty: DifficultyLevel.HARD,
    grade: GradeLevel.GRADE_7,
    xpReward: 40,
    coinReward: 30,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '200 ün %50 si kaç?',
        options: ['50', '100', '150', '25'],
        answer: '100',
        points: 10,
      },
    ],
  },
];

export const grade8Quizzes = [
  {
    title: 'Denklem Quiz',
    description: 'Denklem çöz!',
    difficulty: DifficultyLevel.HARD,
    grade: GradeLevel.GRADE_8,
    xpReward: 45,
    coinReward: 35,
    questions: [
      {
        type: QuestionType.FILL_BLANK,
        text: 'x + 5 = 12 ise x = ___',
        answer: '7',
        points: 15,
      },
      {
        type: QuestionType.FILL_BLANK,
        text: '2x = 16 ise x = ___',
        answer: '8',
        points: 15,
      },
    ],
  },
];

// ==================== OYUNLAR ====================
export const grade5Games = [
  {
    title: 'Ondalık-Kesir Eşleştirme',
    description: 'Eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_5,
    xpReward: 35,
    coinReward: 25,
    config: {
      pairs: [
        { left: '0,5', right: '1/2' },
        { left: '0,25', right: '1/4' },
        { left: '0,75', right: '3/4' },
        { left: '0,1', right: '1/10' },
      ],
    },
  },
];

export const grade6Games = [
  {
    title: 'Tam Sayı Sıralama',
    description: 'Küçükten büyüğe sırala!',
    type: GameType.SORTING,
    difficulty: DifficultyLevel.MEDIUM,
    grade: GradeLevel.GRADE_6,
    xpReward: 35,
    coinReward: 25,
    config: {
      items: ['-3', '-1', '0', '+2', '+5'],
      correctOrder: ['-3', '-1', '0', '+2', '+5'],
    },
  },
];

export const grade7Games = [
  {
    title: 'Yüzde Arcade',
    description: 'Doğru yüzdeyi bul!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.HARD,
    grade: GradeLevel.GRADE_7,
    xpReward: 40,
    coinReward: 30,
    config: {
      questions: [
        { question: '100\'ün %50\'si', answer: 50, wrong: [25, 75, 100] },
        { question: '200\'ün %25\'i', answer: 50, wrong: [25, 75, 100] },
      ],
    },
  },
];

export const grade8Games = [
  {
    title: 'Denklem Çözücü',
    description: 'X i bul!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.HARD,
    grade: GradeLevel.GRADE_8,
    xpReward: 45,
    coinReward: 35,
    config: {
      questions: [
        { question: 'x + 3 = 8', answer: 5, wrong: [3, 8, 11] },
        { question: '2x = 14', answer: 7, wrong: [2, 14, 28] },
      ],
    },
  },
];
