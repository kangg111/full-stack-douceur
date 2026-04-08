import Hero from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
    </main>
  );
}
