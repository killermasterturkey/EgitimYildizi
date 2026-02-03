import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quizzesApi } from '../../services/api';

const QuizzesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizzesApi.getAll(),
  });

  const quizzes = data?.data?.data?.quizzes || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Sınavlar 📝
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bildiklerini test et ve XP kazan!
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz: any) => (
            <Link
              key={quiz.id}
              to={`/quizzes/${quiz.id}`}
              className="card hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  📝
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {quiz._count?.questions || 0} soru
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  quiz.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                  quiz.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty === 'EASY' ? 'Kolay' :
                   quiz.difficulty === 'MEDIUM' ? 'Orta' : 'Zor'}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐ {quiz.xpReward} XP</span>
                  <span>🪙 {quiz.coinReward}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Henüz sınav eklenmemiş
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Yakında eğlenceli sınavlar eklenecek!
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
