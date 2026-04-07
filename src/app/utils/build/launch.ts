"use client";

import { invoke } from "@tauri-apps/api/core";
import { sendNotification } from "@tauri-apps/plugin-notification";

import { useProfileStore } from "@/app/packages/zustand/profile";
import { Window } from "@tauri-apps/api/window";
import { useConfigStore } from "@/app/packages/zustand/configs";
import { useLibraryStore } from "@/app/packages/zustand/library";
import { Build } from "../types/library";
import { Config } from "@/app/config/config";

const window = new Window("Main");

const parseBoolean = (value: string | undefined): boolean => value === "true";

const lib = useLibraryStore.getState();
const { email, password, validSession } = useProfileStore.getState();
const { minimizeOnLaunch } = useConfigStore.getState();

export const start = async (buildPath: string): Promise<boolean> => {
  const build: Build | undefined = lib.entries.get(buildPath);

  if (!build) {
    console.warn(`[Launch Failed] No build found at path: ${buildPath}`);
    return false;
  }

  if (!validSession) {
    console.warn(`[Launch Blocked] User is not authenticated.`);
    return false;
  }

  try {
    const normalizedPath = buildPath.replace("/", "\\");
    const executable = `${normalizedPath}\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe`;

    const fileExists = await invoke<boolean>("exists", {
      path: executable,
    });

    if (!fileExists) {
      console.warn(
        `[Invalid Build] Executable missing for version ${build.version}`
      );
      return false;
    }

    await invoke("launch", {
      filePath: executable,
      email,
      password,
      redirectLink: Config.REDIRECT_DOWNLOAD,
      backend: Config.BACKEND_STRING,
      useBackendParam: parseBoolean(Config.USE_BACKEND_PARAM) || false,
      injectExtraDlls: parseBoolean(Config.DOWNLOAD_OTHER_DLLS)  || false,
      extraDllLinks: Config.DOWNLOAD_OTHER_DLLS_LINK,
    });

    lib.patch(build.version, { open: true });

    if (minimizeOnLaunch) {
      window.minimize();
    }

    sendNotification({
      title: "Starting!",
      body: `${Config.NAME} is now launching. Enjoy your experience!`,
    });

    return true;
  } catch (err) {
    console.error(`[Launch Error]`, err);
    return false;
  }
};
