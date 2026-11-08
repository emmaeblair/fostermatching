import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        // Sunbaked Terracotta & Retro Pop Design Tokens
        terracotta: {
          light: "#F2B2A2",
          DEFAULT: "#EA9B85",
          dark: "#D6816A",
        },
        coral: {
          light: "#EA684D",
          DEFAULT: "#DF4E30",
          dark: "#C03A1F",
        },
        custard: {
          light: "#FFFDF9",
          DEFAULT: "#FFF8EB",
          dark: "#F5E8D0",
        },
        cobalt: {
          light: "#4A72F5",
          DEFAULT: "#2752D6",
          dark: "#1A3DB5",
        },
        sun: {
          light: "#FFD154",
          DEFAULT: "#F8BC27",
          dark: "#D69B10",
        },
        cocoa: {
          light: "#3A271E",
          DEFAULT: "#1D130E",
          muted: "#6B4D3D",
        },
        // Legacy token fallbacks
        jet: {
          DEFAULT: "#1D130E",
          soft: "#2C1E17",
        },
        marigold: {
          light: "#FFD154",
          DEFAULT: "#F8BC27",
          dark: "#D69B10",
        },
        periwinkle: {
          light: "#4A72F5",
          DEFAULT: "#2752D6",
          dark: "#1A3DB5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
