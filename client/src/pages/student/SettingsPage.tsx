import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useTTS } from '../../context/TTSContext';
import SpeakButton from '../../components/accessibility/SpeakButton';
import {
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  SpeakerWaveIcon,
  EyeIcon,
  BellIcon,
  LanguageIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { actualTheme, setTheme } = useTheme();
  const { settings: accessibilitySettings, updateSettings } = useAccessibility();
  const { settings: ttsSettings, updateSettings: updateTTSSettings, speak } = useTTS();
  const [saved, setSaved] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    achievements: true,
    dailyReminder: true,
    weeklyReport: false,
    messages: true,
    sounds: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Cog6ToothIcon className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('settings.title', 'Ayarlar')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('settings.subtitle', 'Uygulamayı kişiselleştir')}
          </p>
        </div>
        <SpeakButton text="Ayarlar. Uygulamayı kişiselleştir." className="ml-2" />
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            {actualTheme === 'dark' ? (
              <MoonIcon className="w-6 h-6 text-purple-500" />
            ) : (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.appearance', 'Görünüm')}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.darkMode', 'Karanlık Mod')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.darkModeDesc', 'Göz yorgunluğunu azaltır')}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full transition-colors ${
                  actualTheme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    actualTheme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.highContrast', 'Yüksek Kontrast')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.highContrastDesc', 'Daha net renkler')}
                </p>
              </div>
              <button
                onClick={() => updateSettings({ highContrast: !accessibilitySettings.highContrast })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  accessibilitySettings.highContrast ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    accessibilitySettings.highContrast ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.largeText', 'Büyük Yazı')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.largeTextDesc', 'Daha kolay okuma')}
                </p>
              </div>
              <button
                onClick={() => updateSettings({ largeText: !accessibilitySettings.largeText })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  accessibilitySettings.largeText ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    accessibilitySettings.largeText ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <EyeIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.accessibility', 'Erişilebilirlik')}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.reducedMotion', 'Azaltılmış Hareket')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.reducedMotionDesc', 'Animasyonları azaltır')}
                </p>
              </div>
              <button
                onClick={() => updateSettings({ reducedMotion: !accessibilitySettings.reducedMotion })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  accessibilitySettings.reducedMotion ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    accessibilitySettings.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Screen Reader */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.screenReader', 'Ekran Okuyucu Modu')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.screenReaderDesc', 'Sesli okuma desteği')}
                </p>
              </div>
              <button
                onClick={() => updateSettings({ screenReader: !accessibilitySettings.screenReader })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  accessibilitySettings.screenReader ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    accessibilitySettings.screenReader ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sound & TTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <SpeakerWaveIcon className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.sound', 'Ses Ayarları')}
            </h2>
          </div>

          <div className="space-y-4">
            {/* TTS Enabled */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.tts', 'Sesli Okuma')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('settings.ttsDesc', 'Metinleri sesli oku')}
                </p>
              </div>
              <button
                onClick={() => updateTTSSettings({ enabled: !ttsSettings.enabled })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  ttsSettings.enabled ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    ttsSettings.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* TTS Speed */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex justify-between mb-2">
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.ttsSpeed', 'Okuma Hızı')}
                </p>
                <span className="text-primary-600 font-semibold">{ttsSettings.rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={ttsSettings.rate}
                onChange={(e) => updateTTSSettings({ rate: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Yavaş</span>
                <span>Normal</span>
                <span>Hızlı</span>
              </div>
            </div>

            {/* TTS Pitch */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex justify-between mb-2">
                <p className="font-medium text-gray-800 dark:text-white">
                  {t('settings.ttsPitch', 'Ses Tonu')}
                </p>
                <span className="text-primary-600 font-semibold">{ttsSettings.pitch}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={ttsSettings.pitch}
                onChange={(e) => updateTTSSettings({ pitch: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Kalın</span>
                <span>Normal</span>
                <span>İnce</span>
              </div>
            </div>

            {/* Test TTS */}
            <button
              onClick={() => speak('Merhaba! Ben senin öğrenme asistanınım. Birlikte eğlenceli şeyler öğreneceğiz!')}
              className="w-full p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              🔊 {t('settings.testTTS', 'Sesi Test Et')}
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <BellIcon className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.notifications', 'Bildirimler')}
            </h2>
          </div>

          <div className="space-y-4">
            {Object.entries({
              achievements: { label: 'Başarı Bildirimleri', desc: 'Rozet ve ödül kazandığında' },
              dailyReminder: { label: 'Günlük Hatırlatma', desc: 'Ders çalışma hatırlatması' },
              weeklyReport: { label: 'Haftalık Rapor', desc: 'Haftalık ilerleme özeti' },
              messages: { label: 'Mesajlar', desc: 'Öğretmen mesajları' },
              sounds: { label: 'Bildirim Sesleri', desc: 'Sesli uyarılar' },
            }).map(([key, { label, desc }]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof prev]
                  }))}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    notificationSettings[key as keyof typeof notificationSettings] ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      notificationSettings[key as keyof typeof notificationSettings] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <LanguageIcon className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.language', 'Dil')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => i18n.changeLanguage('tr')}
              className={`p-4 rounded-xl border-2 transition-all ${
                i18n.language === 'tr'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
              }`}
            >
              <span className="text-3xl mb-2 block">🇹🇷</span>
              <p className="font-medium text-gray-800 dark:text-white">Türkçe</p>
            </button>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`p-4 rounded-xl border-2 transition-all ${
                i18n.language === 'en'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
              }`}
            >
              <span className="text-3xl mb-2 block">🇬🇧</span>
              <p className="font-medium text-gray-800 dark:text-white">English</p>
            </button>
          </div>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('settings.account', 'Hesap Bilgileri')}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">E-posta</p>
              <p className="font-medium text-gray-800 dark:text-white">{user?.email}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Kullanıcı Adı</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Hesap Türü</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {user?.role === 'STUDENT' ? '👨‍🎓 Öğrenci' : user?.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            {saved ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                Kaydedildi!
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-5 h-5" />
                Ayarları Kaydet
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
