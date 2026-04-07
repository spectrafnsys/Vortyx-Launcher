"use client";

import { Info, Palette, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "../utils/hooks/theme";
import { AboutGroup } from "./components/AboutGroup";
import { ThemeGroup } from "./components/ThemeGroup";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "about" | "themes" | "settings";

export function Settings() {
  const colors = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const tabs = [
    { id: "about" as Tab, label: "About", icon: Info },
    { id: "themes" as Tab, label: "Themes", icon: Palette },
    { id: "settings" as Tab, label: "Settings", icon: SettingsIcon },
  ];

  return (
    <main className={`min-h-screen ${colors.current.background} pb-24`}>
      <div className="h-full overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            {activeTab === "about" && <AboutGroup />}
            {activeTab === "themes" && <ThemeGroup />}
            {activeTab === "settings" && (
              <div
                className={`rounded-xl p-6 ${colors.current.background2} border ${colors.current.borderColor}`}
              >
                <h2
                  className={`text-xl font-bold ${colors.current.foreground}`}
                >
                  Settings
                </h2>
                <p className={`mt-2 ${colors.current.foreground2}`}>
                  Nothing here...:c
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 ${colors.current.background2}  backdrop-blur-xl`}
        style={{ backgroundColor: `${colors.current.background2}f0` }}
      >
        <div className="flex items-center justify-center gap-2 px-8 py-4 max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col cursor-pointer items-center gap-1 px-6 py-2"
              >
                <div className="relative">
                  <Icon
                    size={24}
                    className={`${
                      isActive
                        ? colors.current.foreground
                        : colors.current.foreground2
                    } transition-colors`}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))"
                        : "none",
                    }}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15))`,
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
