"use client";

import { Home, LayoutGrid, Settings, ShoppingCart } from "lucide-react";
import { useTheme } from "@/app/utils/hooks/theme";
import { View } from "@/app/utils/types/views";

export function Sidebar({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  const colors = useTheme();

  return (
    <main
      className={`flex flex-col h-full max-w-22 py-4 z-10 px-4 min-w-16 items-center justify-between relative ${colors.current.background2} ${colors.current.foreground2}`}
    >
      <img src={`/icon.png`} className="h-15" />

      <div className="flex-grow" />

      <div className="relative flex flex-col items-center gap-[3px] mb-[3px]">
        <Button
          isActive={view === "home"}
          onClick={() => setView("home")}
          Icon={Home}
        />
        <Button
          isActive={view === "library"}
          onClick={() => setView("library")}
          Icon={LayoutGrid}
        />
        <Button
          isActive={view === "shop"}
          onClick={() => setView("shop")}
          Icon={ShoppingCart}
        />
      </div>

      <div className="flex-grow" />
      <div className="relative">
        <Button
          isActive={view === "settings"}
          onClick={() => setView("settings")}
          Icon={Settings}
        />
      </div>
    </main>
  );
}

function Button({
  Icon,
  onClick,
  isActive = false,
}: {
  Icon: React.ComponentType<{ size: number }>;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const colors = useTheme();

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center w-16 min-h-10 text-center
        rounded-md p-2
        transition-all duration-200
        cursor-pointer
        hover:text-white
        ${colors.current.buttonHover}
        ${isActive ? colors.current.buttonActive : ""}
        ${isActive ? "text-white" : colors.current.foreground2}
      `}
    >
      <Icon size={22} />
    </div>
  );
}
