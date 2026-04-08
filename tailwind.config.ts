// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Add all your brand colors here ──
        navbar: "#7e5d4b",
        // brand: "#C9A063",
        // cream: "#F5F0EB",
        // chocolate: "#5C3D2E",
        // mocha: "#7B4F2E",
        // tan: "#6B5040",
      },
    },
  },
  plugins: [],
};

export default config;
