// app/(main)/cart/page.tsx
"use client";

import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import Link from "next/link";

const BRAND = "#4f0d0d";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0)
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#fdf5f5" }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${BRAND}10` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7"
              fill="none"
              stroke={BRAND}
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45
              1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0
              015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: BRAND }}>
            Your cart is empty
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Add some delicious cakes to get started.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
            text-white text-sm font-medium"
            style={{ backgroundColor: BRAND }}
          >
            Browse Collections →
          </Link>
        </div>
      </main>
    );

  return (
    <main
      className="min-h-screen pt-[50px]"
      style={{ backgroundColor: "#fdf5f5" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-8" style={{ color: BRAND }}>
          Your Cart
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ── Cart items ── */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border p-4 flex gap-4"
                style={{ borderColor: "#f0dada" }}
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-800 mb-1">{item.name}</p>
                  <p className="text-sm font-semibold" style={{ color: BRAND }}>
                    RM{item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity + remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-xs"
                  >
                    ✕ Remove
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center
                        text-sm hover:bg-gray-50"
                      style={{ borderColor: "#f0dada", color: BRAND }}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center
                        text-sm hover:bg-gray-50"
                      style={{ borderColor: "#f0dada", color: BRAND }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order summary ── */}
          <div
            className="bg-white rounded-2xl border p-6 h-fit"
            style={{ borderColor: "#f0dada" }}
          >
            <h2 className="font-semibold text-gray-800 mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-700 font-medium">
                    RM{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="border-t pt-4 mb-6"
              style={{ borderColor: "#f0dada" }}
            >
              <div className="flex justify-between font-semibold">
                <span style={{ color: BRAND }}>Total</span>
                <span style={{ color: BRAND }}>
                  RM{totalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full block text-center py-3.5 rounded-2xl text-white
                font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              Proceed to Checkout →
            </Link>

            <Link
              href="/collections"
              className="block text-center mt-3 text-xs underline underline-offset-2
                hover:opacity-70 transition-opacity"
              style={{ color: BRAND }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
