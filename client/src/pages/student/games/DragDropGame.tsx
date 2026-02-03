import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Item {
  id: string;
  text: string;
  emoji: string;
  correctZone: string;
}

interface Zone {
  id: string;
  label: string;
  color: string;
}

const DragDropGame = () => {
  const zones: Zone[] = [
    { id: 'fruits', label: 'Meyveler 🍎', color: 'bg-red-100 dark:bg-red-900/30' },
    { id: 'vegetables', label: 'Sebzeler 🥕', color: 'bg-green-100 dark:bg-green-900/30' },
  ];

  const initialItems: Item[] = [
    { id: '1', text: 'Elma', emoji: '🍎', correctZone: 'fruits' },
    { id: '2', text: 'Havuç', emoji: '🥕', correctZone: 'vegetables' },
    { id: '3', text: 'Muz', emoji: '🍌', correctZone: 'fruits' },
    { id: '4', text: 'Brokoli', emoji: '🥦', correctZone: 'vegetables' },
    { id: '5', text: 'Üzüm', emoji: '🍇', correctZone: 'fruits' },
    { id: '6', text: 'Domates', emoji: '🍅', correctZone: 'vegetables' },
  ];

  const [items, setItems] = useState(initialItems.sort(() => Math.random() - 0.5));
  const [placedItems, setPlacedItems] = useState<Record<string, Item[]>>({
    fruits: [],
    vegetables: [],
  });
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleDragStart = (item: Item) => {
    setDraggedItem(item);
  };

  const handleDrop = (zoneId: string) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.correctZone === zoneId;

    if (isCorrect) {
      setScore((s) => s + 10);
      setPlacedItems((prev) => ({
        ...prev,
        [zoneId]: [...prev[zoneId], draggedItem],
      }));
      setItems((prev) => prev.filter((i) => i.id !== draggedItem.id));

      // Check if game is complete
      if (items.length === 1) {
        setGameComplete(true);
      }
    }

    setDraggedItem(null);
  };

  const resetGame = () => {
    setItems(initialItems.sort(() => Math.random() - 0.5));
    setPlacedItems({ fruits: [], vegetables: [] });
    setScore(0);
    setGameComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sürükle ve Bırak 👆
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Öğeleri doğru kutulara sürükle!
          </p>
        </div>
        <Link to="/games" className="btn-secondary">
          ← Geri
        </Link>
      </div>

      {/* Score */}
      <div className="card text-center">
        <span className="text-2xl font-bold text-primary-600">Puan: {score}</span>
      </div>

      {/* Items to drag */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Öğeleri sürükle:
        </h3>
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px]">
          {items.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragEnd={() => setDraggedItem(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg cursor-grab active:cursor-grabbing border-2 border-gray-200 dark:border-gray-600"
            >
              <span className="text-2xl mr-2">{item.emoji}</span>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
          {items.length === 0 && !gameComplete && (
            <p className="text-gray-500">Tüm öğeler yerleştirildi!</p>
          )}
        </div>
      </div>

      {/* Drop zones */}
      <div className="grid md:grid-cols-2 gap-4">
        {zones.map((zone) => (
          <div
            key={zone.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(zone.id)}
            className={`card ${zone.color} min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors ${
              draggedItem ? 'border-primary-500 dark:border-primary-400' : ''
            }`}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {zone.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {placedItems[zone.id].map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow"
                >
                  <span className="text-xl mr-1">{item.emoji}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
            {placedItems[zone.id].length === 0 && (
              <p className="text-gray-400 text-center mt-8">
                Öğeleri buraya bırak
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Game Complete */}
      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center bg-gradient-to-r from-green-500 to-green-600 text-white"
        >
          <span className="text-5xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Tebrikler!</h2>
          <p className="mb-4">Tüm öğeleri doğru yerleştirdin!</p>
          <p className="text-xl font-bold mb-4">Toplam Puan: {score}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={resetGame} className="btn bg-white text-green-600 hover:bg-gray-100">
              Tekrar Oyna
            </button>
            <Link to="/games" className="btn bg-green-700 text-white hover:bg-green-800">
              Oyunlar
            </Link>
          </div>
        </motion.div>
      )}

      <div className="text-center">
        <button onClick={resetGame} className="btn-secondary">
          🔄 Yeniden Başla
        </button>
      </div>
    </div>
  );
};

export default DragDropGame;
