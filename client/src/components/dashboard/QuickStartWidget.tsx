import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStreak } from '../../hooks/useStreak';
import {
  BookOpenIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
  FireIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
}

const QuickStartWidget = () => {
  const { user } = useAuth();
  const { currentStreak, getStreakMessage, recordActivity } = useStreak();

  const quickActions: QuickAction[] = [
    {
      id: 'lessons',
      title: 'Ders Çalış',
      description: 'Yeni konular öğren',
      icon: <BookOpenIcon className="w-6 h-6" />,
      href: '/lessons',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      id: 'games',
      title: 'Oyun Oyna',
      description: 'Eğlenerek öğren',
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      href: '/games',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 'quizzes',
      title: 'Quiz Çöz',
      description: 'Bilgini test et',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      href: '/quizzes',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      id: 'challenges',
      title: 'Görevler',
      description: 'Günlük ödüller',
      icon: <FireIcon className="w-6 h-6" />,
      href: '/challenges',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {greetingMessage()}, {user?.firstName}! 👋
          </h2>
          <p className="text-white/80">
            Bugün ne öğrenmek istersin?
          </p>
        </div>

        {/* Streak Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => recordActivity()}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl cursor-pointer"
        >
          <FireIcon className="w-5 h-5 text-orange-300" />
          <div>
            <p className="font-bold">{currentStreak}</p>
            <p className="text-xs text-white/70">günlük seri</p>
          </div>
        </motion.div>
      </div>

      {/* Streak Message */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-6">
        <p className="text-sm text-white/90">
          🔥 {getStreakMessage()}
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.href}
              className="block bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all group"
            >
              <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                {action.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {action.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning */}
      {user?.student && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-yellow-900" />
              </div>
              <div>
                <p className="font-medium">Kaldığın yerden devam et</p>
                <p className="text-sm text-white/70">Matematik - Toplama İşlemi</p>
              </div>
            </div>
            <Link
              to="/lessons"
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Devam Et
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuickStartWidget;
