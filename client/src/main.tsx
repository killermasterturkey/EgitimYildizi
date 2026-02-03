import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Initialize i18n
import './i18n';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { NotificationProvider } from './context/NotificationContext';
import { TTSProvider } from './context/TTSContext';
import ToastContainer from './components/notifications/ToastContainer';
import OfflineIndicator from './components/common/OfflineIndicator';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AccessibilityProvider>
            <TTSProvider>
              <AuthProvider>
                <NotificationProvider>
                  <App />
                  <ToastContainer />
                  <OfflineIndicator />
                </NotificationProvider>
              </AuthProvider>
            </TTSProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
