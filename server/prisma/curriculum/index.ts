// Kapsamlı Özel Eğitim Müfredatı - Ana Index
// MEB Özel Eğitim Programına Uygun Tüm Sınıflar

import { PrismaClient } from '@prisma/client';

// Import all curriculum files
import { preschoolLessons, preschoolQuizzes, preschoolGames } from './preschool';
import { grade1Lessons, grade2Lessons, grade1Quizzes, grade2Quizzes, grade1Games, grade2Games } from './grade1-2';
import { grade3Lessons, grade4Lessons, grade3Quizzes, grade4Quizzes, grade3Games, grade4Games } from './grade3-4';
import {
  grade5Lessons, grade6Lessons, grade7Lessons, grade8Lessons,
  grade5Quizzes, grade6Quizzes, grade7Quizzes, grade8Quizzes,
  grade5Games, grade6Games, grade7Games, grade8Games
} from './grade5-8';

const prisma = new PrismaClient();

// Combine all lessons
export const allLessons = [
  ...preschoolLessons,
  ...grade1Lessons,
  ...grade2Lessons,
  ...grade3Lessons,
  ...grade4Lessons,
  ...grade5Lessons,
  ...grade6Lessons,
  ...grade7Lessons,
  ...grade8Lessons,
];

// Combine all quizzes
export const allQuizzes = [
  ...preschoolQuizzes,
  ...grade1Quizzes,
  ...grade2Quizzes,
  ...grade3Quizzes,
  ...grade4Quizzes,
  ...grade5Quizzes,
  ...grade6Quizzes,
  ...grade7Quizzes,
  ...grade8Quizzes,
];

// Combine all games
export const allGames = [
  ...preschoolGames,
  ...grade1Games,
  ...grade2Games,
  ...grade3Games,
  ...grade4Games,
  ...grade5Games,
  ...grade6Games,
  ...grade7Games,
  ...grade8Games,
];

// Extended achievements for all grades
export const extendedAchievements = [
  // Akademik Başarılar
  {
    name: 'Matematik Yıldızı',
    description: '10 matematik dersini tamamladın!',
    icon: '🔢',
    criteria: { type: 'subject_lessons', subject: 'MATH', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Türkçe Kahramanı',
    description: '10 Türkçe dersini tamamladın!',
    icon: '📖',
    criteria: { type: 'subject_lessons', subject: 'TURKISH', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Bilim İnsanı',
    description: '10 Fen dersini tamamladın!',
    icon: '🔬',
    criteria: { type: 'subject_lessons', subject: 'SCIENCE', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Sosyal Araştırmacı',
    description: '10 Sosyal Bilgiler dersini tamamladın!',
    icon: '🌍',
    criteria: { type: 'subject_lessons', subject: 'SOCIAL_STUDIES', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'İngilizce Konuşuyor',
    description: '10 İngilizce dersini tamamladın!',
    icon: '🇬🇧',
    criteria: { type: 'subject_lessons', subject: 'ENGLISH', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  {
    name: 'Bağımsız Birey',
    description: '10 Yaşam Becerileri dersini tamamladın!',
    icon: '🌟',
    criteria: { type: 'subject_lessons', subject: 'LIFE_SKILLS', value: 10 },
    xpReward: 200,
    coinReward: 100,
  },
  // Sınıf Bazlı Başarılar
  {
    name: 'Okul Öncesi Mezunu',
    description: 'Tüm okul öncesi derslerini tamamladın!',
    icon: '🎒',
    criteria: { type: 'grade_complete', grade: 'PRESCHOOL' },
    xpReward: 300,
    coinReward: 150,
  },
  {
    name: '1. Sınıf Mezunu',
    description: 'Tüm 1. sınıf derslerini tamamladın!',
    icon: '1️⃣',
    criteria: { type: 'grade_complete', grade: 'GRADE_1' },
    xpReward: 400,
    coinReward: 200,
  },
  {
    name: '2. Sınıf Mezunu',
    description: 'Tüm 2. sınıf derslerini tamamladın!',
    icon: '2️⃣',
    criteria: { type: 'grade_complete', grade: 'GRADE_2' },
    xpReward: 400,
    coinReward: 200,
  },
  {
    name: '3. Sınıf Mezunu',
    description: 'Tüm 3. sınıf derslerini tamamladın!',
    icon: '3️⃣',
    criteria: { type: 'grade_complete', grade: 'GRADE_3' },
    xpReward: 400,
    coinReward: 200,
  },
  {
    name: '4. Sınıf Mezunu',
    description: 'Tüm 4. sınıf derslerini tamamladın!',
    icon: '4️⃣',
    criteria: { type: 'grade_complete', grade: 'GRADE_4' },
    xpReward: 400,
    coinReward: 200,
  },
  {
    name: 'İlkokul Mezunu',
    description: '1-4. sınıf derslerini tamamladın!',
    icon: '🏫',
    criteria: { type: 'level_complete', level: 'primary' },
    xpReward: 1000,
    coinReward: 500,
  },
  {
    name: 'Ortaokul Hazır',
    description: '5. sınıf derslerini tamamladın!',
    icon: '5️⃣',
    criteria: { type: 'grade_complete', grade: 'GRADE_5' },
    xpReward: 500,
    coinReward: 250,
  },
  {
    name: '8. Sınıf Mezunu',
    description: 'Tüm 8. sınıf derslerini tamamladın!',
    icon: '🎓',
    criteria: { type: 'grade_complete', grade: 'GRADE_8' },
    xpReward: 600,
    coinReward: 300,
  },
  // Quiz Başarıları
  {
    name: 'Quiz Ustası',
    description: '50 quiz tamamladın!',
    icon: '📝',
    criteria: { type: 'quizzes_completed', value: 50 },
    xpReward: 300,
    coinReward: 150,
  },
  {
    name: 'Mükemmeliyetçi',
    description: '10 quizde %100 aldın!',
    icon: '💯',
    criteria: { type: 'perfect_quizzes', value: 10 },
    xpReward: 500,
    coinReward: 250,
  },
  // Oyun Başarıları
  {
    name: 'Oyun Şampiyonu',
    description: '100 oyun oynadın!',
    icon: '🎮',
    criteria: { type: 'games_played', value: 100 },
    xpReward: 300,
    coinReward: 150,
  },
  {
    name: 'Hafıza Uzmanı',
    description: 'Hafıza oyunlarında 1000 puan!',
    icon: '🧠',
    criteria: { type: 'memory_score', value: 1000 },
    xpReward: 250,
    coinReward: 125,
  },
  // Seri Başarıları
  {
    name: 'Haftalık Seri',
    description: '7 gün üst üste öğrendin!',
    icon: '🔥',
    criteria: { type: 'streak', value: 7 },
    xpReward: 150,
    coinReward: 75,
  },
  {
    name: 'Aylık Seri',
    description: '30 gün üst üste öğrendin!',
    icon: '⭐',
    criteria: { type: 'streak', value: 30 },
    xpReward: 500,
    coinReward: 250,
  },
  {
    name: 'Süper Seri',
    description: '100 gün üst üste öğrendin!',
    icon: '🏆',
    criteria: { type: 'streak', value: 100 },
    xpReward: 1000,
    coinReward: 500,
  },
  // Seviye Başarıları
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
    icon: '🥈',
    criteria: { type: 'level', value: 25 },
    xpReward: 400,
    coinReward: 200,
  },
  {
    name: 'Seviye 50',
    description: 'Seviye 50\'ye ulaştın!',
    icon: '🥇',
    criteria: { type: 'level', value: 50 },
    xpReward: 750,
    coinReward: 375,
  },
  {
    name: 'Seviye 100',
    description: 'Seviye 100\'e ulaştın!',
    icon: '👑',
    criteria: { type: 'level', value: 100 },
    xpReward: 1500,
    coinReward: 750,
  },
];

// Main seeding function
export async function seedComprehensiveCurriculum() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎓 KAPSAMLI ÖZEL EĞİTİM MÜFREDATİ');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log(`📚 Toplam Ders: ${allLessons.length}`);
  console.log(`📝 Toplam Quiz: ${allQuizzes.length}`);
  console.log(`🎮 Toplam Oyun: ${allGames.length}`);
  console.log(`🏆 Toplam Başarı: ${extendedAchievements.length}`);
  console.log('');

  // Seed Lessons with Topics
  console.log('📚 Dersler oluşturuluyor...');
  let lessonCount = 0;
  let topicCount = 0;

  for (const lessonData of allLessons) {
    const { topics, ...lesson } = lessonData;

    try {
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
        create: lesson as any,
      });

      lessonCount++;

      // Create topics
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
        topicCount++;
      }
    } catch (error) {
      console.error(`  ❌ Hata: ${lesson.title}`, error);
    }
  }
  console.log(`  ✅ ${lessonCount} ders, ${topicCount} konu oluşturuldu`);

  // Seed Quizzes with Questions
  console.log('📝 Quizler oluşturuluyor...');
  let quizCount = 0;
  let questionCount = 0;

  for (const quizData of allQuizzes) {
    const { questions, grade, ...quiz } = quizData;
    const quizId = `quiz-${quiz.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    try {
      const createdQuiz = await prisma.quiz.upsert({
        where: { id: quizId },
        update: quiz as any,
        create: {
          id: quizId,
          ...quiz,
        } as any,
      });

      quizCount++;

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        await prisma.question.upsert({
          where: { id: `${createdQuiz.id}-q-${i + 1}` },
          update: {
            text: q.text,
            type: q.type,
            options: q.options || null,
            answer: String(q.answer),
            hint: q.hint || null,
            points: q.points,
          },
          create: {
            id: `${createdQuiz.id}-q-${i + 1}`,
            quizId: createdQuiz.id,
            type: q.type,
            text: q.text,
            options: q.options || null,
            answer: String(q.answer),
            hint: q.hint || null,
            points: q.points,
            order: i + 1,
          },
        });
        questionCount++;
      }
    } catch (error) {
      console.error(`  ❌ Hata: ${quiz.title}`, error);
    }
  }
  console.log(`  ✅ ${quizCount} quiz, ${questionCount} soru oluşturuldu`);

  // Seed Games
  console.log('🎮 Oyunlar oluşturuluyor...');
  let gameCount = 0;

  for (const gameData of allGames) {
    const { grade, ...game } = gameData;
    const gameId = `game-${game.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    try {
      await prisma.game.upsert({
        where: { id: gameId },
        update: game as any,
        create: {
          id: gameId,
          ...game,
        } as any,
      });
      gameCount++;
    } catch (error) {
      console.error(`  ❌ Hata: ${game.title}`, error);
    }
  }
  console.log(`  ✅ ${gameCount} oyun oluşturuldu`);

  // Seed Achievements
  console.log('🏆 Başarılar oluşturuluyor...');
  let achievementCount = 0;

  for (const achievement of extendedAchievements) {
    try {
      await prisma.achievement.upsert({
        where: { name: achievement.name },
        update: achievement as any,
        create: achievement as any,
      });
      achievementCount++;
    } catch (error) {
      console.error(`  ❌ Hata: ${achievement.name}`, error);
    }
  }
  console.log(`  ✅ ${achievementCount} başarı oluşturuldu`);

  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('✅ KAPSAMLI MÜFREDAT TAMAMLANDI!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('📊 ÖZET:');
  console.log(`   📚 Dersler: ${lessonCount}`);
  console.log(`   📖 Konular: ${topicCount}`);
  console.log(`   📝 Quizler: ${quizCount}`);
  console.log(`   ❓ Sorular: ${questionCount}`);
  console.log(`   🎮 Oyunlar: ${gameCount}`);
  console.log(`   🏆 Başarılar: ${achievementCount}`);
  console.log('');
}

// Run if called directly
if (require.main === module) {
  seedComprehensiveCurriculum()
    .catch((e) => {
      console.error('Seed hatası:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default seedComprehensiveCurriculum;
