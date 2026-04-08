// components/home/FeaturedProducts.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductImagePaths } from "@/lib/product-image";
import type { Product } from "@/app/types";

const BRAND = "#4f0d0d";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data.slice(0, 3)); // only first 3
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: `${BRAND}80` }}
            >
              Our Menu
            </p>
            <h2 className="text-3xl font-semibold" style={{ color: BRAND }}>
              Monthly Bestsellers
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-sm font-medium hover:opacity-70 transition-opacity
              flex items-center gap-1"
            style={{ color: BRAND }}
          >
            View all
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
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

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
              style={{ borderTopColor: BRAND }}
            />
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

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
    return [`${base}Slide${ext}`, `${base}2${ext}`];
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
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={imageSrc[imgIndex]}
            alt={product.name}
            onError={() => {
              if (imgIndex < imageSrc.length - 1) setImgIndex(imgIndex + 1);
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 0 : 1 }}
          />
          <img
            src={hoverImageSrc[hoverIndex]}
            alt={`${product.name} hover`}
            onError={() => {
              if (hoverIndex < hoverImageSrc.length - 1)
                setHoverIndex(hoverIndex + 1);
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {/* Tag */}
          {product.tagline && (
            <span
              className="absolute top-3 left-3 px-3 py-1 rounded-full
                text-xs font-medium text-white"
              style={{ backgroundColor: BRAND }}
            >
              {product.tagline}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-0.5">
              {product.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: BRAND }}>
              RM{product.price.toFixed(2)}
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center
              transition-colors"
            style={{ backgroundColor: `${BRAND}10`, color: BRAND }}
          >
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
          </div>
        </div>
      </div>
    </Link>
  );
}
