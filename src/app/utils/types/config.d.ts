export interface ConfigState {
  minimizeOnLaunch: boolean;
  theme: string;

  setMinimizeOnLaunch: (value: boolean) => void;
  toggleMinimizeOnLaunch: () => void;
  setTheme: (theme: string) => void;
}
