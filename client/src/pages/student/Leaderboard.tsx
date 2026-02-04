import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import SpeakButton from '../../components/accessibility/SpeakButton';
import {
  TrophyIcon,
  FireIcon,
  SparklesIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  change: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'allTime'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<'xp' | 'streak' | 'level'>('xp');

  // Mock leaderboard data - in production, this would come from API
  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, id: '1', name: 'Ayşe Yılmaz', avatar: '👧', level: 15, xp: 4520, streak: 12, change: 'same' },
    { rank: 2, id: '2', name: 'Mehmet Demir', avatar: '👦', level: 14, xp: 4350, streak: 8, change: 'up' },
    { rank: 3, id: '3', name: 'Zeynep Kaya', avatar: '👩', level: 13, xp: 4100, streak: 15, change: 'down' },
    { rank: 4, id: 'current', name: `${user?.firstName || 'Sen'} ${user?.lastName || ''}`, avatar: '🌟', level: 12, xp: 3890, streak: 5, change: 'up', isCurrentUser: true },
    { rank: 5, id: '5', name: 'Ali Can', avatar: '👨', level: 12, xp: 3750, streak: 6, change: 'same' },
    { rank: 6, id: '6', name: 'Fatma Özkan', avatar: '👧', level: 11, xp: 3520, streak: 4, change: 'up' },
    { rank: 7, id: '7', name: 'Emre Şahin', avatar: '👦', level: 11, xp: 3400, streak: 7, change: 'down' },
    { rank: 8, id: '8', name: 'Elif Arslan', avatar: '👩', level: 10, xp: 3200, streak: 3, change: 'same' },
    { rank: 9, id: '9', name: 'Burak Koç', avatar: '👨', level: 10, xp: 3100, streak: 9, change: 'up' },
    { rank: 10, id: '10', name: 'Selin Aydın', avatar: '👧', level: 9, xp: 2900, streak: 2, change: 'down' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-2xl">🥇</span>;
    if (rank === 2) return <span className="text-2xl">🥈</span>;
    if (rank === 3) return <span className="text-2xl">🥉</span>;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  const getChangeIcon = (change: string) => {
    if (change === 'up') return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
    if (change === 'down') return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
    return <MinusIcon className="w-4 h-4 text-gray-400" />;
  };

  const currentUserEntry = mockLeaderboard.find(e => e.isCurrentUser);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
            <TrophyIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('leaderboard.title', 'Liderlik Tablosu')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('leaderboard.subtitle', 'En iyi öğrencilerle yarış!')}
            </p>
          </div>
          <SpeakButton text="Liderlik Tablosu. En iyi öğrencilerle yarış!" className="ml-2" />
        </div>
      </div>

      {/* Time Period Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { id: 'daily', label: 'Bugün' },
          { id: 'weekly', label: 'Bu Hafta' },
          { id: 'allTime', label: 'Tüm Zamanlar' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {[
          { id: 'xp', label: 'XP', icon: <SparklesIcon className="w-4 h-4" /> },
          { id: 'streak', label: 'Seri', icon: <FireIcon className="w-4 h-4" /> },
          { id: 'level', label: 'Seviye', icon: <StarIcon className="w-4 h-4" /> },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-center gap-4 mb-8"
      >
        {/* 2nd Place */}
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded-t-2xl p-4 pb-8"
          >
            <span className="text-4xl">{mockLeaderboard[1].avatar}</span>
            <div className="mt-2">
              <span className="text-2xl">🥈</span>
            </div>
            <p className="font-bold text-gray-800 dark:text-white mt-2">{mockLeaderboard[1].name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedCategory === 'xp' && `${mockLeaderboard[1].xp.toLocaleString()} XP`}
              {selectedCategory === 'streak' && `${mockLeaderboard[1].streak} gün`}
              {selectedCategory === 'level' && `Seviye ${mockLeaderboard[1].level}`}
            </p>
          </motion.div>
          <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded-b-lg" />
        </div>

        {/* 1st Place */}
        <div className="text-center -mb-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-t from-yellow-400 to-yellow-300 dark:from-yellow-600 dark:to-yellow-500 rounded-t-2xl p-6 pb-10 shadow-lg"
          >
            <span className="text-5xl">{mockLeaderboard[0].avatar}</span>
            <div className="mt-2">
              <span className="text-3xl">👑</span>
            </div>
            <span className="text-3xl">🥇</span>
            <p className="font-bold text-gray-800 dark:text-white mt-2 text-lg">{mockLeaderboard[0].name}</p>
            <p className="text-gray-700 dark:text-gray-200">
              {selectedCategory === 'xp' && `${mockLeaderboard[0].xp.toLocaleString()} XP`}
              {selectedCategory === 'streak' && `${mockLeaderboard[0].streak} gün`}
              {selectedCategory === 'level' && `Seviye ${mockLeaderboard[0].level}`}
            </p>
          </motion.div>
          <div className="h-28 bg-yellow-400 dark:bg-yellow-600 rounded-b-lg" />
        </div>

        {/* 3rd Place */}
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-t from-orange-300 to-orange-200 dark:from-orange-700 dark:to-orange-600 rounded-t-2xl p-4 pb-6"
          >
            <span className="text-4xl">{mockLeaderboard[2].avatar}</span>
            <div className="mt-2">
              <span className="text-2xl">🥉</span>
            </div>
            <p className="font-bold text-gray-800 dark:text-white mt-2">{mockLeaderboard[2].name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedCategory === 'xp' && `${mockLeaderboard[2].xp.toLocaleString()} XP`}
              {selectedCategory === 'streak' && `${mockLeaderboard[2].streak} gün`}
              {selectedCategory === 'level' && `Seviye ${mockLeaderboard[2].level}`}
            </p>
          </motion.div>
          <div className="h-14 bg-orange-300 dark:bg-orange-700 rounded-b-lg" />
        </div>
      </motion.div>

      {/* Current User Position Card */}
      {currentUserEntry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold">#{currentUserEntry.rank}</p>
                <p className="text-sm opacity-80">Sıralaman</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div>
                <p className="text-lg font-bold">{currentUserEntry.name}</p>
                <p className="opacity-80">
                  {selectedCategory === 'xp' && `${currentUserEntry.xp.toLocaleString()} XP`}
                  {selectedCategory === 'streak' && `${currentUserEntry.streak} günlük seri`}
                  {selectedCategory === 'level' && `Seviye ${currentUserEntry.level}`}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                {getChangeIcon(currentUserEntry.change)}
                <span className="text-sm">
                  {currentUserEntry.change === 'up' && 'Yükseliyorsun!'}
                  {currentUserEntry.change === 'down' && 'Düşüştesin'}
                  {currentUserEntry.change === 'same' && 'Sabit'}
                </span>
              </div>
              <p className="text-sm opacity-80 mt-1">İlk 3'e {4 - currentUserEntry.rank + 350} XP kaldı!</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-gray-800 dark:text-white">Tüm Sıralama</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {mockLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                entry.isCurrentUser ? 'bg-primary-50 dark:bg-primary-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center">
                  {getRankIcon(entry.rank)}
                </div>
                <span className="text-2xl">{entry.avatar}</span>
                <div>
                  <p className={`font-medium ${entry.isCurrentUser ? 'text-primary-600 dark:text-primary-400' : 'text-gray-800 dark:text-white'}`}>
                    {entry.name} {entry.isCurrentUser && '(Sen)'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Seviye {entry.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-white">
                    {selectedCategory === 'xp' && `${entry.xp.toLocaleString()} XP`}
                    {selectedCategory === 'streak' && `${entry.streak} 🔥`}
                    {selectedCategory === 'level' && `Lv. ${entry.level}`}
                  </p>
                </div>
                <div className="w-6">
                  {getChangeIcon(entry.change)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Motivation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white"
      >
        <h3 className="text-xl font-bold mb-2">🚀 Sen de yapabilirsin!</h3>
        <p className="opacity-90 mb-4">
          Her gün ders çalış, oyun oyna ve quizlere katıl. Liderlik tablosunda yüksel!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/lessons"
            className="px-6 py-2 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            📚 Ders Çalış
          </a>
          <a
            href="/games"
            className="px-6 py-2 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
          >
            🎮 Oyun Oyna
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
