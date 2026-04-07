import { Profile } from "@/app/utils/types/profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProfileStore = create<Profile & { hydrated: boolean }>()(
  persist(
    (set, get) => ({
      accountId: null,
      displayName: null,
      email: null,
      password: null,
      hydrated: false,

      validSession: () => {
        const { accountId, displayName } = get();
        return Boolean(accountId && displayName);
      },

      setHydrated: () => set({ hydrated: true }),

      setProfile: (profile) => set((state) => ({ ...state, ...profile })),

      clearProfile: () =>
        set({
          accountId: null,
          displayName: null,
          email: null,
          password: null,
        }),

      login: (profile) =>
        set({
          accountId: profile.accountId,
          displayName: profile.displayName,
          email: profile.email,
          password: profile.password,
        }),

      logout: () =>
        set({
          accountId: null,
          displayName: null,
          email: null,
          password: null,
        }),
    }),

    {
      name: "storage:profile",
      partialize: (state) => ({
        accountId: state.accountId,
        displayName: state.displayName,
        email: state.email,
        password: state.password,
      }),
    }
  )
);
