import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import gameRoutes from './routes/game.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import progressRoutes from './routes/progress.routes.js';
import adminRoutes from './routes/admin.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import parentRoutes from './routes/parent.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import bepRoutes from './routes/bep.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';
import { rateLimiter } from './middleware/rateLimit.middleware.js';

// Initialize Prisma
export const prisma = new PrismaClient();

// Initialize Express
const app = express();
const PORT = process.env.PORT_API || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bep', bepRoutes);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('✅ Connected to database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
