"use client";

import { themes } from "@/app/css/themes";
import { useConfigStore } from "@/app/packages/zustand/configs";
import { useMemo } from "react";

type ThemeName = keyof typeof themes;

export function useTheme() {
  const { theme: themeName, setTheme: setThemeStore } = useConfigStore();

  const current = useMemo(() => {
    const name = themeName as ThemeName;
    return themes[name] || themes.midnight;
  }, [themeName]);

  const setTheme = (name: ThemeName) => {
    if (themes[name]) {
      setThemeStore(name);
    }
  };

  return {
    current,
    themeName: themeName as ThemeName,
    setTheme,
    themes,
  };
}
