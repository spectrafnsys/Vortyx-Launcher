type Config = {
  NAME: string;
  VERSION: string;
  BACKEND_URL: string;
  BACKEND_PORT: string;
  CURRENT_SEASON: string;
  CURRENT_VERSION: string;
  ALLOW_ALL_VERSIONS: string;
  REDIRECT_DOWNLOAD: string;
  PAKS_ENABLED: string;
  PAKS_LINK?: string;
  THEME: string;
  DISCORD_LINK: string;
  CLIENT_ID: any;
  CLIENT_SECRET: any;
  BACKEND_STRING: string;
  USE_BACKEND_PARAM: string;
  DOWNLOAD_OTHER_DLLS: string;
  DOWNLOAD_OTHER_DLLS_LINK: string;
  AUTH_KEY: string;
};

type Library = {
  KEY: string;
};

export const Config: Config = {
  NAME: process.env.NEXT_PUBLIC_LAUNCHER_NAME || "Unknown",
  VERSION: process.env.NEXT_PUBLIC_LAUNCHER_VERSION || "1.0.0",
  BACKEND_URL:
    process.env.NEXT_PUBLIC_LAUNCHER_BACKEND_URL || "http://127.0.0.1",
  BACKEND_PORT: process.env.NEXT_PUBLIC_LAUNCHER_BACKEND_PORT || "3551",
  CURRENT_SEASON: process.env.NEXT_PUBLIC_LAUNCHER_SEASON || "8",
  CURRENT_VERSION: process.env.NEXT_PUBLIC_LAUNCHER_VERSION || "8.51",
  ALLOW_ALL_VERSIONS:
    process.env.NEXT_PUBLIC_LAUNCHER_ALLOW_ALL_VERSIONS?.toLowerCase() ||
    "false",
  REDIRECT_DOWNLOAD: process.env.NEXT_PUBLIC_LAUNCHER_REDIRECT_DOWNLOAD || "",
  PAKS_ENABLED: process.env.NEXT_PUBLIC_LAUNCHER_PAKS_ENABLED || "false",
  PAKS_LINK: process.env.NEXT_PUBLIC_LAUNCHER_PAKS_LINK || "",
  THEME: process.env.NEXT_PUBLIC_LAUNCHER_THEME?.toLowerCase() || "default",
  DISCORD_LINK: process.env.NEXT_PUBLIC_LAUNCHER_DISCORD_LINK || "",
  CLIENT_ID: "secret",
  CLIENT_SECRET: "secret",
  BACKEND_STRING:
    process.env.NEXT_PUBLIC_LAUNCHER_BACKEND_FULL_URL?.toLowerCase() ||
    "default",
  USE_BACKEND_PARAM:
    process.env.NEXT_PUBLIC_LAUNCHER_USE_BACKEND_PARAMATER?.toLowerCase() ||
    "default",
  DOWNLOAD_OTHER_DLLS:
    process.env.NEXT_PUBLIC_LAUNCHER_DOWNLOAD_OTHER_DLLS?.toLowerCase() ||
    "default",
  DOWNLOAD_OTHER_DLLS_LINK:
    process.env.NEXT_PUBLIC_LAUNCHER_DOWNLOAD_OTHER_DLLS_LINK || "default",
  AUTH_KEY: process.env.NEXT_PUBLIC_LAUNCHER_AUTH_KEY || "",
};

export const LibraryConfig: Library = {
  KEY: "storage:library",
};
