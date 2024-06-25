import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface PopoverState {
  open: boolean;
  setOpen: (open: boolean) => void;
  location: {
    x: number;
    y: number;
  };
  setLocation: (location: { x: number; y: number }) => void;
  menu: {
    label: string;
    onClick: () => void;
    type?: 'danger';
  }[];
  setMenu: (menu: { label: string; onClick: () => void; type?: 'danger' }[]) => void;
}

export const usePopoverStore = create<PopoverState>()(
  devtools(
    persist(
      set => ({
        open: false,
        setOpen: data => set({ open: data }),
        location: {
          x: 0,
          y: 0
        },
        setLocation: data => set({ location: data }),
        menu: [],
        setMenu: data => set({ menu: data })
      }),
      {
        name: 'location-storage'
      }
    )
  )
);
