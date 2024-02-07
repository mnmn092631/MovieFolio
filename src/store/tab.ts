import { create } from "zustand";

interface TabState {
  tab: "detailed" | "brief";
  setTab: (tab: "detailed" | "brief") => void;
}

const useTabStore = create<TabState>((set) => ({
  tab: "detailed",
  setTab: (tab) => set({ tab }),
}));

export default useTabStore;
