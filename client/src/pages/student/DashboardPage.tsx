import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  const quickActions = [
    { name: 'Dersler', icon: '📚', href: '/lessons', color: 'bg-blue-500' },
    { name: 'Oyunlar', icon: '🎮', href: '/games', color: 'bg-green-500' },
    { name: 'Sınavlar', icon: '📝', href: '/quizzes', color: 'bg-purple-500' },
    { name: 'Başarılar', icon: '🏆', href: '/achievements', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Merhaba, {user?.firstName}! 👋
            </h1>
            <p className="text-primary-100">
              Bugün öğrenmeye hazır mısın? Hadi başlayalım!
            </p>
          </div>
          <div className="hidden md:block text-6xl">🌟</div>
        </div>
      </div>

      {/* Stats */}
      {user?.student && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-primary-600">{user.student.xp}</div>
            <div className="text-sm text-gray-500">Toplam XP</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-primary-600">{user.student.level}</div>
            <div className="text-sm text-gray-500">Seviye</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🪙</div>
            <div className="text-2xl font-bold text-yellow-600">{user.student.coins}</div>
            <div className="text-sm text-gray-500">Altın</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-500">Rozet</div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="card hover:shadow-xl transition-shadow flex flex-col items-center justify-center py-8 group"
            >
              <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily challenge */}
      <div className="card border-2 border-dashed border-primary-300 dark:border-primary-700">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🎯</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Günün Görevi
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bugün bir ders tamamla ve 50 XP kazan!
            </p>
          </div>
          <Link to="/lessons" className="btn-primary">
            Başla
          </Link>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Son Aktiviteler
        </h2>
        <div className="card">
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📊</div>
            <p>Henüz aktivite yok. Hadi bir derse başla!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
