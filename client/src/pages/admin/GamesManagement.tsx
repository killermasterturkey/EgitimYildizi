import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../../services/api';

const gameTypes = [
  { value: 'MEMORY', label: 'Hafıza', icon: '🧠' },
  { value: 'DRAG_DROP', label: 'Sürükle-Bırak', icon: '👆' },
  { value: 'MATCHING', label: 'Eşleştirme', icon: '🔗' },
  { value: 'SORTING', label: 'Sıralama', icon: '📊' },
  { value: 'ARCADE', label: 'Arcade', icon: '🕹️' },
];

const difficulties = [
  { value: 'EASY', label: 'Kolay', color: 'bg-green-100 text-green-700' },
  { value: 'MEDIUM', label: 'Orta', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'HARD', label: 'Zor', color: 'bg-red-100 text-red-700' },
];

const GamesManagement = () => {
  const [selectedType, setSelectedType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-games', selectedType],
    queryFn: () => gamesApi.getAll(selectedType ? { type: selectedType } : undefined),
  });

  const games = data?.data?.data?.games || [];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'MEMORY',
    difficulty: 'EASY',
    maxScore: 100,
    xpReward: 20,
    coinReward: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oyun Yönetimi 🎮
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Oyunları oluşturun ve düzenleyin
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          ➕ Yeni Oyun
        </button>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedType === ''
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Tümü
        </button>
        {gameTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedType === type.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game: any) => (
            <div key={game.id} className="card">
              <div className="h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-4xl mb-4">
                {gameTypes.find(t => t.value === game.type)?.icon || '🎮'}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {gameTypes.find(t => t.value === game.type)?.label}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                    ✏️
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  difficulties.find(d => d.value === game.difficulty)?.color
                }`}>
                  {difficulties.find(d => d.value === game.difficulty)?.label}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐ {game.xpReward}</span>
                  <span>🪙 {game.coinReward}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <span className="text-5xl block mb-4">🎮</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Henüz oyun eklenmemiş
          </h3>
          <button onClick={() => setShowModal(true)} className="btn-primary mt-4">
            İlk Oyunu Ekle
          </button>
        </div>
      )}

      {/* Add Game Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Yeni Oyun Ekle
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Oyun Adı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Oyun Türü</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input"
                  >
                    {gameTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Zorluk</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="input"
                  >
                    {difficulties.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Max Puan</label>
                  <input
                    type="number"
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: parseInt(e.target.value) })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">XP</label>
                  <input
                    type="number"
                    value={formData.xpReward}
                    onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Altın</label>
                  <input
                    type="number"
                    value={formData.coinReward}
                    onChange={(e) => setFormData({ ...formData, coinReward: parseInt(e.target.value) })}
                    className="input"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesManagement;
