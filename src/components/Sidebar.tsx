import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  ClipboardList, 
  Calendar, 
  Settings,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'لوحة التحكم', href: '/', icon: BarChart3 },
  { name: 'التلاميذ', href: '/students', icon: Users },
  { name: 'الاختبارات', href: '/tests', icon: ClipboardList },
  { name: 'التقارير', href: '/reports', icon: GraduationCap },
  { name: 'المواعيد', href: '/calendar', icon: Calendar },
  { name: 'الاعدادات', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">التوجيه المدرسي</h1>
      </div>
      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}