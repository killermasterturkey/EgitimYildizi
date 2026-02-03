import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍑'];

const MemoryGamePage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    if (startTime && !gameComplete) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, gameComplete]);

  const initializeGame = () => {
    // Create pairs of cards
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameComplete(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleCardClick = (cardId: number) => {
    // Ignore if already flipped or matched
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match
    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setTimeout(() => {
          const matchedCards = cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setScore(s => s + 10);

          // Check if game is complete
          if (matchedCards.every(c => c.isMatched)) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hafıza Oyunu 🧠
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Eşleşen kartları bul!
          </p>
        </div>
        <Link to="/games" className="btn-secondary">
          ← Geri
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{moves}</div>
          <div className="text-sm text-gray-500">Hamle</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-500">Puan</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{formatTime(elapsedTime)}</div>
          <div className="text-sm text-gray-500">Süre</div>
        </div>
      </div>

      {/* Game board */}
      <div className="card">
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all ${
                card.isFlipped || card.isMatched
                  ? 'bg-white dark:bg-gray-700 shadow-lg'
                  : 'bg-primary-500 hover:bg-primary-600'
              } ${card.isMatched ? 'opacity-50' : ''}`}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={card.isMatched}
            >
              <AnimatePresence mode="wait">
                {card.isFlipped || card.isMatched ? (
                  <motion.span
                    key="emoji"
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <motion.span
                    key="back"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    transition={{ duration: 0.2 }}
                    className="text-white"
                  >
                    ❓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Game complete modal */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Tebrikler!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Oyunu tamamladın!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-xl font-bold text-primary-600">{moves}</div>
                  <div className="text-xs text-gray-500">Hamle</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-500">Puan</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">{formatTime(elapsedTime)}</div>
                  <div className="text-xs text-gray-500">Süre</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={initializeGame}
                  className="btn-primary flex-1"
                >
                  Tekrar Oyna
                </button>
                <Link to="/games" className="btn-secondary flex-1">
                  Oyunlar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New game button */}
      <div className="text-center">
        <button onClick={initializeGame} className="btn-secondary">
          🔄 Yeni Oyun
        </button>
      </div>
    </div>
  );
};

export default MemoryGamePage;
