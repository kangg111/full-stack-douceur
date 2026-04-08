// app/(main)/our-locations/page.tsx
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
// import FaqSection from "./FaqSection";
import LocationCard from "./LocationsCard";

// ── Fetch directly in server component ──
async function getLocations() {
  return await prisma.location.findMany({
    where: { isActive: true },
    include: {
      hours: { orderBy: { sortOrder: "asc" } },
      features: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
}

const BRAND = "#4f0d0d";

export const metadata = {
  title: "Our Locations — Douceur Patisserie",
};

// export default async function OurLocationsPage() {
//   const locations = await getLocations();

export default async function OurLocationsPage() {
  const locationsFromDB = await getLocations();

  // ✅ ADD THIS BLOCK
  const locations = locationsFromDB.map((loc, i) => ({
    index: String(i + 1).padStart(2, "0"),
    type: loc.type,
    name: loc.name,
    fullName: loc.name,
    address:
      typeof loc.address === "string"
        ? loc.address.split("\n") // split DB string into lines
        : loc.address,
    phone: loc.phone,

    hours: loc.hours.map((h) => ({
      label: h.label,
      time: h.time,
    })),

    features: loc.features.map((f) => f.label),

    orderLabel: loc.orderLabel,
    orderHref: loc.orderHref,
    mapsUrl: loc.mapsUrl ?? "", // ← add this
    image: loc.image,

    // UI-only fields (can remove if unused)
    accent: "#C58A5C",
    flip: i % 2 === 1,
  }));

  return (
    <main className="overflow-x-hidden" style={{ backgroundColor: "#fdf5f5" }}>
      {/* Hero */}
      <section className="relative h-64 md:h-72 w-full pt-[500px]">
        <Image
          src="/images/location-hero.jpg"
          alt="Our Locations"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${BRAND}99 0%, ${BRAND}40 50%, ${BRAND}90 100%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-3">
            Douceur Patisserie
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-wide">
            Our Locations
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-px bg-white/30" />
            <p className="text-white/50 text-xs tracking-widest">
              Kuala Lumpur · Selangor
            </p>
            <div className="w-8 h-px bg-white/30" />
          </div>
        </div>
      </section>

      {/* Location cards — from database */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {locations.map((loc) => (
            <LocationCard key={loc.index} location={loc} />
          ))}
        </div>
      </section>

      {/* Visit strip */}
      <section className="mx-4 md:mx-12 mb-16 max-w-5xl md:mx-auto">
        <div
          className="rounded-3xl px-8 md:px-10 py-10 flex flex-col md:flex-row
          items-center justify-between gap-6"
          style={{ backgroundColor: BRAND }}
        >
          <div className="text-center md:text-left">
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">
              Can't decide?
            </p>
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Visit any of our locations
            </h3>
            <p className="text-white/60 text-sm mt-1">
              All outlets serve fresh daily bakes and seasonal specials.
            </p>
          </div>
          <Link
            href="/collections"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5
              rounded-full text-sm font-semibold bg-white hover:gap-3 transition-all"
            style={{ color: BRAND }}
          >
            Browse Our Menu
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* <FaqSection /> */}
    </main>
  );
}
