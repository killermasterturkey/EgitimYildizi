import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface Notification {
  id: string;
  type: 'ACHIEVEMENT' | 'REMINDER' | 'PROGRESS' | 'MESSAGE' | 'SYSTEM';
  title: string;
  content: string;
  data?: any;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  toasts: Toast[];
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  showToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await api.get('/notifications');
      const data = response.data.data;
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch notifications on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
      const wasUnread = notifications.find(n => n.id === id)?.read === false;
      if (wasUnread) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const showToast = (type: Toast['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}`;
    const toast: Toast = { id, type, title, message };
    setToasts(prev => [...prev, toast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        showToast,
        removeToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
