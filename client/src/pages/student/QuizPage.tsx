import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzesApi } from '../../services/api';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => quizzesApi.getById(id!),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: (data: { answers: Record<string, any>; timeSpent: number }) =>
      quizzesApi.submit(id!, data),
    onSuccess: (response) => {
      setResults(response.data.data);
      setShowResults(true);
    },
  });

  const quiz = data?.data?.data?.quiz;
  const questions = quiz?.questions || [];
  const question = questions[currentQuestion];

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [question.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit quiz
      submitMutation.mutate({ answers, timeSpent: 0 });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="card animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="card text-center py-12">
        <div className="text-5xl mb-4">😕</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Sınav bulunamadı
        </h3>
        <Link to="/quizzes" className="btn-primary mt-4">
          Sınavlara Dön
        </Link>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="card text-center">
          <div className="text-6xl mb-4">
            {results.attempt.percentage >= 80 ? '🎉' : results.attempt.percentage >= 50 ? '👍' : '💪'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sınav Tamamlandı!
          </h1>

          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {results.attempt.score}/{results.attempt.maxScore}
              </div>
              <div className="text-sm text-gray-500">Puan</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                %{results.attempt.percentage}
              </div>
              <div className="text-sm text-gray-500">Başarı</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                +{results.rewards.xp} XP
              </div>
              <div className="text-sm text-gray-500">Kazanılan</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="btn-secondary"
            >
              Tekrar Dene
            </button>
            <Link to="/quizzes" className="btn-primary">
              Sınavlara Dön
            </Link>
          </div>
        </div>

        {/* Answers review */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Cevapların
          </h2>
          <div className="space-y-4">
            {results.results.map((result: any, index: number) => (
              <div
                key={result.questionId}
                className={`p-4 rounded-lg border-2 ${
                  result.isCorrect
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {result.isCorrect ? '✅' : '❌'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Soru {index + 1}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Senin cevabın: {String(result.userAnswer)}
                    </p>
                    {!result.isCorrect && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Doğru cevap: {String(result.correctAnswer)}
                      </p>
                    )}
                    {result.explanation && (
                      <p className="text-sm text-gray-500 mt-2">
                        💡 {result.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {quiz.title}
          </h1>
          <p className="text-sm text-gray-500">
            Soru {currentQuestion + 1} / {questions.length}
          </p>
        </div>
        <Link to="/quizzes" className="btn-secondary btn-sm">
          Çık
        </Link>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {question.text}
            </h2>

            {/* Multiple choice options */}
            {question.type === 'MULTIPLE_CHOICE' && question.options && (
              <div className="space-y-3">
                {(question.options as string[]).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      answers[question.id] === option
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {/* True/False */}
            {question.type === 'TRUE_FALSE' && (
              <div className="grid grid-cols-2 gap-4">
                {['Doğru', 'Yanlış'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option === 'Doğru')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      answers[question.id] === (option === 'Doğru')
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl block mb-2">
                      {option === 'Doğru' ? '✅' : '❌'}
                    </span>
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Hint */}
            {quiz.showHints && question.hint && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
                💡 İpucu: {question.hint}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50"
        >
          ← Önceki
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[question?.id]}
          className="btn-primary disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? 'Bitir' : 'Sonraki →'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
