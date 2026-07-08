import type { Config } from "tailwindcss";

/**
 * Tailwind v4 Configuration
 *
 * In Tailwind v4, the design tokens (colors, spacing, typography, etc.) are
 * defined in CSS using the @theme directive inside globals.css.
 *
 * This file only needs content paths and the darkMode strategy.
 * All token extensions live in: app/globals.css → @theme { ... }
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
