"use client";

import { Minus, X } from "lucide-react";

import { useTheme } from "../utils/hooks/theme";
import { Window } from "@tauri-apps/api/window";

const window = new Window("main");

export function Titlebar({ loggedIn }: { loggedIn: boolean }) {
  const colors = useTheme();
  return (
    <main
      className={`w-full h-12 pb-2 ${
        loggedIn ? "border-b" : ""
      } gap-1 px-2 pt-2 top-0 absolute z-1 flex items-center justify-end ${
        colors.current.borderColor
      }`}
      data-tauri-drag-region
    >
      <Button onClick={() => window.minimize()} Icon={Minus} />
      <Button onClick={() => window.close()} Icon={X} />
    </main>
  );
}

export function Button({
  Icon,
  onClick,
}: {
  Icon: React.ComponentType<{ size: number }>;
  onClick?: () => void;
}) {
  const colors = useTheme();
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center w-9 h-9 text-center
        rounded-md p-2
        ${colors.current.foreground}
        bg-transparent ${colors.current.buttonHover}
        hover:text-white
        transition-all duration-200
        cursor-pointer
        `}
    >
      <Icon size={18} />
    </div>
  );
}
