import { Config } from "@/app/config/config";
import { useTheme } from "@/app/utils/hooks/theme";
import { NewsItem } from "@/app/utils/types/news";
import axios from "axios";
import { useEffect, useState } from "react";

export function NewsSection() {
  const colors = useTheme();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const request = await axios.get(
          `${Config.BACKEND_URL}:${Config.BACKEND_PORT}/api/v1/launcher/news`
        );

        const res: NewsItem[] = request.data;
        setNews(res);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    getNews();
  }, []);

  const latestNews = news[0];
  const gradientFrom =
    colors.current.gradientFrom.match(/#[0-9a-fA-F]{6}/)?.[0] || "";

  if (!latestNews) {
    return (
      <div
        className={`relative h-[250px] max-w-[810px] min-w-[250px] w-[810px] rounded-xl shadow-lg flex flex-col justify-center items-start text-white p-6 bg-gradient-to-br from-stone-900 to-stone-950`}
      >
        <div className="relative z-20 max-w-[600px]">
          <p className="text-xs">0/0/0</p>
          <p className="text-lg">News not found</p>
          <p className="text-sm mt-1">
            Make sure you have your external api/proper url and port setup in
            .env!
          </p>
          <small>Written by: Pablo</small>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-[250px] max-w-[810px] min-w-[250px] bg-cover overflow-hidden bg-center rounded-xl shadow-lg flex flex-col justify-center items-start text-white p-6`}
      style={{
        backgroundImage: `url(${latestNews.about.image})`,
        width: `${latestNews.body.width}px`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 w-full h-full z-10" />
      <div className="relative z-20 max-w-[600px]">
        <p className="text-xs">{latestNews.about.date}</p>
        <p className="text-lg">{latestNews.body.title}</p>
        <p className="text-sm mt-1">{latestNews.body.message}</p>
        <small>Written by: {latestNews.about.author}</small>
      </div>
    </div>
  );
}
