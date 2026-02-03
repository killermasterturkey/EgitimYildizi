import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { AppError } from './error.middleware.js';
import { UserRole } from '@prisma/client';

interface JwtPayload {
  userId: string;
  role: UserRole;
}

// Extended Request with full user data for routes that need it
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    student?: {
      id: string;
    };
    teacher?: {
      id: string;
    };
    parent?: {
      id: string;
    };
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        student?: {
          id: string;
        };
        teacher?: {
          id: string;
        };
        parent?: {
          id: string;
        };
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'default-secret';

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401);
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    next(error);
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized', 403));
    }

    next();
  };
};

// Alias for backwards compatibility
export const authMiddleware = authenticate;

// Teacher-specific middleware - loads teacher data
export const teacherMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return next(new AppError('Teacher access required', 403));
    }

    // Load teacher data
    const teacher = await prisma.teacher.findFirst({
      where: { userId: req.user.id },
      select: { id: true }
    });

    if (teacher) {
      req.user.teacher = { id: teacher.id };
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Parent-specific middleware - loads parent data
export const parentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (req.user.role !== 'PARENT' && req.user.role !== 'ADMIN') {
      return next(new AppError('Parent access required', 403));
    }

    // Load parent data
    const parent = await prisma.parent.findFirst({
      where: { userId: req.user.id },
      select: { id: true }
    });

    if (parent) {
      req.user.parent = { id: parent.id };
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Student-specific middleware - loads student data
export const studentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (req.user.role !== 'STUDENT' && req.user.role !== 'ADMIN') {
      return next(new AppError('Student access required', 403));
    }

    // Load student data
    const student = await prisma.student.findFirst({
      where: { userId: req.user.id },
      select: { id: true }
    });

    if (student) {
      req.user.student = { id: student.id };
    }

    next();
  } catch (error) {
    next(error);
  }
};
