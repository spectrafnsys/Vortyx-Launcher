import { Config } from "@/app/config/config";
import { useTheme } from "@/app/utils/hooks/theme";
import { FolderOpen, Sparkles } from "lucide-react";

export function EmptyState() {
  const colors = useTheme();
  return (
    <div className="flex flex-col hide-scroll items-center justify-center h-full text-center px-4">
      <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-stone-300 bg-clip-text">
        No Builds Found <small className="text-xs text-gray-600">(^_^メ)</small>
      </h3>

      <p className="text-stone-400 mb-8 max-w-md text-base leading-relaxed">
        We couldn't find any builds. Click the{" "}
        <span className={`font-medium ${colors.current.foreground2}`}>
          "Import"
        </span>{" "}
        button nelow to add your {Config.NAME} build and get started.
      </p>
    </div>
  );
}

export default EmptyState;
