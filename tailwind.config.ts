import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — do not use raw Tailwind palette colors for brand surfaces.
        moss: "#3B4A25",
        "deep-forest": "#1C2415",
        mist: "#EDE9DE",
        "teal-water": "#5B7B7A",
        gold: "#C9A24B",
        cream: "#F7F5EF",
      },
      fontFamily: {
        // Bound to next/font CSS variables set in app/layout.tsx.
        display: ["var(--font-anton)", "Archivo Black", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      keyframes: {
        "mist-drift": {
          "0%": { transform: "translateX(-4%)", opacity: "0.5" },
          "50%": { transform: "translateX(4%)", opacity: "0.8" },
          "100%": { transform: "translateX(-4%)", opacity: "0.5" },
        },
      },
      animation: {
        "mist-drift": "mist-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
