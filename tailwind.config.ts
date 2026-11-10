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
        // Option 3: Full Saturated Periwinkle Canvas with Electric Tangerine Pop
        periwinkle: {
          light: "#EEF2FF",
          DEFAULT: "#6C8BF5",
          dark: "#4967CE",
          canvas: "#6C8BF5",
        },
        biscuit: {
          light: "#8AA5FF",
          DEFAULT: "#6C8BF5",
          dark: "#4967CE",
        },
        sunset: {
          light: "#FFA05C",
          DEFAULT: "#FF8A3D",
          dark: "#E06D20",
        },
        candy: {
          light: "#FFA05C",
          DEFAULT: "#FF8A3D",
          dark: "#E06D20",
        },
        mango: {
          light: "#FEF9C3",
          DEFAULT: "#FDF18A",
          dark: "#EAB308",
        },
        lilac: {
          light: "#F5F7FF",
          DEFAULT: "#EEF2FF",
          dark: "#DDE4FF",
        },
        cocoa: {
          light: "#3A456B",
          DEFAULT: "#1E2540",
          muted: "#5A6588",
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
          DEFAULT: "#FF8A3D",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
