import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SpeakButton from '../../components/accessibility/SpeakButton';

interface BEPGoal {
  id: string;
  category: string;
  description: string;
  targetDate: string | null;
  successCriteria: string | null;
  status: string;
  progress: number;
  notes: string | null;
  achievedDate: string | null;
}

interface BEP {
  id: string;
  title: string;
  academicYear: string;
  status: string;
  diagnosis: string | null;
  strengths: string | null;
  weaknesses: string | null;
  interests: string | null;
  startDate: string;
  endDate: string;
  student: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      avatar: string | null;
    };
  };
  goals: BEPGoal[];
  createdBy?: {
    firstName: string;
    lastName: string;
  };
}

const goalStatusLabels: Record<string, { label: string; color: string; icon: string }> = {
  NOT_STARTED: { label: 'Başlanmadı', color: 'bg-gray-100 text-gray-700', icon: '⏳' },
  IN_PROGRESS: { label: 'Devam Ediyor', color: 'bg-blue-100 text-blue-700', icon: '🔄' },
  ACHIEVED: { label: 'Başarıldı', color: 'bg-green-100 text-green-700', icon: '✅' },
  MODIFIED: { label: 'Değiştirildi', color: 'bg-yellow-100 text-yellow-700', icon: '📝' },
  DISCONTINUED: { label: 'Durduruldu', color: 'bg-red-100 text-red-700', icon: '⛔' },
};

const goalCategoryLabels: Record<string, { label: string; icon: string }> = {
  ACADEMIC: { label: 'Akademik', icon: '📚' },
  SOCIAL: { label: 'Sosyal', icon: '👥' },
  COMMUNICATION: { label: 'İletişim', icon: '💬' },
  MOTOR: { label: 'Motor', icon: '🏃' },
  SELF_CARE: { label: 'Öz Bakım', icon: '🧹' },
  BEHAVIORAL: { label: 'Davranışsal', icon: '🎯' },
};

const BEPView = () => {
  const { user } = useAuth();

  // Get the first child's ID (simplified - in real app would handle multiple children)
  const childId = user?.parent?.children?.[0]?.id;

  const { data: bep, isLoading, error } = useQuery({
    queryKey: ['parent-bep', childId],
    queryFn: async () => {
      if (!childId) return null;
      const response = await api.get(`/bep/student/${childId}`);
      return response.data as BEP;
    },
    enabled: !!childId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !bep) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <span className="text-4xl block mb-4">📋</span>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          BEP Bulunamadı
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Çocuğunuz için henüz aktif bir BEP oluşturulmamış.
        </p>
      </div>
    );
  }

  // Calculate statistics
  const totalGoals = bep.goals.length;
  const achievedGoals = bep.goals.filter(g => g.status === 'ACHIEVED').length;
  const inProgressGoals = bep.goals.filter(g => g.status === 'IN_PROGRESS').length;
  const averageProgress = totalGoals > 0
    ? Math.round(bep.goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals)
    : 0;

  // Group goals by category
  const goalsByCategory = bep.goals.reduce((acc, goal) => {
    if (!acc[goal.category]) {
      acc[goal.category] = [];
    }
    acc[goal.category].push(goal);
    return acc;
  }, {} as Record<string, BEPGoal[]>);

  // Generate summary text for TTS
  const summaryText = `
    ${bep.student.user.firstName}'in Bireyselleştirilmiş Eğitim Programı.
    Toplam ${totalGoals} hedef var.
    ${achievedGoals} hedef tamamlandı.
    ${inProgressGoals} hedef devam ediyor.
    Genel ilerleme yüzde ${averageProgress}.
  `;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-3xl">
              {bep.student.user.avatar || '👤'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {bep.student.user.firstName}'in BEP'i
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {bep.title} - {bep.academicYear}
              </p>
            </div>
          </div>
          <SpeakButton text={summaryText} variant="button" label="Özeti Dinle" />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 {new Date(bep.startDate).toLocaleDateString('tr-TR')} - {new Date(bep.endDate).toLocaleDateString('tr-TR')}</span>
          {bep.createdBy && (
            <span>👨‍🏫 {bep.createdBy.firstName} {bep.createdBy.lastName}</span>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-primary-500">{totalGoals}</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Hedef</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-green-500">{achievedGoals}</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tamamlanan</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-blue-500">{inProgressGoals}</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">Devam Eden</p>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-primary-500">{averageProgress}%</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">Genel İlerleme</p>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Genel İlerleme</span>
            <span>{averageProgress}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${averageProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>📝</span> Öğrenci Bilgileri
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {bep.diagnosis && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>🏥</span> Tanı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                {bep.diagnosis}
              </p>
            </div>
          )}
          {bep.strengths && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>💪</span> Güçlü Yönler
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                {bep.strengths}
              </p>
            </div>
          )}
          {bep.weaknesses && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>📈</span> Gelişim Alanları
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                {bep.weaknesses}
              </p>
            </div>
          )}
          {bep.interests && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>⭐</span> İlgi Alanları
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                {bep.interests}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Goals by Category */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>🎯</span> Hedefler
        </h2>

        {Object.entries(goalsByCategory).map(([category, goals]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>{goalCategoryLabels[category]?.icon || '📌'}</span>
              {goalCategoryLabels[category]?.label || category}
              <span className="text-sm font-normal text-gray-500">
                ({goals.length} hedef)
              </span>
            </h3>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${goalStatusLabels[goal.status]?.color}`}>
                          {goalStatusLabels[goal.status]?.icon} {goalStatusLabels[goal.status]?.label}
                        </span>
                        {goal.targetDate && (
                          <span className="text-xs text-gray-500">
                            Hedef: {new Date(goal.targetDate).toLocaleDateString('tr-TR')}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 dark:text-white">{goal.description}</p>
                    </div>
                    <SpeakButton text={goal.description} size="sm" />
                  </div>

                  {goal.successCriteria && (
                    <div className="mb-3 text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Başarı Kriterleri: </span>
                      <span className="text-gray-600 dark:text-gray-400">{goal.successCriteria}</span>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full ${goal.status === 'ACHIEVED'
                          ? 'bg-green-500'
                          : 'bg-primary-500'
                          }`}
                      />
                    </div>
                    <span className="text-sm font-bold min-w-[3rem] text-right">
                      {goal.progress}%
                    </span>
                  </div>

                  {goal.notes && (
                    <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
                      <span className="font-medium">📝 Öğretmen Notu: </span>
                      {goal.notes}
                    </div>
                  )}

                  {goal.achievedDate && (
                    <div className="mt-2 text-sm text-green-600">
                      ✅ {new Date(goal.achievedDate).toLocaleDateString('tr-TR')} tarihinde tamamlandı
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <span>ℹ️</span> BEP Hakkında
        </h3>
        <p className="text-blue-700 dark:text-blue-400 text-sm">
          Bireyselleştirilmiş Eğitim Programı (BEP), çocuğunuzun özel eğitim ihtiyaçlarına göre
          hazırlanmış kişisel bir eğitim planıdır. Bu sayfa üzerinden çocuğunuzun hedeflerini
          ve ilerlemesini takip edebilirsiniz. Sorularınız için öğretmenle iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default BEPView;
