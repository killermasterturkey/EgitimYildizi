import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  BookOpenIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
  TrophyIcon,
  SparklesIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  type: 'lesson' | 'game' | 'quiz' | 'achievement' | 'levelup' | 'streak';
  title: string;
  description: string;
  timestamp: Date;
  xpEarned?: number;
  coinsEarned?: number;
}

// Mock activities - in production, these would come from API
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'lesson',
    title: 'Ders Tamamlandı',
    description: 'Matematik - Toplama İşlemi',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    xpEarned: 50,
    coinsEarned: 10,
  },
  {
    id: '2',
    type: 'game',
    title: '3 Yıldız Kazandın!',
    description: 'Hafıza Oyunu',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    xpEarned: 30,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Yeni Rozet!',
    description: 'Matematik Ustası rozetini kazandın',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    xpEarned: 100,
    coinsEarned: 25,
  },
  {
    id: '4',
    type: 'quiz',
    title: 'Quiz Tamamlandı',
    description: 'Türkçe Quiz - %90 başarı',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    xpEarned: 75,
    coinsEarned: 15,
  },
  {
    id: '5',
    type: 'streak',
    title: 'Seri Devam!',
    description: '5 gün üst üste öğrendin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    xpEarned: 50,
  },
  {
    id: '6',
    type: 'levelup',
    title: 'Seviye Atladın!',
    description: 'Artık Seviye 12 oldun',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    xpEarned: 0,
    coinsEarned: 50,
  },
];

const activityIcons: Record<string, React.ReactNode> = {
  lesson: <BookOpenIcon className="w-5 h-5 text-blue-500" />,
  game: <PuzzlePieceIcon className="w-5 h-5 text-purple-500" />,
  quiz: <AcademicCapIcon className="w-5 h-5 text-green-500" />,
  achievement: <TrophyIcon className="w-5 h-5 text-yellow-500" />,
  levelup: <SparklesIcon className="w-5 h-5 text-pink-500" />,
  streak: <FireIcon className="w-5 h-5 text-orange-500" />,
};

const activityBgColors: Record<string, string> = {
  lesson: 'bg-blue-100 dark:bg-blue-900/30',
  game: 'bg-purple-100 dark:bg-purple-900/30',
  quiz: 'bg-green-100 dark:bg-green-900/30',
  achievement: 'bg-yellow-100 dark:bg-yellow-900/30',
  levelup: 'bg-pink-100 dark:bg-pink-900/30',
  streak: 'bg-orange-100 dark:bg-orange-900/30',
};

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
}

const ActivityFeed = ({ limit = 5, showHeader = true }: ActivityFeedProps) => {
  const activities = mockActivities.slice(0, limit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      {showHeader && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-primary-500" />
            Son Aktiviteler
          </h3>
        </div>
      )}

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activityBgColors[activity.type]}`}>
                {activityIcons[activity.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatDistanceToNow(activity.timestamp, {
                      addSuffix: true,
                      locale: tr,
                    })}
                  </span>
                </div>

                {/* Rewards */}
                {(activity.xpEarned || activity.coinsEarned) && (
                  <div className="flex items-center gap-3 mt-2">
                    {activity.xpEarned ? (
                      <span className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                        <SparklesIcon className="w-3 h-3" />
                        +{activity.xpEarned} XP
                      </span>
                    ) : null}
                    {activity.coinsEarned ? (
                      <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                        🪙 +{activity.coinsEarned}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="/profile"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Tüm aktiviteleri gör →
        </a>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
