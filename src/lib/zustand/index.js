//
import { create } from "zustand";

export const useAppStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("admin")) || null,
  flowers: null,
  setUser: (user) =>
    set(() => {
      if (user) {
        localStorage.setItem("admin", JSON.stringify(user));
      } else localStorage.removeItem("admin");
      return { user };
    }),
  setFlowers: (flowers) => set(() => ({ flowers })),
}));
