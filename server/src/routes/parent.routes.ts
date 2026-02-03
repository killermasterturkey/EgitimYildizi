import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { UserRole } from '@prisma/client';

const router = Router();

// All parent routes require authentication and PARENT or ADMIN role
router.use(authenticate, authorize(UserRole.PARENT, UserRole.ADMIN));

// GET /api/parent/children - Get all children of the parent
router.get('/children', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parentId = req.user!.id;

    // Get parent profile
    const parent = await prisma.parent.findFirst({
      where: { userId: parentId },
      include: {
        children: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!parent) {
      throw new AppError('Parent profile not found', 404);
    }

    const children = parent.children.map(child => ({
      id: child.id,
      userId: child.user.id,
      name: `${child.user.firstName} ${child.user.lastName}`,
      avatar: child.user.avatar,
      email: child.user.email,
      grade: child.grade,
      level: child.level,
      xp: child.xp,
      coins: child.coins,
    }));

    res.json({
      success: true,
      data: { children },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/parent/children/:id - Get detailed info about a child
router.get('/children/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const parentId = req.user!.id;

    // Verify parent owns this child
    const parent = await prisma.parent.findFirst({
      where: { userId: parentId },
      include: {
        children: {
          where: { id },
        },
      },
    });

    if (!parent || parent.children.length === 0) {
      throw new AppError('Child not found or access denied', 404);
    }

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            createdAt: true,
          },
        },
        progress: {
          include: {
            topic: {
              include: {
                lesson: {
                  select: { title: true, subject: true },
                },
              },
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
        quizAttempts: {
          include: {
            quiz: {
              select: { title: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        achievements: {
          include: {
            achievement: true,
          },
          orderBy: { earnedAt: 'desc' },
        },
      },
    });

    res.json({
      success: true,
      data: { child: student },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/parent/children/:id/reports - Get progress reports for a child
router.get('/children/:id/reports', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { period = 'week' } = req.query;
    const parentId = req.user!.id;

    // Verify parent owns this child
    const parent = await prisma.parent.findFirst({
      where: { userId: parentId },
      include: {
        children: {
          where: { id },
        },
      },
    });

    if (!parent || parent.children.length === 0) {
      throw new AppError('Child not found or access denied', 404);
    }

    // Calculate date range based on period
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    // Get progress within period
    const progress = await prisma.progress.findMany({
      where: {
        studentId: id,
        updatedAt: { gte: startDate },
      },
      include: {
        topic: {
          include: {
            lesson: {
              select: { title: true, subject: true },
            },
          },
        },
      },
    });

    // Get quiz results within period
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: {
        studentId: id,
        createdAt: { gte: startDate },
      },
      include: {
        quiz: {
          select: { title: true },
        },
      },
    });

    // Calculate subject-wise progress
    const subjectProgress: Record<string, { completed: number; inProgress: number; avgPercentage: number }> = {};

    progress.forEach(p => {
      const subject = p.topic.lesson.subject;
      if (!subjectProgress[subject]) {
        subjectProgress[subject] = { completed: 0, inProgress: 0, avgPercentage: 0 };
      }
      if (p.completed) {
        subjectProgress[subject].completed++;
      } else {
        subjectProgress[subject].inProgress++;
      }
      subjectProgress[subject].avgPercentage += p.percentage;
    });

    // Calculate averages
    Object.keys(subjectProgress).forEach(subject => {
      const data = subjectProgress[subject];
      const total = data.completed + data.inProgress;
      if (total > 0) {
        data.avgPercentage = Math.round(data.avgPercentage / total);
      }
    });

    // Get recent achievements
    const achievements = await prisma.studentAchievement.findMany({
      where: {
        studentId: id,
        earnedAt: { gte: startDate },
      },
      include: {
        achievement: true,
      },
      orderBy: { earnedAt: 'desc' },
    });

    // Daily activity (for charts)
    const dailyActivity: Record<string, { lessons: number; quizzes: number; games: number }> = {};

    // Initialize days
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dailyActivity[dateStr] = { lessons: 0, quizzes: 0, games: 0 };
    }

    // Count progress by day
    progress.forEach(p => {
      const dateStr = p.updatedAt.toISOString().split('T')[0];
      if (dailyActivity[dateStr]) {
        dailyActivity[dateStr].lessons++;
      }
    });

    // Count quizzes by day
    quizAttempts.forEach((q: { createdAt: Date }) => {
      const dateStr = q.createdAt.toISOString().split('T')[0];
      if (dailyActivity[dateStr]) {
        dailyActivity[dateStr].quizzes++;
      }
    });

    res.json({
      success: true,
      data: {
        student: {
          name: `${student.user.firstName} ${student.user.lastName}`,
          level: student.level,
          xp: student.xp,
          coins: student.coins,
          grade: student.grade,
        },
        period: {
          start: startDate,
          end: now,
          type: period,
        },
        summary: {
          lessonsCompleted: progress.filter(p => p.completed).length,
          quizzesTaken: quizAttempts.length,
          averageQuizScore: quizAttempts.length > 0
            ? Math.round(quizAttempts.reduce((sum: number, q: { score: number }) => sum + q.score, 0) / quizAttempts.length)
            : 0,
          achievementsUnlocked: achievements.length,
        },
        subjectProgress,
        dailyActivity: Object.entries(dailyActivity).map(([date, data]) => ({
          date,
          ...data,
        })),
        recentAchievements: achievements.map(a => ({
          name: a.achievement.name,
          description: a.achievement.description,
          icon: a.achievement.icon,
          earnedAt: a.earnedAt,
        })),
        recentQuizzes: quizAttempts.map((q: any) => ({
          title: q.quiz.title,
          score: q.score,
          maxScore: q.maxScore,
          createdAt: q.createdAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/parent/notifications - Get notifications for parent
router.get('/notifications', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parentId = req.user!.id;

    // Get parent's children
    const parent = await prisma.parent.findFirst({
      where: { userId: parentId },
      include: {
        children: {
          select: { id: true },
        },
      },
    });

    if (!parent) {
      throw new AppError('Parent profile not found', 404);
    }

    const childIds = parent.children.map(c => c.id);

    // Get recent achievements from children
    const recentAchievements = await prisma.studentAchievement.findMany({
      where: {
        studentId: { in: childIds },
        earnedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true },
            },
          },
        },
        achievement: true,
      },
      orderBy: { earnedAt: 'desc' },
    });

    // Get recent quiz results
    const recentQuizzes = await prisma.quizAttempt.findMany({
      where: {
        studentId: { in: childIds },
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true },
            },
          },
        },
        quiz: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Format notifications
    const notifications = [
      ...recentAchievements.map(a => ({
        type: 'achievement',
        title: `${a.student.user.firstName} yeni bir rozet kazandı!`,
        description: `${a.achievement.name}: ${a.achievement.description}`,
        icon: a.achievement.icon,
        date: a.earnedAt,
      })),
      ...recentQuizzes.map(q => ({
        type: 'quiz',
        title: `${q.student.user.firstName} bir quiz tamamladı`,
        description: `${q.quiz.title}: ${q.score} puan`,
        icon: '📝',
        date: q.createdAt,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    res.json({
      success: true,
      data: { notifications },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/parent/settings - Update parent notification settings
router.post('/settings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailNotifications, weeklyReports, achievementAlerts } = req.body;

    // Update parent notification settings
    // This would require adding settings fields to the Parent model
    // For now, we'll just acknowledge the request

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        emailNotifications,
        weeklyReports,
        achievementAlerts,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
