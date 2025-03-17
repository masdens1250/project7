import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useStore, type Student } from '../lib/store';
import { Modal } from '../components/Modal';
import { StudentForm } from '../components/StudentForm';

export function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { students, addStudent, updateStudent, deleteStudent } = useStore();

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.includes(searchTerm) ||
      student.lastName.includes(searchTerm)
  );

  const handleAddStudent = (data: Student) => {
    addStudent({ ...data, id: crypto.randomUUID() });
    setIsAddModalOpen(false);
  };

  const handleUpdateStudent = (data: Student) => {
    if (selectedStudent) {
      updateStudent(selectedStudent.id, data);
      setSelectedStudent(null);
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا التلميذ؟')) {
      deleteStudent(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">التلاميذ</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة تلميذ جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث عن تلميذ..."
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
                  رقم التعريف
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  الاسم
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  اللقب
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  المستوى
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  الفوج
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  تاريخ الميلاد
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.firstName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.level}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.group}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.birthDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
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
        title="إضافة تلميذ جديد"
      >
        <StudentForm onSubmit={handleAddStudent} />
      </Modal>

      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title="تعديل معلومات التلميذ"
      >
        {selectedStudent && (
          <StudentForm
            onSubmit={handleUpdateStudent}
            initialData={selectedStudent}
          />
        )}
      </Modal>
    </div>
  );
}