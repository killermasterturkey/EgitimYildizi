import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const StudentsPage = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['teacher-students', search],
    queryFn: () => api.get('/teacher/students', { params: { search: search || undefined } }),
  });

  const students = data?.data?.data?.students || [];

  // Demo students if none from API
  const demoStudents = [
    { id: '1', user: { firstName: 'Ali', lastName: 'Yıldız', avatar: '😊' }, grade: 'GRADE_3', level: 2, xp: 150, coins: 75, completedTopics: 5 },
    { id: '2', user: { firstName: 'Ayşe', lastName: 'Demir', avatar: '😄' }, grade: 'GRADE_3', level: 3, xp: 280, coins: 120, completedTopics: 8 },
    { id: '3', user: { firstName: 'Mehmet', lastName: 'Kaya', avatar: '🤗' }, grade: 'GRADE_2', level: 1, xp: 50, coins: 25, completedTopics: 2 },
  ];

  const displayStudents = students.length > 0 ? students : demoStudents;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Öğrencilerim 👥
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Öğrenci ilerlemesini takip edin
          </p>
        </div>
        <button className="btn-primary">
          ➕ Öğrenci Ekle
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <input
          type="text"
          placeholder="Öğrenci ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input max-w-md"
        />
      </div>

      {/* Students Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayStudents.map((student: any) => (
            <div key={student.id} className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-3xl">
                  {student.user?.avatar || '😊'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {student.user?.firstName} {student.user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {student.grade?.replace('GRADE_', '')}. Sınıf
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-primary-600">{student.level}</div>
                  <div className="text-xs text-gray-500">Seviye</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-green-600">{student.xp}</div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-blue-600">{student.completedTopics || 0}</div>
                  <div className="text-xs text-gray-500">Konu</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">İlerleme</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-[65%] bg-primary-600 rounded-full"></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/teacher/students/${student.id}`}
                  className="btn-secondary btn-sm flex-1"
                >
                  Detay
                </Link>
                <Link
                  to={`/teacher/assignments/new?student=${student.id}`}
                  className="btn-primary btn-sm flex-1"
                >
                  Ödev Ver
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
