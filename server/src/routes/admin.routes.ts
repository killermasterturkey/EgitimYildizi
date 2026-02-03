import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();

// All admin routes require authentication and ADMIN role
router.use(authenticate, authorize(UserRole.ADMIN));

// GET /api/admin/stats - Get platform statistics
router.get('/stats', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalParents,
      totalLessons,
      totalGames,
      totalQuizzes,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.parent.count(),
      prisma.lesson.count(),
      prisma.game.count(),
      prisma.quiz.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    // Get activity stats for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [recentProgress, recentQuizAttempts] = await Promise.all([
      prisma.progress.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      prisma.quizAttempt.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          teachers: totalTeachers,
          parents: totalParents,
        },
        content: {
          lessons: totalLessons,
          games: totalGames,
          quizzes: totalQuizzes,
        },
        activity: {
          progressLast7Days: recentProgress,
          quizzesLast7Days: recentQuizAttempts,
        },
        recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/users - Get all users with pagination and filters
router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', role, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (role) {
      where.role = role as UserRole;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          student: {
            select: { level: true, xp: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/users - Create a new user
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, role, grade } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role-specific profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role as UserRole,
        ...(role === 'STUDENT' && {
          student: {
            create: {
              grade: grade || 'GRADE_1',
            },
          },
        }),
        ...(role === 'TEACHER' && {
          teacher: {
            create: {},
          },
        }),
        ...(role === 'PARENT' && {
          parent: {
            create: {},
          },
        }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id - Update a user
router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, isActive, role } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(isActive !== undefined && { isActive }),
        ...(role && { role: role as UserRole }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/users/:id - Delete a user (soft delete by deactivating)
router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Don't allow deleting self
    if (id === req.user?.id) {
      throw new AppError('Cannot delete yourself', 400);
    }

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'User deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/lessons - Get all lessons
router.get('/lessons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', subject, grade } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isActive: true };

    if (subject) where.subject = subject;
    if (grade) where.grade = grade;

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { order: 'asc' },
        include: {
          _count: { select: { topics: true } },
        },
      }),
      prisma.lesson.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        lessons,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/lessons - Create a lesson
router.post('/lessons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, subject, grade } = req.body;

    // Get max order for new lesson
    const maxOrder = await prisma.lesson.aggregate({
      _max: { order: true },
    });

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        subject,
        grade,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    res.status(201).json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/lessons/:id - Update a lesson
router.put('/lessons/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, subject, grade, isActive } = req.body;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(subject && { subject }),
        ...(grade && { grade }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/lessons/:id - Delete a lesson
router.delete('/lessons/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.lesson.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Lesson deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/games - Get all games
router.get('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', type } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isActive: true };

    if (type) where.type = type;

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.game.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        games,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/games - Create a game
router.post('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, type, difficulty, config, xpReward, coinReward, topicId } = req.body;

    const game = await prisma.game.create({
      data: {
        title,
        description,
        type,
        difficulty: difficulty || 'EASY',
        config: config || {},
        xpReward: xpReward || 20,
        coinReward: coinReward || 10,
        ...(topicId && { topicId }),
      },
    });

    res.status(201).json({
      success: true,
      data: { game },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/games/:id - Update a game
router.put('/games/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, type, difficulty, config, xpReward, coinReward, isActive } = req.body;

    const game = await prisma.game.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(type && { type }),
        ...(difficulty && { difficulty }),
        ...(config && { config }),
        ...(xpReward && { xpReward }),
        ...(coinReward && { coinReward }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({
      success: true,
      data: { game },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/games/:id - Delete a game
router.delete('/games/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.game.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Game deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
