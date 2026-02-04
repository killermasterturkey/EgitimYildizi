import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useSound } from '../../hooks/useSound';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface SpotlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const OnboardingTour = () => {
  const {
    isVisible,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    prevStep,
    skip,
    progress,
  } = useOnboarding();

  const { playSound } = useSound();
  const [spotlight, setSpotlight] = useState<SpotlightPosition | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Update spotlight position when step changes
  useEffect(() => {
    if (!currentStep?.target) {
      setSpotlight(null);
      return;
    }

    const updateSpotlight = () => {
      const element = document.querySelector(currentStep.target!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlight({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });
      }
    };

    updateSpotlight();
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight);

    return () => {
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight);
    };
  }, [currentStep]);

  // Play sound on step change
  useEffect(() => {
    if (isVisible && currentStep) {
      playSound('notification');
    }
  }, [currentStepIndex, isVisible, currentStep, playSound]);

  const handleNext = () => {
    playSound('click');
    nextStep();
  };

  const handlePrev = () => {
    playSound('click');
    prevStep();
  };

  const handleSkip = () => {
    playSound('click');
    skip();
  };

  if (!isVisible || !currentStep) return null;

  const getTooltipPosition = (): React.CSSProperties => {
    if (!spotlight || currentStep.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const padding = 20;
    const tooltipWidth = 320;
    const tooltipHeight = 200;

    switch (currentStep.position) {
      case 'top':
        return {
          top: spotlight.top - tooltipHeight - padding,
          left: spotlight.left + spotlight.width / 2 - tooltipWidth / 2,
        };
      case 'bottom':
        return {
          top: spotlight.top + spotlight.height + padding,
          left: spotlight.left + spotlight.width / 2 - tooltipWidth / 2,
        };
      case 'left':
        return {
          top: spotlight.top + spotlight.height / 2 - tooltipHeight / 2,
          left: spotlight.left - tooltipWidth - padding,
        };
      case 'right':
        return {
          top: spotlight.top + spotlight.height / 2 - tooltipHeight / 2,
          left: spotlight.left + spotlight.width + padding,
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Spotlight cutout */}
        {spotlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute rounded-xl ring-4 ring-primary-500 ring-opacity-50"
            style={{
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
              background: 'transparent',
            }}
          />
        )}

        {/* Tooltip */}
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="absolute bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
          style={getTooltipPosition()}
        >
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* Emoji */}
          {currentStep.emoji && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl text-center mb-4"
            >
              {currentStep.emoji}
            </motion.div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
            {currentStep.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {currentStep.description}
          </p>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
              />
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">
              {currentStepIndex + 1} / {totalSteps}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Geri
            </button>

            {currentStepIndex === totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                <CheckIcon className="w-5 h-5" />
                Tamamla
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                İleri
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingTour;
