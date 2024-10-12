//
import { create } from "zustand";

export const useAppStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  flowers: null,
  addItemModal: false,
  editModal: false,
  adminEditSheet: false,
  sidebarOpen: window.localStorage.getItem("sidebar") === "on" ? true : false,
  setAdmin: (admin) =>
    set(() => {
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        localStorage.removeItem("admin");
      }
      return { admin, flowers: null };
    }),
  setFlowers: (flowers) => set(() => ({ flowers })),
  setAddItemModal: () =>
    set((state) => ({ addItemModal: !state.addItemModal })),
  setEditModal: () => set((state) => ({ editModal: !state.editModal })),
  setSidebarOpen: () =>
    set((state) => {
      state.sidebarOpen
        ? window.localStorage.setItem("sidebar", "off")
        : window.localStorage.setItem("sidebar", "on");
      return { sidebarOpen: !state.sidebarOpen };
    }),
  setAdminEditSheet: () =>
    set((state) => ({ adminEditSheet: !state.adminEditSheet })),
}));
