import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  xpReward: number;
  coinReward: number;
}

interface BadgeShowcaseProps {
  badges: Badge[];
  title?: string;
  showLocked?: boolean;
  columns?: 3 | 4 | 5;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-500',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-400 via-orange-500 to-red-500',
};

const rarityBgColors = {
  common: 'bg-gray-100 dark:bg-gray-700',
  rare: 'bg-blue-100 dark:bg-blue-900/30',
  epic: 'bg-purple-100 dark:bg-purple-900/30',
  legendary: 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
};

const rarityLabels = {
  common: 'Yaygın',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi',
};

const BadgeShowcase = ({
  badges,
  title = 'Rozetler',
  columns = 4,
}: BadgeShowcaseProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const earnedBadges = badges.filter(b => b.earnedDate);

  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrophyIcon className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {earnedBadges.length} / {badges.length} kazanıldı
        </span>
      </div>

      {/* Badge Grid */}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {badges.map((badge, index) => {
          const isEarned = !!badge.earnedDate;

          return (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedBadge(badge)}
              className={`relative p-4 rounded-xl text-center transition-all ${
                isEarned
                  ? `${rarityBgColors[badge.rarity]} hover:shadow-lg hover:scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50 hover:opacity-75'
              }`}
            >
              {/* Rarity indicator */}
              {isEarned && badge.rarity !== 'common' && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]}`} />
              )}

              {/* Icon */}
              <div className="relative">
                <span className={`text-4xl ${!isEarned && 'grayscale opacity-50'}`}>
                  {badge.icon}
                </span>
                {!isEarned && (
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute -bottom-1 -right-1" />
                )}
              </div>

              {/* Name */}
              <p className={`mt-2 text-sm font-medium truncate ${
                isEarned ? 'text-gray-800 dark:text-white' : 'text-gray-400'
              }`}>
                {badge.name}
              </p>

              {/* Progress for locked badges */}
              {!isEarned && badge.progress !== undefined && badge.maxProgress && (
                <div className="mt-2">
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {badge.progress}/{badge.maxProgress}
                  </p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Rarity Banner */}
              <div className={`-m-6 mb-6 p-4 bg-gradient-to-r ${rarityColors[selectedBadge.rarity]} text-white text-center rounded-t-2xl`}>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {rarityLabels[selectedBadge.rarity]}
                </span>
              </div>

              {/* Badge Icon */}
              <div className="text-center">
                <motion.span
                  animate={selectedBadge.earnedDate ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`text-7xl inline-block ${!selectedBadge.earnedDate && 'grayscale opacity-50'}`}
                >
                  {selectedBadge.icon}
                </motion.span>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4 mb-2">
                  {selectedBadge.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedBadge.description}
                </p>

                {/* Rewards */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <SparklesIcon className="w-5 h-5 text-purple-500" />
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      +{selectedBadge.xpReward} XP
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🪙</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">
                      +{selectedBadge.coinReward}
                    </span>
                  </div>
                </div>

                {/* Status */}
                {selectedBadge.earnedDate ? (
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl p-3">
                    <p className="font-medium">✅ Kazanıldı!</p>
                    <p className="text-sm opacity-80">
                      {new Date(selectedBadge.earnedDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
                    <p className="font-medium text-gray-600 dark:text-gray-400">
                      🔒 Henüz Kazanılmadı
                    </p>
                    {selectedBadge.progress !== undefined && selectedBadge.maxProgress && (
                      <>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedBadge.progress} / {selectedBadge.maxProgress}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full mt-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Kapat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeShowcase;
