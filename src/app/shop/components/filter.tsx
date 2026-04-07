"use client";

import { useTheme } from "@/app/utils/hooks/theme";

interface ShopFiltersProps {
  rarities: string[];
  selectedRarity: string;
  onRarityChange: (rarity: string) => void;
}

export function ShopFilters({
  rarities,
  selectedRarity,
  onRarityChange,
}: ShopFiltersProps) {
  const colors = useTheme();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {rarities.map((rarity) => (
        <button
          key={rarity}
          onClick={() => onRarityChange(rarity)}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          style={{
            backgroundColor:
              selectedRarity === rarity
                ? colors.current.buttonColor
                : colors.current.background2,
            color:
              selectedRarity === rarity
                ? colors.current.foreground
                : colors.current.foreground2,
            borderWidth: "1px",
            borderColor:
              selectedRarity === rarity
                ? colors.current.buttonColor
                : colors.current.borderColor,
          }}
        >
          {rarity === "all" ? "All" : rarity}
        </button>
      ))}
    </div>
  );
}
