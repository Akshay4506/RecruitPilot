"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, AlertTriangle, RefreshCw, Mail } from "lucide-react";
import { ROUTES } from "@/constants/routes";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type VerifyState = "success" | "pending" | "expired" | "invalid";

const STATES: Record<VerifyState, {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}> = {
  success: {
    icon: CheckCircle2,
    iconBg: "bg-[hsl(var(--success-bg))]",
    iconColor: "text-[hsl(var(--success))]",
    title: "Email verified!",
    description: "Your email address has been confirmed. Your account is now active and you're all set.",
  },
  pending: {
    icon: Clock,
    iconBg: "bg-[hsl(var(--warning-bg))]",
    iconColor: "text-[hsl(var(--warning))]",
    title: "Check your email",
    description: "We've sent a verification link to your email address. Click the link to activate your account.",
  },
  expired: {
    icon: AlertTriangle,
    iconBg: "bg-[hsl(var(--warning-bg))]",
    iconColor: "text-[hsl(var(--warning))]",
    title: "Link expired",
    description: "This verification link has expired. Links are valid for 24 hours. Request a new one below.",
  },
  invalid: {
    icon: XCircle,
    iconBg: "bg-[hsl(var(--danger-bg))]",
    iconColor: "text-[hsl(var(--danger))]",
    title: "Invalid link",
    description: "This verification link is invalid or has already been used. You can request a new link below.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Resend section
// ─────────────────────────────────────────────────────────────────────────────

function ResendEmail({ email }: { email: string }) {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  async function handleResend() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setCooldown(60);
    const timer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-[hsl(var(--muted-foreground))]" aria-hidden />
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {email ? `Sending to ${email}` : "We'll resend to your registered email"}
        </p>
      </div>
      {sent && (
        <p className="text-xs text-[hsl(var(--success))] font-medium">
          ✓ New verification email sent!
        </p>
      )}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        loading={loading}
        disabled={cooldown > 0}
        onClick={handleResend}
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : loading ? "Sending…" : (
          <><RefreshCw className="h-3.5 w-3.5 mr-1.5" aria-hidden />Resend verification email</>
        )}
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner component — uses useSearchParams (must be in Suspense)
// ─────────────────────────────────────────────────────────────────────────────

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const rawState = searchParams.get("state") as VerifyState | null;
  const verifyState: VerifyState = rawState && rawState in STATES ? rawState : "pending";
  const email = searchParams.get("email") ?? "";

  const config = STATES[verifyState];
  const Icon = config.icon;
  const showResend = verifyState === "pending" || verifyState === "expired" || verifyState === "invalid";

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {config.title}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {config.description}
        </p>
      </div>

      <div className="space-y-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "mx-auto flex h-14 w-14 items-center justify-center rounded-full",
            config.iconBg
          )}
        >
          <Icon className={cn("h-8 w-8", config.iconColor)} aria-hidden />
        </motion.div>

        {verifyState === "pending" && (
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-2">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Next steps:</p>
            <ul className="text-xs text-[hsl(var(--muted-foreground))] space-y-1.5">
              {[
                "Open the email from noreply@recruitpilot.io",
                "Click the 'Verify my email' button",
                "You'll be automatically signed in",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className={cn(
                    "h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0",
                    "bg-[hsl(var(--primary))]"
                  )}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {verifyState === "success" && (
          <div className="space-y-2">
            <Button size="lg" className="w-full" asChild>
              <Link href={ROUTES.candidate.dashboard}>Go to my dashboard</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link href={ROUTES.candidate.profile}>Complete my profile</Link>
            </Button>
          </div>
        )}

        {showResend && <ResendEmail email={email} />}

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
          Wrong account?{" "}
          <Link href={ROUTES.auth.login} className="text-[hsl(var(--primary))] hover:underline font-medium">
            Sign in differently
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback shown while searchParams resolve
// ─────────────────────────────────────────────────────────────────────────────

function VerifyEmailFallback() {
  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Verifying...</h1>
      </div>
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page export — wraps content in Suspense per Next.js requirement
// ─────────────────────────────────────────────────────────────────────────────

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </React.Suspense>
  );
}
