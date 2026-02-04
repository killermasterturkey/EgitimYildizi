import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useSound } from './useSound';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  weeklyActivity: boolean[]; // Last 7 days
  totalActiveDays: number;
}

const initialStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  weeklyActivity: [false, false, false, false, false, false, false],
  totalActiveDays: 0,
};

export const useStreak = () => {
  const [streakData, setStreakData] = useLocalStorage<StreakData>('user_streak', initialStreakData);
  const { playSound } = useSound();
  const [streakMilestone, setStreakMilestone] = useState<number | null>(null);

  // Get today's date as string (YYYY-MM-DD)
  const getTodayString = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Check if dates are consecutive
  const isConsecutiveDay = useCallback((date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  }, []);

  // Check if same day
  const isSameDay = useCallback((date1: string, date2: string): boolean => {
    return date1 === date2;
  }, []);

  // Update weekly activity array
  const updateWeeklyActivity = useCallback((lastDate: string | null): boolean[] => {
    const today = new Date();
    const activity: boolean[] = [];

    for (let i = 6; i >= 0; i--) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];

      // Check if this date was active (simplified - just checking last active date for now)
      activity.push(lastDate !== null && dateString <= lastDate && i === 0);
    }

    return activity;
  }, []);

  // Record activity for today
  const recordActivity = useCallback(() => {
    const today = getTodayString();

    setStreakData(prev => {
      // Already recorded today
      if (prev.lastActiveDate && isSameDay(prev.lastActiveDate, today)) {
        return prev;
      }

      let newStreak = 1;

      // Check if continuing streak
      if (prev.lastActiveDate && isConsecutiveDay(prev.lastActiveDate, today)) {
        newStreak = prev.currentStreak + 1;

        // Check for milestones
        if ([3, 7, 14, 30, 50, 100].includes(newStreak)) {
          setStreakMilestone(newStreak);
          playSound('achievement');
        }
      } else if (prev.lastActiveDate && !isSameDay(prev.lastActiveDate, today)) {
        // Streak broken
        newStreak = 1;
      }

      const newLongestStreak = Math.max(prev.longestStreak, newStreak);
      const weeklyActivity = updateWeeklyActivity(today);
      weeklyActivity[6] = true; // Today is active

      return {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
        weeklyActivity,
        totalActiveDays: prev.totalActiveDays + 1,
      };
    });
  }, [getTodayString, isSameDay, isConsecutiveDay, setStreakData, updateWeeklyActivity, playSound]);

  // Check streak status on mount
  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    setStreakData(prev => {
      // If last active was before yesterday, reset streak
      if (prev.lastActiveDate && prev.lastActiveDate < yesterdayString) {
        return {
          ...prev,
          currentStreak: 0,
          weeklyActivity: updateWeeklyActivity(null),
        };
      }
      return prev;
    });
  }, [getTodayString, setStreakData, updateWeeklyActivity]);

  // Clear milestone notification
  const clearMilestone = useCallback(() => {
    setStreakMilestone(null);
  }, []);

  // Get streak rewards
  const getStreakReward = useCallback((streak: number): { xp: number; coins: number } => {
    if (streak >= 100) return { xp: 500, coins: 100 };
    if (streak >= 50) return { xp: 250, coins: 50 };
    if (streak >= 30) return { xp: 150, coins: 30 };
    if (streak >= 14) return { xp: 100, coins: 20 };
    if (streak >= 7) return { xp: 50, coins: 10 };
    if (streak >= 3) return { xp: 25, coins: 5 };
    return { xp: 10, coins: 2 };
  }, []);

  // Get streak status message
  const getStreakMessage = useCallback((): string => {
    const streak = streakData.currentStreak;
    if (streak === 0) return 'Bugün öğrenmeye başla! 🌟';
    if (streak === 1) return 'Harika başlangıç! Yarın da gel! 💪';
    if (streak < 7) return `${streak} günlük seri! Devam et! 🔥`;
    if (streak < 30) return `Muhteşem! ${streak} gün üst üste! 🏆`;
    if (streak < 100) return `İnanılmaz! ${streak} günlük seri! 👑`;
    return `Efsane! ${streak} günlük seri! Sen bir şampiyonsun! 🎖️`;
  }, [streakData.currentStreak]);

  return {
    ...streakData,
    streakMilestone,
    recordActivity,
    clearMilestone,
    getStreakReward,
    getStreakMessage,
  };
};

export default useStreak;
