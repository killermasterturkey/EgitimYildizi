import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
              i18n.language === lang.code
                ? 'bg-primary-100 dark:bg-primary-900 ring-2 ring-primary-500'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        🌍 Dil / Language
      </h3>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              i18n.language === lang.code
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
