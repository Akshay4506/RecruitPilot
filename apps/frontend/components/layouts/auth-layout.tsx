import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// AuthLayout — Login / Register / Password flows
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthLayoutProps {
  children: React.ReactNode;
  /** Title displayed above the form card */
  title?: string;
  /** Subtitle / tagline */
  subtitle?: string;
  /** Whether to show the decorative illustration panel */
  showDecorativeSide?: boolean;
  className?: string;
}

const decorativeFeatures = [
  "Enterprise-grade hiring platform",
  "AI-powered candidate matching",
  "Structured interview intelligence",
  "Real-time collaboration tools",
];

function AuthLayout({
  children,
  title,
  subtitle,
  showDecorativeSide = true,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex bg-[hsl(var(--background))]",
        className
      )}
    >
      {/* ── Decorative side panel (desktop only) ─────────────────────── */}
      {showDecorativeSide && (
        <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 relative flex-col justify-between p-10 bg-[hsl(var(--primary))] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white" />
          </div>

          {/* Brand */}
          <div className="relative flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">RecruitPilot</span>
          </div>

          {/* Feature list */}
          <div className="relative">
            <blockquote className="text-white">
              <p className="text-2xl font-semibold leading-snug mb-6">
                Hire better, faster, together.
              </p>
              <ul className="space-y-3">
                {decorativeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-white/85 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </blockquote>
          </div>

          {/* Testimonial */}
          <div className="relative">
            <p className="text-white/70 text-xs">
              Trusted by 500+ companies worldwide
            </p>
          </div>
        </div>
      )}

      {/* ── Auth form side ────────────────────────────────────────────── */}
      <div className={cn(
        "flex flex-1 flex-col items-center justify-center px-4 sm:px-8 py-12",
        "bg-[hsl(var(--background))]"
      )}>
        {/* Mobile brand */}
        <div className="lg:hidden mb-8 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-base font-bold text-[hsl(var(--foreground))]">RecruitPilot</span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Title & subtitle */}
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              {title && (
                <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{title}</h1>
              )}
              {subtitle && (
                <p className="mt-1.5 text-sm text-[hsl(var(--muted-foreground))]">{subtitle}</p>
              )}
            </div>
          )}

          {/* Form card */}
          <div
            className={cn(
              "rounded-2xl border border-[hsl(var(--border))]",
              "bg-[hsl(var(--card))] p-7 shadow-sm"
            )}
          >
            {children}
          </div>

          {/* Back to home */}
          <p className="mt-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
            <Link
              href="/"
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
