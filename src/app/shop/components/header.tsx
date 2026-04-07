"use client";

import { useTheme } from "@/app/utils/hooks/theme";

interface ShopHeaderProps {
  itemCount: number;
}

export function ShopHeader({ itemCount }: ShopHeaderProps) {
  const colors = useTheme();

  return (
    <div className="mb-8">
      <h1 className={`text-4xl font-bold mb-2 ${colors.current.foreground}`}>
        Item Shop
      </h1>
      <p className={`text-sm ${colors.current.foreground}`}>
        {itemCount} items are in the shop right now.
      </p>
    </div>
  );
}
