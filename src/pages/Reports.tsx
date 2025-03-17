import React from 'react';
import { BarChart3, Users, ClipboardCheck } from 'lucide-react';

export function Reports() {
  const reports = [
    {
      title: 'تقرير الاختبارات الشهري',
      description: 'ملخص نتائج الاختبارات للشهر الحالي',
      icon: ClipboardCheck,
    },
    {
      title: 'تقرير التلاميذ',
      description: 'إحصائيات وتحليلات عن التلاميذ',
      icon: Users,
    },
    {
      title: 'تقرير الأداء العام',
      description: 'تحليل شامل لأداء المؤسسة',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">التقارير</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.title} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <report.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
              عرض التقرير
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}