import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

interface BEPGoal {
  id: string;
  category: string;
  description: string;
  targetDate: string | null;
  successCriteria: string | null;
  status: string;
  progress: number;
  notes: string | null;
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

interface Student {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  COMPLETED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  ARCHIVED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const goalStatusColors: Record<string, string> = {
  NOT_STARTED: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  ACHIEVED: 'bg-green-100 text-green-700',
  MODIFIED: 'bg-yellow-100 text-yellow-700',
  DISCONTINUED: 'bg-red-100 text-red-700',
};

const goalCategoryLabels: Record<string, string> = {
  ACADEMIC: 'Akademik',
  SOCIAL: 'Sosyal',
  COMMUNICATION: 'İletişim',
  MOTOR: 'Motor',
  SELF_CARE: 'Öz Bakım',
  BEHAVIORAL: 'Davranışsal',
};

const BEPManagement = () => {
  const queryClient = useQueryClient();
  const [selectedBEP, setSelectedBEP] = useState<BEP | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BEPGoal | null>(null);

  // Form state for new BEP
  const [newBEP, setNewBEP] = useState({
    studentId: '',
    title: '',
    academicYear: '2024-2025',
    startDate: '',
    endDate: '',
    diagnosis: '',
    strengths: '',
    weaknesses: '',
    interests: '',
  });

  // Form state for new goal
  const [newGoal, setNewGoal] = useState({
    category: 'ACADEMIC',
    description: '',
    targetDate: '',
    successCriteria: '',
  });

  // Fetch BEPs
  const { data: beps, isLoading } = useQuery({
    queryKey: ['teacher-beps'],
    queryFn: async () => {
      const response = await api.get('/bep/teacher');
      return response.data as BEP[];
    },
  });

  // Fetch students for dropdown
  const { data: students } = useQuery({
    queryKey: ['teacher-students'],
    queryFn: async () => {
      const response = await api.get('/teacher/students');
      return response.data as Student[];
    },
  });

  // Create BEP mutation
  const createBEPMutation = useMutation({
    mutationFn: async (data: typeof newBEP) => {
      const response = await api.post('/bep', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-beps'] });
      setIsCreating(false);
      setNewBEP({
        studentId: '',
        title: '',
        academicYear: '2024-2025',
        startDate: '',
        endDate: '',
        diagnosis: '',
        strengths: '',
        weaknesses: '',
        interests: '',
      });
    },
  });

  // Update BEP status mutation
  const updateBEPMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await api.put(`/bep/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-beps'] });
    },
  });

  // Add goal mutation
  const addGoalMutation = useMutation({
    mutationFn: async ({ bepId, goal }: { bepId: string; goal: typeof newGoal }) => {
      const response = await api.post(`/bep/${bepId}/goals`, goal);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-beps'] });
      setNewGoal({
        category: 'ACADEMIC',
        description: '',
        targetDate: '',
        successCriteria: '',
      });
    },
  });

  // Update goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: async ({ goalId, data }: { goalId: string; data: Partial<BEPGoal> }) => {
      const response = await api.put(`/bep/goals/${goalId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-beps'] });
      setEditingGoal(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            BEP Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bireyselleştirilmiş Eğitim Programlarını yönetin
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          <span>Yeni BEP</span>
        </button>
      </div>

      {/* BEP List */}
      <div className="grid gap-4">
        {beps?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
            <span className="text-4xl block mb-4">📋</span>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Henüz BEP Yok
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Öğrencileriniz için BEP oluşturmaya başlayın.
            </p>
          </div>
        ) : (
          beps?.map((bep) => (
            <motion.div
              key={bep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl">
                    {bep.student.user.avatar || '👤'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {bep.student.user.firstName} {bep.student.user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bep.title} - {bep.academicYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[bep.status]}`}>
                    {bep.status === 'DRAFT' ? 'Taslak' :
                      bep.status === 'ACTIVE' ? 'Aktif' :
                        bep.status === 'COMPLETED' ? 'Tamamlandı' : 'Arşiv'}
                  </span>
                  <button
                    onClick={() => setSelectedBEP(selectedBEP?.id === bep.id ? null : bep)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    {selectedBEP?.id === bep.id ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Genel İlerleme</span>
                  <span className="font-medium">
                    {bep.goals.length > 0
                      ? Math.round(bep.goals.reduce((sum, g) => sum + g.progress, 0) / bep.goals.length)
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 transition-all duration-500"
                    style={{
                      width: `${bep.goals.length > 0
                        ? bep.goals.reduce((sum, g) => sum + g.progress, 0) / bep.goals.length
                        : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Goal Summary */}
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {bep.goals.length} Hedef
                </span>
                <span className="text-green-600">
                  {bep.goals.filter(g => g.status === 'ACHIEVED').length} Tamamlandı
                </span>
                <span className="text-blue-600">
                  {bep.goals.filter(g => g.status === 'IN_PROGRESS').length} Devam Ediyor
                </span>
              </div>

              {/* Expanded BEP Details */}
              <AnimatePresence>
                {selectedBEP?.id === bep.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t dark:border-gray-700 overflow-hidden"
                  >
                    {/* Student Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tanı</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {bep.diagnosis || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Güçlü Yönler</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {bep.strengths || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Gelişim Alanları</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {bep.weaknesses || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">İlgi Alanları</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {bep.interests || 'Belirtilmemiş'}
                        </p>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="flex gap-2 mb-6">
                      {bep.status === 'DRAFT' && (
                        <button
                          onClick={() => updateBEPMutation.mutate({ id: bep.id, status: 'ACTIVE' })}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                        >
                          Aktif Yap
                        </button>
                      )}
                      {bep.status === 'ACTIVE' && (
                        <button
                          onClick={() => updateBEPMutation.mutate({ id: bep.id, status: 'COMPLETED' })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                        >
                          Tamamla
                        </button>
                      )}
                      {bep.status !== 'ARCHIVED' && (
                        <button
                          onClick={() => updateBEPMutation.mutate({ id: bep.id, status: 'ARCHIVED' })}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                        >
                          Arşivle
                        </button>
                      )}
                    </div>

                    {/* Goals */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 dark:text-white">Hedefler</h4>
                      </div>

                      <div className="space-y-3">
                        {bep.goals.map((goal) => (
                          <div
                            key={goal.id}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                          >
                            {editingGoal?.id === goal.id ? (
                              <div className="space-y-3">
                                <select
                                  value={editingGoal.status}
                                  onChange={(e) => setEditingGoal({ ...editingGoal, status: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                                >
                                  <option value="NOT_STARTED">Başlanmadı</option>
                                  <option value="IN_PROGRESS">Devam Ediyor</option>
                                  <option value="ACHIEVED">Başarıldı</option>
                                  <option value="MODIFIED">Değiştirildi</option>
                                  <option value="DISCONTINUED">Durduruldu</option>
                                </select>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">İlerleme:</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={editingGoal.progress}
                                    onChange={(e) => setEditingGoal({ ...editingGoal, progress: parseInt(e.target.value) })}
                                    className="flex-1"
                                  />
                                  <span className="text-sm font-medium">{editingGoal.progress}%</span>
                                </div>
                                <textarea
                                  value={editingGoal.notes || ''}
                                  onChange={(e) => setEditingGoal({ ...editingGoal, notes: e.target.value })}
                                  placeholder="Notlar..."
                                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                                  rows={2}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateGoalMutation.mutate({
                                      goalId: goal.id,
                                      data: {
                                        status: editingGoal.status,
                                        progress: editingGoal.progress,
                                        notes: editingGoal.notes,
                                      }
                                    })}
                                    className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm"
                                  >
                                    Kaydet
                                  </button>
                                  <button
                                    onClick={() => setEditingGoal(null)}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm"
                                  >
                                    İptal
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${goalStatusColors[goal.status]}`}>
                                      {goalCategoryLabels[goal.category]}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${goalStatusColors[goal.status]}`}>
                                      {goal.status === 'NOT_STARTED' ? 'Başlanmadı' :
                                        goal.status === 'IN_PROGRESS' ? 'Devam Ediyor' :
                                          goal.status === 'ACHIEVED' ? 'Başarıldı' :
                                            goal.status === 'MODIFIED' ? 'Değiştirildi' : 'Durduruldu'}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setEditingGoal(goal)}
                                    className="text-primary-500 hover:text-primary-600 text-sm"
                                  >
                                    Düzenle
                                  </button>
                                </div>
                                <p className="text-gray-900 dark:text-white mb-2">{goal.description}</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary-500 transition-all"
                                      style={{ width: `${goal.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium">{goal.progress}%</span>
                                </div>
                                {goal.notes && (
                                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                                    Not: {goal.notes}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        ))}

                        {/* Add New Goal */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <h5 className="font-medium mb-3">Yeni Hedef Ekle</h5>
                          <div className="space-y-3">
                            <select
                              value={newGoal.category}
                              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                            >
                              <option value="ACADEMIC">Akademik</option>
                              <option value="SOCIAL">Sosyal</option>
                              <option value="COMMUNICATION">İletişim</option>
                              <option value="MOTOR">Motor</option>
                              <option value="SELF_CARE">Öz Bakım</option>
                              <option value="BEHAVIORAL">Davranışsal</option>
                            </select>
                            <textarea
                              value={newGoal.description}
                              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                              placeholder="Hedef açıklaması..."
                              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                              rows={2}
                            />
                            <input
                              type="date"
                              value={newGoal.targetDate}
                              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                            />
                            <textarea
                              value={newGoal.successCriteria}
                              onChange={(e) => setNewGoal({ ...newGoal, successCriteria: e.target.value })}
                              placeholder="Başarı kriterleri..."
                              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800"
                              rows={2}
                            />
                            <button
                              onClick={() => addGoalMutation.mutate({ bepId: bep.id, goal: newGoal })}
                              disabled={!newGoal.description}
                              className="w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Hedef Ekle
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Create BEP Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsCreating(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-6">Yeni BEP Oluştur</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Öğrenci</label>
                  <select
                    value={newBEP.studentId}
                    onChange={(e) => setNewBEP({ ...newBEP, studentId: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="">Öğrenci Seçin</option>
                    {students?.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.user.firstName} {student.user.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">BEP Başlığı</label>
                  <input
                    type="text"
                    value={newBEP.title}
                    onChange={(e) => setNewBEP({ ...newBEP, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Örn: 2024-2025 Eğitim Yılı BEP"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Akademik Yıl</label>
                    <input
                      type="text"
                      value={newBEP.academicYear}
                      onChange={(e) => setNewBEP({ ...newBEP, academicYear: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
                    <input
                      type="date"
                      value={newBEP.startDate}
                      onChange={(e) => setNewBEP({ ...newBEP, startDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
                  <input
                    type="date"
                    value={newBEP.endDate}
                    onChange={(e) => setNewBEP({ ...newBEP, endDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tanı</label>
                  <textarea
                    value={newBEP.diagnosis}
                    onChange={(e) => setNewBEP({ ...newBEP, diagnosis: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Güçlü Yönler</label>
                  <textarea
                    value={newBEP.strengths}
                    onChange={(e) => setNewBEP({ ...newBEP, strengths: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gelişim Alanları</label>
                  <textarea
                    value={newBEP.weaknesses}
                    onChange={(e) => setNewBEP({ ...newBEP, weaknesses: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">İlgi Alanları</label>
                  <textarea
                    value={newBEP.interests}
                    onChange={(e) => setNewBEP({ ...newBEP, interests: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={() => createBEPMutation.mutate(newBEP)}
                  disabled={!newBEP.studentId || !newBEP.title || !newBEP.startDate || !newBEP.endDate}
                  className="flex-1 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Oluştur
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BEPManagement;
