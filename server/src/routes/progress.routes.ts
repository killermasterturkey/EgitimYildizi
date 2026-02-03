import { Router } from 'express';
import {
  getProgress,
  updateProgress,
  getStudentStats,
  getAchievements,
} from '../controllers/progress.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get progress for current user or specific student
router.get('/', getProgress);
router.get('/stats', getStudentStats);
router.get('/achievements', getAchievements);

// Update progress
router.post('/update', authorize('STUDENT'), updateProgress);

export default router;
