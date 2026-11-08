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
        // Candy Sunset Palette (From User Reference)
        biscuit: {
          light: "#FDF4E5",
          DEFAULT: "#F7E7CD",
          dark: "#EAD4B3",
        },
        sunset: {
          light: "#FF732B",
          DEFAULT: "#FF5701",
          dark: "#D94500",
        },
        candy: {
          light: "#FF94CB",
          DEFAULT: "#FE76BA",
          dark: "#E659A2",
        },
        mango: {
          light: "#FFB054",
          DEFAULT: "#FA9630",
          dark: "#D67817",
        },
        lilac: {
          light: "#FCE2F3",
          DEFAULT: "#F7B0E1",
          dark: "#DE90C6",
        },
        cocoa: {
          light: "#422517",
          DEFAULT: "#241107",
          muted: "#78442A",
        },
        // Legacy alias mappings for seamless fallback
        terracotta: {
          DEFAULT: "#F7E7CD",
        },
        coral: {
          DEFAULT: "#FF5701",
        },
        custard: {
          DEFAULT: "#FFFFFF",
        },
        cobalt: {
          DEFAULT: "#FE76BA",
        },
        sun: {
          DEFAULT: "#FA9630",
        },
        jet: {
          DEFAULT: "#241107",
        },
        marigold: {
          DEFAULT: "#FA9630",
        },
        periwinkle: {
          DEFAULT: "#FF5701",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
