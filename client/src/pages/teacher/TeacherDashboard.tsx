import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const { data: students } = useQuery({
    queryKey: ['teacher-students'],
    queryFn: () => api.get('/teacher/students'),
  });

  const studentList = students?.data?.data?.students || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Öğretmen Paneli 👨‍🏫
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hoş geldin, {user?.firstName} Öğretmen!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-primary-600">{studentList.length || 0}</div>
          <div className="text-sm text-gray-500">Öğrenci</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-500">Aktif Ödev</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-500">Tamamlanan</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl font-bold text-purple-600">0%</div>
          <div className="text-sm text-gray-500">Ort. Başarı</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/teacher/students" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Öğrenciler</h3>
              <p className="text-sm text-gray-500">İlerlemeyi takip et</p>
            </div>
          </div>
        </Link>
        <Link to="/teacher/assignments" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Ödev Ata</h3>
              <p className="text-sm text-gray-500">Yeni ödev oluştur</p>
            </div>
          </div>
        </Link>
        <Link to="/teacher/reports" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Raporlar</h3>
              <p className="text-sm text-gray-500">Detaylı analizler</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Students List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Öğrencilerim
          </h2>
          <Link to="/teacher/students" className="text-primary-600 text-sm hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        {studentList.length > 0 ? (
          <div className="space-y-3">
            {studentList.slice(0, 5).map((student: any) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    {student.user?.avatar || '😊'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {student.user?.firstName} {student.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Seviye {student.level} • {student.xp} XP
                    </p>
                  </div>
                </div>
                <Link
                  to={`/teacher/students/${student.id}`}
                  className="btn-secondary btn-sm"
                >
                  Detay
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl block mb-2">👥</span>
            Henüz öğrenci eklenmemiş
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Son Aktiviteler
        </h2>
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl block mb-2">📊</span>
          Henüz aktivite yok
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
