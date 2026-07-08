import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Inter — Primary UI Font
 * Used for all body text, headings, and labels.
 * Subset to latin for performance.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * JetBrains Mono — Monospace Font
 * Used for code snippets, IDs, timestamps, and technical data.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

/**
 * Font class string — inject into the root <html> element
 * This injects the --font-inter and --font-jetbrains-mono CSS variables.
 */
export const fontClassNames = [inter.variable, jetbrainsMono.variable].join(" ");
