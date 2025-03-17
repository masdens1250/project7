import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Student } from '../lib/store';

const studentSchema = z.object({
  firstName: z.string().min(1, 'مطلوب'),
  lastName: z.string().min(1, 'مطلوب'),
  birthDate: z.string().min(1, 'مطلوب'),
  gender: z.enum(['ذكر', 'أنثى']),
  level: z.string().min(1, 'مطلوب'),
  group: z.string().min(1, 'مطلوب'),
  address: z.string().min(1, 'مطلوب'),
  parentName: z.string().min(1, 'مطلوب'),
  parentPhone: z.string().min(1, 'مطلوب'),
  parentEmail: z.string().email('البريد الإلكتروني غير صالح'),
  socialStatus: z.string(),
  additionalInfo: z.string(),
  healthStatus: z.string(),
  notes: z.string(),
});

interface StudentFormProps {
  onSubmit: (data: Student) => void;
  initialData?: Student;
}

export function StudentForm({ onSubmit, initialData }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">الاسم</label>
          <input
            type="text"
            {...register('firstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">اللقب</label>
          <input
            type="text"
            {...register('lastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            {...register('birthDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الجنس</label>
          <select
            {...register('gender')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {/* Add more fields as needed */}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          حفظ
        </button>
      </div>
    </form>
  );
}