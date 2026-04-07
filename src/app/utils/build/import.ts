"use client";

import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import { sendNotification } from "@tauri-apps/plugin-notification";
import { Config } from "@/app/config/config";
import { useLibraryStore } from "@/app/packages/zustand/library";
//import { requireValidKey } from "@/app/wrappers/key";

const buildStore = useLibraryStore.getState();

export interface Result {
  path: string;
  build: {
    path: string;
    splash?: string | null;
    open: boolean;
    enabled: boolean;
    version: string;
    season: string;
  };
  success: boolean;
}

const liveCertMap: Record<number, string> = {
  3870737: "2.4.2",
  3858292: "2.4",
  3847564: "2.3",
  3841827: "2.2",
  3825894: "2.1",
  3807424: "1.11",
  3790078: "1.10",
  3775276: "1.91",
  3757339: "1.9",
  3729133: "1.81",
  3724489: "1.8",
  3700114: "1.72",
  3541083: "1.2",
  3532353: "1.0",
};

let version = "Unknown";
let release = "Unknown";
let matched = false;

export const handleAddBuild = async (): Promise<Result | null> => {
  //await requireValidKey();
  try {
    const selected = await open({ directory: true, multiple: false });
    if (!selected) return null;

    const selectedPath = selected.toString();
    const splashPath = `${selectedPath}\\FortniteGame\\Content\\Splash\\Splash.bmp`;
    const exePath = `${selectedPath}\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe`;

    const splashExists = await invoke("exists", {
      path: splashPath,
    });

    const hexData = (await invoke("check_build", {
      path: exePath,
    })) as string[];

    for (const line of hexData) {
      const match = line.match(
        /\+\+Fortnite\+Release-(\d+\.\d+|Cert)-CL-(\d+)/
      );
      if (!match) continue;

      const [_, ver, cl] = match;

      if (!line.includes("Live") && !line.includes("Cert")) {
        version = ver.length === 2 ? ver + "0" : ver;
        release = `${version}-CL-${cl}`;
        matched = true;
        break;
      }

      const clNum = parseInt(cl);
      if (liveCertMap[clNum]) {
        version = liveCertMap[clNum];
        release = `${version}-CL-${cl}`;
        matched = true;
        break;
      }
    }

    const data = {
      path: selectedPath,
      splash: splashExists ? convertFileSrc(splashPath) : "no splash",
      season: version,
      version: release,
      enabled: true,
      open: false,
    };

    if (Config.ALLOW_ALL_VERSIONS == "false") {
      if (version !== Config.CURRENT_VERSION) {
        sendNotification({
          title: "Import Error",
          body: `Only builds that are version ${Config.CURRENT_VERSION} are supported.`,
        });
        return null;
      }
    }

    buildStore.add(selectedPath, data);
    console.log("Build added:", release, matched);
    return {
      path: selectedPath,
      build: data,
      success: matched && version === Config.CURRENT_VERSION,
    };
  } catch (err) {
    console.error("Failed to add build:", err);
    sendNotification({
      title: "Import | Error",
      body: `Failed to add build: ${err}`,
    });
    return null;
  }
};
