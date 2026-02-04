// Life Skills & Special Education Content
// Yaşam Becerileri ve Özel Eğitim İçerikleri

import { Subject, GradeLevel } from '@prisma/client';

// ==================== YAŞAM BECERİLERİ ====================

export const lifeSkillsLessons = [
  // Okul Öncesi - Temel Beceriler
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Tuvalet Eğitimi',
    description: 'Tuvaleti doğru kullanmayı öğrenelim',
    order: 2,
    topics: [
      {
        title: 'Tuvalete Gitme',
        content: `# Tuvalet Kullanımı 🚽

## Ne Zaman Giderim?

İhtiyaç hissedince tuvalet zamanı!
- Karnın sıkışınca
- Çişin gelince

## Adımlar

1️⃣ Tuvalete git
2️⃣ Kapıyı kapat
3️⃣ Pantolonunu indir
4️⃣ Otur
5️⃣ İhtiyacını gider
6️⃣ Tuvalet kağıdı kullan
7️⃣ Sifonu çek
8️⃣ ELLERİNİ YIKA! 🧼

## Önemli!

✅ Kapıyı kapat
✅ Sifonu çek
✅ Elleri sabunla yıka
✅ Kurula

## İyi Yapıyorsun! ⭐`,
        order: 1,
        images: ['toilet-training.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Giyinme',
    description: 'Kendi başına giyinmeyi öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Kıyafet Giyme',
        content: `# Giyinme 👕

## Sıra Önemli!

1️⃣ İç çamaşırı
2️⃣ Çorap
3️⃣ Pantolon / Etek
4️⃣ Tişört / Gömlek
5️⃣ Ayakkabı

## Tişört Giyme

1. Başını delikten geçir
2. Kollarını kolluklara sok
3. Aşağı çek

## Pantolon Giyme

1. Otur
2. Bir bacağını sok
3. Diğer bacağını sok
4. Ayağa kalk
5. Yukarı çek
6. Düğmele veya bağla

## Ayakkabı Giyme

👟 Sol ayak - Sol ayakkabı
👟 Sağ ayak - Sağ ayakkabı

## Aferin! Giyindin! 🌟`,
        order: 1,
        images: ['dressing.png'],
      },
    ],
  },
  // 1. Sınıf - Güvenlik
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_1,
    title: 'Güvenli Yaşam',
    description: 'Güvenlik kurallarını öğrenelim',
    order: 3,
    topics: [
      {
        title: 'Ev Güvenliği',
        content: `# Evde Güvenlik 🏠

## Tehlikeli Şeyler

❌ Ocağa dokunma
❌ Prize parmak sokma
❌ Temizlik malzemelerine dokunma
❌ İlaçları alma
❌ Pencereden sarkma

## Güvenli Davranışlar

✅ Yardım iste
✅ Büyüklere sor
✅ Dikkatli ol
✅ Koşma evde

## Acil Durumlarda

🚨 Anne/babayı çağır
📞 112'yi ara (büyüklerle)
🚪 Dışarı çık (yangında)

## Önemli Numaralar

📞 112 - Acil yardım
📞 155 - Polis
📞 110 - İtfaiye`,
        order: 1,
        images: ['home-safety.png'],
      },
      {
        title: 'Trafik Güvenliği',
        content: `# Trafikte Güvenlik 🚦

## Trafik Işıkları

🔴 KIRMIZI = DUR!
🟡 SARI = HAZIRLAN
🟢 YEŞİL = GEÇ

## Yaya Kuralları

✅ Kaldırımda yürü
✅ Yaya geçidini kullan
✅ Sağa sola bak
✅ Yeşil ışıkta geç
✅ Büyüğünün elini tut

## Araçta Güvenlik

✅ Emniyet kemeri tak
✅ Cam açma
✅ Otur yerinde
❌ Sürücüyü rahatsız etme

## Hatırla!

YOL KENARINDA OYNAMA!
TOPUN ARKASINDA KOŞMA!`,
        order: 2,
        images: ['traffic-safety.png'],
      },
    ],
  },
  // 2. Sınıf - Sosyal Beceriler
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_2,
    title: 'Arkadaşlık',
    description: 'İyi bir arkadaş olmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'İyi Arkadaş Olmak',
        content: `# Arkadaşlık 🤝

## İyi Arkadaş Ne Yapar?

😊 Gülümser
👂 Dinler
🤝 Paylaşır
💪 Yardım eder
🗣️ Nazik konuşur

## Arkadaşlık Kuralları

✅ "Merhaba" de
✅ İsmini söyle
✅ "Oynayalım mı?" sor
✅ Sırayla oyna
✅ "Teşekkürler" de

## Problem Çözme

😠 Kavga etme!
🗣️ Konuş
👂 Dinle
🤝 Anlaş
😊 Barış

## Kötü Arkadaş Değiliz

❌ Vurmayız
❌ İtmeyiz
❌ Alay etmeyiz
❌ Dışlamayız`,
        order: 1,
        images: ['friendship.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_2,
    title: 'Duygularımız',
    description: 'Duygularımızı tanıyalım ve ifade edelim',
    order: 2,
    topics: [
      {
        title: 'Duyguları Tanıma',
        content: `# Duygularımız 💝

## Temel Duygular

😊 MUTLU - İyi hissediyorum!
😢 ÜZGÜN - Kötü hissediyorum
😠 KIZGIN - Sinirli hissediyorum
😨 KORKMUŞ - Tedirginim
😲 ŞAŞKIN - Beklemiyordum!

## Ne Zaman Hissederiz?

😊 Mutlu: Oyun oynarken, hediye alınca
😢 Üzgün: Arkadaşım gidince
😠 Kızgın: Haksızlık olunca
😨 Korkmuş: Karanlıkta
😲 Şaşkın: Sürpriz olunca

## Duyguları İfade Etme

🗣️ "Ben ... hissediyorum"
🗣️ "... olunca üzülüyorum"
🗣️ "Bu beni mutlu etti"

## Tüm Duygular Normal!

Her duygu olabilir.
Önemli olan ifade etmek!`,
        order: 1,
        images: ['emotions.png'],
      },
    ],
  },
  // 3. Sınıf - Bağımsız Yaşam
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_3,
    title: 'Para Kullanımı',
    description: 'Parayı tanıyalım ve kullanmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Parayı Tanıyalım',
        content: `# Para 💰

## Türk Lirası (TL)

Paralar (Madeni):
🪙 1 Kuruş
🪙 5 Kuruş
🪙 10 Kuruş
🪙 25 Kuruş
🪙 50 Kuruş
🪙 1 Lira

Kağıt Paralar:
💵 5 TL
💵 10 TL
💵 20 TL
💵 50 TL
💵 100 TL
💵 200 TL

## Para Saymak

1 TL + 1 TL = 2 TL
5 TL + 5 TL = 10 TL

## Alışveriş

Bir şey almak için para veririz.
Para yetmezse alamayız.

## Birikim

🐷 Kumbarada biriktir
💰 Hedef koy
⏰ Sabırlı ol`,
        order: 1,
        images: ['money.png'],
      },
    ],
  },
  // 4. Sınıf - İleri Beceriler
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.GRADE_4,
    title: 'Zaman Yönetimi',
    description: 'Zamanımızı iyi kullanmayı öğrenelim',
    order: 1,
    topics: [
      {
        title: 'Günlük Plan',
        content: `# Zaman Yönetimi ⏰

## Günün Bölümleri

🌅 SABAH (06:00 - 12:00)
- Uyanma, hazırlanma
- Okul

🌞 ÖĞLE (12:00 - 18:00)
- Yemek
- Ders çalışma
- Oyun

🌙 AKŞAM (18:00 - 22:00)
- Akşam yemeği
- Aile zamanı
- Uyku hazırlığı

## Öncelik Sırası

1️⃣ Önce önemli işler
2️⃣ Sonra oyun
3️⃣ En son eğlence

## Günlük Program Örneği

07:00 - Uyan
07:30 - Kahvaltı
08:00 - Okul
15:00 - Ödev
16:00 - Oyun
19:00 - Yemek
21:00 - Uyku

## Plan Yap!

📝 Her akşam yarını planla
✅ Yapınca işaretle
⭐ Kendini ödüllendir`,
        order: 1,
        images: ['time-management.png'],
      },
    ],
  },
];

// ==================== MOTOR BECERİLER ====================

export const motorSkillsLessons = [
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'İnce Motor Beceriler',
    description: 'El ve parmak becerilerini geliştirelim',
    order: 4,
    topics: [
      {
        title: 'Parmak Egzersizleri',
        content: `# Parmak Oyunları 🖐️

## Parmak Isınma

1. Ellerini aç kapa
2. Parmakları sık gevşet
3. Her parmağı tek tek kıvır

## Makas Tutma ✂️

1. Baş parmak üst deliğe
2. İşaret + orta parmak alt deliğe
3. Aç kapa yap

## Kalem Tutma ✏️

1. Baş parmak + İşaret parmak
2. Orta parmak alttan destekler
3. Hafif tut, sıkma

## Aktiviteler

🎨 Boyama yap
✂️ Kağıt kes
🧩 Puzzle yap
🪢 Bağcık bağla
🔘 Düğme ilikle

## Her Gün Pratik Yap!

Günde 10 dakika yeter!`,
        order: 1,
        images: ['fine-motor.png'],
      },
    ],
  },
  {
    subject: Subject.LIFE_SKILLS,
    grade: GradeLevel.PRESCHOOL,
    title: 'Kaba Motor Beceriler',
    description: 'Vücut hareketlerini geliştirelim',
    order: 5,
    topics: [
      {
        title: 'Hareket Zamanı',
        content: `# Hareket Edelim! 🏃

## Temel Hareketler

🚶 YÜRÜME
- Düz yürü
- Çizgi üstünde yürü
- Geri geri yürü

🏃 KOŞMA
- Yavaş koş
- Hızlı koş
- Yerinde koş

🦘 ZIPLAMA
- İki ayakla zıpla
- Tek ayakla zıpla
- İleri zıpla

## Denge

🧘 Tek ayak üstünde dur
⏱️ 5 saniye say
🔄 Diğer ayak

## Aktiviteler

⚽ Top at - tut
🎈 Balon vur
🪢 İp atla
🤸 Takla at

## Her Gün Hareket!

30 dakika hareket et!
Güçlü ve sağlıklı ol! 💪`,
        order: 1,
        images: ['gross-motor.png'],
      },
    ],
  },
];

// ==================== ACHIEVEMENTS ====================

export const extendedAchievements = [
  // Yaşam Becerileri Başarıları
  {
    name: 'Bağımsız Çocuk',
    description: 'Tüm yaşam becerileri derslerini tamamladın!',
    icon: '🌟',
    criteria: { type: 'subject_complete', subject: 'LIFE_SKILLS' },
    xpReward: 300,
    coinReward: 150,
  },
  {
    name: 'Temizlik Uzmanı',
    description: 'Temizlik derslerinde %100 aldın!',
    icon: '🧼',
    criteria: { type: 'lesson_perfect', lesson: 'hygiene', value: 100 },
    xpReward: 100,
    coinReward: 50,
  },
  {
    name: 'Güvenli Yolcu',
    description: 'Trafik güvenliği dersini tamamladın!',
    icon: '🚦',
    criteria: { type: 'lesson_complete', lesson: 'traffic-safety' },
    xpReward: 75,
    coinReward: 40,
  },
  {
    name: 'İyi Arkadaş',
    description: 'Arkadaşlık derslerini tamamladın!',
    icon: '🤝',
    criteria: { type: 'lesson_complete', lesson: 'friendship' },
    xpReward: 100,
    coinReward: 50,
  },
  {
    name: 'Duygu Ustası',
    description: 'Duygular quizinde %100 aldın!',
    icon: '💝',
    criteria: { type: 'quiz_perfect', quiz: 'emotions', value: 100 },
    xpReward: 100,
    coinReward: 50,
  },
  // Akademik Başarılar
  {
    name: 'Matematik Yıldızı',
    description: '10 matematik quizi tamamladın!',
    icon: '🔢',
    criteria: { type: 'subject_quizzes', subject: 'MATH', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Türkçe Kahramanı',
    description: 'Tüm Türkçe derslerini tamamladın!',
    icon: '📖',
    criteria: { type: 'subject_complete', subject: 'TURKISH' },
    xpReward: 250,
    coinReward: 125,
  },
  {
    name: 'Bilim İnsanı',
    description: 'Tüm Fen derslerini tamamladın!',
    icon: '🔬',
    criteria: { type: 'subject_complete', subject: 'SCIENCE' },
    xpReward: 250,
    coinReward: 125,
  },
  // Özel Eğitim Başarıları
  {
    name: 'Motor Beceri Ustası',
    description: 'Motor beceri oyunlarında 500 puan!',
    icon: '🏃',
    criteria: { type: 'game_category_score', category: 'motor', value: 500 },
    xpReward: 150,
    coinReward: 75,
  },
  {
    name: 'Dikkat Şampiyonu',
    description: 'Dikkat oyunlarında 10 round tamamladın!',
    icon: '🎯',
    criteria: { type: 'game_rounds', category: 'attention', value: 10 },
    xpReward: 150,
    coinReward: 75,
  },
  {
    name: 'Sosyal Kelebek',
    description: 'Sosyal beceri derslerini tamamladın!',
    icon: '🦋',
    criteria: { type: 'category_complete', category: 'social-skills' },
    xpReward: 200,
    coinReward: 100,
  },
  // Seri Başarıları
  {
    name: 'Azimli Öğrenci',
    description: '14 gün üst üste giriş yaptın!',
    icon: '🔥',
    criteria: { type: 'streak', value: 14 },
    xpReward: 250,
    coinReward: 125,
  },
  {
    name: 'Kararlı Yıldız',
    description: '30 gün üst üste giriş yaptın!',
    icon: '⭐',
    criteria: { type: 'streak', value: 30 },
    xpReward: 500,
    coinReward: 250,
  },
  // Seviye Başarıları
  {
    name: 'Seviye 5',
    description: 'Seviye 5\'e ulaştın!',
    icon: '5️⃣',
    criteria: { type: 'level', value: 5 },
    xpReward: 100,
    coinReward: 50,
  },
  {
    name: 'Seviye 10',
    description: 'Seviye 10\'a ulaştın!',
    icon: '🔟',
    criteria: { type: 'level', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Seviye 25',
    description: 'Seviye 25\'e ulaştın!',
    icon: '🏅',
    criteria: { type: 'level', value: 25 },
    xpReward: 500,
    coinReward: 250,
  },
];
