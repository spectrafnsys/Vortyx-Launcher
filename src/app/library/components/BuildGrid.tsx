import { Config } from "@/app/config/config";
import { BuildCard } from "./BuildCard";

interface BuildGridProps {
  builds: [string, any][];
  options: string | null;
  setOptions: (path: string | null) => void;
  handleDeleteBuild: (path: string) => void;
  setImportedBuilds: any;
}

export function BuildGrid({
  builds,
  options,
  setOptions,
  handleDeleteBuild,
  setImportedBuilds,
}: BuildGridProps) {
  const currentVersion = Config.CURRENT_VERSION;
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-max">
      {builds
        .sort(([, a], [, b]) =>
          a.version === currentVersion
            ? -1
            : b.version === currentVersion
            ? 1
            : 0
        )
        .map(([path, build]) => (
          <BuildCard
            key={path}
            path={path}
            build={build}
            options={options}
            setOptions={setOptions}
            handleDeleteBuild={handleDeleteBuild}
            isPublicBuild={build.season === currentVersion}
            setImportedBuilds={setImportedBuilds}
          />
        ))}
    </div>
  );
}
