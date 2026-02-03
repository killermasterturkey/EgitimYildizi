import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../../services/api';

const gameTypeIcons: Record<string, string> = {
  MEMORY: '🧠',
  DRAG_DROP: '👆',
  ARCADE: '🕹️',
  MATCHING: '🔗',
  SORTING: '📊',
  CATCH: '🧺',
};

// Static demo games that are always available
const demoGames = [
  {
    id: 'memory-demo',
    title: 'Hafıza Oyunu',
    description: 'Kartları eşleştirerek hafızanı geliştir!',
    type: 'MEMORY',
    difficulty: 'EASY',
    xpReward: 20,
    path: '/games/memory/demo',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    id: 'dragdrop',
    title: 'Sürükle Bırak',
    description: 'Öğeleri doğru kutulara sürükle!',
    type: 'DRAG_DROP',
    difficulty: 'EASY',
    xpReward: 15,
    path: '/games/dragdrop',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 'matching',
    title: 'Eşleştirme Oyunu',
    description: 'İşlemleri sonuçlarıyla eşleştir!',
    type: 'MATCHING',
    difficulty: 'MEDIUM',
    xpReward: 25,
    path: '/games/matching',
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: 'catch',
    title: 'Yakala Oyunu',
    description: 'Düşen nesneleri yakala, kötülerden kaçın!',
    type: 'CATCH',
    difficulty: 'MEDIUM',
    xpReward: 30,
    path: '/games/catch',
    gradient: 'from-orange-400 to-orange-600',
  },
];

const GamesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => gamesApi.getAll(),
  });

  const games = data?.data?.data?.games || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oyunlar 🎮
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Eğlenerek öğren! Oyun oyna, puan kazan!
        </p>
      </div>

      {/* Demo Games Section - Always available */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🎯 Hemen Oyna
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoGames.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="card hover:shadow-xl transition-all group overflow-hidden"
            >
              <div className={`h-24 bg-gradient-to-br ${game.gradient} rounded-lg flex items-center justify-center text-5xl group-hover:scale-105 transition-transform`}>
                {gameTypeIcons[game.type] || '🎮'}
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {game.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {game.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    game.difficulty === 'EASY' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    game.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {game.difficulty === 'EASY' ? 'Kolay' :
                     game.difficulty === 'MEDIUM' ? 'Orta' : 'Zor'}
                  </span>
                  <span className="text-xs text-gray-500">
                    ⭐ {game.xpReward} XP
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* API Games Section */}
      {isLoading ? (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📚 Ders Oyunları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      ) : games.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📚 Ders Oyunları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game: any) => (
              <Link
                key={game.id}
                to={`/games/memory/${game.id}`}
                className="card hover:shadow-xl transition-all group overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                  {gameTypeIcons[game.type] || '🎮'}
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                      game.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {game.difficulty === 'EASY' ? 'Kolay' :
                       game.difficulty === 'MEDIUM' ? 'Orta' : 'Zor'}
                    </span>
                    <span className="text-sm text-gray-500">
                      ⭐ {game.xpReward} XP
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Game Stats */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h2 className="text-lg font-bold mb-4">🏆 Oyun İstatistiklerin</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-primary-100">Oynanan Oyun</div>
          </div>
          <div>
            <div className="text-3xl font-bold">450</div>
            <div className="text-sm text-primary-100">Toplam Puan</div>
          </div>
          <div>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-primary-100">Rozet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
