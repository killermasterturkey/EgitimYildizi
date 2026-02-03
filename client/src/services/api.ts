import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Lessons API
export const lessonsApi = {
  getAll: (params?: { subject?: string; grade?: string }) =>
    api.get('/lessons', { params }),
  getById: (id: string) => api.get(`/lessons/${id}`),
  getTopics: (lessonId: string) => api.get(`/lessons/${lessonId}/topics`),
  getTopic: (lessonId: string, topicId: string) =>
    api.get(`/lessons/${lessonId}/topics/${topicId}`),
};

// Games API
export const gamesApi = {
  getAll: (params?: { type?: string; difficulty?: string; topicId?: string }) =>
    api.get('/games', { params }),
  getById: (id: string) => api.get(`/games/${id}`),
  saveScore: (id: string, data: { score: number; timeSpent: number; completed: boolean }) =>
    api.post(`/games/${id}/score`, data),
  getLeaderboard: (id: string, limit?: number) =>
    api.get(`/games/${id}/leaderboard`, { params: { limit } }),
};

// Quizzes API
export const quizzesApi = {
  getAll: (params?: { topicId?: string; difficulty?: string }) =>
    api.get('/quizzes', { params }),
  getById: (id: string) => api.get(`/quizzes/${id}`),
  submit: (id: string, data: { answers: Record<string, any>; timeSpent: number }) =>
    api.post(`/quizzes/${id}/submit`, data),
  getAttempts: (id: string) => api.get(`/quizzes/${id}/attempts`),
};

// Progress API
export const progressApi = {
  get: (params?: { studentId?: string; subject?: string; grade?: string }) =>
    api.get('/progress', { params }),
  update: (data: { topicId: string; percentage: number; timeSpent?: number }) =>
    api.post('/progress/update', data),
  getStats: (studentId?: string) =>
    api.get('/progress/stats', { params: { studentId } }),
  getAchievements: () => api.get('/progress/achievements'),
};

// Users API
export const usersApi = {
  getProfile: (id: string) => api.get(`/users/${id}`),
  updateProfile: (id: string, data: any) => api.put(`/users/${id}`, data),
  getStudentProfile: (id: string) => api.get(`/users/${id}/student-profile`),
};

// Admin API
export const adminApi = {
  // Stats
  getStats: () => api.get('/admin/stats'),

  // Users
  getUsers: (params?: { page?: number; limit?: number; role?: string; search?: string }) =>
    api.get('/admin/users', { params }),
  createUser: (data: any) => api.post('/admin/users', data),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  // Lessons
  getLessons: (params?: { page?: number; limit?: number; subject?: string; grade?: string }) =>
    api.get('/admin/lessons', { params }),
  createLesson: (data: any) => api.post('/admin/lessons', data),
  updateLesson: (id: string, data: any) => api.put(`/admin/lessons/${id}`, data),
  deleteLesson: (id: string) => api.delete(`/admin/lessons/${id}`),

  // Games
  getGames: (params?: { page?: number; limit?: number; type?: string }) =>
    api.get('/admin/games', { params }),
  createGame: (data: any) => api.post('/admin/games', data),
  updateGame: (id: string, data: any) => api.put(`/admin/games/${id}`, data),
  deleteGame: (id: string) => api.delete(`/admin/games/${id}`),
};

// Teacher API
export const teacherApi = {
  getDashboard: () => api.get('/teacher/dashboard'),
  getStudents: () => api.get('/teacher/students'),
  getStudent: (id: string) => api.get(`/teacher/students/${id}`),
  getProgress: () => api.get('/teacher/progress'),
  createAssignment: (data: any) => api.post('/teacher/assignments', data),
  updateStudentNotes: (id: string, notes: string) =>
    api.put(`/teacher/students/${id}/notes`, { notes }),
};

// Parent API
export const parentApi = {
  getChildren: () => api.get('/parent/children'),
  getChild: (id: string) => api.get(`/parent/children/${id}`),
  getChildReports: (id: string, period?: string) =>
    api.get(`/parent/children/${id}/reports`, { params: { period } }),
  getNotifications: () => api.get('/parent/notifications'),
  updateSettings: (data: any) => api.post('/parent/settings', data),
};
