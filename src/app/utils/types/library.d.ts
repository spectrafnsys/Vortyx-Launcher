export type Build = {
  path: string;
  splash?: string | null;
  open: boolean;
  enabled: boolean;
  version: string;
  season: string;
};

export type LibraryState = {
  build: Build[];
  addItem: (item: Build) => void;
  removeItem: (path: string) => void;
  toggleOpen: (path: string) => void;
  toggleEnabled: (path: string) => void;
  clearLibrary: () => void;
};
