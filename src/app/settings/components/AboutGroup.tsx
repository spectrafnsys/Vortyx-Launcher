"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { useTheme } from "@/app/utils/hooks/theme";
import { Config } from "@/app/config/config";
import { useProfileStore } from "@/app/packages/zustand/profile";
import { useState } from "react";

export function AboutGroup() {
  const colors = useTheme();
  const profileStore = useProfileStore.getState();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`rounded-xl p-6 ${colors.current.background2} border ${colors.current.borderColor}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-transparent flex items-center justify-center text-2xl font-bold text-white">
              <img src={"/icon.png"} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${colors.current.foreground}`}>
                {Config.NAME}
              </h2>
              <p className={`text-sm ${colors.current.foreground2}`}>
                Version 1.0.0
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colors.current.buttonColor} ${colors.current.buttonHover} ${colors.current.foreground} transition-colors`}
          >
            <LogOut size={18} />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-2xl p-8 w-[400px] ${colors.current.background2} border ${colors.current.borderColor} text-center shadow-xl`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${colors.current.foreground}`}
              >
                Confirm Logout
              </h2>
              <p className={`text-sm mb-6 ${colors.current.foreground2}`}>
                Are you sure you want to log out of {Config.NAME}?
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 rounded-lg ${colors.current.buttonColor} ${colors.current.foreground} transition-colors`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowModal(false);
                    profileStore.logout();
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  Log Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
