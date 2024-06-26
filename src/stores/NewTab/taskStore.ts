import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

export interface Task {
  title: string;
  order: number;
  done?: boolean;
  savedAt?: string;
}
interface TaskState {
  task: {
    [key: string]: Task;
  };
  isLoading: boolean;
  setTask: (data: { [key: string]: Task }) => void;
  setIsLoading: (isLoading: boolean) => void;
  category: 'active' | 'completed';
  setCategory: (category: 'active' | 'completed') => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      set => ({
        task: {},
        isLoading: false,
        setTask: data => set({ task: data }),
        setIsLoading: isLoading => set({ isLoading }),
        category: 'active',
        setCategory: category => set({ category })
      }),
      {
        name: 'task-storage'
      }
    )
  )
);
