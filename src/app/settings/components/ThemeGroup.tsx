"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useConfigStore } from "@/app/packages/zustand/configs";
import { themes } from "@/app/css/themes";
import { useTheme } from "@/app/utils/hooks/theme";

export function ThemeGroup() {
  const colors = useTheme();
  const { theme: currentTheme, setTheme } = useConfigStore();
  const [applyingTheme, setApplyingTheme] = useState<string | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const themeColors: Record<string, string> = {
    midnight: "#1e2749",
    obsidian: "#262626",
    deepocean: "#0d3a54",
    royalpurple: "#3d1f6b",
    lavender: "#4d3266",
    cobalt: "#243a6e",
    arctic: "#1d3847",
    forest: "#1f4029",
    matrix: "#153a15",
    ember: "#3d2415",
    crimson: "#441e2a",
    cyberpunk: "#2a1a4a",
    synthwave: "#3e1f5c",
    slate: "#242d38",
  };

  const themeNames: Record<string, string> = {
    midnight: "Midnight",
    obsidian: "Obsidian",
    deepocean: "Deep Ocean",
    royalpurple: "Royal Purple",
    lavender: "Lavender",
    cobalt: "Cobalt",
    arctic: "Arctic",
    forest: "Forest",
    matrix: "Matrix",
    ember: "Ember",
    crimson: "Crimson",
    cyberpunk: "Cyberpunk",
    synthwave: "Synthwave",
    slate: "Slate",
  };

  const handleThemeClick = (themeName: string) => {
    setApplyingTheme(themeName);
    setTimeout(() => {
      setTheme(themeName);
      setApplyingTheme(null);
    }, 600);
  };

  return (
    <div
      className={`rounded-xl p-6 ${colors.current.background2} border ${colors.current.borderColor}`}
    >
      <div className="flex flex-col items-start justify-center mb-6">
        <div className="flex flex-row gap-1 items-center text-start justify-center">
          <Palette size={24} className={colors.current.foreground} />
          <h2 className={`text-xl font-bold ${colors.current.foreground}`}>
            Appearance
          </h2>
        </div>
        <p className="text-white">Customize the launcher!</p>
      </div>

      <div className="grid grid-cols-14 gap-4">
        {Object.keys(themes).map((themeName, index) => (
          <motion.div
            key={themeName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredTheme(themeName)}
              onHoverEnd={() => setHoveredTheme(null)}
              onClick={() => handleThemeClick(themeName)}
              className="w-12 h-12 rounded-full border-2 transition-all relative"
              style={{
                backgroundColor: themeColors[themeName],
                borderColor:
                  currentTheme === themeName
                    ? "#ffffff"
                    : `${themeColors[themeName]}80`,
                boxShadow:
                  currentTheme === themeName
                    ? `0 0 20px ${themeColors[themeName]}80`
                    : "none",
              }}
            >
              <AnimatePresence>
                {currentTheme === themeName && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-lg"
                  >
                    <Check size={12} className="text-black" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {hoveredTheme === themeName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 px-3 py-1.5 mb-3 bg-black/90 text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none z-10"
                >
                  {themeNames[themeName]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {applyingTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bg-black/20 backdrop-blur-sm z-20 w-screen h-screen inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 text-white text-sm font-medium rounded-xl ${colors.current.background2} border ${colors.current.borderColor} shadow-2xl`}
            >
              Applying...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
