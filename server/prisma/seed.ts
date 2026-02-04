import { PrismaClient, UserRole, GradeLevel, Subject, GameType, DifficultyLevel, QuestionType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { seedContent } from './seed-content';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.studentAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.gameScore.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.game.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.bEPGoal.deleteMany();
  await prisma.bEP.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.student.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash('123456', 12);

  // Create demo users
  console.log('👤 Creating users...');

  // Demo Student
  const studentUser = await prisma.user.create({
    data: {
      email: 'ogrenci@demo.com',
      password: hashedPassword,
      firstName: 'Ali',
      lastName: 'Yıldız',
      role: UserRole.STUDENT,
      avatar: '😊',
      emailVerified: true,
      student: {
        create: {
          grade: GradeLevel.GRADE_3,
          specialNeeds: ['LEARNING_DISABILITY'],
          xp: 150,
          level: 2,
          coins: 75,
        },
      },
    },
  });

  // Demo Parent
  const parentUser = await prisma.user.create({
    data: {
      email: 'veli@demo.com',
      password: hashedPassword,
      firstName: 'Ayşe',
      lastName: 'Yıldız',
      role: UserRole.PARENT,
      emailVerified: true,
      parent: {
        create: {},
      },
    },
  });

  // Demo Teacher
  const teacherUser = await prisma.user.create({
    data: {
      email: 'ogretmen@demo.com',
      password: hashedPassword,
      firstName: 'Mehmet',
      lastName: 'Öğretmen',
      role: UserRole.TEACHER,
      emailVerified: true,
      teacher: {
        create: {
          school: 'Atatürk İlkokulu',
        },
      },
    },
  });

  // Demo Admin
  await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Kullanıcı',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  // Create Lessons
  console.log('📚 Creating lessons...');

  // Math Lessons
  const mathLesson1 = await prisma.lesson.create({
    data: {
      subject: Subject.MATH,
      grade: GradeLevel.GRADE_3,
      title: 'Toplama ve Çıkarma',
      description: 'Temel toplama ve çıkarma işlemlerini öğrenelim!',
      order: 1,
    },
  });

  const mathLesson2 = await prisma.lesson.create({
    data: {
      subject: Subject.MATH,
      grade: GradeLevel.GRADE_3,
      title: 'Çarpma İşlemi',
      description: 'Çarpma işleminin temellerini keşfedelim!',
      order: 2,
    },
  });

  // Turkish Lessons
  const turkishLesson1 = await prisma.lesson.create({
    data: {
      subject: Subject.TURKISH,
      grade: GradeLevel.GRADE_3,
      title: 'Harfler ve Sesler',
      description: 'Türkçe harfleri ve sesleri tanıyalım!',
      order: 1,
    },
  });

  // Life Skills
  const lifeSkillsLesson = await prisma.lesson.create({
    data: {
      subject: Subject.LIFE_SKILLS,
      grade: GradeLevel.GRADE_3,
      title: 'Günlük Rutinler',
      description: 'Günlük hayatta yapacağımız işleri öğrenelim!',
      order: 1,
    },
  });

  // Create Topics
  console.log('📖 Creating topics...');

  const topic1 = await prisma.topic.create({
    data: {
      lessonId: mathLesson1.id,
      title: 'Tek Basamaklı Sayılarla Toplama',
      content: `
        <h2>🎯 Toplama Nedir?</h2>
        <p>Toplama, iki veya daha fazla sayıyı birleştirmektir. Mesela:</p>
        <ul>
          <li>🍎 2 elma + 🍎🍎 3 elma = 🍎🍎🍎🍎🍎 5 elma</li>
          <li>⭐ 4 yıldız + ⭐ 1 yıldız = ⭐⭐⭐⭐⭐ 5 yıldız</li>
        </ul>
        <h3>📝 Örnek Sorular:</h3>
        <p>2 + 3 = ?</p>
        <p>4 + 5 = ?</p>
        <p>1 + 6 = ?</p>
      `,
      order: 1,
      images: [],
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      lessonId: mathLesson1.id,
      title: 'Tek Basamaklı Sayılarla Çıkarma',
      content: `
        <h2>🎯 Çıkarma Nedir?</h2>
        <p>Çıkarma, bir sayıdan başka bir sayıyı almaktır. Mesela:</p>
        <ul>
          <li>🍎🍎🍎🍎🍎 5 elma - 🍎🍎 2 elma = 🍎🍎🍎 3 elma</li>
          <li>⭐⭐⭐⭐⭐⭐ 6 yıldız - ⭐⭐ 2 yıldız = ⭐⭐⭐⭐ 4 yıldız</li>
        </ul>
        <h3>📝 Örnek Sorular:</h3>
        <p>5 - 2 = ?</p>
        <p>7 - 3 = ?</p>
        <p>9 - 4 = ?</p>
      `,
      order: 2,
      images: [],
    },
  });

  const topic3 = await prisma.topic.create({
    data: {
      lessonId: turkishLesson1.id,
      title: 'Sesli Harfler',
      content: `
        <h2>🔤 Sesli Harfler</h2>
        <p>Türkçede 8 sesli harf vardır:</p>
        <div style="font-size: 2rem; text-align: center; margin: 20px 0;">
          <strong>A - E - I - İ - O - Ö - U - Ü</strong>
        </div>
        <h3>🎵 Sesli Harflerin Özellikleri:</h3>
        <ul>
          <li>Tek başlarına söylenebilirler</li>
          <li>Ağız açık olarak söylenir</li>
          <li>Her hecede bir sesli harf bulunur</li>
        </ul>
        <h3>📝 Örnekler:</h3>
        <p><strong>A</strong>rı - <strong>E</strong>lma - <strong>I</strong>şık - <strong>İ</strong>nek</p>
      `,
      order: 1,
      images: [],
    },
  });

  const topic4 = await prisma.topic.create({
    data: {
      lessonId: lifeSkillsLesson.id,
      title: 'Sabah Rutini',
      content: `
        <h2>🌅 Sabah Rutini</h2>
        <p>Her sabah sırayla yapacağımız işler:</p>
        <ol>
          <li>🛏️ Yataktan kalk</li>
          <li>🚿 Yüzünü yıka</li>
          <li>🦷 Dişlerini fırçala</li>
          <li>👕 Giyin</li>
          <li>🍳 Kahvaltı yap</li>
          <li>🎒 Çantanı hazırla</li>
          <li>🚶 Okula git</li>
        </ol>
        <p>Bu sırayı takip edersen sabahları daha kolay hazırlanırsın! 🌟</p>
      `,
      order: 1,
      images: [],
    },
  });

  // Create Games
  console.log('🎮 Creating games...');

  await prisma.game.create({
    data: {
      topicId: topic1.id,
      title: 'Sayı Eşleştirme',
      description: 'Toplama sonuçlarını eşleştir!',
      type: GameType.MEMORY,
      difficulty: DifficultyLevel.EASY,
      config: {
        pairs: [
          { card1: '2+3', card2: '5' },
          { card1: '1+4', card2: '5' },
          { card1: '3+3', card2: '6' },
          { card1: '2+2', card2: '4' },
          { card1: '1+1', card2: '2' },
          { card1: '4+3', card2: '7' },
        ],
      },
      maxScore: 100,
      xpReward: 20,
      coinReward: 10,
    },
  });

  await prisma.game.create({
    data: {
      topicId: topic3.id,
      title: 'Harf Eşleştirme',
      description: 'Sesli harfleri eşleştir!',
      type: GameType.MEMORY,
      difficulty: DifficultyLevel.EASY,
      config: {
        pairs: [
          { card1: 'A', card2: '🍎' },
          { card1: 'E', card2: '🏠' },
          { card1: 'I', card2: '💡' },
          { card1: 'O', card2: '🎯' },
          { card1: 'U', card2: '✈️' },
          { card1: 'Ü', card2: '🍇' },
        ],
      },
      maxScore: 100,
      xpReward: 20,
      coinReward: 10,
    },
  });

  await prisma.game.create({
    data: {
      topicId: topic4.id,
      title: 'Sabah Sıralama',
      description: 'Sabah rutinini doğru sırala!',
      type: GameType.SORTING,
      difficulty: DifficultyLevel.EASY,
      config: {
        items: [
          { id: 1, text: 'Yataktan kalk', emoji: '🛏️' },
          { id: 2, text: 'Yüzünü yıka', emoji: '🚿' },
          { id: 3, text: 'Dişlerini fırçala', emoji: '🦷' },
          { id: 4, text: 'Giyin', emoji: '👕' },
          { id: 5, text: 'Kahvaltı yap', emoji: '🍳' },
        ],
        correctOrder: [1, 2, 3, 4, 5],
      },
      maxScore: 100,
      xpReward: 25,
      coinReward: 15,
    },
  });

  // Standalone demo game (no topic)
  await prisma.game.create({
    data: {
      title: 'Meyve Eşleştirme',
      description: 'Meyveleri eşleştirerek hafızanı test et!',
      type: GameType.MEMORY,
      difficulty: DifficultyLevel.EASY,
      config: {
        emojis: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍑'],
      },
      maxScore: 100,
      xpReward: 15,
      coinReward: 10,
    },
  });

  // Create Quizzes
  console.log('📝 Creating quizzes...');

  const quiz1 = await prisma.quiz.create({
    data: {
      topicId: topic1.id,
      title: 'Toplama Testi',
      description: 'Toplama bilgini test et!',
      difficulty: DifficultyLevel.EASY,
      showHints: true,
      randomize: true,
      xpReward: 30,
      coinReward: 15,
      questions: {
        create: [
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: '2 + 3 = ?',
            hint: 'Parmaklarınla say!',
            options: ['4', '5', '6', '7'],
            answer: '5',
            points: 10,
            order: 1,
          },
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: '4 + 4 = ?',
            hint: 'İki tane 4 topla!',
            options: ['6', '7', '8', '9'],
            answer: '8',
            points: 10,
            order: 2,
          },
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: '1 + 6 = ?',
            hint: '6 nın yanına 1 ekle!',
            options: ['5', '6', '7', '8'],
            answer: '7',
            points: 10,
            order: 3,
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: '5 + 5 = 10',
            hint: 'Beş artı beş kaç eder?',
            options: null,
            answer: true,
            points: 10,
            order: 4,
          },
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: '3 + 5 = ?',
            hint: 'Üç ve beşi topla!',
            options: ['6', '7', '8', '9'],
            answer: '8',
            points: 10,
            order: 5,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      topicId: topic3.id,
      title: 'Sesli Harfler Testi',
      description: 'Sesli harfleri ne kadar biliyorsun?',
      difficulty: DifficultyLevel.EASY,
      showHints: true,
      randomize: true,
      xpReward: 30,
      coinReward: 15,
      questions: {
        create: [
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: 'Hangisi sesli harftir?',
            hint: 'Tek başına söylenebilen harfi bul!',
            options: ['B', 'A', 'K', 'L'],
            answer: 'A',
            points: 10,
            order: 1,
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: '"E" harfi sesli bir harftir.',
            hint: 'E yi söylerken ağzın açık mı?',
            options: null,
            answer: true,
            points: 10,
            order: 2,
          },
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: 'Türkçede kaç sesli harf var?',
            hint: 'A, E, I, İ, O, Ö, U, Ü',
            options: ['6', '7', '8', '9'],
            answer: '8',
            points: 10,
            order: 3,
          },
          {
            type: QuestionType.MULTIPLE_CHOICE,
            text: '"Elma" kelimesindeki sesli harfler hangileridir?',
            hint: 'Tek başına söylenebilenleri bul!',
            options: ['E ve A', 'L ve M', 'E ve L', 'M ve A'],
            answer: 'E ve A',
            points: 10,
            order: 4,
          },
        ],
      },
    },
  });

  // Create Achievements
  console.log('🏆 Creating achievements...');

  await prisma.achievement.createMany({
    data: [
      {
        name: 'İlk Adım',
        description: 'İlk dersini tamamla',
        icon: '🎯',
        criteria: { type: 'completed_topics', value: 1 },
        xpReward: 50,
        coinReward: 25,
      },
      {
        name: 'Hafıza Ustası',
        description: 'Hafıza oyununu 3 kez tamamla',
        icon: '🧠',
        criteria: { type: 'games_completed', value: 3 },
        xpReward: 100,
        coinReward: 50,
      },
      {
        name: 'Quiz Şampiyonu',
        description: 'Bir quizden %100 al',
        icon: '🏆',
        criteria: { type: 'perfect_quiz', value: 1 },
        xpReward: 150,
        coinReward: 75,
      },
      {
        name: 'Çalışkan Arı',
        description: '10 ders tamamla',
        icon: '🐝',
        criteria: { type: 'completed_topics', value: 10 },
        xpReward: 200,
        coinReward: 100,
      },
      {
        name: 'Yıldız Öğrenci',
        description: '1000 XP kazan',
        icon: '⭐',
        criteria: { type: 'xp', value: 1000 },
        xpReward: 250,
        coinReward: 125,
      },
      {
        name: 'Matematik Dehası',
        description: 'Tüm matematik derslerini tamamla',
        icon: '🔢',
        criteria: { type: 'subject_complete', value: 'MATH' },
        xpReward: 500,
        coinReward: 250,
      },
      {
        name: 'Koleksiyoncu',
        description: '5 rozet kazan',
        icon: '🎖️',
        criteria: { type: 'achievements', value: 5 },
        xpReward: 300,
        coinReward: 150,
      },
      {
        name: 'Seviye Atlayıcı',
        description: 'Seviye 5 e ulaş',
        icon: '📈',
        criteria: { type: 'level', value: 5 },
        xpReward: 200,
        coinReward: 100,
      },
    ],
  });

  // Run comprehensive content seed
  console.log('');
  console.log('📚 Running comprehensive curriculum seed...');
  await seedContent();

  console.log('');
  console.log('✅ Seeding completed!');
  console.log('');
  console.log('📧 Demo Hesaplar:');
  console.log('   Öğrenci: ogrenci@demo.com / 123456');
  console.log('   Veli: veli@demo.com / 123456');
  console.log('   Öğretmen: ogretmen@demo.com / 123456');
  console.log('   Admin: admin@demo.com / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
