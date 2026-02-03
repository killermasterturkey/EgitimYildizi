import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

const UsersManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const role = searchParams.get('role') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', role, page, search],
    queryFn: () => api.get('/users', { params: { role: role || undefined, page, search: search || undefined } }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  const users = data?.data?.data?.users || [];
  const pagination = data?.data?.data?.pagination;

  const roleLabels: Record<string, string> = {
    STUDENT: 'Öğrenci',
    PARENT: 'Veli',
    TEACHER: 'Öğretmen',
    ADMIN: 'Admin',
  };

  const roleColors: Record<string, string> = {
    STUDENT: 'bg-green-100 text-green-700',
    PARENT: 'bg-blue-100 text-blue-700',
    TEACHER: 'bg-purple-100 text-purple-700',
    ADMIN: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kullanıcı Yönetimi 👥
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tüm kullanıcıları görüntüle ve yönet
          </p>
        </div>
        <Link to="/admin/users/new" className="btn-primary">
          ➕ Yeni Kullanıcı
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input max-w-xs"
          />
          <select
            value={role}
            onChange={(e) => setSearchParams({ role: e.target.value, page: '1' })}
            className="input max-w-xs"
          >
            <option value="">Tüm Roller</option>
            <option value="STUDENT">Öğrenci</option>
            <option value="PARENT">Veli</option>
            <option value="TEACHER">Öğretmen</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Kullanıcı</th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Email</th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Rol</th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Durum</th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Kayıt</th>
                  <th className="text-right p-4 font-medium text-gray-600 dark:text-gray-400">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          {user.avatar || '👤'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
                              deleteMutation.mutate(user.id);
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <span className="text-4xl block mb-2">👤</span>
            Kullanıcı bulunamadı
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Toplam {pagination.total} kullanıcı
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setSearchParams({ role, page: String(page - 1) })}
                disabled={page <= 1}
                className="btn-secondary btn-sm disabled:opacity-50"
              >
                ← Önceki
              </button>
              <span className="px-4 py-2 text-sm">
                {page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setSearchParams({ role, page: String(page + 1) })}
                disabled={page >= pagination.totalPages}
                className="btn-secondary btn-sm disabled:opacity-50"
              >
                Sonraki →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
