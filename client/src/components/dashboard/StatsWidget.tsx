import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  SparklesIcon,
  TrophyIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  change?: string;
}

const StatsWidget = () => {
  const { user } = useAuth();
  const student = user?.student;

  const stats: Stat[] = [
    {
      label: 'Toplam XP',
      value: student?.xp?.toLocaleString() || '0',
      icon: <SparklesIcon className="w-6 h-6" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      change: '+250 bu hafta',
    },
    {
      label: 'Seviye',
      value: student?.level || 1,
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'Altın',
      value: student?.coins?.toLocaleString() || '0',
      icon: <span className="text-xl">🪙</span>,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      change: '+50 bu hafta',
    },
    {
      label: 'Rozetler',
      value: 0,
      icon: <TrophyIcon className="w-6 h-6" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  // XP Progress to next level
  const currentLevelXP = student?.xp ? student.xp % 100 : 0;
  const progressPercent = (currentLevelXP / 100) * 100;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.change && (
                <span className="text-xs text-green-500 font-medium">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* XP Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            <span className="font-medium text-gray-800 dark:text-white">
              Seviye İlerlemesi
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentLevelXP} / 100 XP
          </span>
        </div>

        <div className="relative">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>

          {/* Level markers */}
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Lv. {student?.level || 1}</span>
            <span className="text-xs text-gray-400">Lv. {(student?.level || 1) + 1}</span>
          </div>
        </div>

        {/* Next level reward preview */}
        <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            🎁 Sonraki seviyede: <span className="font-medium">+50 Altın</span> ve yeni rozet!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsWidget;
