import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const grades = [
  { value: 'PRESCHOOL', label: 'Okul Öncesi' },
  { value: 'GRADE_1', label: '1. Sınıf' },
  { value: 'GRADE_2', label: '2. Sınıf' },
  { value: 'GRADE_3', label: '3. Sınıf' },
  { value: 'GRADE_4', label: '4. Sınıf' },
  { value: 'GRADE_5', label: '5. Sınıf' },
  { value: 'GRADE_6', label: '6. Sınıf' },
  { value: 'GRADE_7', label: '7. Sınıf' },
  { value: 'GRADE_8', label: '8. Sınıf' },
];

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
    grade: 'GRADE_1',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        grade: formData.role === 'STUDENT' ? formData.grade : undefined,
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Aramıza Katıl! 🎉
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label">
              Ad
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              placeholder="Adınız"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">
              Soyad
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              placeholder="Soyadınız"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="label">
            E-posta Adresi
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="ornek@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="label">
            Hesap Türü
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
          >
            <option value="STUDENT">Öğrenci</option>
            <option value="PARENT">Veli</option>
            <option value="TEACHER">Öğretmen</option>
          </select>
        </div>

        {formData.role === 'STUDENT' && (
          <div>
            <label htmlFor="grade" className="label">
              Sınıf
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="input"
            >
              {grades.map((grade) => (
                <option key={grade.value} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="password" className="label">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="En az 6 karakter"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label">
            Şifre Tekrar
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            placeholder="Şifrenizi tekrar girin"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Kayıt Yapılıyor...
            </span>
          ) : (
            'Kayıt Ol'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-primary-600 hover:underline font-medium">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
