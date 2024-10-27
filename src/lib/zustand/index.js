//
import { create } from "zustand";

export const useAppStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem("admin")),
  flowers: null,
  activeSheet: {
    open: false,
    data: null,
  },
  sidebarOpen: window.localStorage.getItem("sidebar") === "on" ? true : false,
  setAdmin: (admin) =>
    set(() => {
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        localStorage.removeItem("admin");
        localStorage.removeItem("lastPage");
      }
      return { admin, flowers: null };
    }),
  setFlowers: (flowers) => set(() => ({ flowers })),
  setSidebarOpen: () =>
    set((state) => {
      state.sidebarOpen
        ? window.localStorage.setItem("sidebar", "off")
        : window.localStorage.setItem("sidebar", "on");
      return { sidebarOpen: !state.sidebarOpen };
    }),
  setActiveSheet: (data, side) => {
    set(() => {
      return { activeSheet: { open: data ? true : false, side, data } };
    });
  },
}));
