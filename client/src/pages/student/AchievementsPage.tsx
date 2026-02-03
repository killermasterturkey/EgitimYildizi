import { useQuery } from '@tanstack/react-query';
import { progressApi } from '../../services/api';

const AchievementsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn: () => progressApi.getAchievements(),
  });

  const achievements = data?.data?.data?.achievements || [];

  // Demo achievements if none from API
  const demoAchievements = [
    { id: '1', name: 'İlk Adım', description: 'İlk dersini tamamla', icon: '🎯', earned: false, xpReward: 50, coinReward: 25 },
    { id: '2', name: 'Hafıza Ustası', description: 'Hafıza oyununu 3 kez tamamla', icon: '🧠', earned: false, xpReward: 100, coinReward: 50 },
    { id: '3', name: 'Quiz Şampiyonu', description: 'Bir quizden %100 al', icon: '🏆', earned: false, xpReward: 150, coinReward: 75 },
    { id: '4', name: 'Günlük Ziyaretçi', description: '7 gün üst üste giriş yap', icon: '📅', earned: false, xpReward: 100, coinReward: 50 },
    { id: '5', name: 'Çalışkan Arı', description: '10 ders tamamla', icon: '🐝', earned: false, xpReward: 200, coinReward: 100 },
    { id: '6', name: 'Yıldız Öğrenci', description: '1000 XP kazan', icon: '⭐', earned: false, xpReward: 250, coinReward: 125 },
    { id: '7', name: 'Koleksiyoncu', description: '5 rozet kazan', icon: '🎖️', earned: false, xpReward: 300, coinReward: 150 },
    { id: '8', name: 'Matematik Dehası', description: 'Tüm matematik derslerini tamamla', icon: '🔢', earned: false, xpReward: 500, coinReward: 250 },
  ];

  const displayAchievements = achievements.length > 0 ? achievements : demoAchievements;
  const earnedCount = displayAchievements.filter((a: any) => a.earned).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Başarılar 🏆
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Rozetleri topla ve ödüller kazan!
        </p>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-gray-900 dark:text-white">
            İlerleme
          </span>
          <span className="text-primary-600 font-bold">
            {earnedCount} / {displayAchievements.length}
          </span>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
            style={{ width: `${(earnedCount / displayAchievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayAchievements.map((achievement: any) => (
            <div
              key={achievement.id}
              className={`card text-center transition-all ${
                achievement.earned
                  ? 'ring-2 ring-yellow-400'
                  : 'opacity-60 grayscale'
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl ${
                  achievement.earned
                    ? 'bg-yellow-100 dark:bg-yellow-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {achievement.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                {achievement.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {achievement.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="text-primary-600">⭐ {achievement.xpReward}</span>
                <span className="text-yellow-600">🪙 {achievement.coinReward}</span>
              </div>
              {achievement.earned && achievement.earnedAt && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ {new Date(achievement.earnedAt).toLocaleDateString('tr-TR')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
