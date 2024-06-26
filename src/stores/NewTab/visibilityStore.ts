import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface VisibilityState {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

export const useVisibilityStore = create<VisibilityState>()(
  devtools(
    persist(
      set => ({
        visibility: false,
        setVisibility: data => set({ visibility: data })
      }),
      {
        name: 'visibility-storage'
      }
    )
  )
);
