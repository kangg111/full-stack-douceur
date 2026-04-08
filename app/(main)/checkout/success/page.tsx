// app/(main)/checkout/success/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const BRAND = "#4f0d0d";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <main
      className="min-h-screen flex items-center justify-center pt-[50px]"
      style={{ backgroundColor: "#fdf5f5" }}
    >
      <div
        className="bg-white rounded-3xl border p-12 max-w-md w-full mx-4 text-center"
        style={{ borderColor: "#f0dada" }}
      >
        {/* Success icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${BRAND}10` }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="none"
            stroke={BRAND}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2" style={{ color: BRAND }}>
          Order Confirmed!
        </h1>
        <p className="text-gray-400 text-sm mb-2">Thank you for your order.</p>
        {orderId && (
          <p
            className="text-xs font-mono bg-gray-50 px-3 py-2 rounded-lg
            inline-block mb-6"
            style={{ color: BRAND }}
          >
            {orderId}
          </p>
        )}
        <p className="text-gray-500 text-sm mb-8">
          We'll prepare your cake fresh and notify you when it's ready. 🎂
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/account"
            className="w-full py-3.5 rounded-2xl text-white font-medium text-sm
              transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            View My Orders
          </Link>
          <Link
            href="/collections"
            className="w-full py-3.5 rounded-2xl text-sm font-medium border
              transition-colors hover:bg-gray-50"
            style={{ borderColor: "#f0dada", color: BRAND }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
