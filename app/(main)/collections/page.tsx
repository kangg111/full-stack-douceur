// app/(main)/collections/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductImagePaths } from "@/lib/product-image";
import type { Product, Category } from "@/app/types";

const BRAND = "#4f0d0d";
const BRAND_PALE = "#fdf5f5";
const BRAND_BORDER = "#f0dada";

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // ── Fetch products + categories ──
  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      // fetch("/api/categories").then((r) => r.json()),
    ]).then(([productsData]) => {
      setProducts(productsData);
      // setCategories(categoriesData);
      setLoading(false);
    });
  }, []);

  // ── Filter by category ──
  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category.slug === activeCategory);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative h-72 w-full pt-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/collection-hero.jpg')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${BRAND}80 0%, ${BRAND}40 50%, ${BRAND}80 100%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-3">
            Douceur Patisserie
          </p>
          <h1 className="text-white text-5xl font-light tracking-wide">
            Our Collection
          </h1>
        </div>
      </section>

      <main style={{ backgroundColor: BRAND_PALE }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* ── Category filter tabs ── */}
          {!loading && categories.length > 0 && (
            <div className="flex items-center gap-3 mb-10 flex-wrap">
              {/* All tab */}
              <button
                onClick={() => setActiveCategory("all")}
                className="px-5 py-2 rounded-full text-sm font-medium
                  transition-all border"
                style={{
                  backgroundColor: activeCategory === "all" ? BRAND : "white",
                  color: activeCategory === "all" ? "white" : BRAND,
                  borderColor: activeCategory === "all" ? BRAND : BRAND_BORDER,
                }}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className="px-5 py-2 rounded-full text-sm font-medium
                    transition-all border"
                  style={{
                    backgroundColor:
                      activeCategory === cat.slug ? BRAND : "white",
                    color: activeCategory === cat.slug ? "white" : BRAND,
                    borderColor:
                      activeCategory === cat.slug ? BRAND : BRAND_BORDER,
                  }}
                >
                  {cat.name}
                </button>
              ))}

              {/* Product count */}
              <span className="ml-auto text-xs text-gray-400">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* ── Loading state ── */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div
                className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
                style={{ borderTopColor: BRAND }}
              />
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center
                mx-auto mb-4"
                style={{ backgroundColor: `${BRAND}10` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke={BRAND}
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993
                    l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125
                    0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974
                    c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">
                No products found in this category.
              </p>
            </div>
          )}

          {/* ── Product grid ── */}
          {!loading && filtered.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              xl:grid-cols-4 gap-6"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ── Product Card ──
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  const imageSrc = getProductImagePaths(product.name);
  const hoverImageSrc = imageSrc.flatMap((img) => {
    const extMatch = img.match(/(\.\w+)$/);
    if (!extMatch) return [];

    const ext = extMatch[1];
    const base = img.replace(ext, "");

    return [
      `${base}Slide${ext}`, // CakeSlide.jpg
      `${base}2${ext}`, // Cake2.jpg
    ];
  });
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="bg-white rounded-2xl overflow-hidden border transition-all
        duration-300 hover:shadow-lg"
        style={{ borderColor: "#f0dada" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className="relative h-72 overflow-hidden">
          {/* Main image */}
          <img
            src={imageSrc[imgIndex]}
            alt={product.name}
            onError={() => {
              if (imgIndex < imageSrc.length - 1) {
                setImgIndex(imgIndex + 1);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 0 : 1 }}
          />

          {/* Hover image */}
          <img
            src={hoverImageSrc[hoverIndex]}
            alt={`${product.name} hover`}
            onError={() => {
              if (hoverIndex < hoverImageSrc.length - 1) {
                setHoverIndex(hoverIndex + 1);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
            {product.name}
          </h2>
          <p className="text-xs text-gray-400 mb-3 line-clamp-1">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: BRAND }}>
              RM{product.price.toFixed(2)}
            </p>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center
                text-white text-xs transition-opacity group-hover:opacity-100
                opacity-70"
              style={{ backgroundColor: BRAND }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
