import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050506",
        surface: "#0D0D0F",
        disc: "#1B1B1D",
        line: {
          DEFAULT: "#2B2B30",
          bright: "rgba(255, 255, 255, 0.35)",
        },
        text: {
          DEFAULT: "#F2F0EB",
          muted: "#8C8C94",
        },
        muted: "#8C8C94",
        ignition: "#FF6A2B",
        spark: "#E6C36A",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(255, 255, 255, 0.12)",
        "glow-lg": "0 0 100px -20px rgba(255, 255, 255, 0.18)",
        "corona": "0 0 80px 20px rgba(255, 255, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
