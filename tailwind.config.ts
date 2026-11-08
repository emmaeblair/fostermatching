import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        periwinkle: {
          light: "#B8CBFF",
          DEFAULT: "#93B1FF",
          dark: "#7089D6",
        },
        marigold: {
          light: "#FFC266",
          DEFAULT: "#FFAA33",
          dark: "#D98818",
        },
        custard: {
          light: "#FFFDF5",
          DEFAULT: "#FFF7E8",
          dark: "#F5E9CE",
        },
        jet: {
          DEFAULT: "#141416",
          soft: "#232328",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
