import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats'),
  });

  const statCards = [
    { label: 'Toplam Kullanıcı', value: stats?.data?.data?.users || 0, icon: '👥', color: 'bg-blue-500', href: '/admin/users' },
    { label: 'Öğrenci', value: stats?.data?.data?.students || 0, icon: '🎓', color: 'bg-green-500', href: '/admin/users?role=STUDENT' },
    { label: 'Öğretmen', value: stats?.data?.data?.teachers || 0, icon: '👨‍🏫', color: 'bg-purple-500', href: '/admin/users?role=TEACHER' },
    { label: 'Ders', value: stats?.data?.data?.lessons || 0, icon: '📚', color: 'bg-yellow-500', href: '/admin/lessons' },
    { label: 'Oyun', value: stats?.data?.data?.games || 0, icon: '🎮', color: 'bg-pink-500', href: '/admin/games' },
    { label: 'Quiz', value: stats?.data?.data?.quizzes || 0, icon: '📝', color: 'bg-indigo-500', href: '/admin/quizzes' },
  ];

  const quickActions = [
    { label: 'Kullanıcı Ekle', icon: '➕👤', href: '/admin/users/new' },
    { label: 'Ders Ekle', icon: '➕📚', href: '/admin/lessons/new' },
    { label: 'Oyun Ekle', icon: '➕🎮', href: '/admin/games/new' },
    { label: 'Quiz Ekle', icon: '➕📝', href: '/admin/quizzes/new' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Paneli 🛠️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Platform yönetimi ve istatistikler
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center"
            >
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Son Kayıtlar
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Yeni kullanıcı kaydı
                  </p>
                  <p className="text-xs text-gray-500">2 dakika önce</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Platform Sağlığı
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sunucu Durumu</span>
                <span className="text-green-600">Çalışıyor ✓</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full w-full bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Veritabanı</span>
                <span className="text-green-600">Bağlı ✓</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full w-full bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Disk Kullanımı</span>
                <span>45%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full w-[45%] bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
