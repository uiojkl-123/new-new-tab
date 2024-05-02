import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface MemoState {
  memo: string;
  isLoading: boolean;
  setMemo: (data: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useMemoStore = create<MemoState>()(
  devtools(
    persist(
      set => ({
        memo: '',
        isLoading: false,
        setMemo: data => set({ memo: data }),
        setIsLoading: isLoading => set({ isLoading })
      }),
      {
        name: 'memo-storage'
      }
    )
  )
);
