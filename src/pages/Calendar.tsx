import React from 'react';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

export function Calendar() {
  const appointments = [
    {
      id: 1,
      title: 'جلسة توجيه فردية',
      student: 'أحمد محمد',
      time: '09:00',
      date: '2024-02-20',
    },
    {
      id: 2,
      title: 'اختبار جماعي',
      student: 'الفوج أ',
      time: '11:00',
      date: '2024-02-20',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">المواعيد</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <CalendarIcon className="h-5 w-5" />
          <span>إضافة موعد جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-5 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="font-semibold mb-2">الأحد</div>
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">مواعيد اليوم</h2>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{appointment.time}</span>
                </div>
                <h3 className="font-semibold">{appointment.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{appointment.student}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}