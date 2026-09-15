import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          light: "var(--color-brand-light)",
          dark: "var(--color-brand-dark)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          alt: "var(--color-surface-alt)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      transitionDuration: {
        carousel: "700ms",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
