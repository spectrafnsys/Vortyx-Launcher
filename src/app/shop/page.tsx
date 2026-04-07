"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/utils/hooks/theme";
import type { ShopItem } from "@/app/utils/types/shop";
import { Config } from "@/app/config/config";
import axios from "axios";
import { ShopLoading } from "@/app/shop/components/loading";
import { ShopHeader } from "@/app/shop/components/header";
import { ShopFilters } from "@/app/shop/components/filter";
import { ShopItemCard } from "@/app/shop/components/ItemCard";

export function Shop() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const colors = useTheme();

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const res = await axios.get(
        `${Config.BACKEND_URL}:${Config.BACKEND_PORT}/fortnite/api/storefront/v2/catalog`
      );
      if (!res.status) throw new Error("Bad response");

      const json = await res.data;

      const daily =
        json.storefronts.find((s: any) => s.name === "BRDailyStorefront")
          ?.catalogEntries || [];
      const weekly =
        json.storefronts.find((s: any) => s.name === "BRWeeklyStorefront")
          ?.catalogEntries || [];
      const selectedStores = [...weekly, ...daily];

      if (!selectedStores.length) {
        setLoading(false);
        return;
      }

      const loaded: ShopItem[] = [];

      for (const entry of selectedStores) {
        const price = entry.prices?.[0]?.finalPrice ?? 0;
        const id = entry.devName?.split(":")[1];

        if (!id) continue;

        try {
          const cosmeticRes = await fetch(
            `https://fortnite-api.com/v2/cosmetics/br/${id}`
          );
          if (!cosmeticRes.ok) continue;

          const data = await cosmeticRes.json();
          if (data.status !== 200 || !data.data) continue;

          loaded.push({
            id: data.data.id,
            name: data.data.name,
            description: data.data.description,
            price: price || 0,
            images: {
              featured: data.data.images.featured,
              icon: data.data.images.icon,
            },
            rarity: data.data.rarity,
          });
        } catch {
          continue;
        }
      }

      setItems(loaded);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const rarities = [
    "all",
    ...Array.from(new Set(items.map((item) => item.rarity.value))),
  ];

  const filteredItems =
    selectedRarity === "all"
      ? items
      : items.filter((item) => item.rarity.value === selectedRarity);

  if (loading) {
    return <ShopLoading />;
  }

  return (
    <main className="p-6 max-w-[1400px] mx-auto">
      <ShopHeader itemCount={items.length} />

      {filteredItems.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm" style={{ color: colors.current.foreground2 }}>
            No items found
          </p>
        </div>
      ) : (
        <div className="overflow-y-scroll">
          <div className="grid rounded-xl min-h-[480px] px-2 py-2 grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <ShopItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
