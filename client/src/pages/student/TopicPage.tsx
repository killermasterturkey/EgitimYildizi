import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { lessonsApi } from '../../services/api';

const TopicPage = () => {
  const { lessonId, topicId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['topic', lessonId, topicId],
    queryFn: () => lessonsApi.getTopic(lessonId!, topicId!),
    enabled: !!lessonId && !!topicId,
  });

  const topic = data?.data?.data?.topic;

  if (isLoading) {
    return (
      <div className="card animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="card text-center py-12">
        <div className="text-5xl mb-4">😕</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Konu bulunamadı
        </h3>
        <Link to="/lessons" className="btn-primary mt-4">
          Derslere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/lessons" className="hover:text-primary-600">
          Dersler
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{topic.lesson?.title}</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{topic.title}</span>
      </nav>

      {/* Topic content */}
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {topic.title}
        </h1>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />

        {/* Audio player if available */}
        {topic.audioUrl && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              🔊 Sesli Anlatım
            </p>
            <audio controls className="w-full">
              <source src={topic.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}
      </div>

      {/* Related games */}
      {topic.games && topic.games.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            İlgili Oyunlar 🎮
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.games.map((game: any) => (
              <Link
                key={game.id}
                to={`/games/memory/${game.id}`}
                className="card hover:shadow-lg transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center text-2xl">
                  🎮
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-500">Zorluk: {game.difficulty}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related quizzes */}
      {topic.quizzes && topic.quizzes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Sınavlar 📝
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.quizzes.map((quiz: any) => (
              <Link
                key={quiz.id}
                to={`/quizzes/${quiz.id}`}
                className="card hover:shadow-lg transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center text-2xl">
                  📝
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {quiz.questions?.length || 0} soru
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to="/lessons" className="btn-secondary">
          ← Derslere Dön
        </Link>
        <button className="btn-primary">
          Konuyu Tamamla ✓
        </button>
      </div>
    </div>
  );
};

export default TopicPage;
