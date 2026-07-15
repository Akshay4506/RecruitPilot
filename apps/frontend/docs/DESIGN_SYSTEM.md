# Design System

RecruitPilot follows a strict, CSS-first design system utilizing Tailwind v4.

## Core Principles
- **Professional & Enterprise-Grade:** Avoid "AI-generated" or overly playful aesthetics. Use clean geometry, substantial whitespace, and semantic colors.
- **Micro-interactions:** Keep transitions subtle (200ms ease-in-out) and strictly respect `prefers-reduced-motion`.
- **Consistency over Creativity:** Reuse existing UI components rather than building custom one-off solutions.

## Color Palette (Semantic)
Colors are defined as HSL variables in `globals.css` and mapped to standard Tailwind utilities.
- `bg-background` / `text-foreground`: Primary page backgrounds and text.
- `bg-card` / `text-card-foreground`: Elevated surface panels.
- `bg-primary`: Primary actions (Deep Indigo).
- `bg-success`, `bg-warning`, `bg-destructive`: Status indicators.

## Typography
- **Font Family:** Inter (Sans-serif)
- **Hierarchy:** 
  - Main headers: `text-2xl font-bold tracking-tight`
  - Section headers: `text-lg font-semibold`
  - Body text: `text-sm text-muted-foreground`

## Components
### Cards and Surfaces
Always use standard border radiuses and shadows.
```tsx
<div className="bg-card border border-border rounded-xl shadow-sm p-6">
  {children}
</div>
```

### Icons (Lucide React)
Always use `lucide-react`. Standardize sizes to:
- Small (`sm`): `h-4 w-4` (16px) - Standard for buttons, lists, and dense UI.
- Medium (`md`): `h-5 w-5` (20px) - Standard for tabs and larger buttons.
- Large (`lg`): `h-6 w-6` (24px) - Standard for empty states and hero icons.

## Global Feedback
- **Toasts:** Use `toast.success`, `toast.error`, `toast.info` via `sonner` (styled via `toast-provider.tsx`).
- **Loading:** Use `useUIStore().setGlobalLoading(true)` only for major blocking tasks (exports, heavy uploads). Use inline skeleton loaders for all other async data fetching.
