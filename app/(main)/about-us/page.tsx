// app/(main)/about-us/page.tsx
import Image from "next/image";
import Link from "next/link";

const BRAND = "#4f0d0d";
const BRAND_PALE = "#fdf5f5";
const BRAND_BORDER = "#f0dada";

export default function AboutUsPage() {
  return (
    <main className="overflow-x-hidden" style={{ backgroundColor: BRAND_PALE }}>
      {/* ── 1. Hero Banner ── */}
      <section className="relative h-72 w-full pt-[500px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="About Douceur"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${BRAND}80 0%, ${BRAND}40 50%, ${BRAND}80 100%)`,
          }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center
          justify-center text-center px-6"
        >
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-3">
            Douceur Patisserie
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-wide">
            About Douceur
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-6 md:w-8 h-px bg-white/30" />
            <p className="text-white/50 text-xs tracking-widest">
              Passion · Craft · Excellence
            </p>
            <div className="w-6 md:w-8 h-px bg-white/30" />
          </div>
        </div>
      </section>

      {/* ── 2. Brand Story ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
        <div className="relative min-h-[280px] md:min-h-full">
          <Image
            src="/images/about-brand.jpg"
            alt="Douceur Patisserie"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(79,13,13,0.3), transparent 60%)",
            }}
          />
        </div>
        <div
          className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-16"
          style={{ backgroundColor: BRAND_PALE }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: `${BRAND}70` }}
          >
            Our Story
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-5"
            style={{ color: BRAND }}
          >
            Douceur
          </h2>
          <div
            className="w-10 h-0.5 mb-5"
            style={{ backgroundColor: `${BRAND}40` }}
          />
          <p className="leading-relaxed text-sm text-gray-600">
            Three good friends from Malaysia, equally enchanted by the allure of
            French desserts, set out to bring a slice of that magic back home.
            The result? Douceur Patisserie. We've reimagined the patisserie
            experience, allowing you to savour exquisite French entremets and
            premium cakes in the comfort of your own home.
          </p>
        </div>
      </section>

      {/* ── 3. Crafted Delicacies ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[480px]">
        {/* Text — shows second on mobile, first on desktop */}
        <div
          className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-16
          bg-white order-2 md:order-1"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: `${BRAND}70` }}
          >
            Our Craft
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-5"
            style={{ color: BRAND }}
          >
            Crafted Delicacies
          </h2>
          <div
            className="w-10 h-0.5 mb-5"
            style={{ backgroundColor: `${BRAND}40` }}
          />
          <p className="text-gray-600 leading-relaxed text-sm">
            There's an art to French desserts — a seamless blend of varied
            textures, rich flavours, and delicate balance. Spearheaded by Chef
            Pang Yun Kian, a decade-long devotee to modern pastry and the Asian
            Pastry Cup 2016 champion, our offerings honour traditional French
            techniques and is a nod to local tastes.
          </p>
        </div>
        <div className="relative min-h-[280px] md:min-h-full order-1 md:order-2">
          <Image
            src="/images/about-crafted.jpg"
            alt="Crafted Delicacies"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ── 4. Stats Divider ── */}
      <section className="py-14 px-6" style={{ backgroundColor: BRAND }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="w-full h-px mb-10 opacity-20"
            style={{ backgroundColor: "#fdf5f5" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100K+", label: "Cakes Delivered" },
              { number: "3", label: "Locations" },
              { number: "10+", label: "Years of Craft" },
              { number: "1", label: "Pastry Cup Winner" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  {stat.number}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div
            className="w-full h-px mt-10 opacity-20"
            style={{ backgroundColor: "#fdf5f5" }}
          />
        </div>
      </section>

      {/* ── 5. Our Commitment ── */}
      <section
        className="px-6 md:px-12 py-16 md:py-20"
        style={{ backgroundColor: BRAND_PALE }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: `${BRAND}70` }}
          >
            What We Stand For
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-10"
            style={{ color: BRAND }}
          >
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality",
                icon: "✦",
                body: "Every ingredient — chosen with precision — determines the soul of our cakes. From the lavish layers to the final flourish, we ensure intricate detail and unmatched taste.",
              },
              {
                title: "Accessibility",
                icon: "✦",
                body: "Offering same-day delivery and a seamless ordering process, we aim to make your cake experience effortless — with just a few clicks.",
              },
              {
                title: "Freshness",
                icon: "✦",
                body: "We pride ourselves on crafting each cake to order, ensuring it is enjoyed at its peak — designed to be enjoyed immediately, not stored overnight.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border p-6 md:p-8"
                style={{ borderColor: BRAND_BORDER }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center
                  mb-4 text-white text-xs"
                  style={{ backgroundColor: BRAND }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-semibold mb-3 text-base md:text-lg"
                  style={{ color: BRAND }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. The Douceur Legacy ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[420px]">
        <div className="relative min-h-[280px] md:min-h-full">
          <Image
            src="/images/about-legacy.jpg"
            alt="The Douceur Legacy"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-16
          bg-white"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: `${BRAND}70` }}
          >
            Our Journey
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-5"
            style={{ color: BRAND }}
          >
            The Douceur Legacy
          </h2>
          <div
            className="w-10 h-0.5 mb-5"
            style={{ backgroundColor: `${BRAND}40` }}
          />
          <p className="text-gray-600 leading-relaxed text-sm mb-8">
            We're more than a brand; we're a family bound by passion and
            excellence. Every milestone is a testament to our collective effort
            and dedication. As we evolve and scale new culinary heights, our
            promise remains — to deliver perfection, each time.
          </p>
          <Link
            href="/collections"
            className="self-start inline-flex items-center gap-2 px-6 py-3
              rounded-full text-white text-sm font-medium transition-opacity
              hover:opacity-85"
            style={{ backgroundColor: BRAND }}
          >
            Explore Our Menu
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
      </section>

      {/* ── 7. Our Brands — asymmetric editorial ── */}
      <section
        className="py-16 md:py-20 px-4 md:px-6"
        style={{ backgroundColor: BRAND }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between
            gap-4 mb-10 md:mb-12"
          >
            <div>
              <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-3">
                The Family
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-light">
                Our Brands
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Two distinct experiences — one shared passion for exceptional
              taste and craft.
            </p>
          </div>

          {/* Cards — stacked on mobile, side by side on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-5 gap-4">
            {/* Left — larger card */}
            <div
              className="md:col-span-3 relative min-h-[380px] md:min-h-[540px]
              group overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/about-patisserie.jpg"
                alt="Douceur Patisserie"
                fill
                className="object-cover transition-transform duration-700
                  group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">
                  Douceur Patisserie
                </h3>
                <p
                  className="text-white/60 text-sm mb-5 leading-relaxed
                  max-w-xs hidden md:block"
                >
                  French-inspired cakes and entremets, crafted fresh daily for
                  every occasion.
                </p>
                <span
                  className="inline-flex items-center px-5 py-2.5 rounded-full
                  text-sm font-medium"
                  style={{ backgroundColor: "white", color: BRAND }}
                >
                  @DOUCEURPATISSERIE
                </span>
              </div>
            </div>

            {/* Right — smaller card */}
            <div
              className="md:col-span-2 relative min-h-[320px] md:min-h-[540px]
              group overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/about-coffee.jpg"
                alt="Douceur Coffee"
                fill
                className="object-cover transition-transform duration-700
                  group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">
                  Douceur Coffee
                </h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed hidden md:block">
                  A curated café experience — where coffee meets patisserie.
                </p>
                <span
                  className="inline-flex items-center px-5 py-2.5 rounded-full
                  text-sm font-medium"
                  style={{ backgroundColor: "white", color: BRAND }}
                >
                  @DOUCEURCOFFEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA Strip ── */}
      <section
        className="px-4 md:px-6 py-12 md:py-16"
        style={{ backgroundColor: BRAND_PALE }}
      >
        <div
          className="max-w-5xl mx-auto rounded-3xl px-6 md:px-10 py-10 md:py-12
          flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: BRAND }}
        >
          <div className="text-center md:text-left">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
              Ready to Indulge?
            </p>
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">
              Order Fresh Today
            </h3>
            <p className="text-white/60 text-sm">
              Made fresh to order — delivered right to your door.
            </p>
          </div>
          <Link
            href="/collections"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 md:px-8
              py-3.5 rounded-full text-sm font-semibold bg-white transition-all
              hover:gap-3"
            style={{ color: BRAND }}
          >
            Browse Collection
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
      </section>
    </main>
  );
}
