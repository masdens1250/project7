import React from 'react';
import { Building2, User, Lock, Bell } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">الاعدادات</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Building2 className="h-6 w-6 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900">معلومات المؤسسة</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المؤسسة
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل اسم المؤسسة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع المؤسسة
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>متوسطة</option>
                <option>ثانوية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم مدير المؤسسة
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل اسم المدير"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم مستشار(ة) التوجيه
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل اسم المستشار(ة)"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <User className="h-6 w-6 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">الملف الشخصي</h3>
          </div>
          <p className="text-sm text-gray-600">إدارة معلومات الملف الشخصي والصورة</p>
          <button className="mt-4 text-blue-600 hover:text-blue-800">تعديل</button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <Lock className="h-6 w-6 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">الأمان</h3>
          </div>
          <p className="text-sm text-gray-600">تغيير كلمة المرور وإعدادات الأمان</p>
          <button className="mt-4 text-blue-600 hover:text-blue-800">تعديل</button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">الإشعارات</h3>
          </div>
          <p className="text-sm text-gray-600">تخصيص إعدادات الإشعارات</p>
          <button className="mt-4 text-blue-600 hover:text-blue-800">تعديل</button>
        </div>
      </div>
    </div>
  );
}