// app/(auth)/PolicyModal.tsx
"use client";

import { useEffect } from "react";
import type { PolicyContent, Props } from "../../types";

const BRAND = "#4f0d0d";

export const TERMS_CONTENT = {
  title: "Terms of Service",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      body: "By accessing and using Douceur Patisserie's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    },
    {
      heading: "2. Orders & Pre-Orders",
      body: "All orders are subject to availability. Pre-orders require a minimum lead time as specified on each product page. We reserve the right to cancel any order if we are unable to fulfil it, and a full refund will be issued.",
    },
    {
      heading: "3. Pricing & Payment",
      body: "All prices are listed in Malaysian Ringgit (RM) and include applicable taxes. We reserve the right to change prices at any time without prior notice. Payment must be completed before your order is confirmed.",
    },
    {
      heading: "4. Delivery & Collection",
      body: "Delivery is available within Klang Valley. Delivery times are estimates and may vary due to traffic or weather conditions. We are not liable for delays caused by circumstances beyond our control.",
    },
    {
      heading: "5. Cancellations & Refunds",
      body: "Orders cancelled more than 48 hours before the collection or delivery date are eligible for a full refund. Cancellations within 48 hours may be subject to a cancellation fee. Custom and personalised orders are non-refundable.",
    },
    {
      heading: "6. Product Quality",
      body: "Our products are made fresh to order. We recommend consuming them within the timeframe stated on the product packaging. We are not responsible for products that are not stored correctly after delivery.",
    },
    {
      heading: "7. Limitation of Liability",
      body: "Douceur Patisserie shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services beyond the value of the order placed.",
    },
    {
      heading: "8. Changes to Terms",
      body: "We reserve the right to update these Terms of Service at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.",
    },
  ],
};

export const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "1. Information We Collect",
      body: "We collect information you provide directly, including your name, email address, phone number, delivery address, and payment details when you place an order or create an account.",
    },
    {
      heading: "2. How We Use Your Information",
      body: "Your information is used to process orders, send order confirmations and updates, provide customer support, send marketing communications (with your consent), and improve our services.",
    },
    {
      heading: "3. Information Sharing",
      body: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.",
    },
    {
      heading: "4. Data Security",
      body: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      heading: "5. Cookies",
      body: "Our website uses cookies to enhance your browsing experience, analyse site traffic, and personalise content. You can control cookie settings through your browser preferences.",
    },
    {
      heading: "6. Email Communications",
      body: "With your consent, we may send you promotional emails about new products, special offers, and events. You can unsubscribe at any time by clicking the unsubscribe link in any email.",
    },
    {
      heading: "7. Your Rights",
      body: "You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at privacy@douceur.com.my.",
    },
    {
      heading: "8. Contact Us",
      body: "If you have any questions about this Privacy Policy, please contact us at privacy@douceur.com.my or visit any of our outlets.",
    },
  ],
};

export default function PolicyModal({ content, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh]
          flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b"
          style={{ borderColor: "#f0dada" }}
        >
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: `${BRAND}60` }}
            >
              Douceur Patisserie
            </p>
            <h2 className="text-xl font-semibold" style={{ color: BRAND }}>
              {content.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center
              text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-8 py-6 flex-1">
          <div className="space-y-6">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: BRAND }}
                >
                  {section.heading}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-300 mt-8 text-center">
            Last updated: January 2026
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t" style={{ borderColor: "#f0dada" }}>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-white text-sm font-medium
              transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
