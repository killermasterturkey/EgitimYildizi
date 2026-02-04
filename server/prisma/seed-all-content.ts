// Master Content Seed - Combines All Curriculum Content
// Ana İçerik Seed - Tüm Müfredat İçeriklerini Birleştirir

import { PrismaClient } from '@prisma/client';
import { allLessons } from './seed-curriculum-extended';
import { extendedQuizzes, extendedGames, specialEducationGames } from './seed-quizzes-extended';
import { lifeSkillsLessons, motorSkillsLessons, extendedAchievements } from './seed-life-skills';

const prisma = new PrismaClient();

// Combine all lessons
const allLessonsData = [
  ...allLessons,
  ...lifeSkillsLessons,
  ...motorSkillsLessons,
];

// Combine all games
const allGamesData = [
  ...extendedGames,
  ...specialEducationGames,
];

// All quizzes
const allQuizzesData = extendedQuizzes;

// All achievements
const allAchievementsData = extendedAchievements;

export async function seedAllContent() {
  console.log('🌱 Starting COMPREHENSIVE content seed...');
  console.log('📚 Total lessons to create:', allLessonsData.length);
  console.log('📝 Total quizzes to create:', allQuizzesData.length);
  console.log('🎮 Total games to create:', allGamesData.length);
  console.log('🏆 Total achievements to create:', allAchievementsData.length);
  console.log('');

  // Create Lessons with Topics
  console.log('📚 Creating lessons...');
  for (const lessonData of allLessonsData) {
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

      console.log(`  ✅ ${createdLesson.title} (${lesson.grade})`);

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
      }
    } catch (error) {
      console.error(`  ❌ Error creating lesson ${lesson.title}:`, error);
    }
  }

  // Create Quizzes with Questions
  console.log('\n📝 Creating quizzes...');
  for (const quizData of allQuizzesData) {
    const { questions, ...quiz } = quizData;
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

      console.log(`  ✅ ${createdQuiz.title}`);

      // Create questions for this quiz
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
        await prisma.question.upsert({
          where: { id: `${createdQuiz.id}-q-${i + 1}` },
          update: {
            text: questionData.text,
            type: questionData.type,
            options: questionData.options || null,
            answer: String(questionData.answer),
            hint: questionData.hint || null,
            points: questionData.points,
          },
          create: {
            id: `${createdQuiz.id}-q-${i + 1}`,
            quizId: createdQuiz.id,
            type: questionData.type,
            text: questionData.text,
            options: questionData.options || null,
            answer: String(questionData.answer),
            hint: questionData.hint || null,
            points: questionData.points,
            order: i + 1,
          },
        });
      }
    } catch (error) {
      console.error(`  ❌ Error creating quiz ${quiz.title}:`, error);
    }
  }

  // Create Games
  console.log('\n🎮 Creating games...');
  for (const gameData of allGamesData) {
    const gameId = `game-${gameData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    try {
      const createdGame = await prisma.game.upsert({
        where: { id: gameId },
        update: gameData as any,
        create: {
          id: gameId,
          ...gameData,
        } as any,
      });
      console.log(`  ✅ ${createdGame.title}`);
    } catch (error) {
      console.error(`  ❌ Error creating game ${gameData.title}:`, error);
    }
  }

  // Create Achievements
  console.log('\n🏆 Creating achievements...');
  for (const achievementData of allAchievementsData) {
    try {
      await prisma.achievement.upsert({
        where: { name: achievementData.name },
        update: achievementData as any,
        create: achievementData as any,
      });
      console.log(`  ✅ ${achievementData.name}`);
    } catch (error) {
      console.error(`  ❌ Error creating achievement ${achievementData.name}:`, error);
    }
  }

  console.log('\n✅ COMPREHENSIVE content seed completed!');
  console.log('─────────────────────────────────────');
  console.log('📊 Summary:');
  console.log(`   📚 Lessons: ${allLessonsData.length}`);
  console.log(`   📝 Quizzes: ${allQuizzesData.length}`);
  console.log(`   🎮 Games: ${allGamesData.length}`);
  console.log(`   🏆 Achievements: ${allAchievementsData.length}`);
  console.log('─────────────────────────────────────');
}

// Run if called directly
if (require.main === module) {
  seedAllContent()
    .catch((e) => {
      console.error('Seed error:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default seedAllContent;
