// components/home/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BRAND = "#4f0d0d";

const heroSlides = [
  {
    id: 1,
    layout: "single",
    image: "/images/CakeBanner.jpg",
    eyebrow: "New Arrival",
    heading: "Crafted with\nPassion",
    subheading: "French-inspired pastries, made fresh daily for you.",
    button: { label: "Order Now", href: "/collections" },
  },
  {
    id: 2,
    layout: "single",
    image: "/images/bulk.jpg",
    eyebrow: "Signature Collection",
    heading: "Made for\nEvery Moment",
    subheading: "Celebrate life's sweetest occasions with Douceur.",
    button: { label: "View Collection", href: "/collections" },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const changeSlide = (next: number) => {
    if (animating || next === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500
        ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          src={slide.image}
          alt={slide.heading}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay — brand color tinted */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${BRAND}CC 0%, ${BRAND}66 40%, transparent 100%)`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(253,245,245,0.8), transparent)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-white/60" />
          <p className="text-white/80 text-xs tracking-[0.4em] uppercase">
            {slide.eyebrow}
          </p>
        </div>

        {/* Heading */}
        <h1
          className="text-white text-5xl md:text-7xl font-light leading-tight mb-5
          max-w-xl"
        >
          {slide.heading.split("\n").map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>

        {/* Subheading */}
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-sm font-light">
          {slide.subheading}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href={slide.button.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full
              text-sm font-semibold tracking-wide transition-all
              hover:gap-3 bg-white"
            style={{ color: BRAND }}
          >
            {slide.button.label}
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
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              backgroundColor:
                i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() =>
          changeSlide(current === 0 ? heroSlides.length - 1 : current - 1)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10
          rounded-full border border-white/30 flex items-center justify-center
          text-white hover:bg-white/20 transition-all"
      >
        ‹
      </button>
      <button
        onClick={() => changeSlide((current + 1) % heroSlides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10
          rounded-full border border-white/30 flex items-center justify-center
          text-white hover:bg-white/20 transition-all"
      >
        ›
      </button>
    </section>
  );
}
