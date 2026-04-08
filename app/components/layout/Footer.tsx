// components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* ── Top section: Newsletter + Links ── */}
      <div className="bg-[#ECEEF0] px-16 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-[#2D3A5C] font-semibold text-lg mb-4">
              Be First to Taste What's New
            </h3>
            <p className="text-[#2D3A5C] text-sm leading-relaxed mb-8">
              Be part of our cake-loving community! Sign up for sweet updates on
              our newest bakes, seasonal specials, and more.
            </p>
            {/* Email input */}
            <div className="flex items-center border border-[#2D3A5C] rounded-sm px-4 py-3">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent text-sm text-[#2D3A5C] 
                  placeholder-[#2D3A5C]/60 outline-none"
              />
              <button className="text-[#2D3A5C] hover:opacity-70 ml-2">
                →
              </button>
            </div>
          </div>

          {/* Everything You're Looking For */}
          <div>
            <h4 className="text-[#2D3A5C] font-semibold text-base mb-6">
              Everything You're Looking For
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Delivery", href: "/delivery" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#2D3A5C] text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What You Need to Know */}
          <div>
            <h4 className="text-[#2D3A5C] font-semibold text-base mb-6">
              What You Need to Know
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#2D3A5C] text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom section: Brand block ── */}
      <div className="bg-[#4f0d0d] px-16 py-14 flex flex-col items-center justify-center">
        {/* Tagline */}
        <p className="text-white/70 tracking-[0.3em] text-xs uppercase mb-3">
          CAKE &nbsp;|&nbsp; DESSERT &nbsp;|&nbsp; CAFE
        </p>

        {/* Brand name */}
        <h2 className="text-white text-5xl font-bold tracking-widest mb-3">
          DOUCEUR PATISSERIE
        </h2>

        {/* French tagline — "Welcome to Douceur" */}
        <p className="text-white/80 text-xl tracking-widest">
          Bienvenue chez Douceur
        </p>
      </div>

      {/* ── Copyright bar ── */}
      <div
        className="bg-[#4f0d0d] px-16 py-5
        flex items-center justify-between"
      >
        <p className="text-white/60 text-xs">
          © {new Date().getFullYear()}, Douceur Patisserie. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {/* Facebook */}
          <Link
            href="#"
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </Link>

          {/* Instagram */}
          <Link
            href="#"
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
