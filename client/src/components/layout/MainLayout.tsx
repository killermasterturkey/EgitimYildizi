import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role-based navigation
  const getNavigation = (): NavItem[] => {
    const role = user?.role || 'STUDENT';

    switch (role) {
      case 'ADMIN':
        return [
          { name: 'Panel', href: '/admin', icon: '📊' },
          { name: 'Kullanıcılar', href: '/admin/users', icon: '👥' },
          { name: 'Dersler', href: '/admin/lessons', icon: '📚' },
          { name: 'Oyunlar', href: '/admin/games', icon: '🎮' },
          { name: 'Öğretmen Paneli', href: '/teacher', icon: '👨‍🏫' },
          { name: 'Veli Paneli', href: '/parent', icon: '👨‍👩‍👧' },
        ];
      case 'TEACHER':
        return [
          { name: 'Panel', href: '/teacher', icon: '📊' },
          { name: 'Öğrencilerim', href: '/teacher/students', icon: '👨‍🎓' },
          { name: 'Ödevler', href: '/teacher/assignments', icon: '📋' },
          { name: 'BEP', href: '/teacher/bep', icon: '📝' },
          { name: 'Analitik', href: '/teacher/analytics', icon: '📈' },
        ];
      case 'PARENT':
        return [
          { name: 'Panel', href: '/parent', icon: '📊' },
          { name: 'Raporlar', href: '/parent/reports', icon: '📈' },
          { name: 'BEP', href: '/parent/bep', icon: '📝' },
        ];
      default: // STUDENT
        return [
          { name: 'Ana Sayfa', href: '/dashboard', icon: '🏠' },
          { name: 'Dersler', href: '/lessons', icon: '📚' },
          { name: 'Oyunlar', href: '/games', icon: '🎮' },
          { name: 'Sınavlar', href: '/quizzes', icon: '📝' },
          { name: 'Başarılar', href: '/achievements', icon: '🏆' },
          { name: 'Profil', href: '/profile', icon: '👤' },
        ];
    }
  };

  const navigation = getNavigation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN': return '👑 Yönetici';
      case 'TEACHER': return '👨‍🏫 Öğretmen';
      case 'PARENT': return '👨‍👩‍👧 Veli';
      default: return '👨‍🎓 Öğrenci';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'TEACHER': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PARENT': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
          <span className="text-3xl">⭐</span>
          <span className="text-xl font-bold font-display text-primary-600">
            EğitimYıldızı
          </span>
        </div>

        {/* User info */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl">
              {user?.avatar || '😊'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role || 'STUDENT')}`}>
                {getRoleLabel(user?.role || 'STUDENT')}
              </span>
            </div>
          </div>

          {/* Student specific info */}
          {user?.student && (
            <>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Seviye {user.student.level}</span>
                <span>•</span>
                <span>⭐ {user.student.xp} XP</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-yellow-500">🪙</span>
                <span className="font-medium">{user.student.coins} Altın</span>
              </div>
            </>
          )}

          {/* Teacher specific info */}
          {user?.teacher && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span>📚 {user.teacher.specialization || 'Genel'}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/dashboard' && item.href !== '/admin' && item.href !== '/teacher' && item.href !== '/parent' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mt-1"
          >
            <span className="text-xl">🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <NotificationDropdown />

              {/* Settings */}
              <Link
                to="/profile"
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="text-xl">⚙️</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
