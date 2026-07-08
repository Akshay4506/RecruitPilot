"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Users, Briefcase, CheckCircle2,
  ArrowRight, ArrowLeft, Eye, EyeOff, Globe, Mail, Lock, User
} from "lucide-react";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pageSlide as pageVariants } from "@/lib/animations";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Company",    icon: Building2 },
  { id: 2, label: "Workspace",  icon: Briefcase },
  { id: 3, label: "Admin",      icon: User },
  { id: 4, label: "Review",     icon: CheckCircle2 },
];

const COMPANY_SIZES = [
  { label: "1–10",     desc: "Just getting started" },
  { label: "11–50",    desc: "Small team" },
  { label: "51–200",   desc: "Growing company" },
  { label: "201–500",  desc: "Mid-market" },
  { label: "501–2000", desc: "Large enterprise" },
  { label: "2000+",    desc: "Global enterprise" },
];

const INDUSTRIES = [
  "Technology", "Finance", "Healthcare", "E-commerce", "SaaS",
  "Media", "Education", "Manufacturing", "Consulting", "Real Estate", "Other",
];


// ─────────────────────────────────────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((step, i) => {
          const done = current > step.id;
          const active = current === step.id;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
                  done  ? "bg-[hsl(var(--success))] text-white" :
                  active ? "bg-[hsl(var(--primary))] text-white shadow-[0_0_0_3px_hsl(var(--primary)/0.2)]" :
                           "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]"
                )}>
                  {done ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Icon className="h-3.5 w-3.5" aria-hidden />}
                </div>
                <span className={cn(
                  "text-[10px] font-medium hidden sm:block",
                  active ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
                )}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-2", done ? "bg-[hsl(var(--success))]" : "bg-[hsl(var(--border))]")} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="h-1 w-full rounded-full bg-[hsl(var(--muted))]">
        <div
          className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
          style={{ width: `${((current - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Company Details
// ─────────────────────────────────────────────────────────────────────────────

function Step1Company({
  data, setData, errors,
}: {
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-4">
      <Input
        label="Company name" id="company-name" required
        value={data.companyName ?? ""}
        onChange={(e) => setData((p) => ({ ...p, companyName: e.target.value }))}
        error={errors.companyName}
        leftIcon={<Building2 className="h-4 w-4" />}
        placeholder="Acme Corporation"
      />
      <Input
        label="Company website" id="website"
        value={data.website ?? ""}
        onChange={(e) => setData((p) => ({ ...p, website: e.target.value }))}
        leftIcon={<Globe className="h-4 w-4" />}
        placeholder="https://acme.com"
      />

      {/* Industry */}
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">Industry *</label>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setData((p) => ({ ...p, industry: ind }))}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                data.industry === ind
                  ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.4)]"
              )}
            >
              {ind}
            </button>
          ))}
        </div>
        {errors.industry && <p className="text-xs text-[hsl(var(--destructive))] mt-1">{errors.industry}</p>}
      </div>

      {/* Company size */}
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">Company size *</label>
        <div className="grid grid-cols-3 gap-2">
          {COMPANY_SIZES.map((size) => (
            <button
              key={size.label}
              type="button"
              onClick={() => setData((p) => ({ ...p, companySize: size.label }))}
              className={cn(
                "rounded-xl border p-2.5 text-left transition-all duration-150",
                data.companySize === size.label
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--accent))]"
                  : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.3)]"
              )}
            >
              <p className={cn("text-sm font-semibold", data.companySize === size.label ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--foreground))]")}>
                {size.label}
              </p>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{size.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Workspace
// ─────────────────────────────────────────────────────────────────────────────

function Step2Workspace({
  data, setData, errors,
}: {
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
}) {
  const slug = (data.workspaceName ?? "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return (
    <div className="space-y-4">
      <Input
        label="Workspace name" id="workspace-name" required
        value={data.workspaceName ?? ""}
        onChange={(e) => setData((p) => ({ ...p, workspaceName: e.target.value }))}
        error={errors.workspaceName}
        leftIcon={<Briefcase className="h-4 w-4" />}
        placeholder="Acme Hiring Team"
        hint="This is how your workspace appears to team members."
      />
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Workspace URL</p>
        <div className="flex items-center rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--muted)/0.4)] overflow-hidden text-sm">
          <span className="px-3 py-2 text-[hsl(var(--muted-foreground))] border-r border-[hsl(var(--border))]">
            app.recruitpilot.io/
          </span>
          <span className="px-3 py-2 text-[hsl(var(--foreground))] font-mono">
            {slug || "your-workspace"}
          </span>
        </div>
      </div>

      {/* Hiring volume */}
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">
          Expected hiring volume (per year)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["1–10 hires", "11–50 hires", "51–200 hires", "200+ hires"].map((vol) => (
            <button
              key={vol}
              type="button"
              onClick={() => setData((p) => ({ ...p, hiringVolume: vol }))}
              className={cn(
                "rounded-xl border p-3 text-sm font-medium text-left transition-all",
                data.hiringVolume === vol
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)]"
              )}
            >
              {vol}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-[hsl(var(--primary))]" aria-hidden />
          <span className="text-xs font-semibold text-[hsl(var(--foreground))]">Invite team members later</span>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          You can invite recruiters, hiring managers, and admins after creating your workspace.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Admin Account
// ─────────────────────────────────────────────────────────────────────────────

function Step3Admin({
  data, setData, errors,
}: {
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
}) {
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[hsl(var(--info-bg))] bg-[hsl(var(--info-bg))] p-3 text-xs text-[hsl(var(--info))]">
        You&apos;ll be the workspace admin. You can transfer ownership or add more admins later.
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name" id="admin-first" required
          value={data.adminFirstName ?? ""}
          onChange={(e) => setData((p) => ({ ...p, adminFirstName: e.target.value }))}
          error={errors.adminFirstName}
          leftIcon={<User className="h-4 w-4" />}
          placeholder="Sarah"
        />
        <Input
          label="Last name" id="admin-last" required
          value={data.adminLastName ?? ""}
          onChange={(e) => setData((p) => ({ ...p, adminLastName: e.target.value }))}
          error={errors.adminLastName}
          placeholder="Chen"
        />
      </div>
      <Input
        label="Work email" id="admin-email" type="email" required
        value={data.adminEmail ?? ""}
        onChange={(e) => setData((p) => ({ ...p, adminEmail: e.target.value }))}
        error={errors.adminEmail}
        leftIcon={<Mail className="h-4 w-4" />}
        placeholder="sarah@acme.com"
      />
      <Input
        label="Password" id="admin-password"
        type={showPw ? "text" : "password"} required
        value={data.adminPassword ?? ""}
        onChange={(e) => setData((p) => ({ ...p, adminPassword: e.target.value }))}
        error={errors.adminPassword}
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
        hint="Use a strong password."
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 4 — Review & Success
// ─────────────────────────────────────────────────────────────────────────────

function Step4Review({ data, onSubmit, loading }: {
  data: Record<string, string>;
  onSubmit: () => void;
  loading: boolean;
}) {
  const [done, setDone] = React.useState(false);

  async function handleSubmit() {
    await onSubmit();
    setDone(true);
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success-bg))]"
        >
          <CheckCircle2 className="h-9 w-9 text-[hsl(var(--success))]" aria-hidden />
        </motion.div>
        <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2">Workspace created!</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
          Your RecruitPilot workspace is ready. Start posting jobs and building your pipeline.
        </p>
        <Button size="lg" className="w-full" asChild>
          <Link href="/recruiter/dashboard">Go to my workspace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden divide-y divide-[hsl(var(--border))]">
        {[
          { label: "Company",   value: data.companyName },
          { label: "Industry",  value: data.industry },
          { label: "Size",      value: data.companySize },
          { label: "Workspace", value: data.workspaceName },
          { label: "Admin",     value: `${data.adminFirstName} ${data.adminLastName}` },
          { label: "Email",     value: data.adminEmail },
        ].map((row) => (
          <div key={row.label} className="flex justify-between px-4 py-3">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{row.label}</span>
            <span className="text-xs font-medium text-[hsl(var(--foreground))]">{row.value || "—"}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed text-center">
        By creating a workspace you agree to RecruitPilot&apos;s{" "}
        <Link href="/terms" className="text-[hsl(var(--primary))] hover:underline">Terms of Service</Link>
        {" "}and{" "}
        <Link href="/privacy" className="text-[hsl(var(--primary))] hover:underline">Privacy Policy</Link>.
      </div>

      <Button size="lg" className="w-full" loading={loading} onClick={handleSubmit}>
        {loading ? "Creating workspace…" : "Create workspace →"}
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function CompanyRegisterPage() {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!data.companyName) errs.companyName = "Company name is required";
      if (!data.industry) errs.industry = "Select an industry";
    }
    if (step === 2) {
      if (!data.workspaceName) errs.workspaceName = "Workspace name is required";
    }
    if (step === 3) {
      if (!data.adminFirstName) errs.adminFirstName = "Required";
      if (!data.adminLastName) errs.adminLastName = "Required";
      if (!data.adminEmail) errs.adminEmail = "Required";
      if (!data.adminPassword) errs.adminPassword = "Required";
    }
    return errs;
  }

  function goNext() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() { setStep((s) => Math.max(s - 1, 1)); }

  async function handleFinalSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  }

  const titles: Record<number, { title: string; sub: string }> = {
    1: { title: "Tell us about your company", sub: "We'll customize RecruitPilot for your team." },
    2: { title: "Set up your workspace", sub: "Your team will collaborate here." },
    3: { title: "Create your admin account", sub: "You'll manage this workspace." },
    4: { title: "Review & launch", sub: "Everything looks good? Let's go." },
  };

  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">{titles[step].title}</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{titles[step].sub}</p>
      </div>
      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {step === 1 && <Step1Company data={data} setData={setData} errors={errors} />}
          {step === 2 && <Step2Workspace data={data} setData={setData} errors={errors} />}
          {step === 3 && <Step3Admin data={data} setData={setData} errors={errors} />}
          {step === 4 && <Step4Review data={data} onSubmit={handleFinalSubmit} loading={loading} />}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className={cn("mt-6 flex gap-3", step > 1 ? "justify-between" : "justify-end")}>
          {step > 1 && (
            <Button variant="outline" onClick={goBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back
            </Button>
          )}
          <Button variant="primary" onClick={goNext} rightIcon={<ArrowRight className="h-4 w-4" />}>
            Continue
          </Button>
        </div>
      )}

      {step === 1 && (
        <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
          Already have a workspace?{" "}
          <Link href="/recruiter-login" className="font-medium text-[hsl(var(--primary))] hover:underline">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
