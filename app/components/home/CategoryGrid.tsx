// components/home/CategoryGrid.tsx
import { Truck, ChefHat, Star, Award } from "lucide-react";

const BRAND = "#4f0d0d";

const highlights = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "Within KL & Selangor*",
  },
  {
    icon: ChefHat,
    title: "Made Fresh to Order",
    subtitle: "Every single time",
  },
  {
    icon: Star,
    title: "500,000+ Cakes",
    subtitle: "Delivered and counting",
  },
  {
    icon: Award,
    title: "Award-Winning Chef",
    subtitle: "Asian Pastry Cup 2016",
  },
];

export default function CategoryGrid() {
  return (
    <section
      className="py-14 px-6 md:px-12"
      style={{ backgroundColor: "#fdf5f5" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl
                bg-white border transition-shadow hover:shadow-md"
              style={{ borderColor: "#f0dada" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${BRAND}10` }}
              >
                <Icon className="w-5 h-5" style={{ color: BRAND }} />
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
