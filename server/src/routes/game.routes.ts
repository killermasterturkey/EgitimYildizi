import { Router } from 'express';
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
  saveScore,
  getLeaderboard,
} from '../controllers/game.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getGames);
router.get('/:id', getGame);
router.get('/:id/leaderboard', getLeaderboard);

// Protected routes
router.use(authenticate);

// Save score (students)
router.post('/:id/score', authorize('STUDENT'), saveScore);

// Admin/Teacher only
router.post('/', authorize('ADMIN', 'TEACHER'), createGame);
router.put('/:id', authorize('ADMIN', 'TEACHER'), updateGame);
router.delete('/:id', authorize('ADMIN'), deleteGame);

export default router;
