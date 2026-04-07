"use client";

import {
  Folder,
  Loader2,
  Lock,
  Play,
  Trash2,
  MoreVertical,
  Pause,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openPath } from "@tauri-apps/plugin-opener";
import { useState } from "react";
import { SeasonInfo } from "@/app/utils/Season";
import { useTheme } from "@/app/utils/hooks/theme";
import { LIBRARY_KEY, useLibraryStore } from "@/app/packages/zustand/library";
import { Build } from "@/app/utils/types/library";
import { start } from "@/app/utils/build/launch";
import { exit } from "@/app/utils/build/close";

interface Item {
  path: string;
  build: any;
  options: string | null;
  setOptions: (path: string | null) => void;
  handleDeleteBuild: (path: string) => void;
  isPublicBuild: boolean;
  setImportedBuilds: any;
}

export function BuildCard({
  path,
  build,
  options,
  setOptions,
  handleDeleteBuild,
  isPublicBuild,
  setImportedBuilds,
}: Item) {
  const majorVersion = build.version.split(".")[0];
  const imageUrl = SeasonInfo(majorVersion).image;
  const [hover, setHover] = useState(false);

  const handleOpen = async () => {
    await openPath(build.path);
  };

  async function Launch() {
    if (!isPublicBuild) return;
    if (build.open) {
      const result = await exit(path);
      if (result) {
        setImportedBuilds((prev: any) => {
          const updated = prev.map(([p, b]: any) =>
            p === path ? [p, { ...b, open: false }] : [p, b]
          );
          localStorage.setItem(LIBRARY_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } else {
      const result = await start(path);
      if (result) {
        setImportedBuilds((prev: any) => {
          const updated = prev.map(([p, b]: any) =>
            p === path ? [p, { ...b, open: true }] : [p, b]
          );
          localStorage.setItem(LIBRARY_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    }
  }

  const BuildState = useLibraryStore.getState();
  const currentBuild: Build | undefined = BuildState.entries.get(path);
  const colors = useTheme();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative ${colors.current.background2} border z-5 border-zinc-800 rounded-lg overflow-hidden transition-colors hover:border-zinc-700`}
    >
      <div className="relative w-full h-48 overflow-hidden bg-zinc-950">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`Build ${build.version}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />

        <AnimatePresence>
          {(hover || currentBuild?.open) && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 z-20"
              >
                <button
                  onClick={() => setOptions(options === path ? null : path)}
                  className="p-1.5 bg-zinc-950/90 cursor-pointer hover:bg-zinc-900 rounded-md transition-colors border border-zinc-800"
                  aria-label="Options"
                >
                  <MoreVertical size={16} className="text-zinc-400" />
                </button>

                <AnimatePresence>
                  {options === path && hover && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 z-10 mt-1 w-36 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl overflow-hidden"
                    >
                      <button
                        onClick={() => handleOpen()}
                        className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <Folder size={15} />
                        <span>Open Folder</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBuild(path)}
                        className="w-full flex items-center cursor-pointer gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  onClick={Launch}
                  disabled={build.loading}
                  className={`flex items-center gap-2 px-4 py-4 rounded-full text-sm font-medium transition-all duration-150 ${
                    build.loading
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : !isPublicBuild
                      ? "bg-red-800 text-white cursor-not-allowed"
                      : build.open
                      ? "bg-red-600 cursor-pointer hover:bg-red-700 text-white shadow-lg"
                      : "bg-white cursor-pointer hover:bg-zinc-300 text-zinc-900 shadow-lg"
                  }`}
                >
                  {!isPublicBuild ? (
                    <>
                      <Lock size={20} />
                    </>
                  ) : build.loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                    </>
                  ) : build.open ? (
                    <>
                      <Pause size={20} />
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                    </>
                  )}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-white mb-0.5">
          {build.season}
        </h3>
        <p className="text-xs text-zinc-500 font-mono">
          Fortnite++Release+{build.version}
        </p>
      </div>
    </div>
  );
}
