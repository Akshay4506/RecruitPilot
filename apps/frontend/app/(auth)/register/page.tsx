"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, Heart, CheckCircle2,
  ArrowRight, ArrowLeft, Eye, EyeOff, Mail, Lock, Phone, MapPin, Upload
} from "lucide-react";
// Layout provided by app/(auth)/layout.tsx
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pageSlide as pageVariants } from "@/lib/animations";

// ─────────────────────────────────────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Personal",     icon: User },
  { id: 2, label: "Professional", icon: Briefcase },
  { id: 3, label: "Preferences",  icon: Heart },
  { id: 4, label: "Done",         icon: CheckCircle2 },
];

const SKILLS_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
  "Go", "Rust", "SQL", "AWS", "Product Management", "Data Science",
  "Design", "Marketing", "Sales", "Finance", "HR",
];

const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead / Principal", "Executive"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"];


// ─────────────────────────────────────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((step, i) => {
          const done = current > step.id;
          const active = current === step.id;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-bold",
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
                <div className={cn(
                  "flex-1 h-px mx-2 transition-all duration-500",
                  done ? "bg-[hsl(var(--success))]" : "bg-[hsl(var(--border))]"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-[hsl(var(--muted))] mt-2">
        <div
          className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
          style={{ width: `${((current - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
      <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1 text-right">
        Step {current} of {STEPS.length}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step components
// ─────────────────────────────────────────────────────────────────────────────

function Step1Personal({
  data, setData, errors,
}: {
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
}) {
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name" id="first-name" required
          value={data.firstName ?? ""}
          onChange={(e) => setData((p) => ({ ...p, firstName: e.target.value }))}
          error={errors.firstName}
          leftIcon={<User className="h-4 w-4" />}
          placeholder="Alex"
        />
        <Input
          label="Last name" id="last-name" required
          value={data.lastName ?? ""}
          onChange={(e) => setData((p) => ({ ...p, lastName: e.target.value }))}
          error={errors.lastName}
          placeholder="Johnson"
        />
      </div>
      <Input
        label="Email address" id="reg-email" type="email" required
        value={data.email ?? ""}
        onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
        placeholder="alex@example.com"
      />
      <Input
        label="Phone number" id="phone" type="tel"
        value={data.phone ?? ""}
        onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
        leftIcon={<Phone className="h-4 w-4" />}
        placeholder="+1 (555) 000-0000"
        hint="Optional. Used for interview scheduling."
      />
      <Input
        label="Location" id="location"
        value={data.location ?? ""}
        onChange={(e) => setData((p) => ({ ...p, location: e.target.value }))}
        leftIcon={<MapPin className="h-4 w-4" />}
        placeholder="San Francisco, CA"
      />
      <Input
        label="Password" id="reg-password"
        type={showPw ? "text" : "password"} required
        value={data.password ?? ""}
        onChange={(e) => setData((p) => ({ ...p, password: e.target.value }))}
        error={errors.password}
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="pointer-events-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        placeholder="Min. 8 characters"
        hint="Use a mix of letters, numbers, and symbols."
      />
    </div>
  );
}

function Step2Professional({
  data, setData,
}: {
  data: Record<string, string | string[]>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
}) {
  const selectedSkills = (data.skills as string[]) ?? [];
  function toggleSkill(skill: string) {
    setData((p) => {
      const curr = (p.skills as string[]) ?? [];
      return { ...p, skills: curr.includes(skill) ? curr.filter((s) => s !== skill) : [...curr, skill] };
    });
  }
  return (
    <div className="space-y-4">
      <Input
        label="Current job title" id="job-title"
        value={(data.jobTitle as string) ?? ""}
        onChange={(e) => setData((p) => ({ ...p, jobTitle: e.target.value }))}
        placeholder="Software Engineer"
      />
      <Input
        label="Current company" id="company"
        value={(data.company as string) ?? ""}
        onChange={(e) => setData((p) => ({ ...p, company: e.target.value }))}
        placeholder="Acme Inc."
      />
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">Experience level</label>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setData((p) => ({ ...p, experienceLevel: level }))}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                data.experienceLevel === level
                  ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--accent))]"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">
          Skills <span className="text-xs text-[hsl(var(--muted-foreground))]">(select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SKILLS_OPTIONS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                selectedSkills.includes(skill)
                  ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.4)]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--accent))]"
              )}
              aria-pressed={selectedSkills.includes(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        label="Professional summary" id="summary"
        value={(data.summary as string) ?? ""}
        onChange={(e) => setData((p) => ({ ...p, summary: e.target.value }))}
        placeholder="Brief overview of your experience and what you're looking for…"
        hint="Optional. This appears on your candidate profile."
      />
    </div>
  );
}

function Step3Preferences({
  data, setData,
}: {
  data: Record<string, string | string[]>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
}) {
  const selectedTypes = (data.jobTypes as string[]) ?? [];
  function toggleType(type: string) {
    setData((p) => {
      const curr = (p.jobTypes as string[]) ?? [];
      return { ...p, jobTypes: curr.includes(type) ? curr.filter((t) => t !== type) : [...curr, type] };
    });
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">Job type preference</label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                selectedTypes.includes(type)
                  ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.4)]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)]"
              )}
              aria-pressed={selectedTypes.includes(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Expected salary (min)" id="salary-min" type="number"
          value={(data.salaryMin as string) ?? ""}
          onChange={(e) => setData((p) => ({ ...p, salaryMin: e.target.value }))}
          placeholder="80,000"
          hint="Annual, in USD"
        />
        <Input
          label="Expected salary (max)" id="salary-max" type="number"
          value={(data.salaryMax as string) ?? ""}
          onChange={(e) => setData((p) => ({ ...p, salaryMax: e.target.value }))}
          placeholder="120,000"
        />
      </div>
      <Input
        label="Preferred locations" id="pref-locations"
        value={(data.prefLocations as string) ?? ""}
        onChange={(e) => setData((p) => ({ ...p, prefLocations: e.target.value }))}
        leftIcon={<MapPin className="h-4 w-4" />}
        placeholder="San Francisco, New York, Remote"
        hint="Comma-separated"
      />

      {/* Resume upload area */}
      <div>
        <label className="text-sm font-medium text-[hsl(var(--foreground))] block mb-1.5">Upload resume</label>
        <div className={cn(
          "rounded-xl border-2 border-dashed border-[hsl(var(--border))] p-6 text-center",
          "hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--accent))] transition-colors cursor-pointer"
        )}>
          <Upload className="h-8 w-8 text-[hsl(var(--muted-foreground))] mx-auto mb-2 opacity-50" aria-hidden />
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">Drop your resume here</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">PDF, DOC, DOCX up to 5MB</p>
          <button
            type="button"
            className="mt-3 text-xs font-medium text-[hsl(var(--primary))] hover:underline"
          >
            or browse files
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-3">
        <input
          type="checkbox"
          id="open-to-work"
          checked={(data.openToWork as string) === "true"}
          onChange={(e) => setData((p) => ({ ...p, openToWork: String(e.target.checked) }))}
          className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
        />
        <label htmlFor="open-to-work" className="text-xs text-[hsl(var(--foreground))] leading-relaxed cursor-pointer">
          <span className="font-semibold">Mark as Open to Opportunities</span>
          <br />
          Recruiters at RecruitPilot companies can find and reach out to you.
        </label>
      </div>
    </div>
  );
}

function Step4Confirmation({ name }: { name: string }) {
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
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2">
        Welcome to RecruitPilot{name ? `, ${name}` : ""}!
      </h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
        Your profile is live. We&apos;ve sent a verification email to confirm your account.
        In the meantime, explore your personalized job recommendations.
      </p>
      <div className="space-y-2">
        <Button variant="primary" size="lg" className="w-full" asChild>
          <Link href="/candidate/dashboard">Go to my dashboard</Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href="/candidate/profile">Complete my profile</Link>
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main registration page
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidateRegisterPage() {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [direction, setDirection] = React.useState(1);
  const [data, setData] = React.useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!data.firstName) errs.firstName = "First name is required";
    if (!data.lastName) errs.lastName = "Last name is required";
    if (!data.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email as string)) errs.email = "Enter a valid email";
    if (!data.password) errs.password = "Password is required";
    else if ((data.password as string).length < 8) errs.password = "Min. 8 characters";
    return errs;
  }

  async function goNext() {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    setErrors({});
    if (step === 3) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  const titles: Record<number, { title: string; sub: string }> = {
    1: { title: "Create your account", sub: "Start your RecruitPilot journey in minutes." },
    2: { title: "Your professional story", sub: "Help recruiters understand your background." },
    3: { title: "What are you looking for?", sub: "Set your preferences to get better job matches." },
    4: { title: "You're all set!", sub: "" },
  };

  return (
    <div className="w-full">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Create an account</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Join RecruitPilot to discover and apply for your next career opportunity.</p>
      </div>
      <StepIndicator current={step} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {step === 1 && (
            <Step1Personal
              data={data as Record<string, string>}
              setData={setData as React.Dispatch<React.SetStateAction<Record<string, string>>>}
              errors={errors}
            />
          )}
          {step === 2 && <Step2Professional data={data} setData={setData} />}
          {step === 3 && <Step3Preferences data={data} setData={setData} />}
          {step === 4 && <Step4Confirmation name={(data.firstName as string) ?? ""} />}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className={cn("mt-6 flex gap-3", step > 1 ? "justify-between" : "justify-end")}>
          {step > 1 && (
            <Button variant="outline" onClick={goBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back
            </Button>
          )}
          <Button
            variant="primary"
            onClick={goNext}
            loading={loading}
            rightIcon={!loading ? <ArrowRight className="h-4 w-4" /> : undefined}
          >
            {step === 3 ? (loading ? "Creating account…" : "Create account") : "Continue"}
          </Button>
        </div>
      )}

      {step === 1 && (
        <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[hsl(var(--primary))] hover:underline">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
