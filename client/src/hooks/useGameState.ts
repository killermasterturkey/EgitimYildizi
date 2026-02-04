import { useState, useCallback, useEffect, useRef } from 'react';
import { useSound } from './useSound';
import { useLocalStorage } from './useLocalStorage';

export interface GameState {
  score: number;
  level: number;
  lives: number;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  combo: number;
  maxCombo: number;
  correctAnswers: number;
  wrongAnswers: number;
  stars: number;
}

interface GameConfig {
  gameId: string;
  maxLives?: number;
  timeLimit?: number;
  pointsPerCorrect?: number;
  pointsPerWrong?: number;
  comboMultiplier?: number;
  onGameOver?: (state: GameState) => void;
  onLevelUp?: (level: number) => void;
}

const initialState: GameState = {
  score: 0,
  level: 1,
  lives: 3,
  timeLeft: 60,
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  combo: 0,
  maxCombo: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  stars: 0,
};

export const useGameState = (config: GameConfig) => {
  const {
    gameId,
    maxLives = 3,
    timeLimit = 60,
    pointsPerCorrect = 10,
    pointsPerWrong = -5,
    comboMultiplier = 1.5,
    onGameOver,
    onLevelUp,
  } = config;

  const [state, setState] = useState<GameState>({
    ...initialState,
    lives: maxLives,
    timeLeft: timeLimit,
  });

  const [highScore, setHighScore] = useLocalStorage(`${gameId}_highScore`, 0);
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start game
  const startGame = useCallback(() => {
    playSound('gameStart');
    setState({
      ...initialState,
      lives: maxLives,
      timeLeft: timeLimit,
      isPlaying: true,
    });
  }, [maxLives, timeLimit, playSound]);

  // Pause/Resume
  const togglePause = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  // End game
  const endGame = useCallback(() => {
    playSound('gameOver');
    setState(prev => {
      const stars = calculateStars(prev.score, prev.correctAnswers, prev.wrongAnswers);
      const newState = {
        ...prev,
        isPlaying: false,
        isGameOver: true,
        stars,
      };

      // Update high score
      if (prev.score > highScore) {
        setHighScore(prev.score);
      }

      // Callback
      if (onGameOver) {
        onGameOver(newState);
      }

      return newState;
    });
  }, [highScore, setHighScore, onGameOver, playSound]);

  // Calculate stars (1-3)
  const calculateStars = (score: number, correct: number, wrong: number): number => {
    const accuracy = correct / (correct + wrong) || 0;
    if (accuracy >= 0.9 && score >= 100) return 3;
    if (accuracy >= 0.7 && score >= 50) return 2;
    if (accuracy >= 0.5) return 1;
    return 0;
  };

  // Handle correct answer
  const handleCorrect = useCallback((bonusPoints = 0) => {
    playSound('correct');
    setState(prev => {
      const newCombo = prev.combo + 1;
      const comboBonus = Math.floor(newCombo * comboMultiplier);
      const points = pointsPerCorrect + bonusPoints + comboBonus;

      const newState = {
        ...prev,
        score: prev.score + points,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        correctAnswers: prev.correctAnswers + 1,
      };

      // Level up check (every 100 points)
      const newLevel = Math.floor(newState.score / 100) + 1;
      if (newLevel > prev.level) {
        playSound('levelUp');
        if (onLevelUp) onLevelUp(newLevel);
        return { ...newState, level: newLevel };
      }

      return newState;
    });
  }, [pointsPerCorrect, comboMultiplier, onLevelUp, playSound]);

  // Handle wrong answer
  const handleWrong = useCallback(() => {
    playSound('wrong');
    setState(prev => {
      const newLives = prev.lives - 1;
      const newState = {
        ...prev,
        score: Math.max(0, prev.score + pointsPerWrong),
        lives: newLives,
        combo: 0,
        wrongAnswers: prev.wrongAnswers + 1,
      };

      if (newLives <= 0) {
        // Will trigger endGame via useEffect
        return { ...newState, isGameOver: true };
      }

      return newState;
    });
  }, [pointsPerWrong, playSound]);

  // Add score (for time bonus, etc.)
  const addScore = useCallback((points: number) => {
    if (points > 0) playSound('coin');
    setState(prev => ({
      ...prev,
      score: Math.max(0, prev.score + points),
    }));
  }, [playSound]);

  // Add life
  const addLife = useCallback(() => {
    playSound('success');
    setState(prev => ({
      ...prev,
      lives: Math.min(prev.lives + 1, maxLives + 2), // Max 2 bonus lives
    }));
  }, [maxLives, playSound]);

  // Timer effect
  useEffect(() => {
    if (state.isPlaying && !state.isPaused && state.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            return { ...prev, timeLeft: 0, isGameOver: true };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isPlaying, state.isPaused, state.timeLeft]);

  // Game over effect
  useEffect(() => {
    if (state.isGameOver && state.isPlaying) {
      endGame();
    }
  }, [state.isGameOver, state.isPlaying, endGame]);

  // Reset game
  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      lives: maxLives,
      timeLeft: timeLimit,
    });
  }, [maxLives, timeLimit]);

  return {
    state,
    highScore,
    startGame,
    endGame,
    togglePause,
    handleCorrect,
    handleWrong,
    addScore,
    addLife,
    resetGame,
  };
};

export default useGameState;
