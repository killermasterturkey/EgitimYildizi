import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getStudentProfile,
} from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all users (admin only)
router.get('/', authorize('ADMIN'), getUsers);

// Get user by ID
router.get('/:id', getUser);

// Update user
router.put('/:id', updateUser);

// Delete user (admin only)
router.delete('/:id', authorize('ADMIN'), deleteUser);

// Get student profile with progress
router.get('/:id/student-profile', getStudentProfile);

export default router;
