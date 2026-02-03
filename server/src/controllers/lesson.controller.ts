import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { AppError } from '../middleware/error.middleware.js';
import { Subject, GradeLevel } from '@prisma/client';

export const getLessons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, grade } = req.query;

    const where: any = { isActive: true };
    if (subject) where.subject = subject as Subject;
    if (grade) where.grade = grade as GradeLevel;

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        topics: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
        _count: {
          select: { topics: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json({
      success: true,
      data: { lessons },
    });
  } catch (error) {
    next(error);
  }
};

export const getLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        topics: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            games: { where: { isActive: true } },
            quizzes: { where: { isActive: true } },
          },
        },
      },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    res.json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    next(error);
  }
};

export const createLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, grade, title, description, order } = req.body;

    const lesson = await prisma.lesson.create({
      data: {
        subject,
        grade,
        title,
        description,
        order,
      },
    });

    res.status(201).json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, order, isActive } = req.body;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
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
};

export const deleteLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.lesson.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Topic controllers
export const getTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lessonId } = req.params;

    const topics = await prisma.topic.findMany({
      where: { lessonId, isActive: true },
      orderBy: { order: 'asc' },
      include: {
        games: { where: { isActive: true }, select: { id: true, title: true, type: true } },
        quizzes: { where: { isActive: true }, select: { id: true, title: true } },
      },
    });

    res.json({
      success: true,
      data: { topics },
    });
  } catch (error) {
    next(error);
  }
};

export const getTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      include: {
        lesson: true,
        games: { where: { isActive: true } },
        quizzes: {
          where: { isActive: true },
          include: {
            questions: { orderBy: { order: 'asc' } },
          },
        },
      },
    });

    if (!topic) {
      throw new AppError('Topic not found', 404);
    }

    res.json({
      success: true,
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
};

export const createTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lessonId } = req.params;
    const { title, content, order, images, animations, audioUrl } = req.body;

    const topic = await prisma.topic.create({
      data: {
        lessonId,
        title,
        content,
        order,
        images: images || [],
        animations,
        audioUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;
    const { title, content, order, images, animations, audioUrl, isActive } = req.body;

    const topic = await prisma.topic.update({
      where: { id: topicId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(order !== undefined && { order }),
        ...(images && { images }),
        ...(animations !== undefined && { animations }),
        ...(audioUrl !== undefined && { audioUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({
      success: true,
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    await prisma.topic.delete({
      where: { id: topicId },
    });

    res.json({
      success: true,
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
