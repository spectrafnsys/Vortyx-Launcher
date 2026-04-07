"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Config } from "@/app/config/config";
import { ShopItem } from "@/app/utils/types/shop";
import axios from "axios";
import { useTheme } from "@/app/utils/hooks/theme";

export function SmallShop() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const colors = useTheme();

  useEffect(() => {
    fetchShop();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    if (!items.length) return;

    setProgress(0);
    const startTime = Date.now();
    const duration = 5000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [index, items]);

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

      setItems(loaded.slice(0, 6));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "from-zinc-500 via-zinc-600 to-zinc-700";
      case "uncommon":
        return "from-lime-500 via-lime-600 to-lime-700";
      case "rare":
        return "from-sky-500 via-sky-600 to-sky-700";
      case "epic":
        return "from-purple-500 via-purple-600 to-purple-700";
      case "legendary":
        return "from-orange-500 via-orange-600 to-orange-700";
      case "mythic":
        return "from-yellow-400 via-yellow-500 to-yellow-600";
      case "marvel":
        return "from-red-600 via-red-700 to-red-800";
      case "dc":
        return "from-blue-600 via-blue-700 to-blue-800";
      case "icon series":
        return "from-cyan-500 via-cyan-600 to-cyan-700";
      case "star wars":
        return "from-slate-700 via-slate-800 to-slate-900";
      default:
        return "from-neutral-600 via-neutral-700 to-neutral-800";
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-[250px] h-[250px] bg-gradient-to-br from-stone-900 to-stone-950 flex items-center justify-center rounded-xl shadow-2xl border border-stone-800"
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-8 h-8 border-3 ${colors.current.borderColor} border-t-transparent rounded-full animate-spin`}
          ></div>
          <span className="text-white text-xs font-medium">Loading...</span>
        </div>
      </motion.div>
    );
  }

  if (!items.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-[250px] h-[250px] bg-gradient-to-br from-stone-900 to-stone-950 flex items-center justify-center rounded-xl shadow-2xl border border-stone-800"
      >
        <span className="text-white text-xs font-medium">No items</span>
      </motion.div>
    );
  }

  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-[250px] h-[250px] rounded-xl overflow-hidden shadow-2xl border border-stone-800"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(
          item.rarity.value
        )}`}
        key={`bg-${index}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`image-${index}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pt-2"
        >
          <img
            src={item.images.featured || item.images.icon}
            alt={item.name}
            className="max-h-[90%] max-w-[90%] object-contain drop-shadow-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = item.images.icon;
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-2 right-2 flex gap-1 z-10">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-white w-2.5 shadow-md shadow-white/50"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
        <div className="p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="inline-block">
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30">
                  {item.rarity.displayValue}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs font-bold text-gray-400 leading-tight drop-shadow-lg line-clamp-1">
                {item.description}
              </p>

              <div className="flex items-center">
                {item.price > 0 ? (
                  <div className="flex items-center gap-1 bg-transparent rounded-md">
                    <img
                      src="https://image.fnbr.co/price/icon_vbucks_50x.png"
                      alt="V-Bucks"
                      className="w-3 h-3"
                    />
                    <span className="text-white font-bold text-[10px]">
                      {item.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-transparent rounded-md">
                    <img
                      src="https://image.fnbr.co/price/icon_vbucks_50x.png"
                      alt="V-Bucks"
                      className="w-3 h-3"
                    />
                    <span className="text-white font-bold text-[10px]">
                      {item.price.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-blue-300 to-white shadow-sm shadow-white/50"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
