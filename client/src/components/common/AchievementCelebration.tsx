import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Howl } from 'howler';

interface Achievement {
  name: string;
  icon: string;
  description: string;
  xpReward?: number;
  coinReward?: number;
}

interface AchievementCelebrationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

// Sound effects (using Web Audio API as fallback if howler fails)
const playSound = (type: 'achievement' | 'levelup' | 'coin') => {
  const sounds = {
    achievement: new Howl({
      src: ['/sounds/achievement.mp3'],
      volume: 0.5,
      onloaderror: () => {
        // Fallback to Web Audio API
        playBeep(800, 200);
        setTimeout(() => playBeep(1000, 200), 200);
        setTimeout(() => playBeep(1200, 300), 400);
      },
    }),
    levelup: new Howl({
      src: ['/sounds/levelup.mp3'],
      volume: 0.5,
      onloaderror: () => {
        playBeep(400, 150);
        setTimeout(() => playBeep(600, 150), 150);
        setTimeout(() => playBeep(800, 150), 300);
        setTimeout(() => playBeep(1000, 300), 450);
      },
    }),
    coin: new Howl({
      src: ['/sounds/coin.mp3'],
      volume: 0.3,
      onloaderror: () => {
        playBeep(1500, 100);
      },
    }),
  };

  try {
    sounds[type].play();
  } catch {
    // Silent fallback
  }
};

// Web Audio API fallback
const playBeep = (frequency: number, duration: number) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch {
    // Silent if Web Audio not supported
  }
};

const AchievementCelebration = ({ achievement, onClose }: AchievementCelebrationProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (achievement) {
      playSound('achievement');

      // Stop confetti after 3 seconds
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
          />
        )}

        {/* Achievement Card */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', damping: 15 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 opacity-50" />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />

          <div className="relative z-10 text-center">
            {/* Trophy animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mb-4"
            >
              {achievement.icon}
            </motion.div>

            {/* Stars burst */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-yellow-400 text-2xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                  }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Tebrikler! 🎉
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-primary-600 dark:text-primary-400 font-bold mb-2"
            >
              {achievement.name}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 mb-6"
            >
              {achievement.description}
            </motion.p>

            {/* Rewards */}
            {(achievement.xpReward || achievement.coinReward) && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-6 mb-6"
              >
                {achievement.xpReward && (
                  <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-xl">
                    <span className="text-xl">⭐</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      +{achievement.xpReward} XP
                    </span>
                  </div>
                )}
                {achievement.coinReward && (
                  <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-xl">
                    <span className="text-xl">🪙</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">
                      +{achievement.coinReward}
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Harika! 🚀
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Level Up celebration component
export const LevelUpCelebration = ({
  newLevel,
  onClose,
}: {
  newLevel: number;
  onClose: () => void;
}) => {
  useEffect(() => {
    playSound('levelup');
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          colors={['#FFD700', '#FFA500', '#FF6347', '#9370DB', '#00CED1']}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 1 }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>

            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">
              SEVİYE ATLADIN!
            </h2>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4"
            >
              {newLevel}
            </motion.div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Yeni seviyeye ulaştın! Harika gidiyorsun! 🎉
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg"
            >
              Devam Et! 🚀
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementCelebration;
