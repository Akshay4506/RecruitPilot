"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Building2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";


export default function RecruiterLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ssoLoading, setSsoLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!email) errs.email = "Work email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid work email";
    if (!password) errs.password = "Password is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push(ROUTES.recruiter.dashboard);
  }

  async function handleSSO() {
    setSsoLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSsoLoading(false);
  }

  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Welcome back, Recruiter</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Sign in to manage your talent pipeline and job postings.</p>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="space-y-4"
      >
        {/* Workspace branding placeholder */}
        <motion.div
          variants={fadeUp}
          className={cn(
            "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)] p-3",
            "flex items-center gap-3"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
            <Building2 className="h-4 w-4 text-white" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">RecruitPilot Workspace</p>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Enterprise Plan</p>
          </div>
          <button className="text-xs text-[hsl(var(--primary))] hover:underline flex items-center gap-0.5">
            Switch <ChevronRight className="h-3 w-3" aria-hidden />
          </button>
        </motion.div>

        {/* SSO button */}
        <motion.div variants={fadeUp}>
          <Button
            variant="outline"
            className="w-full h-10"
            type="button"
            loading={ssoLoading}
            onClick={handleSSO}
            leftIcon={!ssoLoading ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022"/>
                <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00"/>
                <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF"/>
                <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900"/>
              </svg>
            ) : undefined}
          >
            {ssoLoading ? "Redirecting to SSO…" : "Continue with Microsoft SSO"}
          </Button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button
            variant="outline"
            className="w-full h-10"
            type="button"
            leftIcon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
          >
            Continue with Google Workspace
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[hsl(var(--border))]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[hsl(var(--card))] px-3 text-[hsl(var(--muted-foreground))]">or sign in with email</span>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <motion.div variants={fadeUp}>
            <Input
              label="Work email"
              type="email"
              id="recruiter-email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              error={errors.email}
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="you@company.com"
              required
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              id="recruiter-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              error={errors.password}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="pointer-events-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              placeholder="Enter your password"
              required
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                id="recruiter-remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
              />
              <span className="text-xs text-[hsl(var(--foreground))]">Stay signed in for 30 days</span>
            </label>
            <Link href={ROUTES.auth.forgotPassword} className="text-xs font-medium text-[hsl(var(--primary))] hover:underline">
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              {loading ? "Signing in…" : "Sign in to workspace"}
            </Button>
          </motion.div>
        </form>

        <motion.div variants={fadeUp} className="pt-1 space-y-2 text-center">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            New to RecruitPilot?{" "}
            <Link href="/company-register" className="font-medium text-[hsl(var(--primary))] hover:underline">
              Set up your hiring workspace
            </Link>
          </p>
          <p>
            <Link href="/login" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              Signing in as a candidate? →
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
