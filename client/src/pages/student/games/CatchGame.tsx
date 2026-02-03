import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  isGood: boolean;
  speed: number;
}

const CatchGame = () => {
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemIdRef = useRef(0);

  const goodItems = ['🍎', '🍊', '🍋', '🍇', '🍓', '⭐', '💎'];
  const badItems = ['💣', '🔥', '⚡'];

  const spawnItem = useCallback(() => {
    const isGood = Math.random() > 0.25; // 75% good items
    const emoji = isGood
      ? goodItems[Math.floor(Math.random() * goodItems.length)]
      : badItems[Math.floor(Math.random() * badItems.length)];

    const newItem: FallingItem = {
      id: itemIdRef.current++,
      x: Math.random() * 80 + 10, // 10-90%
      y: 0,
      emoji,
      isGood,
      speed: 1 + Math.random() * 2, // Random speed
    };

    setItems((prev) => [...prev, newItem]);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current || !gameActive) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, x)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameAreaRef.current || !gameActive) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, x)));
  };

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      setItems((prev) => {
        const updated = prev
          .map((item) => ({ ...item, y: item.y + item.speed }))
          .filter((item) => {
            // Check if caught by basket
            if (item.y >= 85 && item.y <= 95) {
              const distance = Math.abs(item.x - basketX);
              if (distance < 15) {
                // Caught!
                if (item.isGood) {
                  setScore((s) => s + 10);
                } else {
                  setLives((l) => l - 1);
                }
                return false;
              }
            }
            // Remove if off screen
            if (item.y > 100) {
              if (item.isGood) {
                setLives((l) => l - 1); // Missed good item
              }
              return false;
            }
            return true;
          });
        return updated;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameActive, basketX]);

  // Spawn items
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(spawnItem, 1000);
    return () => clearInterval(spawnInterval);
  }, [gameActive, spawnItem]);

  // Check game over
  useEffect(() => {
    if (lives <= 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [lives, gameActive, score, highScore]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setGameOver(false);
    setGameActive(true);
    itemIdRef.current = 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yakala Oyunu 🧺
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            İyi şeyleri yakala, kötülerden kaçın!
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
          <div className="text-2xl font-bold text-red-600">
            {'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}
          </div>
          <div className="text-sm text-gray-500">Can</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{highScore}</div>
          <div className="text-sm text-gray-500">Rekor</div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="card relative h-[400px] overflow-hidden cursor-none touch-none bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700"
      >
        {!gameActive && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={startGame} className="btn-primary btn-lg text-xl">
              🎮 Oyunu Başlat
            </button>
          </div>
        )}

        {/* Falling items */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute text-4xl"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Basket */}
        {gameActive && (
          <motion.div
            className="absolute bottom-4 text-5xl"
            style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            🧺
          </motion.div>
        )}

        {/* Game Over */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
              <span className="text-5xl block mb-4">😢</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oyun Bitti!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Toplam Puanın: <span className="font-bold text-primary-600">{score}</span>
              </p>
              {score === highScore && score > 0 && (
                <p className="text-yellow-600 font-bold mb-4">🏆 Yeni Rekor!</p>
              )}
              <button onClick={startGame} className="btn-primary">
                Tekrar Oyna
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <div className="card">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Nasıl Oynanır?</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>🖱️ Fareyi hareket ettirerek sepeti kontrol et</li>
          <li>📱 Veya parmağını kaydırarak oyna</li>
          <li>✅ İyi şeyleri yakala: 🍎🍊🍋🍇🍓⭐💎 (+10 puan)</li>
          <li>❌ Kötülerden kaçın: 💣🔥⚡ (-1 can)</li>
          <li>⚠️ İyi şeyleri kaçırma! (-1 can)</li>
        </ul>
      </div>
    </div>
  );
};

export default CatchGame;
