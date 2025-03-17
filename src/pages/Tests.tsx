import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useStore, type Test } from '../lib/store';
import { Modal } from '../components/Modal';

export function Tests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const { tests, addTest, updateTest, deleteTest } = useStore();

  const filteredTests = tests.filter((test) =>
    test.name.includes(searchTerm)
  );

  const handleAddTest = (data: Test) => {
    addTest({ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setIsAddModalOpen(false);
  };

  const handleUpdateTest = (data: Test) => {
    if (selectedTest) {
      updateTest(selectedTest.id, data);
      setSelectedTest(null);
    }
  };

  const handleDeleteTest = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الاختبار؟')) {
      deleteTest(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">الاختبارات</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة اختبار جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث عن اختبار..."
              className="w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  اسم الاختبار
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  عدد الأسئلة
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  المدة (دقيقة)
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  تاريخ الإنشاء
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{test.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{test.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {test.questions.length}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {test.duration}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {test.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTest(test)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setSelectedTest(test)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="إضافة اختبار جديد"
      >
        {/* Add test form component here */}
      </Modal>

      <Modal
        isOpen={!!selectedTest}
        onClose={() => setSelectedTest(null)}
        title="تعديل الاختبار"
      >
        {/* Add test form component here */}
      </Modal>
    </div>
  );
}