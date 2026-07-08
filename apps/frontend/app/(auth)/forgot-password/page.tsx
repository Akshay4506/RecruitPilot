"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type State = "idle" | "loading" | "success";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }
    setError("");
    setState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setState("success");
  }

  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {state === "success" ? "Check your inbox" : "Forgot password?"}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {state === "success"
            ? `We've sent password reset instructions to ${email}`
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-5 py-2"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--success-bg))]">
              <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))]" aria-hidden />
            </div>

            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Send className="h-4 w-4 text-[hsl(var(--primary))]" aria-hidden />
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">Email sent to</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">{email}</p>
            </div>

            <ul className="text-xs text-[hsl(var(--muted-foreground))] space-y-1.5 text-left">
              {[
                "Check your spam folder if you don't see it",
                "The link expires in 15 minutes",
                "Only the most recent link will work",
              ].map((tip) => (
                <li key={tip} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[hsl(var(--muted-foreground))] shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setState("idle")}
              >
                Try a different email
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">
                  <ArrowLeft className="h-4 w-4 mr-1.5" aria-hidden />
                  Back to sign in
                </Link>
              </Button>
            </div>
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
            <Input
              label="Email address"
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              error={error}
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="you@example.com"
              required
              autoFocus
            />

            <Button type="submit" size="lg" loading={state === "loading"} className="w-full">
              {state === "loading" ? "Sending reset link…" : "Send reset link"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Back to sign in
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
