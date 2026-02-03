import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });

    // Here you could send error to a logging service
    // logErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              😢
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Bir Şeyler Yanlış Gitti
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-left">
                <p className="text-red-600 dark:text-red-400 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="text-red-500 text-xs cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="text-xs text-red-400 mt-2 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleRetry}
                className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                🔄 Tekrar Dene
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleGoHome}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                🏠 Ana Sayfa
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional Error Fallback for smaller components
export const ErrorFallback = ({
  error,
  resetError,
}: {
  error?: Error;
  resetError?: () => void;
}) => (
  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
    <span className="text-4xl block mb-3">⚠️</span>
    <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
      İçerik Yüklenemedi
    </h3>
    <p className="text-red-500 dark:text-red-300 text-sm mb-4">
      {error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'}
    </p>
    {resetError && (
      <button
        onClick={resetError}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
      >
        Tekrar Dene
      </button>
    )}
  </div>
);

// Hook for error handling in functional components
export const useErrorHandler = () => {
  const handleError = (error: Error) => {
    console.error('Error:', error);
    // Could add more error handling logic here
  };

  return { handleError };
};

export default ErrorBoundary;
