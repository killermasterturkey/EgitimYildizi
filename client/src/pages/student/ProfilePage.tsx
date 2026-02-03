import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useAccessibility } from '../../context/AccessibilityContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Profil & Ayarlar ⚙️
      </h1>

      {/* Profile card */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-4xl">
            {user?.avatar || '😊'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            {user?.student && (
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                  Seviye {user.student.level}
                </span>
                <span className="text-sm text-gray-500">
                  {user.student.grade?.replace('GRADE_', '')}. Sınıf
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theme settings */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Görünüm 🎨
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light', label: 'Açık', icon: '☀️' },
            { value: 'dark', label: 'Koyu', icon: '🌙' },
            { value: 'system', label: 'Sistem', icon: '💻' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="text-2xl block mb-2">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility settings */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Erişilebilirlik ♿
        </h3>
        <div className="space-y-4">
          {[
            { key: 'highContrast', label: 'Yüksek Kontrast', description: 'Daha belirgin renkler' },
            { key: 'largeText', label: 'Büyük Yazı', description: 'Daha büyük metin boyutu' },
            { key: 'reducedMotion', label: 'Az Hareket', description: 'Animasyonları azalt' },
            { key: 'soundEnabled', label: 'Sesler', description: 'Oyun ve bildirim sesleri' },
            { key: 'musicEnabled', label: 'Müzik', description: 'Arka plan müziği' },
            { key: 'ttsEnabled', label: 'Sesli Okuma', description: 'Metinleri sesli oku' },
          ].map((setting) => (
            <label
              key={setting.key}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {setting.label}
                </span>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[setting.key as keyof typeof settings] as boolean}
                onChange={(e) =>
                  updateSettings({ [setting.key]: e.target.checked })
                }
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Stats */}
      {user?.student && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            İstatistikler 📊
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {user.student.xp}
              </div>
              <div className="text-sm text-gray-500">Toplam XP</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {user.student.level}
              </div>
              <div className="text-sm text-gray-500">Seviye</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {user.student.coins}
              </div>
              <div className="text-sm text-gray-500">Altın</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-500">Rozet</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
