import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PublicLayout — Marketing / Landing / Docs
// ─────────────────────────────────────────────────────────────────────────────

interface PublicNavLink {
  label: string;
  href: string;
}

export interface PublicLayoutProps {
  children: React.ReactNode;
  /** Navigation links in the public header */
  navLinks?: PublicNavLink[];
  /** Whether to show a CTA button */
  ctaLabel?: string;
  ctaHref?: string;
  /** Whether to stretch content full-width */
  fluid?: boolean;
  className?: string;
}

const defaultNavLinks: PublicNavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

function PublicLayout({
  children,
  navLinks = defaultNavLinks,
  ctaLabel = "Get Started",
  ctaHref = "/register",
  fluid = false,
  className,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
      {/* ── Public Header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.85)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="text-base font-bold text-[hsl(var(--foreground))]">RecruitPilot</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Public navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                  "hover:bg-[hsl(var(--accent))] transition-colors"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href={ctaHref}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-semibold",
                "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                "hover:bg-[hsl(var(--primary)/0.9)] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              )}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <main
        id="main-content"
        className={cn(
          "flex-1",
          !fluid && "mx-auto w-full max-w-7xl px-4 sm:px-6",
          className
        )}
      >
        {children}
      </main>

      {/* ── Public Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--primary))]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[hsl(var(--foreground))]">RecruitPilot</span>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} RecruitPilot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export { PublicLayout };
