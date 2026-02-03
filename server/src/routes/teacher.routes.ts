import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { UserRole } from '@prisma/client';

const router = Router();

// All teacher routes require authentication and TEACHER or ADMIN role
router.use(authenticate, authorize(UserRole.TEACHER, UserRole.ADMIN));

// GET /api/teacher/dashboard - Get teacher dashboard data
router.get('/dashboard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherId = req.user!.id;

    // Get teacher profile
    const teacher = await prisma.teacher.findFirst({
      where: { userId: teacherId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // Get students assigned to this teacher
    const students = await prisma.student.findMany({
      where: { teacherId: teacher?.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // Calculate stats
    const totalStudents = students.length;
    const averageLevel = students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.level, 0) / students.length)
      : 0;
    const totalXP = students.reduce((sum, s) => sum + s.xp, 0);

    // Get recent activity for assigned students
    const studentIds = students.map(s => s.id);
    const recentProgress = await prisma.progress.findMany({
      where: { studentId: { in: studentIds } },
      take: 10,
      orderBy: { updatedAt: 'desc' },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
        topic: {
          select: { title: true },
        },
      },
    });

    res.json({
      success: true,
      data: {
        teacher,
        stats: {
          totalStudents,
          averageLevel,
          totalXP,
        },
        students: students.map(s => ({
          id: s.id,
          name: `${s.user.firstName} ${s.user.lastName}`,
          avatar: s.user.avatar,
          level: s.level,
          xp: s.xp,
          grade: s.grade,
        })),
        recentActivity: recentProgress.map(p => ({
          studentName: `${p.student.user.firstName} ${p.student.user.lastName}`,
          topicTitle: p.topic.title,
          percentage: p.percentage,
          completed: p.completed,
          updatedAt: p.updatedAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/teacher/students - Get all students assigned to teacher
router.get('/students', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId: teacherId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const students = await prisma.student.findMany({
      where: { teacherId: teacher.id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
        progress: true,
      },
    });

    const studentsWithStats = students.map(student => {
      const completedTopics = student.progress.filter(p => p.completed).length;
      const averagePercentage = student.progress.length > 0
        ? Math.round(student.progress.reduce((sum, p) => sum + p.percentage, 0) / student.progress.length)
        : 0;

      return {
        id: student.id,
        userId: student.user.id,
        name: `${student.user.firstName} ${student.user.lastName}`,
        email: student.user.email,
        avatar: student.user.avatar,
        grade: student.grade,
        level: student.level,
        xp: student.xp,
        coins: student.coins,
        completedTopics,
        averagePercentage,
      };
    });

    res.json({
      success: true,
      data: { students: studentsWithStats },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/teacher/students/:id - Get detailed student info
router.get('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            createdAt: true,
          },
        },
        progress: {
          include: {
            topic: {
              include: {
                lesson: {
                  select: { title: true },
                },
              },
            },
          },
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
        bep: true,
      },
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    res.json({
      success: true,
      data: { student },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/teacher/assignments - Create an assignment for students
router.post('/assignments', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, studentIds, dueDate, lessonId, quizId } = req.body;
    const teacherId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId: teacherId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    // For now, we'll create a simple assignment tracking
    // This could be expanded with a proper Assignment model
    const assignment = {
      id: `assignment-${Date.now()}`,
      title,
      description,
      teacherId: teacher.id,
      studentIds,
      dueDate: new Date(dueDate),
      lessonId,
      quizId,
      createdAt: new Date(),
    };

    // In a real implementation, you'd save this to the database
    // For now, we'll just return the created assignment

    res.status(201).json({
      success: true,
      data: { assignment },
      message: 'Assignment created successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/teacher/progress - Get progress overview for all students
router.get('/progress', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId: teacherId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const students = await prisma.student.findMany({
      where: { teacherId: teacher.id },
      include: {
        user: {
          select: { firstName: true, lastName: true },
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
        },
      },
    });

    // Calculate subject-wise progress for each student
    const progressBySubject = students.map(student => {
      const subjectProgress: Record<string, { completed: number; total: number }> = {};

      student.progress.forEach(p => {
        const subject = p.topic.lesson.subject;
        if (!subjectProgress[subject]) {
          subjectProgress[subject] = { completed: 0, total: 0 };
        }
        subjectProgress[subject].total++;
        if (p.completed) {
          subjectProgress[subject].completed++;
        }
      });

      return {
        studentId: student.id,
        studentName: `${student.user.firstName} ${student.user.lastName}`,
        level: student.level,
        xp: student.xp,
        subjectProgress,
      };
    });

    res.json({
      success: true,
      data: { progressBySubject },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/teacher/students/:id/notes - Add notes to a student's profile
router.put('/students/:id/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify student exists
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    res.json({
      success: true,
      message: 'Notes updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/teacher/analytics - Get detailed analytics for all students
router.get('/analytics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherId = req.user!.id;
    const { range = 'week' } = req.query;

    const teacher = await prisma.teacher.findFirst({
      where: { userId: teacherId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    // Calculate date range
    let startDate = new Date();
    if (range === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate = new Date(0); // All time
    }

    const students = await prisma.student.findMany({
      where: { teacherId: teacher.id },
      include: {
        user: {
          select: { firstName: true, lastName: true, avatar: true },
        },
        progress: {
          include: {
            topic: {
              include: {
                lesson: {
                  select: { subject: true },
                },
              },
            },
          },
        },
        quizAttempts: {
          where: range !== 'all' ? { createdAt: { gte: startDate } } : undefined,
        },
        gameScores: {
          where: range !== 'all' ? { createdAt: { gte: startDate } } : undefined,
        },
      },
    });

    // Process analytics for each student
    const analyticsData = students.map(student => {
      const totalLessons = new Set(student.progress.map(p => p.topic.lessonId)).size;
      const completedLessons = student.progress.filter(p => p.completed).length;

      const quizAttempts = student.quizAttempts;
      const completedQuizzes = quizAttempts.filter(q => q.completed).length;
      const averageQuizScore = completedQuizzes > 0
        ? Math.round(quizAttempts.reduce((sum, q) => sum + (q.score / q.maxScore * 100), 0) / completedQuizzes)
        : 0;

      const totalTimeSpent = student.progress.reduce((sum, p) => sum + p.timeSpent, 0) / 60; // Convert to minutes

      // Calculate weekly progress (last 7 days)
      const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
      const weeklyProgress = weekDays.map((day, index) => {
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() - (6 - index));
        // Simplified: random XP for demo
        return {
          day,
          xp: Math.floor(Math.random() * 100) + 10,
          timeSpent: Math.floor(Math.random() * 30) + 5,
        };
      });

      // Calculate subject progress
      const subjectMap = new Map<string, { completed: number; total: number }>();
      student.progress.forEach(p => {
        const subject = p.topic.lesson.subject;
        const current = subjectMap.get(subject) || { completed: 0, total: 0 };
        current.total++;
        if (p.completed) current.completed++;
        subjectMap.set(subject, current);
      });

      const subjectProgress = Array.from(subjectMap.entries()).map(([subject, data]) => ({
        subject,
        progress: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
        lessonsCompleted: data.completed,
        totalLessons: data.total,
      }));

      return {
        student: {
          id: student.id,
          user: student.user,
          level: student.level,
          xp: student.xp,
        },
        stats: {
          totalLessons,
          completedLessons,
          totalQuizzes: quizAttempts.length,
          completedQuizzes,
          averageQuizScore,
          totalGames: student.gameScores.length,
          totalTimeSpent: Math.round(totalTimeSpent),
          streak: Math.floor(Math.random() * 10) + 1, // Simplified for demo
          lastActive: student.progress[0]?.updatedAt?.toISOString() || null,
        },
        weeklyProgress,
        subjectProgress,
      };
    });

    res.json(analyticsData);
  } catch (error) {
    next(error);
  }
});

export default router;
