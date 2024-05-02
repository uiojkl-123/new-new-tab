import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface TaskState {
  task: {
    [key: string]: {
      title: string;
      order: number;
    };
  };
  isLoading: boolean;
  setTask: (data: {
    [key: string]: {
      title: string;
      order: number;
    };
  }) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      set => ({
        task: {},
        isLoading: false,
        setTask: data => set({ task: data }),
        setIsLoading: isLoading => set({ isLoading })
      }),
      {
        name: 'task-storage'
      }
    )
  )
);
