import { Router } from 'express';
import {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/lesson.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes (for browsing)
router.get('/', getLessons);
router.get('/:id', getLesson);
router.get('/:lessonId/topics', getTopics);
router.get('/:lessonId/topics/:topicId', getTopic);

// Protected routes (require authentication)
router.use(authenticate);

// Admin/Teacher only routes
router.post('/', authorize('ADMIN', 'TEACHER'), createLesson);
router.put('/:id', authorize('ADMIN', 'TEACHER'), updateLesson);
router.delete('/:id', authorize('ADMIN'), deleteLesson);

router.post('/:lessonId/topics', authorize('ADMIN', 'TEACHER'), createTopic);
router.put('/:lessonId/topics/:topicId', authorize('ADMIN', 'TEACHER'), updateTopic);
router.delete('/:lessonId/topics/:topicId', authorize('ADMIN'), deleteTopic);

export default router;
