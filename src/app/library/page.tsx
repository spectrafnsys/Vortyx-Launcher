import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Loader2, Trash } from "lucide-react";
import { BuildGrid } from "./components/BuildGrid";
import EmptyState from "./components/EmptyState";
import { useTheme } from "../utils/hooks/theme";
import { useLibraryStore } from "../packages/zustand/library";
import { handleAddBuild } from "../utils/build/import";
import { LibraryConfig } from "../config/config";

export function Library() {
  const entries = useLibraryStore((state) => state.entries);
  const builds = Array.from(entries.entries());

  const wipe = useLibraryStore((state) => state.wipe);
  const remove = useLibraryStore((state) => state.delete);

  const [importing, setImporting] = useState(false);
  const [options, setOptions] = useState<string | null>(null);
  const [showConfirmWipe, setShowConfirmWipe] = useState(false);

  const colors = useTheme();

  function handleDeleteBuild(key: string) {
    remove(key);
  }

  function startImport() {
    try {
      setImporting(true);
      handleAddBuild().finally(() => setImporting(false));
    } catch (err) {
      console.error(err);
      setImporting(false);
    }
  }

  function confirmWipe() {
    wipe();
    setShowConfirmWipe(false);
  }

  return (
    <div className="h-full overflow-hidden">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col"
      >
        <div className="flex-shrink-0 px-8 pt-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                Library
              </h1>
              <p className="text-stone-400"></p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => startImport()}
                disabled={importing}
                className={`flex z-20 absolute bottom-8 right-8 ${colors.current.buttonColor} ${colors.current.buttonHover} cursor-pointer items-center gap-2 px-2.5 py-2.5 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-black/20 hover:shadow-black/40`}
              >
                {importing ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </button>

              <button
                onClick={() => setShowConfirmWipe(true)}
                disabled={importing}
                className={`flex z-20 absolute bottom-8 right-20 ${colors.current.buttonColor} ${colors.current.buttonHover} cursor-pointer items-center gap-2 px-2.5 py-2.5 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-black/20 hover:shadow-black/40`}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
          <div className={`h-px via-stone-700/50 `} />
        </div>

        <div className="flex-1 min-h-0 px-8 pb-12 overflow-y-auto overflow-x-hidden">
          {builds.length === 0 ? (
            <EmptyState />
          ) : (
            <BuildGrid
              builds={builds}
              options={options}
              setOptions={setOptions}
              handleDeleteBuild={handleDeleteBuild}
              setImportedBuilds={builds}
            />
          )}
        </div>

        <div className="px-4 py-2 bg-transparent rounded-lg backdrop-blur-sm">
          <p className="text-sm text-stone-300 font-medium">
            {entries.size} {entries.size === 1 ? "Build" : "Builds"}
          </p>
        </div>
      </motion.main>

      <AnimatePresence>
        {showConfirmWipe && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                className={`text-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto space-y-4 ${colors.current.background2}`}
              >
                <h2 className="text-lg font-semibold">Confirm Wipe</h2>
                <p className="text-stone-300 text-sm">
                  Are you sure you want to delete{" "}
                  <strong>all your builds</strong>? This action cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowConfirmWipe(false)}
                    className={`px-4 py-2 rounded-md cursor-pointer transition-all text-white text-sm ${colors.current.buttonColor} ${colors.current.buttonHover}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmWipe}
                    className="px-4 py-2 rounded-md cursor-pointer transition-all bg-red-600 hover:bg-red-800 text-white text-sm font-semibold"
                  >
                    Yes, Wipe All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
