import { useCallback, useRef, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

type SoundType =
  | 'click'
  | 'success'
  | 'error'
  | 'levelUp'
  | 'achievement'
  | 'coin'
  | 'correct'
  | 'wrong'
  | 'gameStart'
  | 'gameOver'
  | 'notification';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
}

const soundConfigs: Record<SoundType, SoundConfig[]> = {
  click: [{ frequency: 800, duration: 50, type: 'sine', volume: 0.1 }],
  success: [
    { frequency: 523, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 659, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 784, duration: 150, type: 'sine', volume: 0.15 },
  ],
  error: [
    { frequency: 200, duration: 150, type: 'sawtooth', volume: 0.1 },
    { frequency: 150, duration: 200, type: 'sawtooth', volume: 0.1 },
  ],
  levelUp: [
    { frequency: 392, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 523, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 659, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 784, duration: 150, type: 'sine', volume: 0.2 },
    { frequency: 1047, duration: 300, type: 'sine', volume: 0.2 },
  ],
  achievement: [
    { frequency: 587, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 784, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 988, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 1175, duration: 200, type: 'sine', volume: 0.15 },
  ],
  coin: [
    { frequency: 1200, duration: 50, type: 'sine', volume: 0.1 },
    { frequency: 1600, duration: 100, type: 'sine', volume: 0.1 },
  ],
  correct: [
    { frequency: 523, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 659, duration: 150, type: 'sine', volume: 0.15 },
  ],
  wrong: [
    { frequency: 200, duration: 200, type: 'square', volume: 0.08 },
  ],
  gameStart: [
    { frequency: 262, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 330, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 392, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 523, duration: 200, type: 'sine', volume: 0.15 },
  ],
  gameOver: [
    { frequency: 392, duration: 150, type: 'sine', volume: 0.15 },
    { frequency: 330, duration: 150, type: 'sine', volume: 0.15 },
    { frequency: 262, duration: 150, type: 'sine', volume: 0.15 },
    { frequency: 196, duration: 300, type: 'sine', volume: 0.15 },
  ],
  notification: [
    { frequency: 880, duration: 100, type: 'sine', volume: 0.1 },
    { frequency: 1100, duration: 150, type: 'sine', volume: 0.1 },
  ],
};

export const useSound = () => {
  const { settings } = useAccessibility();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((config: SoundConfig, startTime: number) => {
    const audioContext = getAudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = config.frequency;
    oscillator.type = config.type;

    const volume = settings.soundEnabled ? config.volume : 0;
    gainNode.gain.setValueAtTime(volume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + config.duration / 1000);

    oscillator.start(startTime);
    oscillator.stop(startTime + config.duration / 1000);
  }, [getAudioContext, settings.soundEnabled]);

  const playSound = useCallback((type: SoundType) => {
    if (!settings.soundEnabled) return;

    try {
      const audioContext = getAudioContext();
      const configs = soundConfigs[type];
      let currentTime = audioContext.currentTime;

      configs.forEach((config) => {
        playTone(config, currentTime);
        currentTime += config.duration / 1000;
      });
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, [getAudioContext, playTone, settings.soundEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return { playSound };
};

export default useSound;
