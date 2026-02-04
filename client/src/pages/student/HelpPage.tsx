import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SpeakButton from '../../components/accessibility/SpeakButton';
import {
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  BookOpenIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayCircleIcon,
  LightBulbIcon,
  HeartIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const HelpPage = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'tips'>('guide');

  const faqItems: FAQItem[] = [
    {
      question: 'Nasıl XP kazanabilirim?',
      answer: 'Dersleri tamamlayarak, quizlerden yüksek puan alarak ve günlük görevleri yaparak XP kazanabilirsin! Her aktivite farklı miktarda XP verir.',
      icon: <StarIcon className="w-6 h-6 text-yellow-500" />,
    },
    {
      question: 'Rozetler ne işe yarar?',
      answer: 'Rozetler başarılarını gösterir! Profil sayfanda görünürler ve arkadaşlarınla paylaşabilirsin. Bazı rozetler özel ödüller açar.',
      icon: <TrophyIcon className="w-6 h-6 text-purple-500" />,
    },
    {
      question: 'Altınlarımı nerede harcayabilirim?',
      answer: 'Ödül Dükkanı\'na git! Orada yeni avatarlar, temalar ve güçlendirmeler satın alabilirsin.',
      icon: <SparklesIcon className="w-6 h-6 text-amber-500" />,
    },
    {
      question: 'Seviye nasıl atlarım?',
      answer: 'Her 100 XP için bir seviye atlarsın. Seviye attıkça yeni özellikler ve ödüller açılır!',
      icon: <AcademicCapIcon className="w-6 h-6 text-blue-500" />,
    },
    {
      question: 'Günlük görevler ne zaman yenilenir?',
      answer: 'Günlük görevler her gün gece 00:00\'da yenilenir. Hepsini tamamlarsan bonus ödül kazanırsın!',
      icon: <LightBulbIcon className="w-6 h-6 text-green-500" />,
    },
    {
      question: 'Oyunlar dersleri öğrenmeme yardımcı olur mu?',
      answer: 'Evet! Oyunlar eğlenceli bir şekilde öğrendiklerini pekiştirmeni sağlar. Hafıza, eşleştirme ve yakalama oyunları hafızanı güçlendirir.',
      icon: <PuzzlePieceIcon className="w-6 h-6 text-pink-500" />,
    },
  ];

  const guideSections = [
    {
      title: 'Dersler',
      icon: <BookOpenIcon className="w-8 h-8 text-blue-500" />,
      description: 'Matematik, Türkçe ve daha fazla dersi eğlenceli bir şekilde öğren!',
      steps: [
        '1. "Dersler" menüsüne tıkla',
        '2. İstediğin dersi seç',
        '3. Konuları sırayla tamamla',
        '4. Her konu sonunda mini quiz yap',
      ],
      color: 'blue',
    },
    {
      title: 'Oyunlar',
      icon: <PuzzlePieceIcon className="w-8 h-8 text-purple-500" />,
      description: 'Öğrendiklerini pekiştirmek için eğlenceli oyunlar oyna!',
      steps: [
        '1. "Oyunlar" menüsüne git',
        '2. Hafıza, Eşleştirme veya Yakalama oyununu seç',
        '3. Oyunu tamamla ve yıldız kazan',
        '4. Yüksek skor için tekrar dene',
      ],
      color: 'purple',
    },
    {
      title: 'Quizler',
      icon: <AcademicCapIcon className="w-8 h-8 text-green-500" />,
      description: 'Bilgini test et ve XP kazan!',
      steps: [
        '1. "Quizler" bölümüne git',
        '2. Hazır olduğun quizi seç',
        '3. Soruları dikkatle oku ve cevapla',
        '4. Sonuçları gör ve rozetini al',
      ],
      color: 'green',
    },
    {
      title: 'Başarılar',
      icon: <TrophyIcon className="w-8 h-8 text-yellow-500" />,
      description: 'Rozetler ve ödüller kazan!',
      steps: [
        '1. "Başarılar" sayfasına git',
        '2. Kazanabileceğin rozetleri gör',
        '3. Hedefleri tamamla',
        '4. Ödüllerini topla!',
      ],
      color: 'yellow',
    },
  ];

  const tips = [
    {
      icon: '💡',
      title: 'Her Gün Çalış',
      description: 'Düzenli çalışma en iyi sonucu verir. Günde 15 dakika bile fark yaratır!',
    },
    {
      icon: '🎯',
      title: 'Hedef Belirle',
      description: 'Günlük veya haftalık hedefler koy. Hedefe ulaşınca kendini ödüllendir.',
    },
    {
      icon: '🔄',
      title: 'Tekrar Et',
      description: 'Öğrendiklerini pekiştirmek için oyunları ve quizleri tekrar et.',
    },
    {
      icon: '🏆',
      title: 'Sabırlı Ol',
      description: 'Her şeyi hemen öğrenemezsin. Adım adım ilerle, başaracaksın!',
    },
    {
      icon: '🤝',
      title: 'Yardım İste',
      description: 'Zorlandığında öğretmeninden veya ailenden yardım iste.',
    },
    {
      icon: '😊',
      title: 'Eğlen',
      description: 'Öğrenmek eğlenceli! Oyunları ve aktiviteleri keşfet.',
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('help.title', 'Yardım Merkezi')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('help.subtitle', 'EğitimYıldızı\'nı nasıl kullanacağını öğren')}
        </p>
        <SpeakButton
          text="Yardım Merkezi. Eğitim Yıldızı'nı nasıl kullanacağını öğren."
          className="mt-2"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {[
          { id: 'guide', label: 'Başlangıç Rehberi', icon: <PlayCircleIcon className="w-5 h-5" /> },
          { id: 'faq', label: 'Sık Sorulan Sorular', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
          { id: 'tips', label: 'İpuçları', icon: <LightBulbIcon className="w-5 h-5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Guide Tab */}
        {activeTab === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">🌟 Hoş Geldin!</h2>
              <p className="opacity-90">
                EğitimYıldızı ile öğrenmek çok eğlenceli!
                Dersler, oyunlar ve quizlerle bilgini test et, rozetler kazan ve seviye atla!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guideSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-${section.color}-100 dark:bg-${section.color}-900/30`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                          {i + 1}
                        </span>
                        {step.substring(3)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  {openFAQ === index ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl mb-4 block">{tip.icon}</span>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-center text-white"
      >
        <HeartIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl font-bold mb-2">Yardıma mı ihtiyacın var?</h2>
        <p className="opacity-90 mb-6">
          Öğretmenin veya ailen sana her zaman yardım edebilir. Sormaktan çekinme!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-rose-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            📧 Mesaj Gönder
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage;
