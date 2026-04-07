import { useLibraryStore } from "@/app/packages/zustand/library";
import { invoke } from "@tauri-apps/api/core";
import { Build } from "../types/library";

export const exit = async (path: string): Promise<boolean> => {
  await invoke("exit", {});
  const BuildState = useLibraryStore.getState();
  const selectedBuild: Build | undefined = BuildState.entries.get(path);
  if (!selectedBuild) {
    console.error("build not found in BuildState:", path);
    return false;
  }
  selectedBuild.open = false;
  BuildState.patch(path, selectedBuild);

  return true;
};
