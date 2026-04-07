import { Config } from "@/app/config/config";
import { SeasonInfo } from "@/app/utils/Season";
import { useTheme } from "@/app/utils/hooks/theme";

export function BuildSection() {
  const { readableSeason, description, image } = SeasonInfo(
    Config.CURRENT_SEASON
  );
  const colors = useTheme();

  const gradientFrom =
    colors.current.gradientFrom.match(/#[0-9a-fA-F]{6}/)?.[0] || "";

  return (
    <div
      className="relative h-[300px] bg-center bg-cover shadow-xl shadow-black/20 flex flex-col justify-center items-start text-white p-6"
      style={{
        backgroundImage: `url(${Config.BACKEND_URL}:${
          Config.BACKEND_PORT
        }/proxy?url=${encodeURIComponent(image)})`,
      }}
    >
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          background: `linear-gradient(to right, ${gradientFrom}, transparent)`,
        }}
      />
      <div className="relative z-20 max-w-[600px]">
        <p className="text-lg mb-2">{Config.NAME}</p>
        <h2 className="text-4xl font-bold mb-4">{readableSeason}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
}
