import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';

const toastIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const toastColors = {
  success: 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  error: 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  info: 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`p-4 rounded-xl border-l-4 shadow-lg ${toastColors[toast.type]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{toastIcons[toast.type]}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm">{toast.title}</h4>
                <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
