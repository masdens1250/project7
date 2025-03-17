import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'ذكر' | 'أنثى';
  level: string;
  group: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  socialStatus: string;
  additionalInfo: string;
  healthStatus: string;
  notes: string;
}

export interface Test {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number;
  instructions: string;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple' | 'text' | 'scale';
  options?: string[];
}

export interface Appointment {
  id: string;
  title: string;
  student: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

interface State {
  students: Student[];
  tests: Test[];
  appointments: Appointment[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Student) => void;
  deleteStudent: (id: string) => void;
  addTest: (test: Test) => void;
  updateTest: (id: string, test: Test) => void;
  deleteTest: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      students: [],
      tests: [],
      appointments: [],
      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
      updateStudent: (id, updatedStudent) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? updatedStudent : student
          ),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
        })),
      addTest: (test) =>
        set((state) => ({ tests: [...state.tests, test] })),
      updateTest: (id, updatedTest) =>
        set((state) => ({
          tests: state.tests.map((test) =>
            test.id === id ? updatedTest : test
          ),
        })),
      deleteTest: (id) =>
        set((state) => ({
          tests: state.tests.filter((test) => test.id !== id),
        })),
      addAppointment: (appointment) =>
        set((state) => ({ appointments: [...state.appointments, appointment] })),
      updateAppointment: (id, updatedAppointment) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? updatedAppointment : appointment
          ),
        })),
      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((appointment) => appointment.id !== id),
        })),
    }),
    {
      name: 'dz-orientations-storage',
    }
  )
);