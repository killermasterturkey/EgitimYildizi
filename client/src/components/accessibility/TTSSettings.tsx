import { motion } from 'framer-motion';
import { useTTS } from '../../context/TTSContext';

interface TTSSettingsProps {
  compact?: boolean;
}

const TTSSettings = ({ compact = false }: TTSSettingsProps) => {
  const { settings, updateSettings, availableVoices, isSupported, speak, stop, isSpeaking } = useTTS();

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-700 dark:text-yellow-300">
        <p className="flex items-center gap-2">
          <span>⚠️</span>
          <span>Tarayıcınız sesli okuma özelliğini desteklemiyor.</span>
        </p>
      </div>
    );
  }

  const testVoice = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak('Merhaba! Ben sizin için metinleri okuyacağım. İşte böyle duyulacak.');
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => updateSettings({ enabled: e.target.checked })}
            className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm font-medium">🔈 Sesli Okuma</span>
        </label>

        {settings.enabled && (
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.rate}
            onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
            className="w-24 h-2 accent-primary-500"
            title={`Hız: ${settings.rate}x`}
          />
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🔊 Sesli Okuma Ayarları
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => updateSettings({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {settings.enabled ? 'Açık' : 'Kapalı'}
          </span>
        </label>
      </div>

      {settings.enabled && (
        <div className="space-y-6">
          {/* Voice Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ses Seçimi
            </label>
            <select
              value={settings.voice?.name || ''}
              onChange={(e) => {
                const voice = availableVoices.find(v => v.name === e.target.value);
                updateSettings({ voice: voice || null });
              }}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Varsayılan Ses</option>
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                  {voice.lang.startsWith('tr') ? ' 🇹🇷' : ''}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Türkçe sesler varsa öncelikli gösterilir
            </p>
          </div>

          {/* Speed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Okuma Hızı: {settings.rate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Yavaş (0.5x)</span>
              <span>Normal (1x)</span>
              <span>Hızlı (2x)</span>
            </div>
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ses Tonu: {settings.pitch}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Kalın</span>
              <span>Normal</span>
              <span>İnce</span>
            </div>
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ses Seviyesi: {Math.round(settings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
            />
          </div>

          {/* Test Button */}
          <motion.button
            onClick={testVoice}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              isSpeaking
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isSpeaking ? '🔇 Durdur' : '🔊 Test Et'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default TTSSettings;
