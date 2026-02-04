import { motion } from 'framer-motion';
import { useStreak } from '../../hooks/useStreak';
import { FireIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface StreakDisplayProps {
  compact?: boolean;
  showWeekly?: boolean;
  onMilestone?: (streak: number) => void;
}

const StreakDisplay = ({ compact = false, showWeekly = true, onMilestone }: StreakDisplayProps) => {
  const {
    currentStreak,
    longestStreak,
    weeklyActivity,
    streakMilestone,
    clearMilestone,
    getStreakReward,
    getStreakMessage,
    recordActivity,
  } = useStreak();

  const reward = getStreakReward(currentStreak);
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Handle milestone notification
  if (streakMilestone && onMilestone) {
    onMilestone(streakMilestone);
    clearMilestone();
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-lg">
        <FireIcon className="w-5 h-5 text-orange-500" />
        <span className="font-bold text-orange-600 dark:text-orange-400">
          {currentStreak}
        </span>
        <span className="text-sm text-orange-500">gün</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={currentStreak > 0 ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl"
          >
            <FireIcon className="w-6 h-6 text-orange-500" />
          </motion.div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">
              Günlük Seri
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getStreakMessage()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-orange-500">
            {currentStreak}
          </p>
          <p className="text-xs text-gray-500">gün üst üste</p>
        </div>
      </div>

      {/* Weekly Activity */}
      {showWeekly && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Bu Hafta
          </p>
          <div className="flex justify-between gap-1">
            {weekDays.map((day, index) => {
              const isActive = weeklyActivity[index];
              const isToday = index === 6;

              return (
                <div key={day} className="flex-1 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : isToday
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 ring-2 ring-primary-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {isActive ? (
                      <CheckCircleIcon className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </motion.div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {day}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {longestStreak}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            En Uzun Seri
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{reward.xp}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Günlük XP Bonus
          </p>
        </div>
      </div>

      {/* Milestones */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Sonraki Ödül
        </p>
        <div className="flex items-center gap-3">
          {[3, 7, 14, 30].map((milestone) => {
            const achieved = currentStreak >= milestone;
            const isNext = !achieved && currentStreak < milestone;
            const prevMilestones = [0, 3, 7, 14];
            const prevIndex = [3, 7, 14, 30].indexOf(milestone);
            const isNextMilestone = isNext && (prevIndex === 0 || currentStreak >= prevMilestones[prevIndex]);

            return (
              <div
                key={milestone}
                className={`flex-1 text-center p-2 rounded-lg ${
                  achieved
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : isNextMilestone
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <p className={`font-bold ${
                  achieved
                    ? 'text-green-600 dark:text-green-400'
                    : isNextMilestone
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-gray-400'
                }`}>
                  {milestone}
                </p>
                <p className="text-xs text-gray-500">gün</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Record Activity Button (for demo) */}
      <button
        onClick={recordActivity}
        className="w-full mt-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
      >
        🔥 Bugün Aktif Ol
      </button>
    </motion.div>
  );
};

export default StreakDisplay;
