/**
 * Design Tokens — JavaScript/TypeScript Access
 * ─────────────────────────────────────────────────────────────────────────────
 * These constants mirror the CSS @theme tokens and are used in:
 *   - Framer Motion animation variants
 *   - Chart configurations (Recharts)
 *   - Programmatic style computations
 *   - Testing utilities
 *
 * Source of truth: app/globals.css → @theme block
 */

// ── Brand Colors ──────────────────────────────────────────────────────────────
export const colors = {
  brand: {
    50:  "#eef0ff",
    100: "#e0e3ff",
    200: "#c7ccff",
    300: "#a5adff",
    400: "#8182ff",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  neutral: {
    0:   "#ffffff",
    50:  "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  success: {
    500: "#10b981",
    light: "#ecfdf5",
    dark:  "#065f46",
  },
  warning: {
    500: "#f59e0b",
    light: "#fffbeb",
    dark:  "#92400e",
  },
  danger: {
    500: "#f43f5e",
    light: "#fff1f2",
    dark:  "#9f1239",
  },
  info: {
    500: "#0ea5e9",
    light: "#f0f9ff",
    dark:  "#075985",
  },
} as const;

// ── Animation Durations ───────────────────────────────────────────────────────
export const duration = {
  instant:  0,
  fast:     0.1,
  normal:   0.2,
  slow:     0.3,
  slower:   0.5,
  slowest:  0.7,
} as const;

// ── Easing Curves (for Framer Motion) ────────────────────────────────────────
export const easing = {
  linear:   "linear",
  easeIn:   [0.4, 0, 1, 1],
  easeOut:  [0, 0, 0.2, 1],
  easeInOut:[0.4, 0, 0.2, 1],
  spring:   [0.34, 1.56, 0.64, 1],
  bounce:   [0.68, -0.55, 0.265, 1.55],
} as const;

// ── Framer Motion Variants — Reusable across all pages ────────────────────────
export const motionVariants = {
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: easing.easeOut } },
  },
  fadeInUp: {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.easeOut } },
  },
  fadeInDown: {
    hidden:  { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.easeOut } },
  },
  slideInLeft: {
    hidden:  { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: easing.easeOut } },
  },
  slideInRight: {
    hidden:  { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: easing.easeOut } },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.normal, ease: easing.spring } },
  },
  staggerContainer: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
  },
  staggerItem: {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.easeOut } },
  },
} as const;

// ── Border Radius ─────────────────────────────────────────────────────────────
export const radius = {
  none: "0px",
  xs:   "0.125rem",
  sm:   "0.25rem",
  md:   "0.375rem",
  lg:   "0.5rem",
  xl:   "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// ── Z-Index Scale ─────────────────────────────────────────────────────────────
export const zIndex = {
  below:    -1,
  base:     0,
  raised:   1,
  sticky:   10,
  overlay:  20,
  dropdown: 30,
  modal:    40,
  popover:  50,
  tooltip:  60,
  toast:    70,
  top:      9999,
} as const;

// ── Shadows ───────────────────────────────────────────────────────────────────
export const shadows = {
  xs:     "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm:     "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
  md:     "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
  lg:     "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
  xl:     "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
  glow:   "0 0 20px rgb(99 102 241 / 0.25), 0 0 0 1px rgb(99 102 241 / 0.15)",
  glowSm: "0 0 0 3px rgb(99 102 241 / 0.2)",
} as const;

// ── Typography Scale ──────────────────────────────────────────────────────────
export const typography = {
  size: {
    "2xs": "0.625rem",
    xs:    "0.75rem",
    sm:    "0.875rem",
    base:  "1rem",
    lg:    "1.125rem",
    xl:    "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  weight: {
    light:    "300",
    normal:   "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
    extrabold:"800",
  },
  lineHeight: {
    none:    "1",
    tight:   "1.25",
    snug:    "1.375",
    normal:  "1.5",
    relaxed: "1.625",
  },
} as const;

// ── Chart Color Palette ───────────────────────────────────────────────────────
// Ordered for visual distinctiveness in sequential chart series
export const chartColors = [
  colors.brand[500],   // #6366f1 — Indigo
  colors.info[500],    // #0ea5e9 — Sky blue
  colors.success[500], // #10b981 — Emerald
  colors.warning[500], // #f59e0b — Amber
  colors.danger[500],  // #f43f5e — Rose
  colors.brand[300],   // #a5adff — Light indigo
  colors.neutral[400], // #94a3b8 — Slate
] as const;
