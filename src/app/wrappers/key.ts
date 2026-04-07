import { RI } from "@/app/core";
import { sendNotification } from "@tauri-apps/plugin-notification";

const runtime = new RI();

export async function requireValidKey() {
  try {
    const status = await runtime.init();
    if (status !== "valid") {
      sendNotification({
        title: "Launcher Error",
        body: "You must have a valid license key to import builds.",
      });
      throw new Error("Invalid license key");
    }
  } catch (err) {
    sendNotification({
      title: "Launcher Error",
      body: "License check failed: " + (err as Error).message,
    });
    throw err;
  }
}
