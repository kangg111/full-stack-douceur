// app/(main)/products/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/app/types";
import { getProductImagePaths } from "@/lib/product-image";

const BRAND = "#4f0d0d";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const [imgSrc, setImgSrc] = useState("");

  const paths = product ? getProductImagePaths(product.name) : [];
  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (product) {
      const paths = getProductImagePaths(product.name);
      setImgSrc(paths[0]); // try .jpg first
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imgSrc,
        slug: slug as string,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fdf5f5" }}
      >
        <div
          className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: BRAND }}
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );

  const primaryImage = "";
  // product.images.find((img) => img.isPrimary) ?? product.images[0];

  return (
    <main
      className="min-h-screen pt-[50px]"
      style={{ backgroundColor: "#fdf5f5" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:underline">
            Collections
          </Link>
          <span>/</span>
          <span style={{ color: BRAND }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ── Image ── */}
          <div
            className="rounded-3xl overflow-hidden border"
            style={{ borderColor: "#f0dada" }}
          >
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={product.name}
                width={600}
                height={600}
                priority
                className="w-full h-full object-cover"
                onError={() => {
                  const currentIndex = paths.indexOf(imgSrc);
                  const next = paths[currentIndex + 1];

                  if (next) {
                    setImgSrc(next);
                  }
                }}
              />
            )}
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col gap-5">
            {/* Name + price */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: `${BRAND}70` }}
              >
                {product.tagline}
              </p>
              <h1
                className="text-3xl font-semibold mb-2"
                style={{ color: BRAND }}
              >
                {product.name}
              </h1>
              <p className="text-2xl font-light" style={{ color: BRAND }}>
                RM{product.price.toFixed(2)}
              </p>
            </div>

            {/* Pre-order notice */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: `${BRAND}0d`, color: BRAND }}
            >
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pre-Order {product.preOrderDays} Days in Advance
            </div>

            {/* Description */}
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className={`${!expanded ? "line-clamp-2" : ""}`}>
                {product.descriptionFull}
              </p>

              {product.descriptionFull && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-1 font-medium underline underline-offset-2
        hover:opacity-70 transition-opacity"
                  style={{ color: BRAND }}
                >
                  {expanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="h-px" style={{ backgroundColor: "#f0dada" }} />

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: BRAND }}>
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full border flex items-center justify-center
                    text-lg transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#f0dada", color: BRAND }}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full border flex items-center justify-center
                    text-lg transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#f0dada", color: BRAND }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-2xl text-white font-semibold text-sm
                tracking-wide transition-all hover:opacity-90 active:scale-[0.99]"
              style={{ backgroundColor: added ? "#2d7a2d" : BRAND }}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>

            {/* View cart link */}
            {added && (
              <Link
                href="/cart"
                className="text-center text-sm underline underline-offset-2
                  hover:opacity-70 transition-opacity"
                style={{ color: BRAND }}
              >
                View Cart →
              </Link>
            )}

            {/* Specs */}
            <div
              className="rounded-2xl border p-5 space-y-2.5 text-sm"
              style={{ borderColor: "#f0dada", backgroundColor: "white" }}
            >
              {[
                { label: "Size", value: product.size },
                { label: "Serves", value: product.serves },
                { label: "Alcohol", value: product.alcoholIntensity },
                { label: "Suggested For", value: product.suggestedFor },
              ].map(
                (spec) =>
                  spec.value && (
                    <div key={spec.label} className="flex gap-2">
                      <span className="font-medium text-gray-700 w-24 flex-shrink-0">
                        {spec.label}
                      </span>
                      <span className="text-gray-500">{spec.value}</span>
                    </div>
                  ),
              )}
            </div>

            {/* Serving tip */}
            {product.servingTip && (
              <div
                className="rounded-2xl p-4 text-sm text-gray-600 leading-relaxed"
                style={{
                  backgroundColor: `${BRAND}08`,
                  borderLeft: `3px solid ${BRAND}40`,
                }}
              >
                💡 {product.servingTip}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
