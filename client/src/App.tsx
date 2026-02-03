import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAccessibility } from './context/AccessibilityContext';
import { useTheme } from './context/ThemeContext';

// Layout
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Student Pages
import DashboardPage from './pages/student/DashboardPage';
import LessonsPage from './pages/student/LessonsPage';
import TopicPage from './pages/student/TopicPage';
import GamesPage from './pages/student/GamesPage';
import MemoryGamePage from './pages/student/games/MemoryGamePage';
import DragDropGame from './pages/student/games/DragDropGame';
import MatchingGame from './pages/student/games/MatchingGame';
import CatchGame from './pages/student/games/CatchGame';
import QuizzesPage from './pages/student/QuizzesPage';
import QuizPage from './pages/student/QuizPage';
import ProfilePage from './pages/student/ProfilePage';
import AchievementsPage from './pages/student/AchievementsPage';
import RewardShop from './pages/student/RewardShop';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import LessonsManagement from './pages/admin/LessonsManagement';
import GamesManagement from './pages/admin/GamesManagement';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentsPage from './pages/teacher/StudentsPage';
import AssignmentsPage from './pages/teacher/AssignmentsPage';
import BEPManagement from './pages/teacher/BEPManagement';
import AnalyticsDashboard from './pages/teacher/AnalyticsDashboard';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ReportsPage from './pages/parent/ReportsPage';
import BEPView from './pages/parent/BEPView';

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
    </div>
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Role-based Route wrapper
interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const RoleRoute = ({ children, allowedRoles, redirectTo = '/dashboard' }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper (redirect if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    // Redirect based on role
    const roleRedirects: Record<string, string> = {
      ADMIN: '/admin',
      TEACHER: '/teacher',
      PARENT: '/parent',
      STUDENT: '/dashboard',
    };
    return <Navigate to={roleRedirects[user.role] || '/dashboard'} replace />;
  }

  return <>{children}</>;
};

// Smart home redirect based on role
const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roleRedirects: Record<string, string> = {
    ADMIN: '/admin',
    TEACHER: '/teacher',
    PARENT: '/parent',
    STUDENT: '/dashboard',
  };

  return <Navigate to={roleRedirects[user.role] || '/dashboard'} replace />;
};

function App() {
  const { theme } = useTheme();
  const { settings } = useAccessibility();

  // Apply accessibility classes to html element
  const accessibilityClasses = [
    theme === 'dark' ? 'dark' : '',
    settings.highContrast ? 'high-contrast' : '',
    settings.largeText ? 'large-text' : '',
    settings.reducedMotion ? 'reduced-motion' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={accessibilityClasses}>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* Student Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Student Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonId/topics/:topicId" element={<TopicPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/memory/:id" element={<MemoryGamePage />} />
          <Route path="/games/dragdrop" element={<DragDropGame />} />
          <Route path="/games/matching" element={<MatchingGame />} />
          <Route path="/games/catch" element={<CatchGame />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/shop" element={<RewardShop />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <RoleRoute allowedRoles={['ADMIN']}>
              <MainLayout />
            </RoleRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/lessons" element={<LessonsManagement />} />
          <Route path="/admin/games" element={<GamesManagement />} />
        </Route>

        {/* Teacher Routes */}
        <Route
          element={
            <RoleRoute allowedRoles={['TEACHER', 'ADMIN']}>
              <MainLayout />
            </RoleRoute>
          }
        >
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<StudentsPage />} />
          <Route path="/teacher/assignments" element={<AssignmentsPage />} />
          <Route path="/teacher/bep" element={<BEPManagement />} />
          <Route path="/teacher/analytics" element={<AnalyticsDashboard />} />
        </Route>

        {/* Parent Routes */}
        <Route
          element={
            <RoleRoute allowedRoles={['PARENT', 'ADMIN']}>
              <MainLayout />
            </RoleRoute>
          }
        >
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/parent/reports" element={<ReportsPage />} />
          <Route path="/parent/bep" element={<BEPView />} />
        </Route>

        {/* Smart Redirect based on role */}
        <Route path="/" element={<HomeRedirect />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Sayfa bulunamadı
                </p>
                <a href="/dashboard" className="btn-primary">
                  Ana Sayfaya Dön
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
