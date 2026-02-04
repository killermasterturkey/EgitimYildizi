import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { NotificationType } from '@prisma/client';

const router = Router();

// All notification routes require authentication
router.use(authenticate);

// GET /api/notifications - Get user's notifications
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { limit = '20', unreadOnly = 'false' } = req.query;

    const where: any = { userId };
    if (unreadOnly === 'true') {
      where.read = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    });

    res.json({
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    await prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true, readAt: new Date() },
    });

    res.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true, readAt: new Date() },
    });

    res.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/notifications/:id - Delete a notification
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    await prisma.notification.deleteMany({
      where: { id, userId },
    });

    res.json({
      success: true,
      message: 'Notification deleted',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/notifications - Create a notification (internal use)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, type, title, content, data } = req.body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        type: type as NotificationType,
        title,
        content,
        data: data || null,
      },
    });

    res.status(201).json({
      success: true,
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Helper function to create notifications (used by other services)
export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  content: string,
  data?: any
) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      content,
      data: data || null,
    },
  });
}

// Notification templates
export const NotificationTemplates = {
  achievementUnlocked: (achievementName: string, icon: string) => ({
    type: NotificationType.ACHIEVEMENT,
    title: `🎉 Yeni Rozet: ${achievementName}`,
    content: `${icon} Tebrikler! "${achievementName}" rozetini kazandın!`,
  }),

  levelUp: (newLevel: number) => ({
    type: NotificationType.PROGRESS,
    title: `📈 Seviye Atladın!`,
    content: `Tebrikler! Artık Seviye ${newLevel} oldun!`,
  }),

  quizCompleted: (quizTitle: string, score: number) => ({
    type: NotificationType.PROGRESS,
    title: `📝 Quiz Tamamlandı`,
    content: `"${quizTitle}" quizini ${score} puanla tamamladın!`,
  }),

  lessonCompleted: (lessonTitle: string) => ({
    type: NotificationType.PROGRESS,
    title: `📚 Ders Tamamlandı`,
    content: `"${lessonTitle}" dersini başarıyla tamamladın!`,
  }),

  dailyReminder: () => ({
    type: NotificationType.REMINDER,
    title: `⏰ Günlük Hatırlatma`,
    content: `Bugün henüz ders çalışmadın. Hadi başlayalım!`,
  }),

  newMessage: (senderName: string) => ({
    type: NotificationType.MESSAGE,
    title: `💬 Yeni Mesaj`,
    content: `${senderName} sana bir mesaj gönderdi.`,
  }),

  welcomeStudent: (firstName: string) => ({
    type: NotificationType.SYSTEM,
    title: `🌟 Hoş Geldin ${firstName}!`,
    content: `EğitimYıldızı'na hoş geldin! Öğrenmeye başlamak için derslere göz at.`,
  }),

  xpEarned: (amount: number, reason: string) => ({
    type: NotificationType.PROGRESS,
    title: `⭐ XP Kazandın!`,
    content: `${reason} için +${amount} XP kazandın!`,
  }),

  coinsEarned: (amount: number, reason: string) => ({
    type: NotificationType.PROGRESS,
    title: `🪙 Altın Kazandın!`,
    content: `${reason} için +${amount} altın kazandın!`,
  }),
};
