import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import SpeakButton from '../../components/accessibility/SpeakButton';

interface WeeklyData {
  day: string;
  xp: number;
  minutes: number;
}

interface SubjectProgress {
  subject: string;
  label: string;
  progress: number;
  color: string;
  icon: string;
}

const ParentDashboard = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const { data: children } = useQuery({
    queryKey: ['parent-children'],
    queryFn: () => api.get('/parent/children'),
  });

  const childrenList = children?.data?.data?.children || [];

  // Demo data with enhanced details
  const demoChildren = [
    {
      id: '1',
      user: { firstName: 'Ali', lastName: 'Yıldız', avatar: '😊' },
      grade: 'GRADE_3',
      level: 5,
      xp: 1250,
      coins: 375,
      streak: 7,
      completedTopics: 15,
      totalTopics: 30,
      weeklyXP: 320,
      todayMinutes: 45,
      weeklyData: [
        { day: 'Pzt', xp: 45, minutes: 30 },
        { day: 'Sal', xp: 60, minutes: 40 },
        { day: 'Çar', xp: 35, minutes: 25 },
        { day: 'Per', xp: 70, minutes: 50 },
        { day: 'Cum', xp: 55, minutes: 35 },
        { day: 'Cmt', xp: 40, minutes: 30 },
        { day: 'Paz', xp: 15, minutes: 15 },
      ] as WeeklyData[],
      subjectProgress: [
        { subject: 'MATH', label: 'Matematik', progress: 75, color: 'bg-blue-500', icon: '🔢' },
        { subject: 'TURKISH', label: 'Türkçe', progress: 60, color: 'bg-red-500', icon: '📖' },
        { subject: 'SCIENCE', label: 'Fen Bilgisi', progress: 45, color: 'bg-green-500', icon: '🔬' },
        { subject: 'LIFE_SKILLS', label: 'Hayat Bilgisi', progress: 80, color: 'bg-purple-500', icon: '🌱' },
      ] as SubjectProgress[],
      recentAchievements: [
        { name: 'Matematik Yıldızı', icon: '⭐', date: '2 gün önce' },
        { name: '7 Gün Seri', icon: '🔥', date: 'Bugün' },
      ],
      recentActivity: [
        { type: 'lesson', title: '11-20 Arası Sayılar konusunu tamamladı', time: '2 saat önce', xp: 20 },
        { type: 'game', title: 'Sayı Eşleştirme oyununda 95 puan aldı', time: '3 saat önce', xp: 15 },
        { type: 'quiz', title: 'Toplama Quiz\'inden %90 aldı', time: '5 saat önce', xp: 30 },
        { type: 'achievement', title: '7 Gün Seri rozetini kazandı', time: 'Bugün', xp: 50 },
      ],
    },
  ];

  const displayChildren = childrenList.length > 0 ? childrenList : demoChildren;
  const currentChild = selectedChild
    ? displayChildren.find((c: any) => c.id === selectedChild)
    : displayChildren[0];

  // Calculate summary text for TTS
  const summaryText = currentChild
    ? `${currentChild.user?.firstName}'in haftalık özeti: ${currentChild.weeklyXP || 320} XP kazandı, ${currentChild.streak || 7} günlük seri var, ${currentChild.completedTopics} konu tamamlandı.`
    : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Veli Paneli 👨‍👩‍👧
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hoş geldin, {user?.firstName}! Çocuğunuzun ilerlemesini takip edin.
          </p>
        </div>
        <SpeakButton text={summaryText} variant="button" label="Özeti Dinle" />
      </div>

      {/* Child Selector (if multiple children) */}
      {displayChildren.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayChildren.map((child: any) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                (selectedChild || displayChildren[0].id) === child.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-xl">{child.user?.avatar || '👤'}</span>
              <span className="font-medium">{child.user?.firstName}</span>
            </button>
          ))}
        </div>
      )}

      {currentChild && (
        <motion.div
          key={currentChild.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Child Overview Card */}
          <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-4xl"
              >
                {currentChild.user?.avatar || '😊'}
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold">
                  {currentChild.user?.firstName} {currentChild.user?.lastName}
                </h2>
                <p className="text-primary-100">
                  {currentChild.grade?.replace('GRADE_', '')}. Sınıf • Seviye {currentChild.level}
                </p>
                {currentChild.streak > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-orange-300">🔥</span>
                    <span className="text-sm font-medium">{currentChild.streak} gün seri!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.xp}</div>
                <div className="text-xs text-primary-200">Toplam XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.weeklyXP || 320}</div>
                <div className="text-xs text-primary-200">Bu Hafta XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.todayMinutes || 45}</div>
                <div className="text-xs text-primary-200">Bugün (dk)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentChild.coins}</div>
                <div className="text-xs text-primary-200">Altın</div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              📊 Haftalık İlerleme
            </h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {(currentChild.weeklyData || demoChildren[0].weeklyData).map((day: WeeklyData, index: number) => {
                const maxXP = Math.max(...(currentChild.weeklyData || demoChildren[0].weeklyData).map((d: WeeklyData) => d.xp));
                const height = maxXP > 0 ? (day.xp / maxXP) * 100 : 0;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative" style={{ height: '100px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                        className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-primary-600">{day.xp}</div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Toplam: {(currentChild.weeklyData || demoChildren[0].weeklyData).reduce((sum: number, d: WeeklyData) => sum + d.xp, 0)} XP</span>
              <span>Ort: {Math.round((currentChild.weeklyData || demoChildren[0].weeklyData).reduce((sum: number, d: WeeklyData) => sum + d.xp, 0) / 7)} XP/gün</span>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              📚 Ders Bazlı İlerleme
            </h3>
            <div className="space-y-4">
              {(currentChild.subjectProgress || demoChildren[0].subjectProgress).map((subject: SubjectProgress, index: number) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{subject.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{subject.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      className={`h-full ${subject.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-yellow-600">{currentChild.level}</div>
              <div className="text-sm text-gray-500">Seviye</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-green-600">
                {currentChild.completedTopics}/{currentChild.totalTopics}
              </div>
              <div className="text-sm text-gray-500">Tamamlanan</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-600">{currentChild.streak || 7}</div>
              <div className="text-sm text-gray-500">Gün Seri</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">🪙</div>
              <div className="text-2xl font-bold text-orange-600">{currentChild.coins}</div>
              <div className="text-sm text-gray-500">Altın</div>
            </motion.div>
          </div>

          {/* Recent Achievements */}
          {(currentChild.recentAchievements || demoChildren[0].recentAchievements).length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                🏅 Son Kazanılan Rozetler
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {(currentChild.recentAchievements || demoChildren[0].recentAchievements).map((achievement: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md text-center min-w-[120px]"
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{achievement.name}</div>
                    <div className="text-xs text-gray-500">{achievement.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              ⏱️ Son Aktiviteler
            </h3>
            <div className="space-y-4">
              {(currentChild.recentActivity || demoChildren[0].recentActivity).map((activity: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    activity.type === 'lesson' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'game' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    activity.type === 'quiz' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    {activity.type === 'lesson' ? '📚' :
                     activity.type === 'game' ? '🎮' :
                     activity.type === 'quiz' ? '📝' : '🏆'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  {activity.xp && (
                    <div className="text-sm font-bold text-primary-600">
                      +{activity.xp} XP
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/parent/reports" className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow text-center">
              <span className="text-3xl block mb-2">📊</span>
              <span className="font-medium text-gray-900 dark:text-white">Detaylı Rapor</span>
            </Link>
            <Link to="/parent/bep" className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow text-center">
              <span className="text-3xl block mb-2">📝</span>
              <span className="font-medium text-gray-900 dark:text-white">BEP Görüntüle</span>
            </Link>
            <Link to="/parent/settings" className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow text-center">
              <span className="text-3xl block mb-2">🔔</span>
              <span className="font-medium text-gray-900 dark:text-white">Bildirimler</span>
            </Link>
            <Link to="/parent/messages" className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow text-center">
              <span className="text-3xl block mb-2">💬</span>
              <span className="font-medium text-gray-900 dark:text-white">Öğretmen</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ParentDashboard;
