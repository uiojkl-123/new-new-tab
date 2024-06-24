import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface BookmarkState {
  bookmark: {
    [key: string]: {
      link: string;
      linkName: number;
    };
  };
  isLoading: boolean;
  setBookmark: (data: {
    [key: string]: {
      link: string;
      linkName: number;
    };
  }) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    persist(
      set => ({
        bookmark: {},
        isLoading: false,
        setBookmark: data => set({ bookmark: data }),
        setIsLoading: isLoading => set({ isLoading })
      }),
      {
        name: 'bookmark-storage'
      }
    )
  )
);
