import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { AppError } from '../middleware/error.middleware.js';
import { UserRole, GradeLevel } from '@prisma/client';

interface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  grade?: GradeLevel;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, role, grade } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
        },
      });

      // Create role-specific profile
      if (role === 'STUDENT' && grade) {
        await tx.student.create({
          data: {
            userId: newUser.id,
            grade,
          },
        });
      } else if (role === 'PARENT') {
        await tx.parent.create({
          data: {
            userId: newUser.id,
          },
        });
      } else if (role === 'TEACHER') {
        await tx.teacher.create({
          data: {
            userId: newUser.id,
          },
        });
      }

      return newUser;
    });

    // Generate token
    const token = generateToken({ userId: user.id, role: user.role });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        parent: true,
        teacher: true,
      },
    });

    if (!user || !user.password) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate token
    const token = generateToken({ userId: user.id, role: user.role });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          student: user.student,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            achievements: {
              include: { achievement: true },
            },
          },
        },
        parent: {
          include: { children: true },
        },
        teacher: {
          include: { students: true },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          settings: user.settings,
          student: user.student,
          parent: user.parent,
          teacher: user.teacher,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In a real app, you might want to invalidate the token
    // For now, just return success (client will remove token)
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
