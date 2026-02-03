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
import QuizzesPage from './pages/student/QuizzesPage';
import QuizPage from './pages/student/QuizPage';
import ProfilePage from './pages/student/ProfilePage';
import AchievementsPage from './pages/student/AchievementsPage';

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

// Public Route wrapper (redirect if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
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

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonId/topics/:topicId" element={<TopicPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/memory/:id" element={<MemoryGamePage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Route>

        {/* Redirect root to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
