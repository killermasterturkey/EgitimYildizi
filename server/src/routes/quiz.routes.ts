import { Router } from 'express';
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getQuizAttempts,
} from '../controllers/quiz.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getQuizzes);
router.get('/:id', getQuiz);

// Protected routes
router.use(authenticate);

// Student routes
router.post('/:id/submit', authorize('STUDENT'), submitQuiz);
router.get('/:id/attempts', getQuizAttempts);

// Admin/Teacher only
router.post('/', authorize('ADMIN', 'TEACHER'), createQuiz);
router.put('/:id', authorize('ADMIN', 'TEACHER'), updateQuiz);
router.delete('/:id', authorize('ADMIN'), deleteQuiz);

export default router;
