import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const ParentDashboard = () => {
  const { user } = useAuth();

  const { data: children } = useQuery({
    queryKey: ['parent-children'],
    queryFn: () => api.get('/parent/children'),
  });

  const childrenList = children?.data?.data?.children || [];

  // Demo child if none
  const demoChildren = [
    {
      id: '1',
      user: { firstName: 'Ali', lastName: 'Yıldız', avatar: '😊' },
      grade: 'GRADE_3',
      level: 2,
      xp: 150,
      coins: 75,
      completedTopics: 5,
      totalTopics: 12,
      recentActivity: [
        { type: 'lesson', title: 'Toplama konusunu tamamladı', time: '2 saat önce' },
        { type: 'game', title: 'Hafıza oyununda 85 puan aldı', time: '3 saat önce' },
        { type: 'quiz', title: 'Matematik quizinden %80 aldı', time: 'Dün' },
      ],
    },
  ];

  const displayChildren = childrenList.length > 0 ? childrenList : demoChildren;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Veli Paneli 👨‍👩‍👧
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hoş geldin, {user?.firstName}! Çocuğunuzun ilerlemesini takip edin.
        </p>
      </div>

      {/* Children Cards */}
      {displayChildren.map((child: any) => (
        <div key={child.id} className="space-y-6">
          {/* Child Overview */}
          <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                {child.user?.avatar || '😊'}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {child.user?.firstName} {child.user?.lastName}
                </h2>
                <p className="text-primary-100">
                  {child.grade?.replace('GRADE_', '')}. Sınıf • Seviye {child.level}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-primary-600">{child.xp}</div>
              <div className="text-sm text-gray-500">Toplam XP</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-yellow-600">{child.level}</div>
              <div className="text-sm text-gray-500">Seviye</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-green-600">
                {child.completedTopics}/{child.totalTopics}
              </div>
              <div className="text-sm text-gray-500">Tamamlanan Konu</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🪙</div>
              <div className="text-2xl font-bold text-orange-600">{child.coins}</div>
              <div className="text-sm text-gray-500">Altın</div>
            </div>
          </div>

          {/* Progress */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Genel İlerleme
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Matematik</span>
                  <span>75%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Türkçe</span>
                  <span>60%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-[60%] bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Yaşam Becerileri</span>
                  <span>40%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-[40%] bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Son Aktiviteler
            </h3>
            <div className="space-y-3">
              {child.recentActivity?.map((activity: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-xl">
                    {activity.type === 'lesson' ? '📚' : activity.type === 'game' ? '🎮' : '📝'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/parent/reports" className="card hover:shadow-lg transition-shadow text-center">
              <span className="text-3xl block mb-2">📊</span>
              <span className="font-medium">Detaylı Rapor</span>
            </Link>
            <Link to="/parent/settings" className="card hover:shadow-lg transition-shadow text-center">
              <span className="text-3xl block mb-2">🔔</span>
              <span className="font-medium">Bildirim Ayarları</span>
            </Link>
            <Link to="/parent/messages" className="card hover:shadow-lg transition-shadow text-center">
              <span className="text-3xl block mb-2">💬</span>
              <span className="font-medium">Öğretmenle İletişim</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentDashboard;
