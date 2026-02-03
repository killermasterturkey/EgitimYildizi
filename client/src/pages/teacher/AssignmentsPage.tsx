import { useState } from 'react';

const AssignmentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    studentIds: [] as string[],
    lessonId: '',
    topicId: '',
  });

  // Demo assignments
  const demoAssignments = [
    {
      id: '1',
      title: 'Toplama Alıştırmaları',
      description: '1-10 arası toplama işlemleri',
      dueDate: '2024-02-15',
      status: 'active',
      completedCount: 2,
      totalCount: 3,
    },
    {
      id: '2',
      title: 'Sesli Harfler Quiz',
      description: 'Sesli harfler konusunu tamamla',
      dueDate: '2024-02-20',
      status: 'active',
      completedCount: 1,
      totalCount: 3,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ödev Yönetimi 📋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ödev atayın ve takip edin
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          ➕ Yeni Ödev
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{demoAssignments.length}</div>
          <div className="text-sm text-gray-500">Aktif Ödev</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">3</div>
          <div className="text-sm text-gray-500">Tamamlanan</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">1</div>
          <div className="text-sm text-gray-500">Bekleyen</div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {demoAssignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-2xl">
                  📝
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Son: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}</span>
                    <span>✅ {assignment.completedCount}/{assignment.totalCount} tamamlandı</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary btn-sm">Düzenle</button>
                <button className="btn-error btn-sm">Sil</button>
              </div>
            </div>
            {/* Progress */}
            <div className="mt-4">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(assignment.completedCount / assignment.totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Yeni Ödev Ata
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Ödev Başlığı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
              <div>
                <label className="label">Son Tarih</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Öğrenciler</label>
                <select className="input" multiple>
                  <option value="1">Ali Yıldız</option>
                  <option value="2">Ayşe Demir</option>
                  <option value="3">Mehmet Kaya</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Ctrl/Cmd ile çoklu seçim yapın</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Ata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
