"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";
import { Job } from "./types";
import { RecruiterJobHero } from "./components/details/recruiter-job-hero";
import { JobDescription } from "./components/details/job-description";
import { HiringTeam } from "./components/details/hiring-team";
import { SkillsTechnologies } from "./components/details/skills-technologies";
import { BenefitsSection } from "./components/details/benefits-section";
import { AttachmentsSection } from "./components/details/attachments-section";
import { HiringStages } from "./components/details/hiring-stages";
import { PublishingHistorySection } from "./components/details/publishing-history";
import { JobSummaryWidget } from "@/components/analytics/job-summary-widget";
import { JobPerformance } from "./components/analytics/job-performance";
import { PipelineSummary } from "./components/analytics/pipeline-summary";
import { HiringInsights } from "./components/analytics/hiring-insights";
import { QuickActions } from "./components/actions/quick-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RecruiterJobDetailsProps {
  job: Job;
}

export function RecruiterJobDetails({ job }: RecruiterJobDetailsProps) {
  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto space-y-8 pb-12"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="shrink-0 rounded-full">
          <Link href={ROUTES.recruiter.jobs}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          <Link href={ROUTES.recruiter.jobs} className="hover:text-[hsl(var(--foreground))] transition-colors">Jobs</Link>
          <span className="mx-2">/</span>
          <span className="text-[hsl(var(--foreground))]">{job.title}</span>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <RecruiterJobHero job={job} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <JobSummaryWidget 
          views={job.analytics.viewsCount}
          applications={job.analytics.applicationsCount}
          interviews={job.analytics.interviewsCount}
          offers={job.analytics.offersCount}
          hires={job.analytics.hiresCount}
          conversionRate={job.analytics.conversionRate}
          timeOpenDays={job.analytics.avgTimeToFillDays || 14}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <JobDescription job={job} />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <SkillsTechnologies job={job} />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <HiringTeam job={job} />
          </motion.div>

          {job.benefits.length > 0 && (
            <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
              <BenefitsSection job={job} />
            </motion.div>
          )}

          {job.attachments.length > 0 && (
            <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
              <AttachmentsSection job={job} />
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <HiringStages />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <PublishingHistorySection job={job} />
          </motion.div>

        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.div variants={fadeUp}>
            <QuickActions job={job} />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <HiringInsights job={job} />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <PipelineSummary job={job} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <JobPerformance job={job} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
