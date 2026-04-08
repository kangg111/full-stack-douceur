// components/home/PromoBanner.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const BRAND = "#4f0d0d";
const BRAND_PALE = "#fdf5f5";

const promos = [
  {
    eyebrow: "Come Say Hello",
    title: "Visit Us",
    description:
      "Planning to visit? Check out our operating hours and drop by any of our locations.",
    button: { label: "Our Locations", href: "/our-locations" },
    image: "/images/visit.jpg",
    flip: false,
  },
  {
    eyebrow: "For Events & Gifting",
    title: "Bulk Orders",
    description:
      "Planning for a corporate event or celebration? Fill out our form to get started.",
    button: { label: "Submit the Form", href: "/contact" },
    image: "/images/bulk.jpg",
    flip: true,
  },
];

export default function PromoBanner() {
  return (
    <>
      {/* ── Promo rows ── */}
      {promos.map((promo) => (
        <section
          key={promo.title}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
          style={{ backgroundColor: BRAND_PALE }}
        >
          {/* Text side */}
          <div
            className={`flex flex-col justify-center px-12 md:px-16 py-16
            ${promo.flip ? "md:order-2" : "md:order-1"}`}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: `${BRAND}70` }}
            >
              {promo.eyebrow}
            </p>
            <h2
              className="text-4xl font-semibold mb-4 leading-tight"
              style={{ color: BRAND }}
            >
              {promo.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              {promo.description}
            </p>
            <Link
              href={promo.button.href}
              className="self-start inline-flex items-center gap-2 px-7 py-3.5
                rounded-full text-white text-sm font-medium tracking-wide
                transition-opacity hover:opacity-85"
              style={{ backgroundColor: BRAND }}
            >
              {promo.button.label}
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

          {/* Image side */}
          <div
            className={`relative min-h-[320px] overflow-hidden
            ${promo.flip ? "md:order-1" : "md:order-2"}`}
          >
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${BRAND}20, transparent)`,
              }}
            />
          </div>
        </section>
      ))}

      {/* ── CTA Strip ── */}
      <section
        className="px-6 md:px-12 py-16"
        style={{ backgroundColor: BRAND_PALE }}
      >
        <div
          className="max-w-5xl mx-auto rounded-3xl px-10 py-12 flex flex-col
          md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: BRAND }}
        >
          <div>
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">
              We're Here to Help
            </p>
            <h3 className="text-white text-2xl font-semibold mb-1">
              Got Questions?
            </h3>
            <p className="text-white/60 text-sm">
              Got questions about our cakes or your order? We're here to help!
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5
              rounded-full text-sm font-semibold tracking-wide transition-all
              bg-white hover:gap-3"
            style={{ color: BRAND }}
          >
            Contact Us
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
    </>
  );
}
