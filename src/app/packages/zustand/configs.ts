import { ConfigState } from "@/app/utils/types/config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      minimizeOnLaunch: false,
      theme: "midnight",

      setMinimizeOnLaunch: (value) => set({ minimizeOnLaunch: value }),

      toggleMinimizeOnLaunch: () =>
        set((state) => ({ minimizeOnLaunch: !state.minimizeOnLaunch })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "storage:config",
    }
  )
);
