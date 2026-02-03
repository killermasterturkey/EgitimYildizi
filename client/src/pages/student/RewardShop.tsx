import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'avatar' | 'theme' | 'powerup' | 'badge';
  icon: string;
  owned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const shopItems: ShopItem[] = [
  // Avatars
  { id: 'avatar-1', name: 'Süper Kahraman', description: 'Güçlü bir kahraman avatarı', price: 50, type: 'avatar', icon: '🦸', owned: false, rarity: 'common' },
  { id: 'avatar-2', name: 'Uzay Astronotu', description: 'Uzay maceracısı avatarı', price: 100, type: 'avatar', icon: '👨‍🚀', owned: false, rarity: 'rare' },
  { id: 'avatar-3', name: 'Ninja', description: 'Gizli ninja avatarı', price: 75, type: 'avatar', icon: '🥷', owned: false, rarity: 'common' },
  { id: 'avatar-4', name: 'Peri', description: 'Büyülü peri avatarı', price: 150, type: 'avatar', icon: '🧚', owned: false, rarity: 'epic' },
  { id: 'avatar-5', name: 'Robot', description: 'Teknoloji robotu avatarı', price: 80, type: 'avatar', icon: '🤖', owned: false, rarity: 'common' },
  { id: 'avatar-6', name: 'Ejderha', description: 'Efsanevi ejderha avatarı', price: 300, type: 'avatar', icon: '🐉', owned: false, rarity: 'legendary' },

  // Themes
  { id: 'theme-1', name: 'Gece Modu+', description: 'Premium karanlık tema', price: 200, type: 'theme', icon: '🌙', owned: false, rarity: 'rare' },
  { id: 'theme-2', name: 'Gökkuşağı', description: 'Renkli gökkuşağı teması', price: 150, type: 'theme', icon: '🌈', owned: false, rarity: 'rare' },
  { id: 'theme-3', name: 'Uzay', description: 'Galaktik uzay teması', price: 250, type: 'theme', icon: '🌌', owned: false, rarity: 'epic' },

  // Power-ups
  { id: 'powerup-1', name: '2x XP Boost', description: '1 saat boyunca 2x XP kazan', price: 30, type: 'powerup', icon: '⚡', owned: false, rarity: 'common' },
  { id: 'powerup-2', name: 'İpucu Paketi', description: 'Quiz\'lerde 5 ekstra ipucu', price: 40, type: 'powerup', icon: '💡', owned: false, rarity: 'common' },
  { id: 'powerup-3', name: 'Zaman Dondurma', description: 'Quiz süresini dondur', price: 60, type: 'powerup', icon: '⏸️', owned: false, rarity: 'rare' },

  // Badges
  { id: 'badge-1', name: 'VIP Rozeti', description: 'Profilde özel VIP rozeti', price: 500, type: 'badge', icon: '👑', owned: false, rarity: 'legendary' },
  { id: 'badge-2', name: 'Yıldız Çerçeve', description: 'Avatarın etrafında yıldız', price: 100, type: 'badge', icon: '⭐', owned: false, rarity: 'rare' },
];

const rarityColors = {
  common: 'border-gray-300 bg-gray-50 dark:bg-gray-700',
  rare: 'border-blue-400 bg-blue-50 dark:bg-blue-900/30',
  epic: 'border-purple-400 bg-purple-50 dark:bg-purple-900/30',
  legendary: 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30',
};

const rarityLabels = {
  common: { label: 'Yaygın', color: 'text-gray-600' },
  rare: { label: 'Nadir', color: 'text-blue-600' },
  epic: { label: 'Epik', color: 'text-purple-600' },
  legendary: { label: 'Efsanevi', color: 'text-yellow-600' },
};

const typeLabels: Record<string, { label: string; icon: string }> = {
  avatar: { label: 'Avatarlar', icon: '👤' },
  theme: { label: 'Temalar', icon: '🎨' },
  powerup: { label: 'Güçlendirmeler', icon: '⚡' },
  badge: { label: 'Rozetler', icon: '🏅' },
};

const RewardShop = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useNotifications();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [purchaseItem, setPurchaseItem] = useState<ShopItem | null>(null);
  const [ownedItems, setOwnedItems] = useState<string[]>(['avatar-1']);

  const userCoins = user?.student?.coins || 375;

  const filteredItems = selectedType
    ? shopItems.filter(item => item.type === selectedType)
    : shopItems;

  const handlePurchase = (item: ShopItem) => {
    if (userCoins < item.price) {
      showToast('error', 'Yetersiz Altın', 'Bu ürünü almak için yeterli altınınız yok.');
      return;
    }

    setPurchaseItem(item);
  };

  const confirmPurchase = () => {
    if (!purchaseItem) return;

    // Update owned items
    setOwnedItems([...ownedItems, purchaseItem.id]);

    // Update user coins
    if (user?.student) {
      updateUser({
        ...user,
        student: {
          ...user.student,
          coins: user.student.coins - purchaseItem.price,
        },
      });
    }

    showToast('success', 'Satın Alma Başarılı!', `${purchaseItem.name} envanterinize eklendi!`);
    setPurchaseItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🏪 Ödül Dükkanı
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kazandığın altınlarla harika ödüller al!
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-white font-bold shadow-lg">
          <span className="text-xl">🪙</span>
          <span>{userCoins}</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
            selectedType === null
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          🛒 Tümü
        </button>
        {Object.entries(typeLabels).map(([type, { label, icon }]) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedType === type
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const isOwned = ownedItems.includes(item.id);
            const canAfford = userCoins >= item.price;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-2xl border-2 p-4 ${rarityColors[item.rarity]} ${
                  isOwned ? 'opacity-60' : ''
                }`}
              >
                {/* Rarity Label */}
                <div className={`absolute top-2 right-2 text-xs font-bold ${rarityLabels[item.rarity].color}`}>
                  {rarityLabels[item.rarity].label}
                </div>

                {/* Owned Badge */}
                {isOwned && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    ✓ Sahip
                  </div>
                )}

                {/* Item Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  className="text-5xl text-center mb-3"
                >
                  {item.icon}
                </motion.div>

                {/* Item Info */}
                <h3 className="font-bold text-gray-900 dark:text-white text-center">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Price & Buy Button */}
                <div className="mt-4">
                  {isOwned ? (
                    <button
                      disabled
                      className="w-full py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 rounded-xl font-medium"
                    >
                      Sahipsin
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePurchase(item)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        canAfford
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <span>🪙</span>
                      <span>{item.price}</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {purchaseItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setPurchaseItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-4"
                >
                  {purchaseItem.icon}
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {purchaseItem.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {purchaseItem.description}
                </p>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Mevcut Altın:</span>
                    <span className="font-bold flex items-center gap-1">
                      <span>🪙</span> {userCoins}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Ürün Fiyatı:</span>
                    <span className="font-bold text-orange-500 flex items-center gap-1">
                      <span>🪙</span> -{purchaseItem.price}
                    </span>
                  </div>
                  <div className="border-t dark:border-gray-600 pt-2 flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Kalan:</span>
                    <span className="font-bold text-green-500 flex items-center gap-1">
                      <span>🪙</span> {userCoins - purchaseItem.price}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPurchaseItem(null)}
                    className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    İptal
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmPurchase}
                    className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-medium shadow-md"
                  >
                    Satın Al
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <span>💡</span> Nasıl Altın Kazanılır?
        </h3>
        <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
          <li>✅ Dersleri tamamla (+10-20 altın)</li>
          <li>✅ Quizlerden yüksek puan al (+15-30 altın)</li>
          <li>✅ Oyunlarda başarılı ol (+5-15 altın)</li>
          <li>✅ Günlük giriş yap (+5 altın)</li>
          <li>✅ Başarılar kazan (+20-100 altın)</li>
        </ul>
      </div>
    </div>
  );
};

export default RewardShop;
