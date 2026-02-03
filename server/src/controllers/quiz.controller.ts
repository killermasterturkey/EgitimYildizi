import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { AppError } from '../middleware/error.middleware.js';

export const getQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId, difficulty } = req.query;

    const where: any = { isActive: true };
    if (topicId) where.topicId = topicId as string;
    if (difficulty) where.difficulty = difficulty as any;

    const quizzes = await prisma.quiz.findMany({
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
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { quizzes },
    });
  } catch (error) {
    next(error);
  }
};

export const getQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        topic: {
          include: { lesson: true },
        },
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            type: true,
            text: true,
            hint: true,
            options: true,
            points: true,
            order: true,
            // Don't include answer for students
          },
        },
      },
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    // Randomize questions if enabled
    if (quiz.randomize) {
      quiz.questions = quiz.questions.sort(() => Math.random() - 0.5);
    }

    res.json({
      success: true,
      data: { quiz },
    });
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId, title, description, difficulty, timeLimit, showHints, randomize, xpReward, coinReward, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        topicId,
        title,
        description,
        difficulty: difficulty || 'EASY',
        timeLimit,
        showHints: showHints !== false,
        randomize: randomize !== false,
        xpReward: xpReward || 20,
        coinReward: coinReward || 10,
        questions: questions ? {
          create: questions.map((q: any, index: number) => ({
            type: q.type,
            text: q.text,
            hint: q.hint,
            explanation: q.explanation,
            options: q.options,
            answer: q.answer,
            points: q.points || 10,
            order: index + 1,
          })),
        } : undefined,
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { quiz },
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, timeLimit, showHints, randomize, xpReward, coinReward, isActive } = req.body;

    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(difficulty && { difficulty }),
        ...(timeLimit !== undefined && { timeLimit }),
        ...(showHints !== undefined && { showHints }),
        ...(randomize !== undefined && { randomize }),
        ...(xpReward !== undefined && { xpReward }),
        ...(coinReward !== undefined && { coinReward }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({
      success: true,
      data: { quiz },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.quiz.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const submitQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user?.id;

    // Get student
    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    // Get quiz with questions
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    // Calculate score
    let totalScore = 0;
    let maxScore = 0;
    const results: any[] = [];

    for (const question of quiz.questions) {
      maxScore += question.points;
      const userAnswer = answers[question.id];
      const correctAnswer = question.answer;

      let isCorrect = false;

      // Check answer based on question type
      if (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE') {
        isCorrect = userAnswer === correctAnswer;
      } else if (question.type === 'FILL_BLANK') {
        isCorrect = String(userAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim();
      } else if (question.type === 'MATCHING') {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
      }

      if (isCorrect) {
        totalScore += question.points;
      }

      results.push({
        questionId: question.id,
        userAnswer,
        correctAnswer,
        isCorrect,
        explanation: question.explanation,
        points: isCorrect ? question.points : 0,
      });
    }

    // Calculate rewards
    const scorePercentage = totalScore / maxScore;
    const earnedXp = Math.floor(quiz.xpReward * scorePercentage);
    const earnedCoins = Math.floor(quiz.coinReward * scorePercentage);

    // Save attempt and update student
    const [attempt] = await prisma.$transaction([
      prisma.quizAttempt.create({
        data: {
          studentId: student.id,
          quizId: id,
          score: totalScore,
          maxScore,
          answers,
          timeSpent: timeSpent || 0,
          completed: true,
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
        attempt: {
          id: attempt.id,
          score: totalScore,
          maxScore,
          percentage: Math.round(scorePercentage * 100),
        },
        results,
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

export const getQuizAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        quizId: id,
        studentId: student.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { attempts },
    });
  } catch (error) {
    next(error);
  }
};
