import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        brand: {
          DEFAULT: "#2F3C4F",
          light: "#EDF2F7",
          accent: "#D9967E"
        }
      },
      boxShadow: {
        soft: "0 10px 40px -20px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};

export default config;
