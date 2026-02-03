// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  settings?: UserSettings;
  student?: Student;
  parent?: Parent;
  teacher?: Teacher;
}

export type UserRole = 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN';

export interface UserSettings {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  notifications?: boolean;
}

// Student types
export interface Student {
  id: string;
  userId: string;
  grade: GradeLevel;
  specialNeeds: SpecialNeedType[];
  xp: number;
  level: number;
  coins: number;
  parentId?: string;
  teacherId?: string;
}

export type GradeLevel =
  | 'PRESCHOOL'
  | 'GRADE_1'
  | 'GRADE_2'
  | 'GRADE_3'
  | 'GRADE_4'
  | 'GRADE_5'
  | 'GRADE_6'
  | 'GRADE_7'
  | 'GRADE_8';

export type SpecialNeedType =
  | 'AUTISM'
  | 'LEARNING_DISABILITY'
  | 'INTELLECTUAL_DISABILITY'
  | 'ADHD'
  | 'DYSLEXIA'
  | 'DYSCALCULIA'
  | 'OTHER';

// Parent types
export interface Parent {
  id: string;
  userId: string;
  children: Student[];
}

// Teacher types
export interface Teacher {
  id: string;
  userId: string;
  school?: string;
  students: Student[];
}

// Lesson types
export interface Lesson {
  id: string;
  subject: Subject;
  grade: GradeLevel;
  title: string;
  description?: string;
  order: number;
  topics: Topic[];
}

export type Subject =
  | 'MATH'
  | 'TURKISH'
  | 'SCIENCE'
  | 'SOCIAL_STUDIES'
  | 'ENGLISH'
  | 'LIFE_SKILLS';

// Topic types
export interface Topic {
  id: string;
  lessonId: string;
  title: string;
  content: string;
  order: number;
  images: string[];
  animations?: any;
  audioUrl?: string;
  games: Game[];
  quizzes: Quiz[];
}

// Game types
export interface Game {
  id: string;
  topicId?: string;
  title: string;
  description?: string;
  type: GameType;
  difficulty: DifficultyLevel;
  config: any;
  maxScore: number;
  xpReward: number;
  coinReward: number;
}

export type GameType = 'MEMORY' | 'DRAG_DROP' | 'ARCADE' | 'MATCHING' | 'SORTING';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

// Quiz types
export interface Quiz {
  id: string;
  topicId?: string;
  title: string;
  description?: string;
  difficulty: DifficultyLevel;
  timeLimit?: number;
  showHints: boolean;
  randomize: boolean;
  xpReward: number;
  coinReward: number;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  text: string;
  hint?: string;
  explanation?: string;
  options?: string[];
  answer: any;
  points: number;
  order: number;
}

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_BLANK'
  | 'MATCHING'
  | 'DRAG_DROP'
  | 'TRUE_FALSE';

// Progress types
export interface Progress {
  id: string;
  studentId: string;
  topicId: string;
  percentage: number;
  timeSpent: number;
  completed: boolean;
  completedAt?: Date;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: any;
  xpReward: number;
  coinReward: number;
  earned?: boolean;
  earnedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
