// components/layout/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound, ShoppingCart, X, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

const BRAND = "#4f0d0d";

const NAV_LINKS = [
  { href: "/collections", label: "Order Now" },
  { href: "/our-locations", label: "Locations" },
  { href: "/about-us", label: "About Douceur" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fetch session
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className="relative flex items-center justify-between px-6 md:px-8 py-4"
          style={{ backgroundColor: BRAND }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-wide text-white z-10"
          >
            Douceur
          </Link>

          {/* Center links — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <ul className="hidden md:flex items-center gap-8 text-md font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:underline underline-offset-4 font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right icons — desktop */}
          <ul className="hidden md:flex items-center gap-8 text-white">
            <li>
              <button
                onClick={() => router.push(isLoggedIn ? "/account" : "/auth")}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                <UserRound className="h-6 w-6" />
              </button>
            </li>
            <li className="relative">
              <Link
                href="/cart"
                className="hover:opacity-70 transition-opacity"
              >
                <ShoppingCart className="h-6 w-6" />
                {mounted && totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                      text-[10px] font-bold flex items-center justify-center
                      bg-white"
                    style={{ color: BRAND }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Right icons — mobile */}
          <div className="flex md:hidden items-center gap-5 text-white">
            {/* Cart */}
            <div className="relative">
              <Link
                href="/cart"
                className="hover:opacity-70 transition-opacity"
              >
                <ShoppingCart className="h-6 w-6" />
                {mounted && totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                      text-[10px] font-bold flex items-center justify-center bg-white"
                    style={{ color: BRAND }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col
          transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: BRAND }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-white text-xl font-semibold tracking-wide">
            Douceur
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white hover:bg-white/10
                px-4 py-3 rounded-xl font-medium text-base transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-6 pb-10 space-y-3 border-t border-white/10 pt-6">
          <button
            onClick={() => {
              setMobileOpen(false);
              router.push(isLoggedIn ? "/account" : "/auth");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
              text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
          >
            <UserRound className="h-5 w-5" />
            {isLoggedIn ? "My Account" : "Login / Register"}
          </button>

          <Link
            href="/cart"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
              text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            {mounted && totalItems > 0 && (
              <span
                className="ml-auto w-5 h-5 rounded-full text-[10px] font-bold
                  flex items-center justify-center bg-white"
                style={{ color: BRAND }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
