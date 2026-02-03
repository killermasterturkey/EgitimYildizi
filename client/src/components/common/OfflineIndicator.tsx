import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-yellow-500 text-white py-2 px-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">📴</span>
            <span className="font-medium">
              Çevrimdışı moddasınız. Bazı özellikler kullanılamayabilir.
            </span>
          </div>
        </motion.div>
      )}

      {showReconnected && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-green-500 text-white py-2 px-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">✅</span>
            <span className="font-medium">Bağlantı yeniden kuruldu!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
