// app/(main)/our-locations/LocationCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/app/types";

const BRAND = "#4f0d0d";
const BRAND_BORDER = "#f0dada";

// ── Icons ──
function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 mt-0.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372
        c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293
        c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21
        l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5
        A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
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
  );
}

export default function LocationCard({
  location: loc,
}: {
  location: Location;
}) {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row
        transition-shadow hover:shadow-lg"
      style={{
        border: `1px solid ${BRAND_BORDER}`,
        boxShadow: "0 2px 16px rgba(79,13,13,0.06)",
      }}
    >
      {/* ── Image ── */}
      <div className="relative w-full md:w-[42%] min-h-[280px] flex-shrink-0 overflow-hidden">
        <Image
          src={loc.image}
          alt={loc.fullName}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Gradient at bottom of image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
          }}
        />

        {/* Type badge — top left */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full
          text-xs font-medium text-white backdrop-blur-sm"
          style={{ backgroundColor: `${BRAND}CC` }}
        >
          {loc.type}
        </div>

        {/* Index — bottom left */}
        <div className="absolute bottom-4 left-4">
          <span className="text-5xl font-light text-white/20 leading-none select-none">
            {loc.index}
          </span>
        </div>
      </div>

      {/* ── Info panel ── */}
      <div className="flex flex-col justify-between p-8 flex-1">
        <div>
          {/* Name */}
          <h2
            className="text-xl font-semibold mb-5 leading-tight"
            style={{ color: BRAND }}
          >
            {loc.fullName}
          </h2>

          {/* Info rows */}
          <div className="space-y-4 mb-5">
            {/* Address */}
            <div className="flex items-start gap-3" style={{ color: BRAND }}>
              <PinIcon />
              <div>
                {loc.address.map((line) => (
                  <p
                    key={line}
                    className="text-sm text-gray-500 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
                <Link
                  href={loc.mapsUrl}
                  target="_blank"
                  className="text-xs mt-1.5 inline-flex items-center gap-1
                    font-medium hover:opacity-70 transition-opacity"
                  style={{ color: BRAND }}
                >
                  Get Directions
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3" style={{ color: BRAND }}>
              <PhoneIcon />
              <p className="text-sm text-gray-500">{loc.phone}</p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{ backgroundColor: BRAND_BORDER }}
          />

          {/* Opening hours */}
          <div className="space-y-2.5 mb-5">
            {loc.hours.map((h) => (
              <div key={h.label} className="flex items-center justify-between">
                <div
                  className="flex items-center gap-2"
                  style={{ color: BRAND }}
                >
                  <ClockIcon />
                  <span className="text-sm font-medium text-gray-700">
                    {h.label}
                  </span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  {h.time}
                </span>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {loc.features.map((feat) => (
              <span
                key={feat}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  color: BRAND,
                  backgroundColor: `${BRAND}0d`,
                  border: `1px solid ${BRAND}25`,
                }}
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={loc.orderHref}
          className="self-start inline-flex items-center gap-2 px-7 py-3
            rounded-full text-white text-sm font-medium tracking-wide
            transition-opacity hover:opacity-85"
          style={{ backgroundColor: BRAND }}
        >
          {loc.orderLabel}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}
