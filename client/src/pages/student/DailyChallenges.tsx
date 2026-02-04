import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SpeakButton from '../../components/accessibility/SpeakButton';
import AchievementCelebration from '../../components/common/AchievementCelebration';
import {
  FireIcon,
  CheckCircleIcon,
  ClockIcon,
  GiftIcon,
  SparklesIcon,
  TrophyIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  target: number;
  xpReward: number;
  coinReward: number;
  type: 'lesson' | 'game' | 'quiz' | 'streak';
  completed: boolean;
}

const DailyChallenges = () => {
  const { t } = useTranslation();
  const [celebrationAchievement, setCelebrationAchievement] = useState<{
    name: string;
    description: string;
    icon: string;
    xpReward?: number;
    coinReward?: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  // Mock challenges - in production, these would come from API
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '📚 Ders Kahramanı',
      description: '2 ders konusu tamamla',
      icon: <BookOpenIcon className="w-6 h-6" />,
      progress: 1,
      target: 2,
      xpReward: 50,
      coinReward: 10,
      type: 'lesson',
      completed: false,
    },
    {
      id: '2',
      title: '🎮 Oyun Ustası',
      description: '3 oyunda 3 yıldız al',
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      progress: 2,
      target: 3,
      xpReward: 75,
      coinReward: 15,
      type: 'game',
      completed: false,
    },
    {
      id: '3',
      title: '🧠 Quiz Şampiyonu',
      description: '1 quizde %80 üstü puan al',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      progress: 0,
      target: 1,
      xpReward: 60,
      coinReward: 12,
      type: 'quiz',
      completed: false,
    },
    {
      id: '4',
      title: '🔥 Ateş Serisi',
      description: '3 gün üst üste giriş yap',
      icon: <FireIcon className="w-6 h-6" />,
      progress: 2,
      target: 3,
      xpReward: 100,
      coinReward: 25,
      type: 'streak',
      completed: false,
    },
  ]);

  // Calculate time until reset (midnight)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const completedCount = challenges.filter(c => c.completed).length;
  const totalRewardXP = challenges.reduce((sum, c) => sum + c.xpReward, 0);
  const totalRewardCoins = challenges.reduce((sum, c) => sum + c.coinReward, 0);
  const bonusUnlocked = completedCount === challenges.length;

  const handleClaimReward = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && c.progress >= c.target) {
        setCelebrationAchievement({
          name: c.title,
          description: `+${c.xpReward} XP ve +${c.coinReward} altın kazandın!`,
          icon: '🎯',
          xpReward: c.xpReward,
          coinReward: c.coinReward,
        });
        return { ...c, completed: true };
      }
      return c;
    }));
  };

  const claimBonusReward = () => {
    setCelebrationAchievement({
      name: '🎉 Günlük Bonus!',
      description: 'Tüm görevleri tamamladın!',
      icon: '🎁',
      xpReward: 200,
      coinReward: 50,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Celebration Modal */}
      <AchievementCelebration
        achievement={celebrationAchievement}
        onClose={() => setCelebrationAchievement(null)}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl">
            <FireIcon className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('challenges.title', 'Günlük Görevler')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('challenges.subtitle', 'Her gün yeni görevler, yeni ödüller!')}
            </p>
          </div>
          <SpeakButton text="Günlük Görevler. Her gün yeni görevler, yeni ödüller!" className="ml-2" />
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Yenileniyor:</span>
          <span className="font-mono font-bold text-primary-600">{timeLeft}</span>
        </div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Bugünkü İlerleme</h2>
            <p className="opacity-90">
              {completedCount} / {challenges.length} görev tamamlandı
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{totalRewardXP}</p>
              <p className="text-sm opacity-80">Toplam XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalRewardCoins}</p>
              <p className="text-sm opacity-80">Toplam Altın</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / challenges.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 transition-all ${
              challenge.completed
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : challenge.progress >= challenge.target
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                : 'border-transparent hover:border-primary-200 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  challenge.type === 'lesson' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                  challenge.type === 'game' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                  challenge.type === 'quiz' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                }`}>
                  {challenge.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {challenge.description}
                  </p>
                </div>
              </div>
              {challenge.completed && (
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              )}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">İlerleme</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {challenge.progress} / {challenge.target}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                  className={`h-full rounded-full ${
                    challenge.completed ? 'bg-green-500' :
                    challenge.progress >= challenge.target ? 'bg-yellow-500' :
                    'bg-primary-500'
                  }`}
                />
              </div>
            </div>

            {/* Rewards */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm">
                  <SparklesIcon className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{challenge.xpReward} XP</span>
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <span>🪙</span>
                  <span className="font-medium">{challenge.coinReward}</span>
                </span>
              </div>

              {!challenge.completed && challenge.progress >= challenge.target && (
                <button
                  onClick={() => handleClaimReward(challenge.id)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Ödülü Al
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bonus Reward */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-2xl p-6 text-center ${
          bonusUnlocked
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800'
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <GiftIcon className={`w-8 h-8 ${bonusUnlocked ? 'text-white' : 'text-gray-400'}`} />
          <h2 className={`text-xl font-bold ${bonusUnlocked ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
            Günlük Bonus Ödül
          </h2>
        </div>

        <p className={`mb-4 ${bonusUnlocked ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
          {bonusUnlocked
            ? 'Tebrikler! Tüm görevleri tamamladın! 🎉'
            : `Tüm görevleri tamamla ve bonus ödül kazan! (${completedCount}/${challenges.length})`
          }
        </p>

        <div className={`flex justify-center gap-6 mb-4 ${bonusUnlocked ? '' : 'opacity-50'}`}>
          <div className="text-center">
            <p className={`text-3xl font-bold ${bonusUnlocked ? 'text-white' : 'text-gray-400'}`}>+200</p>
            <p className={`text-sm ${bonusUnlocked ? 'text-white/80' : 'text-gray-500'}`}>Bonus XP</p>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold ${bonusUnlocked ? 'text-white' : 'text-gray-400'}`}>+50</p>
            <p className={`text-sm ${bonusUnlocked ? 'text-white/80' : 'text-gray-500'}`}>Bonus Altın</p>
          </div>
        </div>

        {bonusUnlocked && (
          <button
            onClick={claimBonusReward}
            className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            🎁 Bonus Ödülü Al
          </button>
        )}
      </motion.div>

      {/* Weekly Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrophyIcon className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Haftalık Seri
          </h2>
        </div>

        <div className="flex justify-between gap-2">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, index) => {
            const isCompleted = index < 3; // Mock: first 3 days completed
            const isToday = index === 3; // Mock: Thursday is today

            return (
              <div key={day} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isToday
                      ? 'bg-primary-500 text-white ring-4 ring-primary-200 dark:ring-primary-900'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <p className={`text-xs font-medium ${
                  isToday ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {day}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
          <p className="text-amber-800 dark:text-amber-300 font-medium">
            🔥 3 günlük seri! 7 gün üst üste tamamla ve <span className="font-bold">500 XP</span> bonus kazan!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyChallenges;
