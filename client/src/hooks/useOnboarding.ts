import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'hover' | 'none';
  emoji?: string;
}

interface OnboardingState {
  completed: boolean;
  currentStep: number;
  skipped: boolean;
  completedSteps: string[];
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Hoş Geldin! 🌟',
    description: 'EğitimYıldızı\'na hoş geldin! Seni burada görmek harika. Birlikte öğrenmeye başlayalım!',
    position: 'center',
    emoji: '👋',
  },
  {
    id: 'dashboard',
    title: 'Ana Sayfa 🏠',
    description: 'Burası senin ana sayfan. Günlük görevlerini, ilerlemenini ve hızlı erişim butonlarını burada görebilirsin.',
    target: '[data-tour="dashboard"]',
    position: 'bottom',
    emoji: '🏠',
  },
  {
    id: 'lessons',
    title: 'Dersler 📚',
    description: 'Matematik, Türkçe ve daha fazla ders seni bekliyor! Her dersi tamamladığında XP ve altın kazanırsın.',
    target: '[data-tour="lessons"]',
    position: 'right',
    emoji: '📚',
  },
  {
    id: 'games',
    title: 'Oyunlar 🎮',
    description: 'Öğrendiklerini eğlenceli oyunlarla pekiştir! Hafıza oyunu, eşleştirme ve daha fazlası!',
    target: '[data-tour="games"]',
    position: 'right',
    emoji: '🎮',
  },
  {
    id: 'achievements',
    title: 'Başarılar 🏆',
    description: 'Rozetler ve başarılar kazan! Her başarı sana ödüller verir.',
    target: '[data-tour="achievements"]',
    position: 'right',
    emoji: '🏆',
  },
  {
    id: 'challenges',
    title: 'Günlük Görevler 🎯',
    description: 'Her gün yeni görevler! Hepsini tamamlarsan bonus ödül kazanırsın.',
    target: '[data-tour="challenges"]',
    position: 'right',
    emoji: '🎯',
  },
  {
    id: 'shop',
    title: 'Ödül Dükkanı 🏪',
    description: 'Kazandığın altınlarla yeni avatarlar, temalar ve güçlendirmeler satın al!',
    target: '[data-tour="shop"]',
    position: 'right',
    emoji: '🏪',
  },
  {
    id: 'profile',
    title: 'Profilin 👤',
    description: 'XP\'ni, seviyeni ve başarılarını burada görebilirsin. Avatarını da değiştirebilirsin!',
    target: '[data-tour="profile"]',
    position: 'right',
    emoji: '👤',
  },
  {
    id: 'settings',
    title: 'Ayarlar ⚙️',
    description: 'Sesli okuma, karanlık mod ve daha fazla ayarı buradan yapabilirsin.',
    target: '[data-tour="settings"]',
    position: 'left',
    emoji: '⚙️',
  },
  {
    id: 'complete',
    title: 'Hazırsın! 🚀',
    description: 'Artık her şeyi biliyorsun! Öğrenmeye başlamak için hazırsın. Bol şans! 🍀',
    position: 'center',
    emoji: '🎉',
  },
];

export const useOnboarding = (customSteps?: OnboardingStep[]) => {
  const steps = customSteps || defaultSteps;
  const [state, setState] = useLocalStorage<OnboardingState>('onboarding_state', {
    completed: false,
    currentStep: 0,
    skipped: false,
    completedSteps: [],
  });

  const [isVisible, setIsVisible] = useState(false);

  // Check if should show onboarding
  useEffect(() => {
    if (!state.completed && !state.skipped) {
      // Delay to allow page to render
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.completed, state.skipped]);

  // Get current step
  const currentStep = steps[state.currentStep] || null;

  // Go to next step
  const nextStep = useCallback(() => {
    setState(prev => {
      const newStep = prev.currentStep + 1;
      const stepId = steps[prev.currentStep]?.id;

      if (newStep >= steps.length) {
        setIsVisible(false);
        return {
          ...prev,
          completed: true,
          completedSteps: stepId ? [...prev.completedSteps, stepId] : prev.completedSteps,
        };
      }

      return {
        ...prev,
        currentStep: newStep,
        completedSteps: stepId ? [...prev.completedSteps, stepId] : prev.completedSteps,
      };
    });
  }, [setState, steps]);

  // Go to previous step
  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  }, [setState]);

  // Skip onboarding
  const skip = useCallback(() => {
    setIsVisible(false);
    setState(prev => ({
      ...prev,
      skipped: true,
    }));
  }, [setState]);

  // Reset onboarding
  const reset = useCallback(() => {
    setState({
      completed: false,
      currentStep: 0,
      skipped: false,
      completedSteps: [],
    });
    setIsVisible(true);
  }, [setState]);

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setState(prev => ({
        ...prev,
        currentStep: stepIndex,
      }));
    }
  }, [setState, steps.length]);

  // Check if step is completed
  const isStepCompleted = useCallback((stepId: string) => {
    return state.completedSteps.includes(stepId);
  }, [state.completedSteps]);

  return {
    isVisible,
    setIsVisible,
    currentStep,
    currentStepIndex: state.currentStep,
    totalSteps: steps.length,
    isCompleted: state.completed,
    isSkipped: state.skipped,
    completedSteps: state.completedSteps,
    nextStep,
    prevStep,
    skip,
    reset,
    goToStep,
    isStepCompleted,
    progress: ((state.currentStep + 1) / steps.length) * 100,
  };
};

export default useOnboarding;
