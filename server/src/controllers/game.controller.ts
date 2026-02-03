import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { AppError } from '../middleware/error.middleware.js';
import { GameType, DifficultyLevel } from '@prisma/client';

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, difficulty, topicId } = req.query;

    const where: any = { isActive: true };
    if (type) where.type = type as GameType;
    if (difficulty) where.difficulty = difficulty as DifficultyLevel;
    if (topicId) where.topicId = topicId as string;

    const games = await prisma.game.findMany({
      where,
      include: {
        topic: {
          select: {
            id: true,
            title: true,
            lesson: {
              select: { id: true, title: true, subject: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { games },
    });
  } catch (error) {
    next(error);
  }
};

export const getGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        topic: {
          include: { lesson: true },
        },
      },
    });

    if (!game) {
      throw new AppError('Game not found', 404);
    }

    res.json({
      success: true,
      data: { game },
    });
  } catch (error) {
    next(error);
  }
};

export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId, title, description, type, difficulty, config, maxScore, xpReward, coinReward } = req.body;

    const game = await prisma.game.create({
      data: {
        topicId,
        title,
        description,
        type,
        difficulty: difficulty || 'EASY',
        config,
        maxScore: maxScore || 100,
        xpReward: xpReward || 10,
        coinReward: coinReward || 5,
      },
    });

    res.status(201).json({
      success: true,
      data: { game },
    });
  } catch (error) {
    next(error);
  }
};

export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, type, difficulty, config, maxScore, xpReward, coinReward, isActive } = req.body;

    const game = await prisma.game.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(type && { type }),
        ...(difficulty && { difficulty }),
        ...(config && { config }),
        ...(maxScore !== undefined && { maxScore }),
        ...(xpReward !== undefined && { xpReward }),
        ...(coinReward !== undefined && { coinReward }),
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
};

export const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.game.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Game deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const saveScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { score, timeSpent, completed } = req.body;
    const userId = req.user?.id;

    // Get student
    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    // Get game for rewards
    const game = await prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new AppError('Game not found', 404);
    }

    // Calculate rewards based on score percentage
    const scorePercentage = score / game.maxScore;
    const earnedXp = Math.floor(game.xpReward * scorePercentage);
    const earnedCoins = Math.floor(game.coinReward * scorePercentage);

    // Save score and update student in transaction
    const [gameScore] = await prisma.$transaction([
      prisma.gameScore.create({
        data: {
          studentId: student.id,
          gameId: id,
          score,
          timeSpent,
          completed: completed || false,
        },
      }),
      prisma.student.update({
        where: { id: student.id },
        data: {
          xp: { increment: earnedXp },
          coins: { increment: earnedCoins },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        gameScore,
        rewards: {
          xp: earnedXp,
          coins: earnedCoins,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { limit = 10 } = req.query;

    const scores = await prisma.gameScore.findMany({
      where: { gameId: id },
      orderBy: { score: 'desc' },
      take: Number(limit),
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true },
            },
          },
        },
      },
    });

    const leaderboard = scores.map((s, index) => ({
      rank: index + 1,
      score: s.score,
      timeSpent: s.timeSpent,
      student: {
        firstName: s.student.user.firstName,
        lastName: s.student.user.lastName,
        avatar: s.student.user.avatar,
        level: s.student.level,
      },
    }));

    res.json({
      success: true,
      data: { leaderboard },
    });
  } catch (error) {
    next(error);
  }
};
