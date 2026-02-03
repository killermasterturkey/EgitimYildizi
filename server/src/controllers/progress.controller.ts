import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { AppError } from '../middleware/error.middleware.js';

export const getProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { studentId, subject, grade } = req.query;

    // Determine which student to get progress for
    let targetStudentId: string | undefined;

    if (studentId) {
      // Teacher/Parent viewing specific student
      targetStudentId = studentId as string;
    } else {
      // Get current user's student profile
      const student = await prisma.student.findFirst({
        where: { userId },
      });
      targetStudentId = student?.id;
    }

    if (!targetStudentId) {
      throw new AppError('Student not found', 404);
    }

    // Build where clause for topics
    const topicWhere: any = {};
    if (subject || grade) {
      topicWhere.lesson = {};
      if (subject) topicWhere.lesson.subject = subject;
      if (grade) topicWhere.lesson.grade = grade;
    }

    const progress = await prisma.progress.findMany({
      where: {
        studentId: targetStudentId,
        topic: topicWhere,
      },
      include: {
        topic: {
          include: {
            lesson: {
              select: { id: true, title: true, subject: true, grade: true },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId, percentage, timeSpent } = req.body;
    const userId = req.user?.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    // Upsert progress
    const progress = await prisma.progress.upsert({
      where: {
        studentId_topicId: {
          studentId: student.id,
          topicId,
        },
      },
      update: {
        percentage: Math.min(percentage, 100),
        timeSpent: { increment: timeSpent || 0 },
        completed: percentage >= 100,
        completedAt: percentage >= 100 ? new Date() : null,
      },
      create: {
        studentId: student.id,
        topicId,
        percentage: Math.min(percentage, 100),
        timeSpent: timeSpent || 0,
        completed: percentage >= 100,
        completedAt: percentage >= 100 ? new Date() : null,
      },
    });

    // Check for achievements if completed
    if (progress.completed) {
      await checkAndAwardAchievements(student.id);
    }

    res.json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { studentId } = req.query;

    let targetStudentId: string | undefined;

    if (studentId) {
      targetStudentId = studentId as string;
    } else {
      const student = await prisma.student.findFirst({
        where: { userId },
      });
      targetStudentId = student?.id;
    }

    if (!targetStudentId) {
      throw new AppError('Student not found', 404);
    }

    // Get various stats
    const [
      student,
      totalProgress,
      completedTopics,
      totalQuizAttempts,
      totalGameScores,
      achievementCount,
    ] = await Promise.all([
      prisma.student.findUnique({
        where: { id: targetStudentId },
        include: {
          user: {
            select: { firstName: true, lastName: true, avatar: true },
          },
        },
      }),
      prisma.progress.aggregate({
        where: { studentId: targetStudentId },
        _avg: { percentage: true },
        _sum: { timeSpent: true },
      }),
      prisma.progress.count({
        where: { studentId: targetStudentId, completed: true },
      }),
      prisma.quizAttempt.aggregate({
        where: { studentId: targetStudentId },
        _count: true,
        _avg: { score: true },
      }),
      prisma.gameScore.aggregate({
        where: { studentId: targetStudentId },
        _count: true,
        _avg: { score: true },
      }),
      prisma.studentAchievement.count({
        where: { studentId: targetStudentId },
      }),
    ]);

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    res.json({
      success: true,
      data: {
        student: {
          id: student.id,
          firstName: student.user.firstName,
          lastName: student.user.lastName,
          avatar: student.user.avatar,
          level: student.level,
          xp: student.xp,
          coins: student.coins,
          grade: student.grade,
        },
        stats: {
          averageProgress: Math.round(totalProgress._avg.percentage || 0),
          totalTimeSpent: totalProgress._sum.timeSpent || 0,
          completedTopics,
          quizzes: {
            total: totalQuizAttempts._count,
            averageScore: Math.round(totalQuizAttempts._avg?.score || 0),
          },
          games: {
            total: totalGameScores._count,
            averageScore: Math.round(totalGameScores._avg?.score || 0),
          },
          achievements: achievementCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    // Get all achievements and mark which ones are earned
    const [allAchievements, earnedAchievements] = await Promise.all([
      prisma.achievement.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.studentAchievement.findMany({
        where: { studentId: student.id },
        include: { achievement: true },
      }),
    ]);

    const earnedIds = new Set(earnedAchievements.map(ea => ea.achievementId));

    const achievements = allAchievements.map(a => ({
      ...a,
      earned: earnedIds.has(a.id),
      earnedAt: earnedAchievements.find(ea => ea.achievementId === a.id)?.earnedAt,
    }));

    res.json({
      success: true,
      data: { achievements },
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to check and award achievements
async function checkAndAwardAchievements(studentId: string) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      progress: true,
      achievements: true,
    },
  });

  if (!student) return;

  const achievements = await prisma.achievement.findMany({
    where: { isActive: true },
  });

  const earnedIds = new Set(student.achievements.map(a => a.achievementId));
  const completedTopics = student.progress.filter(p => p.completed).length;

  for (const achievement of achievements) {
    if (earnedIds.has(achievement.id)) continue;

    const criteria = achievement.criteria as any;
    let shouldAward = false;

    switch (criteria.type) {
      case 'completed_topics':
        shouldAward = completedTopics >= criteria.value;
        break;
      case 'xp':
        shouldAward = student.xp >= criteria.value;
        break;
      case 'level':
        shouldAward = student.level >= criteria.value;
        break;
    }

    if (shouldAward) {
      await prisma.$transaction([
        prisma.studentAchievement.create({
          data: {
            studentId,
            achievementId: achievement.id,
          },
        }),
        prisma.student.update({
          where: { id: studentId },
          data: {
            xp: { increment: achievement.xpReward },
            coins: { increment: achievement.coinReward },
          },
        }),
      ]);
    }
  }
}
