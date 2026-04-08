// app/(main)/checkout/page.tsx
"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BRAND = "#4f0d0d";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    state: "",
    // Mock card fields
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate payment processing delay
    await new Promise((res) => setTimeout(res, 2000));

    // Save mock order to localStorage for demo
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      total: totalPrice(),
      date: new Date().toISOString(),
      status: "Confirmed",
      address: form,
    };
    const existing = JSON.parse(localStorage.getItem("mock-orders") || "[]");
    localStorage.setItem("mock-orders", JSON.stringify([order, ...existing]));

    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <main
        className="min-h-screen flex items-center justify-center mt-[72px]"
        style={{ backgroundColor: "#fdf5f5" }}
      >
        <div className="text-center">
          <p className="text-gray-500 mb-4">No items in cart.</p>
          <Link
            href="/collections"
            className="px-6 py-3 rounded-full text-white text-sm"
            style={{ backgroundColor: BRAND }}
          >
            Browse Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen pt-[50px]"
      style={{ backgroundColor: "#fdf5f5" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-8" style={{ color: BRAND }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ── Left: Form ── */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact info */}
            <div
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: "#f0dada" }}
            >
              <h2 className="font-semibold mb-4" style={{ color: BRAND }}>
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { field: "firstName", placeholder: "First name" },
                  { field: "lastName", placeholder: "Last name" },
                ].map(({ field, placeholder }) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={placeholder}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => update(field, e.target.value)}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                ))}
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="col-span-2 border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND)}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="col-span-2 border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND)}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            {/* Delivery address */}
            <div
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: "#f0dada" }}
            >
              <h2 className="font-semibold mb-4" style={{ color: BRAND }}>
                Delivery Address
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street address"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND)}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={form.postcode}
                    onChange={(e) => update("postcode", e.target.value)}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>
            </div>

            {/* Mock payment */}
            <div
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: "#f0dada" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold" style={{ color: BRAND }}>
                  Payment
                </h2>
                <div
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs
                  bg-green-50 text-green-600 border border-green-100"
                >
                  <span>🔒</span> Secure (Demo)
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card number  1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) => update("cardNumber", e.target.value)}
                  maxLength={19}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND)}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={form.cardExpiry}
                    onChange={(e) => update("cardExpiry", e.target.value)}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={form.cardCvc}
                    onChange={(e) => update("cardCvc", e.target.value)}
                    maxLength={3}
                    className="border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              {/* Demo notice */}
              <p className="text-xs text-gray-400 mt-3">
                ⓘ This is a demo — no real payment will be processed.
              </p>
            </div>
          </div>

          {/* ── Right: Summary ── */}
          <div className="space-y-4">
            <div
              className="bg-white rounded-2xl border p-6 sticky top-24"
              style={{ borderColor: "#f0dada" }}
            >
              <h2 className="font-semibold mb-4" style={{ color: BRAND }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-700">
                      RM{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="border-t pt-3 mb-6"
                style={{ borderColor: "#f0dada" }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span>RM{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-green-600 text-xs font-medium">
                    Free
                  </span>
                </div>
                <div
                  className="flex justify-between font-semibold mt-2 pt-2
                  border-t"
                  style={{ borderColor: "#f0dada" }}
                >
                  <span style={{ color: BRAND }}>Total</span>
                  <span style={{ color: BRAND }}>
                    RM{totalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-semibold text-sm
                  tracking-wide transition-all hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: BRAND }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="w-4 h-4 border-2 border-white/30 border-t-white
                      rounded-full animate-spin"
                    />
                    Processing...
                  </span>
                ) : (
                  `Pay RM${totalPrice().toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
