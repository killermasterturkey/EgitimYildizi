import { motion } from 'framer-motion';
import { useTTS } from '../../context/TTSContext';

interface SpeakButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button' | 'fab';
  label?: string;
}

const SpeakButton = ({
  text,
  className = '',
  size = 'md',
  variant = 'icon',
  label = 'Sesli Oku',
}: SpeakButtonProps) => {
  const { speak, stop, isSpeaking, isSupported, settings } = useTTS();

  if (!isSupported || !settings.enabled) {
    return null;
  }

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };

  const buttonSizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center
          ${isSpeaking
            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
          } hover:shadow-md transition-shadow ${className}`}
        title={isSpeaking ? 'Durdur' : label}
        aria-label={isSpeaking ? 'Sesli okumayı durdur' : 'Metni sesli oku'}
      >
        {isSpeaking ? (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🔊
          </motion.span>
        ) : (
          '🔈'
        )}
      </motion.button>
    );
  }

  if (variant === 'fab') {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg
          ${isSpeaking
            ? 'bg-red-500 text-white'
            : 'bg-primary-500 text-white'
          } flex items-center justify-center text-2xl ${className}`}
        title={isSpeaking ? 'Durdur' : label}
        aria-label={isSpeaking ? 'Sesli okumayı durdur' : 'Sayfayı sesli oku'}
      >
        {isSpeaking ? (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🔊
          </motion.span>
        ) : (
          '🔈'
        )}
      </motion.button>
    );
  }

  // Button variant
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${buttonSizeClasses[size]} rounded-xl font-medium
        ${isSpeaking
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-primary-500 text-white hover:bg-primary-600'
        } flex items-center gap-2 transition-colors ${className}`}
      aria-label={isSpeaking ? 'Sesli okumayı durdur' : 'Metni sesli oku'}
    >
      {isSpeaking ? (
        <>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🔊
          </motion.span>
          Durdur
        </>
      ) : (
        <>
          🔈 {label}
        </>
      )}
    </motion.button>
  );
};

export default SpeakButton;
