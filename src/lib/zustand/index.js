//
import { create } from "zustand";

export const useAppStore = create((set) => ({
  user: null,
  flowers: null,
  setUser: (user) => set((state) => ({ user })),
  setFlowers: (flowers) => set((state) => ({ flowers })),
}));
