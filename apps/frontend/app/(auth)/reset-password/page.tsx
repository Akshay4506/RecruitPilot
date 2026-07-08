"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Password strength meter
// ─────────────────────────────────────────────────────────────────────────────

function getStrength(pw: string): { level: number; label: string; color: string } {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "bg-[hsl(var(--danger))]" };
  if (score <= 2) return { level: 2, label: "Fair", color: "bg-[hsl(var(--warning))]" };
  if (score <= 3) return { level: 3, label: "Good", color: "bg-[hsl(var(--info))]" };
  return { level: 4, label: "Strong", color: "bg-[hsl(var(--success))]" };
}

function PasswordStrength({ password }: { password: string }) {
  const { level, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= level ? color : "bg-[hsl(var(--muted))]"
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs font-medium",
        level === 1 ? "text-[hsl(var(--danger))]" :
        level === 2 ? "text-[hsl(var(--warning))]" :
        level === 3 ? "text-[hsl(var(--info))]" :
                     "text-[hsl(var(--success))]"
      )}>
        {label} password
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<{ password?: string; confirm?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!password) errs.password = "Password is required";
    else if (password.length < 8) errs.password = "Password must be at least 8 characters";
    if (!confirm) errs.confirm = "Please confirm your password";
    else if (confirm !== password) errs.confirm = "Passwords do not match";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  }

  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {success ? "Password reset successfully" : "Set new password"}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {success
            ? "Your password has been changed. You can now sign in with your new password."
            : "Enter your new password below."}
        </p>
      </div>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-5 py-2"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--success-bg))]">
              <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))]" aria-hidden />
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              You can now sign in with your new password. All other sessions have been signed out.
            </p>
            <Button size="lg" className="w-full" asChild>
              <Link href="/login">Sign in with new password</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Input
                label="New password"
                id="new-password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                error={errors.password}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="pointer-events-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    aria-label={showPw ? "Hide" : "Show"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                placeholder="Min. 8 characters"
                required
              />
              {password && <PasswordStrength password={password} />}
            </div>

            <Input
              label="Confirm password"
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
              error={errors.confirm}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="pointer-events-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  aria-label={showConfirm ? "Hide" : "Show"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              placeholder="Re-enter your password"
              required
            />

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? "Resetting password…" : "Reset password"}
            </Button>

            <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
              <Link href="/login" className="hover:text-[hsl(var(--foreground))] transition-colors">
                ← Back to sign in
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
