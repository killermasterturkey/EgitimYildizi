// Extended Quiz and Game Content for Special Education
// Özel Eğitim için Genişletilmiş Quiz ve Oyun İçerikleri

import { DifficultyLevel, QuestionType, GameType } from '@prisma/client';

// ==================== EXTENDED QUIZZES ====================

export const extendedQuizzes = [
  // Okul Öncesi Quizler
  {
    title: 'Büyük Küçük Quiz',
    description: 'Büyüklük kavramlarını test et!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangisi daha BÜYÜK?',
        options: ['🐜 Karınca', '🐘 Fil', '🐁 Fare', '🐝 Arı'],
        answer: '🐘 Fil',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangisi daha KÜÇÜK?',
        options: ['🏠 Ev', '📱 Telefon', '🚗 Araba', '🌳 Ağaç'],
        answer: '📱 Telefon',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Portakal, elmadan büyüktür.',
        answer: true,
        points: 10,
      },
    ],
  },
  {
    title: 'Şekiller Quiz',
    description: 'Şekilleri tanı!',
    difficulty: DifficultyLevel.EASY,
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
        text: 'Karenin 4 kenarı vardır.',
        answer: true,
        points: 10,
      },
    ],
  },
  // 1. Sınıf Quizler
  {
    title: 'Çıkarma Quiz',
    description: 'Çıkarma işlemini test et!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '5 - 2 = ?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🍎🍎🍎🍎 - 🍎 = ?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.FILL_BLANK,
        text: '4 - 1 = ___',
        answer: '3',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '10 - 5 = ?',
        options: ['3', '4', '5', '6'],
        answer: '5',
        points: 10,
      },
    ],
  },
  {
    title: 'Aile Quiz',
    description: 'Aile üyelerini tanı!',
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Babanın babası kim?',
        options: ['Amca', 'Dede', 'Dayı', 'Abi'],
        answer: 'Dede',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Annenin annesi kim?',
        options: ['Teyze', 'Hala', 'Anneanne', 'Abla'],
        answer: 'Anneanne',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Kardeşim ailemden biridir.',
        answer: true,
        points: 10,
      },
    ],
  },
  // 2. Sınıf Quizler
  {
    title: 'Saat Okuma Quiz',
    description: 'Saatleri oku!',
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 25,
    coinReward: 15,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🕐 Saat kaç?',
        options: ['Saat 1', 'Saat 2', 'Saat 12', 'Saat 6'],
        answer: 'Saat 1',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '🕕 Saat kaç?',
        options: ['Saat 3', 'Saat 6', 'Saat 9', 'Saat 12'],
        answer: 'Saat 6',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Uzun ibre dakikayı gösterir.',
        answer: true,
        points: 10,
      },
    ],
  },
  {
    title: 'Mevsimler Quiz',
    description: '4 mevsimi test et!',
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 25,
    coinReward: 15,
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
        text: 'Denize hangi mevsimde gireriz?',
        options: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
        answer: 'Yaz',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Yapraklar hangi mevsimde döküür?',
        options: ['İlkbahar', 'Yaz', 'Sonbahar', 'Kış'],
        answer: 'Sonbahar',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Çiçekler ilkbaharda açar.',
        answer: true,
        points: 10,
      },
    ],
  },
  // 3. Sınıf Quizler
  {
    title: 'Kesirler Quiz',
    description: 'Kesirleri tanı!',
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1/2 nasıl okunur?',
        options: ['Dörtte bir', 'Yarım', 'Çeyrek', 'Tam'],
        answer: 'Yarım',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1/4 nasıl okunur?',
        options: ['Yarım', 'Tam', 'Çeyrek', 'Üçte bir'],
        answer: 'Çeyrek',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Pizzanın 2/4\'ü ne kadar?',
        options: ['Tamamı', 'Yarısı', 'Çeyreği', 'Hiç'],
        answer: 'Yarısı',
        points: 10,
      },
    ],
  },
  {
    title: 'Duyu Organları Quiz',
    description: '5 duyuyu test et!',
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 20,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangi organla görürüz?',
        options: ['Kulak', 'Burun', 'Göz', 'Dil'],
        answer: 'Göz',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangi organla koklarız?',
        options: ['Kulak', 'Burun', 'Göz', 'Dil'],
        answer: 'Burun',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Kaç tane duyumuz var?',
        options: ['3', '4', '5', '6'],
        answer: '5',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Dilimizle tatları alırız.',
        answer: true,
        points: 10,
      },
    ],
  },
  // 4. Sınıf Quizler
  {
    title: 'Büyük Sayılar Quiz',
    description: 'Binlik sayıları test et!',
    difficulty: DifficultyLevel.HARD,
    xpReward: 35,
    coinReward: 25,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '2.345 sayısında kaç bin var?',
        options: ['2', '3', '4', '5'],
        answer: '2',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: '1.000 nasıl okunur?',
        options: ['Yüz', 'Bin', 'On bin', 'Milyon'],
        answer: 'Bin',
        points: 10,
      },
      {
        type: QuestionType.FILL_BLANK,
        text: '5.000 + 500 + 50 + 5 = ___',
        answer: '5555',
        points: 15,
      },
    ],
  },
  {
    title: 'Maddenin Halleri Quiz',
    description: 'Katı, sıvı, gaz test!',
    difficulty: DifficultyLevel.HARD,
    xpReward: 35,
    coinReward: 25,
    questions: [
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Buz hangi haldedir?',
        options: ['Katı', 'Sıvı', 'Gaz', 'Plazma'],
        answer: 'Katı',
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Su ısınınca ne olur?',
        options: ['Donar', 'Buharlaşır', 'Katılaşır', 'Değişmez'],
        answer: 'Buharlaşır',
        points: 10,
      },
      {
        type: QuestionType.TRUE_FALSE,
        text: 'Hava gazdır.',
        answer: true,
        points: 10,
      },
      {
        type: QuestionType.MULTIPLE_CHOICE,
        text: 'Hangi maddeler akar?',
        options: ['Katılar', 'Sıvılar', 'Her ikisi', 'Hiçbiri'],
        answer: 'Sıvılar',
        points: 10,
      },
    ],
  },
];

// ==================== EXTENDED GAMES ====================

export const extendedGames = [
  // Okul Öncesi Oyunlar
  {
    title: 'Büyük Küçük Eşleştirme',
    description: 'Büyük ve küçük nesneleri eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    config: {
      pairs: [
        { left: '🐘 Fil', right: 'BÜYÜK' },
        { left: '🐜 Karınca', right: 'KÜÇÜK' },
        { left: '🏠 Ev', right: 'BÜYÜK' },
        { left: '🔑 Anahtar', right: 'KÜÇÜK' },
        { left: '🚌 Otobüs', right: 'BÜYÜK' },
      ],
    },
  },
  {
    title: 'Vücut Bölümleri',
    description: 'Vücut bölümlerini bul!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 10,
    config: {
      zones: ['Baş', 'Gövde', 'Bacaklar'],
      items: [
        { text: '👁️ Göz', zone: 'Baş' },
        { text: '👂 Kulak', zone: 'Baş' },
        { text: '🫁 Göğüs', zone: 'Gövde' },
        { text: '🖐️ El', zone: 'Gövde' },
        { text: '🦶 Ayak', zone: 'Bacaklar' },
        { text: '🦵 Diz', zone: 'Bacaklar' },
      ],
    },
  },
  // 1. Sınıf Oyunlar
  {
    title: 'Çıkarma Arcade',
    description: 'Doğru çıkarma cevaplarını yakala!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.EASY,
    xpReward: 25,
    coinReward: 15,
    config: {
      questions: [
        { question: '5-2', answer: 3, wrong: [2, 4, 5] },
        { question: '4-1', answer: 3, wrong: [2, 4, 5] },
        { question: '6-3', answer: 3, wrong: [2, 4, 5] },
        { question: '10-5', answer: 5, wrong: [3, 4, 6] },
      ],
    },
  },
  {
    title: 'Şekil Hafıza Oyunu',
    description: 'Şekil kartlarını eşleştir!',
    type: GameType.MEMORY,
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 10,
    config: {
      cards: ['⭕', '⬜', '🔺', '▬', '⬡', '💠'],
      gridSize: 3,
    },
  },
  {
    title: 'Aile Eşleştirme',
    description: 'Aile üyelerini eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    config: {
      pairs: [
        { left: 'Babanın babası', right: 'Dede' },
        { left: 'Annenin annesi', right: 'Anneanne' },
        { left: 'Annenin kardeşi (kız)', right: 'Teyze' },
        { left: 'Babanın kardeşi (kız)', right: 'Hala' },
        { left: 'Babanın kardeşi (erkek)', right: 'Amca' },
      ],
    },
  },
  // 2. Sınıf Oyunlar
  {
    title: 'Saat Eşleştirme',
    description: 'Saatleri rakamlarla eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 25,
    coinReward: 15,
    config: {
      pairs: [
        { left: '🕐', right: 'Saat 1' },
        { left: '🕒', right: 'Saat 3' },
        { left: '🕕', right: 'Saat 6' },
        { left: '🕘', right: 'Saat 9' },
        { left: '🕛', right: 'Saat 12' },
      ],
    },
  },
  {
    title: 'Mevsim Sıralama',
    description: 'Mevsimleri sırala!',
    type: GameType.SORTING,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 25,
    coinReward: 15,
    config: {
      items: ['🌸 İlkbahar', '☀️ Yaz', '🍂 Sonbahar', '❄️ Kış'],
      correctOrder: ['🌸 İlkbahar', '☀️ Yaz', '🍂 Sonbahar', '❄️ Kış'],
    },
  },
  {
    title: 'Çarpma Tablosu',
    description: 'Çarpma cevaplarını yakala!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 20,
    config: {
      questions: [
        { question: '2×3', answer: 6, wrong: [4, 5, 8] },
        { question: '3×3', answer: 9, wrong: [6, 8, 12] },
        { question: '4×2', answer: 8, wrong: [6, 10, 12] },
        { question: '5×2', answer: 10, wrong: [8, 12, 15] },
      ],
    },
  },
  // 3. Sınıf Oyunlar
  {
    title: 'Kesir Eşleştirme',
    description: 'Kesirleri görsellerle eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 20,
    config: {
      pairs: [
        { left: '1/2', right: '🟨⬜ Yarım' },
        { left: '1/4', right: '🟨⬜⬜⬜ Çeyrek' },
        { left: '3/4', right: '🟨🟨🟨⬜' },
        { left: '2/4', right: '🟨🟨⬜⬜ Yarım' },
      ],
    },
  },
  {
    title: 'Duyu Organları Oyunu',
    description: 'Duyuları organlarla eşleştir!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.MEDIUM,
    xpReward: 30,
    coinReward: 20,
    config: {
      zones: ['Görme', 'İşitme', 'Koklama', 'Tatma', 'Dokunma'],
      items: [
        { text: '👁️ Göz', zone: 'Görme' },
        { text: '👂 Kulak', zone: 'İşitme' },
        { text: '👃 Burun', zone: 'Koklama' },
        { text: '👅 Dil', zone: 'Tatma' },
        { text: '🖐️ El', zone: 'Dokunma' },
      ],
    },
  },
  // 4. Sınıf Oyunlar
  {
    title: 'Madde Halleri Sıralama',
    description: 'Maddeleri hallerine göre sınıfla!',
    type: GameType.DRAG_DROP,
    difficulty: DifficultyLevel.HARD,
    xpReward: 35,
    coinReward: 25,
    config: {
      zones: ['Katı', 'Sıvı', 'Gaz'],
      items: [
        { text: '🧊 Buz', zone: 'Katı' },
        { text: '🪨 Taş', zone: 'Katı' },
        { text: '💧 Su', zone: 'Sıvı' },
        { text: '🥛 Süt', zone: 'Sıvı' },
        { text: '💨 Hava', zone: 'Gaz' },
        { text: '🌫️ Buhar', zone: 'Gaz' },
      ],
    },
  },
  {
    title: 'Basamak Değeri',
    description: 'Sayıların basamaklarını bul!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.HARD,
    xpReward: 35,
    coinReward: 25,
    config: {
      pairs: [
        { left: '3.456 - Binler', right: '3' },
        { left: '3.456 - Yüzler', right: '4' },
        { left: '3.456 - Onlar', right: '5' },
        { left: '3.456 - Birler', right: '6' },
      ],
    },
  },
];

// ==================== SPECIAL EDUCATION SPECIFIC GAMES ====================

export const specialEducationGames = [
  // Motor Beceri Oyunları
  {
    title: 'Dokunma Takibi',
    description: 'Ekrandaki şekillere sırayla dokun!',
    type: GameType.ARCADE,
    difficulty: DifficultyLevel.EASY,
    xpReward: 15,
    coinReward: 10,
    config: {
      mode: 'touch-sequence',
      shapes: ['⭕', '⬜', '🔺', '💠'],
      speed: 'slow',
    },
  },
  {
    title: 'Renk Takip Oyunu',
    description: 'Yanan rengi takip et!',
    type: GameType.MEMORY,
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 15,
    config: {
      mode: 'simon-says',
      colors: ['🔴', '🔵', '🟢', '🟡'],
      startingLength: 2,
    },
  },
  // Dikkat ve Odaklanma Oyunları
  {
    title: 'Farklı Olanı Bul',
    description: 'Aynı şekiller arasından farklı olanı bul!',
    type: GameType.PUZZLE,
    difficulty: DifficultyLevel.EASY,
    xpReward: 20,
    coinReward: 15,
    config: {
      rounds: [
        { items: ['🍎', '🍎', '🍎', '🍊', '🍎'], answer: 3 },
        { items: ['⭐', '⭐', '🌟', '⭐', '⭐'], answer: 2 },
        { items: ['🐕', '🐕', '🐕', '🐕', '🐈'], answer: 4 },
      ],
    },
  },
  // Sosyal Beceri Oyunları
  {
    title: 'Duygu Eşleştirme',
    description: 'Yüz ifadelerini duygularla eşleştir!',
    type: GameType.MATCHING,
    difficulty: DifficultyLevel.EASY,
    xpReward: 25,
    coinReward: 15,
    config: {
      pairs: [
        { left: '😊', right: 'Mutlu' },
        { left: '😢', right: 'Üzgün' },
        { left: '😠', right: 'Kızgın' },
        { left: '😨', right: 'Korkmuş' },
        { left: '😲', right: 'Şaşkın' },
      ],
    },
  },
];
