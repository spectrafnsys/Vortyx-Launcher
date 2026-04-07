export type Profile = {
  accountId: string | null;
  displayName: string | null;
  email: string | null;
  password: string | null;
  validSession: () => boolean;
  setProfile: (profile: {
    accountId?: string | null;
    displayName?: string | null;
    email: string | null;
    password: string | null;
  }) => void;
  clearProfile: () => void;
  login: (profile: {
    accountId: string;
    displayName: string;
    email: string | null;
    password: string | null;
  }) => void;
  logout: () => void;
  setHydrated: () => void;
};
