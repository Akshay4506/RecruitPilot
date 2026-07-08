"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Zap, Users, BarChart3, Shield,
  Star, ChevronDown, Briefcase, Calendar, FileText,
  TrendingUp, Globe, Award, Play, Sparkles
} from "lucide-react";
import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";
import { ROUTES } from "@/constants/routes";

// ─────────────────────────────────────────────────────────────────────────────
// Animation helpers
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const trustedCompanies = [
  "Stripe", "Vercel", "Linear", "Notion", "Figma", "Atlassian", "Databricks", "Rippling",
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Instantly surface top candidates with ML-driven scoring that learns from your hiring patterns.",
    color: "text-[hsl(var(--primary))]",
    bg: "bg-[hsl(var(--accent))]",
  },
  {
    icon: Calendar,
    title: "Structured Interviews",
    description: "Standardize interview scorecards. Eliminate bias with structured question banks and calibration tools.",
    color: "text-[hsl(var(--success))]",
    bg: "bg-[hsl(var(--success-bg))]",
  },
  {
    icon: BarChart3,
    title: "Hiring Analytics",
    description: "Real-time funnel metrics, source ROI, time-to-hire, and DEI dashboards in one place.",
    color: "text-[hsl(var(--info))]",
    bg: "bg-[hsl(var(--info-bg))]",
  },
  {
    icon: Users,
    title: "Collaborative Hiring",
    description: "Bring your whole team into the process with shared pipelines, comments, and @mentions.",
    color: "text-[hsl(var(--warning))]",
    bg: "bg-[hsl(var(--warning-bg))]",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II, GDPR-compliant data handling, SSO, and custom data retention policies.",
    color: "text-[hsl(var(--primary))]",
    bg: "bg-[hsl(var(--accent))]",
  },
  {
    icon: Globe,
    title: "Global Talent Pools",
    description: "Source candidates across 50+ job boards, LinkedIn, and your own careers page — unified in one inbox.",
    color: "text-[hsl(var(--success))]",
    bg: "bg-[hsl(var(--success-bg))]",
  },
];

const stats = [
  { value: "3.2×", label: "Faster time-to-hire" },
  { value: "94%", label: "Candidate satisfaction" },
  { value: "500+", label: "Companies hiring" },
  { value: "2.1M", label: "Candidates placed" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Talent, Vercel",
    avatar: "SC",
    quote: "RecruitPilot cut our time-to-hire from 45 to 14 days. The AI matching is genuinely impressive — it surfaces candidates we would've missed.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "VP People, Linear",
    avatar: "MR",
    quote: "We've tried every ATS on the market. RecruitPilot is the first one our hiring managers actually want to use. The interview scorecard feature alone is worth it.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Talent Lead, Stripe",
    avatar: "PK",
    quote: "The analytics dashboard gave us visibility we never had. Now I can tell our CEO exactly why we're succeeding or where we're losing top candidates.",
    rating: 5,
  },
];

const candidateJourney = [
  { step: "01", title: "Discover Jobs", desc: "Browse curated opportunities matched to your skills and career goals.", icon: Briefcase },
  { step: "02", title: "Smart Apply", desc: "One-click apply with your RecruitPilot profile. No repetitive forms.", icon: FileText },
  { step: "03", title: "Track Progress", desc: "Real-time status updates at every stage. Never left in the dark.", icon: TrendingUp },
  { step: "04", title: "Land the Role", desc: "Interview prep resources, salary benchmarks, and offer negotiation tips.", icon: Award },
];

const recruiterJourney = [
  { step: "01", title: "Post & Source", desc: "Publish to 50+ job boards instantly. AI writes compelling job descriptions.", icon: Globe },
  { step: "02", title: "Screen & Score", desc: "AI ranks applicants by fit. Your team focuses on the top 20%.", icon: Sparkles },
  { step: "03", title: "Interview", desc: "Structured scorecards ensure every candidate gets a fair, consistent evaluation.", icon: Calendar },
  { step: "04", title: "Hire & Retain", desc: "Offer management, e-signatures, and onboarding handoff — all in one place.", icon: CheckCircle2 },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "Free forever",
    desc: "For small teams just getting started with structured hiring.",
    features: ["Up to 3 active jobs", "50 candidates/month", "Basic analytics", "Email support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$199",
    period: "per month",
    desc: "For scaling teams that need AI-powered hiring at speed.",
    features: ["Unlimited jobs", "Unlimited candidates", "AI matching & scoring", "Advanced analytics", "Calendar integrations", "Priority support"],
    cta: "Start trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    desc: "For global teams with complex workflows and compliance needs.",
    features: ["Everything in Growth", "SSO / SAML", "Custom workflows", "Dedicated CSM", "SLA guarantee", "GDPR & SOC 2"],
    cta: "Talk to sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How does RecruitPilot's AI matching work?",
    a: "Our ML models analyze 200+ signals from a candidate's profile, your job requirements, and patterns from your past successful hires. The result is a fit score that predicts performance — not just keyword matching.",
  },
  {
    q: "Can I migrate from Greenhouse / Lever?",
    a: "Yes. We have one-click importers for Greenhouse, Lever, Workday, and most major ATS platforms. Migration typically takes under 2 hours.",
  },
  {
    q: "Is my candidate data secure?",
    a: "RecruitPilot is SOC 2 Type II certified and GDPR compliant. Data is encrypted at rest and in transit. You own your data and can export or delete it at any time.",
  },
  {
    q: "Do you have a free trial?",
    a: "Yes — our Starter plan is free forever. Growth and Enterprise plans include a 14-day trial with no credit card required.",
  },
  {
    q: "What integrations do you support?",
    a: "We integrate with Google Workspace, Microsoft 365, Slack, Notion, LinkedIn, 50+ job boards, DocuSign, and more via Zapier and native APIs.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Section components
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex justify-center mb-4">
      <span className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        "border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"
      )}>
        {children}
      </span>
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="text-3xl sm:text-4xl font-bold text-center text-[hsl(var(--foreground))] tracking-tight leading-tight"
    >
      {children}
    </motion.h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="mt-4 text-center text-base text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
    >
      {children}
    </motion.p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Item
// ─────────────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn(
      "rounded-xl border border-[hsl(var(--border))] overflow-hidden",
      "transition-colors duration-200",
      open ? "bg-[hsl(var(--accent))]" : "bg-[hsl(var(--card))]"
    )}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[hsl(var(--foreground))] pr-4">{q}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Landing Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <PublicLayout fluid>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[hsl(var(--primary)/0.06)] blur-3xl" />
          <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-[hsl(var(--info)/0.04)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger(0.12)}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <span className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold",
                "border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]",
                "shadow-sm"
              )}>
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
                Now with GPT-4o powered candidate matching
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[hsl(var(--foreground))] leading-[1.08] mb-6"
            >
              Hire better.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(258,90%,75%)]">
                Move faster.
              </span>
              <br />
              Build elite teams.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8"
            >
              RecruitPilot is the AI-native recruitment platform that replaces 5 tools with one.
              From sourcing to offer — streamlined, collaborative, and built for enterprise hiring teams.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="xl"
                asChild
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href={ROUTES.auth.register}>Start hiring free</Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                leftIcon={<Play className="h-4 w-4" />}
                asChild
              >
                <Link href="#demo">Watch 2-min demo</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-xs text-[hsl(var(--muted-foreground))]"
            >
              No credit card required · 14-day free trial · Setup in 5 minutes
            </motion.p>
          </motion.div>

          {/* Product illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0, 0, 0.2, 1] }}
            className="mt-16 relative"
          >
            <div className={cn(
              "mx-auto max-w-5xl rounded-2xl border border-[hsl(var(--border))]",
              "bg-[hsl(var(--card))] shadow-2xl overflow-hidden"
            )}>
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--danger))]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--warning))]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" />
                <div className="mx-auto flex items-center gap-2 rounded border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>app.recruitpilot.io/recruiter/dashboard</span>
                </div>
              </div>
              {/* Dashboard preview */}
              <div className="p-6 bg-[hsl(var(--background))] min-h-[320px]">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Active Jobs", val: "24", trend: "+3" },
                    { label: "Applications", val: "1,247", trend: "+89" },
                    { label: "Interviews", val: "38", trend: "+12" },
                    { label: "Offers Sent", val: "6", trend: "+2" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">{m.label}</p>
                      <p className="text-xl font-bold text-[hsl(var(--foreground))] tabular-nums">{m.val}</p>
                      <p className="text-xs text-[hsl(var(--success))] mt-0.5">{m.trend} this week</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3">HIRING FUNNEL</p>
                    <div className="space-y-2">
                      {[
                        { label: "Applied", w: "100%", count: "1,247" },
                        { label: "Screened", w: "62%", count: "772" },
                        { label: "Interview", w: "21%", count: "261" },
                        { label: "Offer", w: "5%", count: "62" },
                      ].map((stage) => (
                        <div key={stage.label} className="flex items-center gap-2">
                          <span className="w-16 text-xs text-[hsl(var(--muted-foreground))]">{stage.label}</span>
                          <div className="flex-1 h-2 rounded-full bg-[hsl(var(--muted))]">
                            <div
                              className="h-full rounded-full bg-[hsl(var(--primary))]"
                              style={{ width: stage.w }}
                            />
                          </div>
                          <span className="w-10 text-xs text-[hsl(var(--foreground))] font-medium tabular-nums text-right">{stage.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3">TOP CANDIDATES</p>
                    <div className="space-y-2">
                      {["Alex Kim", "Priya S.", "Jordan T.", "Maria L."].map((name, i) => (
                        <div key={name} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[hsl(var(--primary)/0.15)] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--primary))]">
                            {name[0]}
                          </div>
                          <span className="text-xs text-[hsl(var(--foreground))] flex-1 truncate">{name}</span>
                          <span className="text-[10px] font-semibold text-[hsl(var(--success))]">{98 - i * 4}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trusted By ────────────────────────────────────────────────────── */}
      <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-6">
            Trusted by engineering-forward teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedCompanies.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-[hsl(var(--muted-foreground)/0.6)] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <SectionLabel><Zap className="h-3 w-3" /> Platform Features</SectionLabel>
          <SectionHeading>Everything your hiring team needs</SectionHeading>
          <SectionSubtitle>
            Replace your patchwork of spreadsheets, email threads, and legacy ATS tools
            with one platform built for modern, data-driven hiring.
          </SectionSubtitle>

          <motion.div
            variants={stagger(0.08)}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className={cn(
                  "group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6",
                  "hover:border-[hsl(var(--primary)/0.3)] hover:shadow-lg transition-all duration-300"
                )}
              >
                <div className={cn("mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl", f.bg)}>
                  <f.icon className={cn("h-5 w-5", f.color)} aria-hidden />
                </div>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">{f.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--primary))] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <p className="text-4xl font-bold text-white tabular-nums mb-1">{s.value}</p>
                <p className="text-sm text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Candidate Journey ─────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <SectionLabel><Users className="h-3 w-3" /> For Candidates</SectionLabel>
          <SectionHeading>Your career, on autopilot</SectionHeading>
          <SectionSubtitle>
            Stop chasing recruiters. With RecruitPilot, your profile works for you —
            surfacing opportunities that actually fit your skills and goals.
          </SectionSubtitle>
          <motion.div variants={stagger(0.1)} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidateJourney.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent))]">
                    <step.icon className="h-6 w-6 text-[hsl(var(--primary))]" aria-hidden />
                  </div>
                </div>
                <p className="text-xs font-bold text-[hsl(var(--primary))] mb-1">{step.step}</p>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">{step.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex justify-center">
            <Button variant="outline" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href={ROUTES.auth.register}>Join as a candidate</Link>
            </Button>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Recruiter Journey ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[hsl(var(--muted)/0.4)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <SectionLabel><Briefcase className="h-3 w-3" /> For Recruiters</SectionLabel>
            <SectionHeading>Your hiring process, reimagined</SectionHeading>
            <SectionSubtitle>
              Cut busywork by 80%. Let AI handle the top-of-funnel.
              Your team focuses on what matters: building real relationships.
            </SectionSubtitle>
            <motion.div variants={stagger(0.1)} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recruiterJourney.map((step) => (
                <motion.div key={step.step} variants={fadeUp} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)]">
                      <step.icon className="h-6 w-6 text-[hsl(var(--primary))]" aria-hidden />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[hsl(var(--primary))] mb-1">{step.step}</p>
                  <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">{step.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <Button asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/company-register">Start hiring for free</Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <SectionLabel><Star className="h-3 w-3" /> Testimonials</SectionLabel>
          <SectionHeading>Loved by hiring teams worldwide</SectionHeading>
          <motion.div variants={stagger(0.1)} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className={cn(
                  "rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6",
                  "hover:shadow-lg transition-shadow duration-300"
                )}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" aria-hidden />
                  ))}
                </div>
                <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{t.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-[hsl(var(--muted)/0.4)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <SectionLabel>Pricing</SectionLabel>
            <SectionHeading>Simple, transparent pricing</SectionHeading>
            <SectionSubtitle>No hidden fees. No per-seat surprises. Start free, scale when ready.</SectionSubtitle>
            <motion.div variants={stagger(0.1)} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={cn(
                    "rounded-2xl border p-6 flex flex-col",
                    plan.highlight
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white shadow-xl shadow-[hsl(var(--primary)/0.3)] scale-[1.03]"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                  )}
                >
                  <p className={cn("text-xs font-bold uppercase tracking-widest mb-1", plan.highlight ? "text-white/70" : "text-[hsl(var(--muted-foreground))]")}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={cn("text-3xl font-bold tabular-nums", plan.highlight ? "text-white" : "text-[hsl(var(--foreground))]")}>{plan.price}</span>
                    <span className={cn("text-xs", plan.highlight ? "text-white/60" : "text-[hsl(var(--muted-foreground))]")}>{plan.period}</span>
                  </div>
                  <p className={cn("text-xs mb-5 leading-relaxed", plan.highlight ? "text-white/70" : "text-[hsl(var(--muted-foreground))]")}>{plan.desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={cn("h-4 w-4 shrink-0", plan.highlight ? "text-white/80" : "text-[hsl(var(--success))]")} aria-hidden />
                        <span className={plan.highlight ? "text-white/90" : "text-[hsl(var(--foreground))]"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlight ? "secondary" : "outline"}
                    asChild
                    className="w-full"
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>{plan.cta}</Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-3xl px-4 sm:px-6">
        <AnimatedSection>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>Common questions</SectionHeading>
          <motion.div variants={stagger(0.07)} className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <motion.div key={faq.q} variants={fadeUp}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className={cn(
              "rounded-3xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(258,85%,55%)]",
              "p-10 sm:p-16 text-center relative overflow-hidden"
            )}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white" />
              <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white" />
            </div>
            <h2 className="relative text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to transform your hiring?
            </h2>
            <p className="relative text-white/75 text-base mb-8 max-w-xl mx-auto">
              Join 500+ companies using RecruitPilot to hire faster, smarter, and more equitably.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="xl" variant="secondary" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href={ROUTES.auth.register}>Get started free</Link>
              </Button>
              <Button size="xl" variant="ghost" className="text-white border-white/30 border hover:bg-white/10" asChild>
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </PublicLayout>
  );
}
