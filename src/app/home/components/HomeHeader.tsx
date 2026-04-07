"use client";

import { useTheme } from "@/app/utils/hooks/theme";
import { Config } from "@/app/config/config";

export function Header() {
  const colors = useTheme();
  return (
    <main
      className={`w-full h-12 pb-2 px-4 border-b gap-1 pt-2 top-0 absolute z-1 flex items-center justify-start ${colors.current.borderColor}`}
      data-tauri-drag-region
    >
      <h2 className={`border-b-2 ${colors.current.foreground}`}>
        {Config.NAME}
      </h2>
    </main>
  );
}
