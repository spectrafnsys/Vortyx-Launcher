import { Header } from "./components/HomeHeader";
import { BuildSection } from "./components/sections/build";
import { NewsSection } from "./components/sections/news";
import { SmallShop } from "./components/sections/shop";

export function Home() {
  return (
    <main>
      <Header />
      <main className="mt-12">
        <BuildSection />
        <div className="flex flex-row gap-1 items-center justify-start">
          <div className="mt-4 max-w-[250px] w-[250px] ml-4">
            <SmallShop />
          </div>
          <div className="mt-4 max-w-[750px] min-w-[250px] ml-4">
            <NewsSection />
          </div>
        </div>
      </main>
    </main>
  );
}
