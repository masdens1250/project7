import React from 'react';
import { Users, ClipboardCheck, ClipboardList, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { name: 'إجمالي التلاميذ', value: '324', icon: Users },
  { name: 'إجمالي الاختبارات', value: '45', icon: ClipboardList },
  { name: 'الاختبارات المكتملة', value: '38', icon: ClipboardCheck },
  { name: 'اختبارات قيد الانتظار', value: '7', icon: Clock },
];

const chartData = {
  labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
  datasets: [
    {
      label: 'الاختبارات المكتملة',
      data: [12, 19, 15, 25, 22, 38],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="mr-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">تقدم الاختبارات</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}