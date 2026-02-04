import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
  TrophyIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  type: 'lesson' | 'game' | 'quiz' | 'achievement' | 'setting';
  title: string;
  description: string;
  icon: string;
  href: string;
}

// Mock search data - in production, this would come from API
const searchableItems: SearchResult[] = [
  { id: '1', type: 'lesson', title: 'Matematik Temelleri', description: 'Sayılar ve işlemler', icon: '🧮', href: '/lessons/math-basics' },
  { id: '2', type: 'lesson', title: 'Türkçe Okuma', description: 'Harf ve hece çalışmaları', icon: '📖', href: '/lessons/turkish-reading' },
  { id: '3', type: 'lesson', title: 'Hayat Bilgisi', description: 'Çevre ve doğa', icon: '🌍', href: '/lessons/life-science' },
  { id: '4', type: 'game', title: 'Hafıza Oyunu', description: 'Eşleştirme ve hafıza', icon: '🧠', href: '/games/memory' },
  { id: '5', type: 'game', title: 'Sürükle Bırak', description: 'El-göz koordinasyonu', icon: '✋', href: '/games/dragdrop' },
  { id: '6', type: 'game', title: 'Yakalama Oyunu', description: 'Refleks geliştirme', icon: '🎯', href: '/games/catch' },
  { id: '7', type: 'quiz', title: 'Matematik Quizi', description: 'Temel matematik soruları', icon: '📝', href: '/quizzes/math' },
  { id: '8', type: 'quiz', title: 'Türkçe Quizi', description: 'Okuma anlama', icon: '📋', href: '/quizzes/turkish' },
  { id: '9', type: 'achievement', title: 'Başarılarım', description: 'Kazandığın rozetler', icon: '🏆', href: '/achievements' },
  { id: '10', type: 'achievement', title: 'Sertifikalarım', description: 'Tamamlama sertifikaları', icon: '📜', href: '/certificates' },
  { id: '11', type: 'setting', title: 'Ayarlar', description: 'Uygulama ayarları', icon: '⚙️', href: '/settings' },
  { id: '12', type: 'setting', title: 'Profil', description: 'Profil bilgilerin', icon: '👤', href: '/profile' },
];

const typeIcons: Record<string, React.ReactNode> = {
  lesson: <BookOpenIcon className="w-5 h-5 text-blue-500" />,
  game: <PuzzlePieceIcon className="w-5 h-5 text-purple-500" />,
  quiz: <AcademicCapIcon className="w-5 h-5 text-green-500" />,
  achievement: <TrophyIcon className="w-5 h-5 text-yellow-500" />,
  setting: <Cog6ToothIcon className="w-5 h-5 text-gray-500" />,
};

const typeLabels: Record<string, string> = {
  lesson: 'Ders',
  game: 'Oyun',
  quiz: 'Quiz',
  achievement: 'Başarı',
  setting: 'Ayar',
};

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  className = '',
  placeholder = 'Ders, oyun veya quiz ara...',
  autoFocus = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { playSound } = useSound();

  // Search function
  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = searchableItems.filter(
      item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.type.includes(lowerQuery)
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => search(query), 200);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        break;
    }
  };

  // Handle result selection
  const handleSelect = (result: SearchResult) => {
    playSound('click');
    setQuery('');
    setIsOpen(false);
    navigate(result.href);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && (query || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {typeIcons[result.type]}
                      <span className="text-gray-400">{typeLabels[result.type]}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <MagnifyingGlassIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>"{query}" için sonuç bulunamadı</p>
              </div>
            ) : null}

            {/* Quick Links */}
            {!query && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Hızlı Erişim</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Dersler', href: '/lessons', icon: '📚' },
                    { label: 'Oyunlar', href: '/games', icon: '🎮' },
                    { label: 'Quizler', href: '/quizzes', icon: '📝' },
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        playSound('click');
                        navigate(item.href);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
