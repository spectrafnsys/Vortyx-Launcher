"use client";

import { useTheme } from "@/app/utils/hooks/theme";

export function ShopLoading() {
  const colors = useTheme();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-12 h-12 border-4 rounded-full animate-spin ${colors.current.borderColor}`}
          style={{
            borderTopColor: "transparent",
          }}
        />
        <span className={`text-sm font-medium ${colors.current.foreground2}`}>
          Loading shop...
        </span>
      </div>
    </main>
  );
}
