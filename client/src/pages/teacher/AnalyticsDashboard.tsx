import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../../services/api';

interface StudentAnalytics {
  student: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      avatar: string | null;
    };
    level: number;
    xp: number;
  };
  stats: {
    totalLessons: number;
    completedLessons: number;
    totalQuizzes: number;
    completedQuizzes: number;
    averageQuizScore: number;
    totalGames: number;
    totalTimeSpent: number; // minutes
    streak: number;
    lastActive: string | null;
  };
  weeklyProgress: {
    day: string;
    xp: number;
    timeSpent: number;
  }[];
  subjectProgress: {
    subject: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
  }[];
}

const subjectLabels: Record<string, { label: string; color: string; icon: string }> = {
  MATH: { label: 'Matematik', color: 'bg-blue-500', icon: '🔢' },
  TURKISH: { label: 'Türkçe', color: 'bg-red-500', icon: '📖' },
  SCIENCE: { label: 'Fen Bilgisi', color: 'bg-green-500', icon: '🔬' },
  SOCIAL_STUDIES: { label: 'Sosyal Bilgiler', color: 'bg-yellow-500', icon: '🌍' },
  ENGLISH: { label: 'İngilizce', color: 'bg-purple-500', icon: '🇬🇧' },
  LIFE_SKILLS: { label: 'Hayat Bilgisi', color: 'bg-pink-500', icon: '🌱' },
};

const AnalyticsDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'all'>('week');

  // Fetch students with analytics
  const { data: studentsAnalytics, isLoading } = useQuery({
    queryKey: ['teacher-analytics', dateRange],
    queryFn: async () => {
      const response = await api.get(`/teacher/analytics?range=${dateRange}`);
      return response.data as StudentAnalytics[];
    },
  });

  const selectedStudentData = studentsAnalytics?.find(s => s.student.id === selectedStudent);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate class averages
  const classStats = studentsAnalytics ? {
    avgProgress: Math.round(
      studentsAnalytics.reduce((sum, s) =>
        sum + (s.stats.completedLessons / Math.max(s.stats.totalLessons, 1)) * 100, 0
      ) / studentsAnalytics.length
    ),
    avgQuizScore: Math.round(
      studentsAnalytics.reduce((sum, s) => sum + s.stats.averageQuizScore, 0) / studentsAnalytics.length
    ),
    avgTimeSpent: Math.round(
      studentsAnalytics.reduce((sum, s) => sum + s.stats.totalTimeSpent, 0) / studentsAnalytics.length
    ),
    totalStudents: studentsAnalytics.length,
  } : { avgProgress: 0, avgQuizScore: 0, avgTimeSpent: 0, totalStudents: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 Analitik Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Öğrenci performansını ve ilerlemesini takip edin
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                dateRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range === 'week' ? 'Bu Hafta' : range === 'month' ? 'Bu Ay' : 'Tümü'}
            </button>
          ))}
        </div>
      </div>

      {/* Class Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="text-3xl mb-2">👨‍🎓</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {classStats.totalStudents}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Toplam Öğrenci</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="text-3xl mb-2">📈</div>
          <div className="text-3xl font-bold text-green-500">
            {classStats.avgProgress}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Ort. İlerleme</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="text-3xl mb-2">📝</div>
          <div className="text-3xl font-bold text-blue-500">
            {classStats.avgQuizScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Ort. Sınav Puanı</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-3xl font-bold text-purple-500">
            {classStats.avgTimeSpent}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Ort. Dakika/Hafta</div>
        </motion.div>
      </div>

      {/* Students List & Detail View */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Öğrenciler</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {studentsAnalytics?.map((analytics) => {
              const progress = analytics.stats.totalLessons > 0
                ? Math.round((analytics.stats.completedLessons / analytics.stats.totalLessons) * 100)
                : 0;

              return (
                <button
                  key={analytics.student.id}
                  onClick={() => setSelectedStudent(analytics.student.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    selectedStudent === analytics.student.id
                      ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-xl">
                    {analytics.student.user.avatar || '👤'}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {analytics.student.user.firstName} {analytics.student.user.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      Seviye {analytics.student.level} • {analytics.student.xp} XP
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${
                      progress >= 70 ? 'text-green-500' :
                      progress >= 40 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {progress}%
                    </div>
                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          progress >= 70 ? 'bg-green-500' :
                          progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Detail */}
        <div className="lg:col-span-2">
          {selectedStudentData ? (
            <motion.div
              key={selectedStudent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Student Header */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-3xl">
                    {selectedStudentData.student.user.avatar || '👤'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedStudentData.student.user.firstName} {selectedStudentData.student.user.lastName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Seviye {selectedStudentData.student.level} • {selectedStudentData.student.xp} XP
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary-500">
                      {selectedStudentData.stats.completedLessons}/{selectedStudentData.stats.totalLessons}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Dersler</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {selectedStudentData.stats.averageQuizScore}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Sınav Ortalaması</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {selectedStudentData.stats.totalGames}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Oyun Oynandı</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {selectedStudentData.stats.streak}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Gün Seri</div>
                  </div>
                </div>
              </div>

              {/* Weekly Progress Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Haftalık İlerleme</h3>
                <div className="flex items-end justify-between h-40 gap-2">
                  {selectedStudentData.weeklyProgress.map((day, index) => {
                    const maxXP = Math.max(...selectedStudentData.weeklyProgress.map(d => d.xp), 1);
                    const height = (day.xp / maxXP) * 100;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative" style={{ height: '120px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: index * 0.1 }}
                            className="absolute bottom-0 w-full bg-primary-500 rounded-t-lg"
                          />
                        </div>
                        <span className="text-xs font-medium">{day.xp} XP</span>
                        <span className="text-xs text-gray-500">{day.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subject Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ders Bazlı İlerleme</h3>
                <div className="space-y-4">
                  {selectedStudentData.subjectProgress.map((subject) => {
                    const subjectInfo = subjectLabels[subject.subject] || {
                      label: subject.subject,
                      color: 'bg-gray-500',
                      icon: '📚'
                    };

                    return (
                      <div key={subject.subject}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span>{subjectInfo.icon}</span>
                            <span className="font-medium">{subjectInfo.label}</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {subject.lessonsCompleted}/{subject.totalLessons} ders • {subject.progress}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${subject.progress}%` }}
                            className={`h-full ${subjectInfo.color}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center">
              <span className="text-6xl block mb-4">📊</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Öğrenci Seçin
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detaylı analiz görmek için soldan bir öğrenci seçin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
