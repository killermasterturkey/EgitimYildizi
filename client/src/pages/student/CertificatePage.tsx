import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import SpeakButton from '../../components/accessibility/SpeakButton';
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  SparklesIcon,
  TrophyIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface Certificate {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  earnedDate: string;
  xpEarned: number;
  badge: string;
  color: string;
}

const CertificatePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Mock certificates - in production, these would come from API
  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Matematik Ustası',
      description: 'Temel matematik derslerini başarıyla tamamladın!',
      subject: 'Matematik',
      level: 'Başlangıç',
      earnedDate: '2024-01-15',
      xpEarned: 500,
      badge: '🧮',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      title: 'Türkçe Kahramanı',
      description: 'Okuma ve yazma becerilerinde ilerleme kaydettin!',
      subject: 'Türkçe',
      level: 'Orta',
      earnedDate: '2024-01-20',
      xpEarned: 750,
      badge: '📖',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '3',
      title: 'Oyun Şampiyonu',
      description: '10 oyunu 3 yıldızla tamamladın!',
      subject: 'Genel',
      level: 'İleri',
      earnedDate: '2024-01-25',
      xpEarned: 1000,
      badge: '🎮',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const handleDownload = async () => {
    if (!certificateRef.current || !selectedCertificate) return;

    // In production, you would use html2canvas or a PDF library
    alert('Sertifika indiriliyor... (Demo)');
  };

  const handleShare = () => {
    if (!selectedCertificate) return;

    if (navigator.share) {
      navigator.share({
        title: selectedCertificate.title,
        text: `Ben "${selectedCertificate.title}" sertifikasını kazandım! 🎉`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `Ben "${selectedCertificate.title}" sertifikasını kazandım! 🎉 EğitimYıldızı'nda öğrenmeye devam!`
      );
      alert('Link kopyalandı!');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
          <AcademicCapIcon className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('certificates.title', 'Sertifikalarım')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('certificates.subtitle', 'Kazandığın sertifikaları görüntüle ve paylaş')}
          </p>
        </div>
        <SpeakButton text="Sertifikalarım. Kazandığın sertifikaları görüntüle ve paylaş." className="ml-2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Certificates List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
            Sertifikalar ({certificates.length})
          </h2>

          {certificates.map((cert, index) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCertificate(cert)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedCertificate?.id === cert.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cert.badge}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.subject} • {cert.level}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">
                    {new Date(cert.earnedDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}

          {certificates.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <SparklesIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Henüz sertifikan yok. Dersleri tamamla ve sertifika kazan!
              </p>
            </div>
          )}
        </div>

        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          {selectedCertificate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Certificate Display */}
              <div
                ref={certificateRef}
                className={`bg-gradient-to-br ${selectedCertificate.color} p-1`}
              >
                <div className="bg-white dark:bg-gray-900 p-8 relative overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-yellow-500 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-yellow-500 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-yellow-500 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-yellow-500 rounded-br-2xl" />

                  {/* Content */}
                  <div className="text-center py-8 relative z-10">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <span className="text-4xl">⭐</span>
                      <span className="text-2xl font-bold font-display text-primary-600">
                        EğitimYıldızı
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                      Başarı Sertifikası
                    </h2>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                      {selectedCertificate.title}
                    </h1>

                    {/* Badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-7xl mb-6"
                    >
                      {selectedCertificate.badge}
                    </motion.div>

                    {/* Recipient */}
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Bu sertifika
                    </p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      {selectedCertificate.description}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                          <StarIcon className="w-5 h-5 fill-current" />
                          <span className="font-bold">{selectedCertificate.xpEarned}</span>
                        </div>
                        <p className="text-xs text-gray-500">XP Kazanıldı</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-800 dark:text-white">
                          {selectedCertificate.level}
                        </p>
                        <p className="text-xs text-gray-500">Seviye</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-800 dark:text-white">
                          {selectedCertificate.subject}
                        </p>
                        <p className="text-xs text-gray-500">Konu</p>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500">
                      Kazanma Tarihi: {new Date(selectedCertificate.earnedDate).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    {/* Signature */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-500 italic">EğitimYıldızı Akademi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  İndir
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                  Paylaş
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
              <div className="text-center">
                <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Görüntülemek için bir sertifika seç
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Motivational Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center"
      >
        <h3 className="text-xl font-bold mb-2">🎯 Daha Fazla Sertifika Kazan!</h3>
        <p className="opacity-90 mb-4">
          Dersleri tamamla, quizlerden yüksek puan al ve oyunlarda ustalaş.
          Her başarı yeni bir sertifika demek!
        </p>
        <a
          href="/lessons"
          className="inline-block px-6 py-2 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          📚 Derslere Git
        </a>
      </motion.div>
    </div>
  );
};

export default CertificatePage;
