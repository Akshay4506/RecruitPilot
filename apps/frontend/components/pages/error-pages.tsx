"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

// ─────────────────────────────────────────────────────────────────────────────
// Shared error page base component
// ─────────────────────────────────────────────────────────────────────────────

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  emoji: string;
  actions?: React.ReactNode;
}

function ErrorPage({ code, title, description, emoji, actions }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[hsl(var(--background))]">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[hsl(var(--primary)/0.04)] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="w-full max-w-md text-center"
      >
        {/* Emoji illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="mb-6 text-6xl select-none"
          aria-hidden
        >
          {emoji}
        </motion.div>

        {/* Error code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))] mb-2"
        >
          Error {code}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-2xl font-bold text-[hsl(var(--foreground))] mb-3 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-8"
        >
          {description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {actions}
        </motion.div>

        {/* Support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xs text-[hsl(var(--muted-foreground))]"
        >
          Still having issues?{" "}
          <Link href="mailto:support@recruitpilot.io" className="text-[hsl(var(--primary))] hover:underline">
            Contact support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 401 — Unauthorized
// ─────────────────────────────────────────────────────────────────────────────

export function Page401() {
  return (
    <ErrorPage
      code="401"
      emoji="🔐"
      title="Authentication required"
      description="You need to be signed in to access this page. Please sign in with your RecruitPilot account to continue."
      actions={
        <>
          <Button variant="primary" size="lg" asChild>
            <Link href={ROUTES.auth.login}>Sign in</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.auth.register}>Create account</Link>
          </Button>
        </>
      }
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 403 — Forbidden
// ─────────────────────────────────────────────────────────────────────────────

export function Page403() {
  return (
    <ErrorPage
      code="403"
      emoji="🚫"
      title="Access denied"
      description="You don't have permission to view this page. Contact your workspace admin if you believe this is a mistake."
      actions={
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={() => typeof window !== "undefined" && window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Go back
          </Button>
          <Button variant="primary" size="lg" asChild>
            <Link href={ROUTES.public.home}><Home className="h-4 w-4 mr-1.5" aria-hidden />Home</Link>
          </Button>
        </>
      }
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 404 — Not Found
// ─────────────────────────────────────────────────────────────────────────────

export function Page404() {
  return (
    <ErrorPage
      code="404"
      emoji="🔍"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved. Double-check the URL or head back home."
      actions={
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={() => typeof window !== "undefined" && window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Go back
          </Button>
          <Button variant="primary" size="lg" asChild>
            <Link href={ROUTES.public.home}><Home className="h-4 w-4 mr-1.5" aria-hidden />Back to home</Link>
          </Button>
        </>
      }
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 500 — Server Error
// ─────────────────────────────────────────────────────────────────────────────

export function Page500({ reset }: { reset?: () => void }) {
  return (
    <ErrorPage
      code="500"
      emoji="⚙️"
      title="Something went wrong"
      description="We encountered an unexpected error on our end. Our team has been notified. Please try again in a moment."
      actions={
        <>
          {reset && (
            <Button variant="primary" size="lg" onClick={reset}>
              <RefreshCw className="h-4 w-4" aria-hidden /> Try again
            </Button>
          )}
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.public.home}><Home className="h-4 w-4 mr-1.5" aria-hidden />Back to home</Link>
          </Button>
        </>
      }
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — 404 (for use as not-found.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export default function NotFoundPage() {
  return <Page404 />;
}

