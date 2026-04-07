"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/utils/hooks/theme";
import type { ShopItem } from "@/app/utils/types/shop";

interface ShopItemCardProps {
  item: ShopItem;
  index: number;
}

// const getRarityColor = (rarity: string) => {
//   const colors = {
//     common: "#71717a",
//     uncommon: "#84cc16",
//     rare: "#0ea5e9",
//     epic: "#a855f7",
//     legendary: "#f97316",
//     mythic: "#facc15",
//     marvel: "#dc2626",
//     dc: "#2563eb",
//     "icon series": "#06b6d4",
//     "star wars": "#334155",
//   };
//   return colors[rarity.toLowerCase()] || "#71717a";
// };

export function ShopItemCard({ item, index }: ShopItemCardProps) {
  const { current: theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group relative w-[250px] h-[250px] cursor-pointer"
    >
      <div
        className={`relative h-full border shadow-sm transition-transform duration-300 group-hover:-translate-y-1 rounded-lg ${theme.background2} ${theme.borderColor}`}
      >
        <div
          className={`relative flex items-center justify-center h-[160px] overflow-hidden rounded-t-lg ${theme.background}`}
        >
          <img
            src={item.images.featured || item.images.icon}
            alt={item.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = item.images.icon;
            }}
          />
        </div>

        <div className="p-3 flex flex-col justify-between h-[90px]">
          <div className="flex items-center justify-between">
            <h3
              className={`text-xs font-semibold truncate ${theme.foreground}`}
            >
              {item.name}
            </h3>
            <span
              className="text-[10px] font-semibold uppercase tracking-wide"
              style={{ color: "#fff" }}
            >
              {item.rarity.displayValue}
            </span>
          </div>

          <p
            className={`text-[10px] leading-snug line-clamp-2 ${theme.foreground2}`}
          >
            {item.description}
          </p>

          <div className="flex items-center justify-start gap-1.5 pt-1">
            <img
              src="https://image.fnbr.co/price/icon_vbucks_50x.png"
              alt="V-Bucks"
              className="w-4 h-4"
            />
            <span className={`text-sm font-bold ${theme.foreground}`}>
              {item.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
