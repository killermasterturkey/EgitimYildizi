import { useState } from 'react';

const ReportsPage = () => {
  const [period, setPeriod] = useState('week');

  // Demo data
  const weeklyData = {
    totalTime: '5 saat 30 dk',
    lessonsCompleted: 3,
    gamesPlayed: 8,
    quizzesTaken: 2,
    xpEarned: 150,
    averageScore: 78,
  };

  const subjectProgress = [
    { subject: 'Matematik', progress: 75, color: 'bg-blue-500' },
    { subject: 'Türkçe', progress: 60, color: 'bg-green-500' },
    { subject: 'Fen Bilimleri', progress: 45, color: 'bg-yellow-500' },
    { subject: 'Yaşam Becerileri', progress: 80, color: 'bg-purple-500' },
  ];

  const activityByDay = [
    { day: 'Pzt', minutes: 45 },
    { day: 'Sal', minutes: 60 },
    { day: 'Çar', minutes: 30 },
    { day: 'Per', minutes: 75 },
    { day: 'Cum', minutes: 50 },
    { day: 'Cmt', minutes: 90 },
    { day: 'Paz', minutes: 40 },
  ];

  const maxMinutes = Math.max(...activityByDay.map(d => d.minutes));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            İlerleme Raporları 📊
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Çocuğunuzun detaylı performans analizi
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input max-w-xs"
        >
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
          <option value="year">Bu Yıl</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{weeklyData.totalTime}</div>
          <div className="text-sm text-gray-500">Toplam Süre</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{weeklyData.lessonsCompleted}</div>
          <div className="text-sm text-gray-500">Ders</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{weeklyData.gamesPlayed}</div>
          <div className="text-sm text-gray-500">Oyun</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{weeklyData.quizzesTaken}</div>
          <div className="text-sm text-gray-500">Quiz</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{weeklyData.xpEarned}</div>
          <div className="text-sm text-gray-500">XP Kazanılan</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">%{weeklyData.averageScore}</div>
          <div className="text-sm text-gray-500">Ort. Başarı</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Ders Bazlı İlerleme
          </h2>
          <div className="space-y-4">
            {subjectProgress.map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.subject}</span>
                  <span>%{item.progress}</span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Günlük Aktivite
          </h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {activityByDay.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-500 rounded-t transition-all"
                  style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                <span className="text-xs text-gray-400">{day.minutes}dk</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Son Kazanılan Rozetler
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { name: 'İlk Adım', icon: '🎯', date: '2 gün önce' },
            { name: 'Hafıza Ustası', icon: '🧠', date: '5 gün önce' },
            { name: 'Çalışkan Arı', icon: '🐝', date: '1 hafta önce' },
          ].map((badge) => (
            <div key={badge.name} className="flex-shrink-0 text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-3xl block mb-2">{badge.icon}</span>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-gray-500">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Download Report */}
      <div className="card text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Detaylı raporu PDF olarak indirin
        </p>
        <button className="btn-primary">
          📄 Raporu İndir
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
