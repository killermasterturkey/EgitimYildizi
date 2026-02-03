import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchPair {
  id: string;
  left: string;
  right: string;
  leftEmoji: string;
  rightEmoji: string;
}

const MatchingGame = () => {
  const pairs: MatchPair[] = [
    { id: '1', left: '2 + 2', right: '4', leftEmoji: '➕', rightEmoji: '4️⃣' },
    { id: '2', left: '3 + 3', right: '6', leftEmoji: '➕', rightEmoji: '6️⃣' },
    { id: '3', left: '5 + 5', right: '10', leftEmoji: '➕', rightEmoji: '🔟' },
    { id: '4', left: '4 + 3', right: '7', leftEmoji: '➕', rightEmoji: '7️⃣' },
    { id: '5', left: '1 + 8', right: '9', leftEmoji: '➕', rightEmoji: '9️⃣' },
  ];

  const [shuffledLeft, setShuffledLeft] = useState<MatchPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchPair[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    setShuffledLeft([...pairs].sort(() => Math.random() - 0.5));
    setShuffledRight([...pairs].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      setAttempts((a) => a + 1);

      if (selectedLeft === selectedRight) {
        // Correct match!
        setMatchedPairs((prev) => [...prev, selectedLeft]);
        setScore((s) => s + 20);
        setShowFeedback('correct');
      } else {
        setShowFeedback('wrong');
      }

      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setShowFeedback(null);
      }, 800);
    }
  }, [selectedLeft, selectedRight]);

  const handleLeftClick = (id: string) => {
    if (matchedPairs.includes(id) || selectedLeft === id) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (matchedPairs.includes(id) || selectedRight === id) return;
    setSelectedRight(id);
  };

  const resetGame = () => {
    setShuffledLeft([...pairs].sort(() => Math.random() - 0.5));
    setShuffledRight([...pairs].sort(() => Math.random() - 0.5));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
  };

  const isComplete = matchedPairs.length === pairs.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Eşleştirme Oyunu 🔗
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Soldaki ifadeleri sağdaki sonuçlarla eşleştir!
          </p>
        </div>
        <Link to="/games" className="btn-secondary">
          ← Geri
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{score}</div>
          <div className="text-sm text-gray-500">Puan</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{matchedPairs.length}/{pairs.length}</div>
          <div className="text-sm text-gray-500">Eşleşme</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{attempts}</div>
          <div className="text-sm text-gray-500">Deneme</div>
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`text-center py-2 rounded-lg font-bold ${
              showFeedback === 'correct'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {showFeedback === 'correct' ? '✅ Doğru!' : '❌ Tekrar dene!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
            İşlemler
          </h3>
          {shuffledLeft.map((pair) => (
            <motion.button
              key={`left-${pair.id}`}
              onClick={() => handleLeftClick(pair.id)}
              disabled={matchedPairs.includes(pair.id)}
              whileHover={{ scale: matchedPairs.includes(pair.id) ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                matchedPairs.includes(pair.id)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 opacity-50'
                  : selectedLeft === pair.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                  : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300'
              }`}
            >
              <span className="text-xl mr-2">{pair.leftEmoji}</span>
              {pair.left}
            </motion.button>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
            Sonuçlar
          </h3>
          {shuffledRight.map((pair) => (
            <motion.button
              key={`right-${pair.id}`}
              onClick={() => handleRightClick(pair.id)}
              disabled={matchedPairs.includes(pair.id)}
              whileHover={{ scale: matchedPairs.includes(pair.id) ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                matchedPairs.includes(pair.id)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 opacity-50'
                  : selectedRight === pair.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                  : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300'
              }`}
            >
              <span className="text-xl mr-2">{pair.rightEmoji}</span>
              {pair.right}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Game Complete */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white"
        >
          <span className="text-5xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Tebrikler!</h2>
          <p className="mb-4">Tüm eşleştirmeleri buldun!</p>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-4">
            <div>
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm text-primary-200">Puan</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{attempts}</div>
              <div className="text-sm text-primary-200">Deneme</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={resetGame} className="btn bg-white text-primary-600 hover:bg-gray-100">
              Tekrar Oyna
            </button>
            <Link to="/games" className="btn bg-primary-700 text-white hover:bg-primary-800">
              Oyunlar
            </Link>
          </div>
        </motion.div>
      )}

      <div className="text-center">
        <button onClick={resetGame} className="btn-secondary">
          🔄 Yeniden Başla
        </button>
      </div>
    </div>
  );
};

export default MatchingGame;
