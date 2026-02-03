import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { lessonsApi, adminApi } from '../../services/api';

const subjects = [
  { value: 'MATH', label: 'Matematik', icon: '🔢' },
  { value: 'TURKISH', label: 'Türkçe', icon: '📖' },
  { value: 'SCIENCE', label: 'Fen Bilimleri', icon: '🔬' },
  { value: 'SOCIAL_STUDIES', label: 'Sosyal Bilgiler', icon: '🌍' },
  { value: 'ENGLISH', label: 'İngilizce', icon: '🇬🇧' },
  { value: 'LIFE_SKILLS', label: 'Yaşam Becerileri', icon: '🌱' },
];

const grades = [
  { value: 'PRESCHOOL', label: 'Okul Öncesi' },
  { value: 'GRADE_1', label: '1. Sınıf' },
  { value: 'GRADE_2', label: '2. Sınıf' },
  { value: 'GRADE_3', label: '3. Sınıf' },
  { value: 'GRADE_4', label: '4. Sınıf' },
  { value: 'GRADE_5', label: '5. Sınıf' },
  { value: 'GRADE_6', label: '6. Sınıf' },
  { value: 'GRADE_7', label: '7. Sınıf' },
  { value: 'GRADE_8', label: '8. Sınıf' },
];

const LessonsManagement = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-lessons', selectedSubject],
    queryFn: () => lessonsApi.getAll(selectedSubject ? { subject: selectedSubject } : undefined),
  });

  const lessons = data?.data?.data?.lessons || [];

  const [formData, setFormData] = useState({
    subject: 'MATH',
    grade: 'GRADE_1',
    title: '',
    description: '',
    order: 1,
  });

  const createMutation = useMutation({
    mutationFn: (lessonData: any) => adminApi.createLesson(lessonData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-lessons'] });
      setShowModal(false);
      setFormData({ subject: 'MATH', grade: 'GRADE_1', title: '', description: '', order: 1 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ders Yönetimi 📚
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Dersleri ve konuları yönetin
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          ➕ Yeni Ders
        </button>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSubject('')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedSubject === ''
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Tümü
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.value}
            onClick={() => setSelectedSubject(subject.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedSubject === subject.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {subject.icon} {subject.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson: any) => (
            <div key={lesson.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-2xl">
                    {subjects.find(s => s.value === lesson.subject)?.icon || '📚'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {grades.find(g => g.value === lesson.grade)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                    ✏️
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    🗑️
                  </button>
                </div>
              </div>
              {lesson.description && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {lesson.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {lesson._count?.topics || lesson.topics?.length || 0} konu
                </span>
                <Link
                  to={`/admin/lessons/${lesson.id}/topics`}
                  className="text-primary-600 text-sm font-medium hover:underline"
                >
                  Konuları Yönet →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <span className="text-5xl block mb-4">📚</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Henüz ders eklenmemiş
          </h3>
          <button onClick={() => setShowModal(true)} className="btn-primary mt-4">
            İlk Dersi Ekle
          </button>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Yeni Ders Ekle
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Ders Adı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Konu</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input"
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Sınıf</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="input"
                  >
                    {grades.map((g) => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsManagement;
