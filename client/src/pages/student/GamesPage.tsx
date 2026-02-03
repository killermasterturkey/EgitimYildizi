import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../../services/api';

const gameTypeIcons: Record<string, string> = {
  MEMORY: '🧠',
  DRAG_DROP: '👆',
  ARCADE: '🕹️',
  MATCHING: '🔗',
  SORTING: '📊',
};

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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : games.length > 0 ? (
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
      ) : (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Demo Oyunları
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hafıza oyunumuzu deneyin!
          </p>
          <Link to="/games/memory/demo" className="btn-primary">
            Hafıza Oyunu Oyna
          </Link>
        </div>
      )}
    </div>
  );
};

export default GamesPage;
