import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { lessonsApi } from '../../services/api';

const subjects = [
  { value: '', label: 'Tümü', icon: '📚' },
  { value: 'MATH', label: 'Matematik', icon: '🔢' },
  { value: 'TURKISH', label: 'Türkçe', icon: '📖' },
  { value: 'SCIENCE', label: 'Fen Bilimleri', icon: '🔬' },
  { value: 'SOCIAL_STUDIES', label: 'Sosyal Bilgiler', icon: '🌍' },
  { value: 'ENGLISH', label: 'İngilizce', icon: '🇬🇧' },
  { value: 'LIFE_SKILLS', label: 'Yaşam Becerileri', icon: '🌱' },
];

const LessonsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['lessons', selectedSubject],
    queryFn: () => lessonsApi.getAll(selectedSubject ? { subject: selectedSubject } : undefined),
  });

  const lessons = data?.data?.data?.lessons || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dersler 📚
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Öğrenmek istediğin dersi seç ve konulara göz at!
        </p>
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.value}
            onClick={() => setSelectedSubject(subject.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedSubject === subject.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {subject.icon} {subject.label}
          </button>
        ))}
      </div>

      {/* Lessons grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson: any) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}/topics/${lesson.topics[0]?.id || ''}`}
              className="card hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {subjects.find(s => s.value === lesson.subject)?.icon || '📚'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lesson._count?.topics || 0} konu
                  </p>
                </div>
              </div>
              {lesson.description && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {lesson.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {subjects.find(s => s.value === lesson.subject)?.label}
                </span>
                <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Başla →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Henüz ders eklenmemiş
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Yakında harika dersler eklenecek!
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
