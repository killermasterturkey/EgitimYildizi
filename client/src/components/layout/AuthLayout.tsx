import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 text-white">
            <span className="text-5xl">⭐</span>
            <span className="text-3xl font-bold font-display">EğitimYıldızı</span>
          </div>
          <p className="text-primary-100 mt-2">
            Öğrenmenin en eğlenceli yolu!
          </p>
        </div>

        {/* Auth card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-primary-100 text-sm mt-6">
          © 2024 EğitimYıldızı. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
