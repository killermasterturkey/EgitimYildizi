import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest, teacherMiddleware } from '../middleware/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// BEP Status Enum
enum BEPStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

// Goal Status Enum
enum GoalStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  ACHIEVED = 'ACHIEVED',
  MODIFIED = 'MODIFIED',
  DISCONTINUED = 'DISCONTINUED'
}

// BEP Template for creating new BEPs
const BEPTemplate = {
  sections: [
    {
      title: 'Öğrenci Bilgileri',
      fields: ['tanı', 'güçlü_yönler', 'gelişim_alanları', 'ilgi_alanları']
    },
    {
      title: 'Eğitimsel Performans',
      fields: ['akademik_düzey', 'sosyal_beceriler', 'iletişim_becerileri', 'motor_beceriler']
    },
    {
      title: 'Hedefler ve Amaçlar',
      fields: ['uzun_vadeli_hedefler', 'kısa_vadeli_hedefler', 'ölçülebilir_amaçlar']
    },
    {
      title: 'Öğretimsel Uyarlamalar',
      fields: ['içerik_uyarlamaları', 'süreç_uyarlamaları', 'ürün_uyarlamaları', 'ortam_uyarlamaları']
    },
    {
      title: 'Destek Hizmetleri',
      fields: ['özel_eğitim_hizmetleri', 'ilgili_hizmetler', 'yardımcı_teknolojiler']
    },
    {
      title: 'Değerlendirme',
      fields: ['değerlendirme_yöntemleri', 'ilerleme_izleme', 'raporlama_sıklığı']
    }
  ]
};

// Get all BEPs for a teacher's students
router.get('/teacher', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const teacherId = req.user?.teacher?.id;

    if (!teacherId) {
      return res.status(400).json({ error: 'Öğretmen bilgisi bulunamadı' });
    }

    // Get students assigned to this teacher
    const studentRelations = await prisma.teacherStudent.findMany({
      where: { teacherId },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        }
      }
    });

    const studentIds = studentRelations.map(rel => rel.studentId);

    // Get BEPs for these students
    const beps = await prisma.bEP.findMany({
      where: {
        studentId: { in: studentIds }
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        },
        goals: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(beps);
  } catch (error) {
    console.error('BEP list error:', error);
    res.status(500).json({ error: 'BEP listesi alınamadı' });
  }
});

// Get BEP for a specific student (parent access)
router.get('/student/:studentId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Check authorization
    if (userRole === 'PARENT') {
      const parent = await prisma.parent.findFirst({
        where: { userId },
        include: {
          children: true
        }
      });

      if (!parent || !parent.children.some(child => child.id === studentId)) {
        return res.status(403).json({ error: 'Bu öğrencinin BEP\'ine erişim yetkiniz yok' });
      }
    }

    const bep = await prisma.bEP.findFirst({
      where: {
        studentId,
        status: { in: ['ACTIVE', 'COMPLETED'] }
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        },
        goals: {
          orderBy: { createdAt: 'asc' }
        },
        createdBy: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!bep) {
      return res.status(404).json({ error: 'BEP bulunamadı' });
    }

    res.json(bep);
  } catch (error) {
    console.error('BEP fetch error:', error);
    res.status(500).json({ error: 'BEP bilgisi alınamadı' });
  }
});

// Get single BEP by ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const bep = await prisma.bEP.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        },
        goals: {
          orderBy: { createdAt: 'asc' }
        },
        createdBy: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    if (!bep) {
      return res.status(404).json({ error: 'BEP bulunamadı' });
    }

    res.json(bep);
  } catch (error) {
    console.error('BEP fetch error:', error);
    res.status(500).json({ error: 'BEP bilgisi alınamadı' });
  }
});

// Create new BEP
router.post('/', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      studentId,
      title,
      academicYear,
      startDate,
      endDate,
      diagnosis,
      strengths,
      weaknesses,
      interests,
      accommodations,
      goals
    } = req.body;

    // Validate required fields
    if (!studentId || !title || !academicYear || !startDate || !endDate) {
      return res.status(400).json({ error: 'Gerekli alanlar eksik' });
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({ error: 'Öğrenci bulunamadı' });
    }

    // Create BEP with goals
    const bep = await prisma.bEP.create({
      data: {
        studentId,
        createdById: userId!,
        title,
        academicYear,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: BEPStatus.DRAFT,
        diagnosis,
        strengths,
        weaknesses,
        interests,
        accommodations,
        goals: goals ? {
          create: goals.map((goal: any) => ({
            category: goal.category,
            description: goal.description,
            targetDate: goal.targetDate ? new Date(goal.targetDate) : null,
            successCriteria: goal.successCriteria,
            status: GoalStatus.NOT_STARTED,
            progress: 0
          }))
        } : undefined
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        },
        goals: true
      }
    });

    res.status(201).json(bep);
  } catch (error) {
    console.error('BEP create error:', error);
    res.status(500).json({ error: 'BEP oluşturulamadı' });
  }
});

// Update BEP
router.put('/:id', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      academicYear,
      startDate,
      endDate,
      status,
      diagnosis,
      strengths,
      weaknesses,
      interests,
      accommodations
    } = req.body;

    const bep = await prisma.bEP.update({
      where: { id },
      data: {
        title,
        academicYear,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        status,
        diagnosis,
        strengths,
        weaknesses,
        interests,
        accommodations
      },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          }
        },
        goals: true
      }
    });

    res.json(bep);
  } catch (error) {
    console.error('BEP update error:', error);
    res.status(500).json({ error: 'BEP güncellenemedi' });
  }
});

// Add goal to BEP
router.post('/:id/goals', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { category, description, targetDate, successCriteria } = req.body;

    const goal = await prisma.bEPGoal.create({
      data: {
        bepId: id,
        category,
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        successCriteria,
        status: GoalStatus.NOT_STARTED,
        progress: 0
      }
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Goal create error:', error);
    res.status(500).json({ error: 'Hedef eklenemedi' });
  }
});

// Update goal
router.put('/goals/:goalId', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { goalId } = req.params;
    const { category, description, targetDate, successCriteria, status, progress, notes } = req.body;

    const goal = await prisma.bEPGoal.update({
      where: { id: goalId },
      data: {
        category,
        description,
        targetDate: targetDate ? new Date(targetDate) : undefined,
        successCriteria,
        status,
        progress,
        notes,
        achievedDate: status === GoalStatus.ACHIEVED ? new Date() : undefined
      }
    });

    res.json(goal);
  } catch (error) {
    console.error('Goal update error:', error);
    res.status(500).json({ error: 'Hedef güncellenemedi' });
  }
});

// Delete goal
router.delete('/goals/:goalId', authMiddleware, teacherMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { goalId } = req.params;

    await prisma.bEPGoal.delete({
      where: { id: goalId }
    });

    res.json({ message: 'Hedef silindi' });
  } catch (error) {
    console.error('Goal delete error:', error);
    res.status(500).json({ error: 'Hedef silinemedi' });
  }
});

// Get BEP template
router.get('/template/default', authMiddleware, teacherMiddleware, async (_req: AuthRequest, res: Response) => {
  res.json(BEPTemplate);
});

// Generate BEP report (PDF data)
router.get('/:id/report', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const bep = await prisma.bEP.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true, email: true }
            }
          }
        },
        goals: {
          orderBy: { category: 'asc' }
        },
        createdBy: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    if (!bep) {
      return res.status(404).json({ error: 'BEP bulunamadı' });
    }

    // Calculate progress statistics
    const totalGoals = bep.goals.length;
    const achievedGoals = bep.goals.filter(g => g.status === 'ACHIEVED').length;
    const inProgressGoals = bep.goals.filter(g => g.status === 'IN_PROGRESS').length;
    const averageProgress = totalGoals > 0
      ? Math.round(bep.goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals)
      : 0;

    const report = {
      bep,
      statistics: {
        totalGoals,
        achievedGoals,
        inProgressGoals,
        averageProgress,
        completionRate: totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0
      },
      generatedAt: new Date().toISOString()
    };

    res.json(report);
  } catch (error) {
    console.error('BEP report error:', error);
    res.status(500).json({ error: 'Rapor oluşturulamadı' });
  }
});

export default router;
