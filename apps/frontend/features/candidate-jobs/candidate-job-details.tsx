"use client";

import * as React from "react";
import { mockJobs } from "./mock/jobs.mock";

import { ROUTES } from "@/constants/routes";
import { JobHero } from "./components/details/job-hero";
import { JobOverview } from "./components/details/job-overview";
import { JobSkills } from "./components/details/job-skills";
import { HiringTeam } from "./components/details/hiring-team";
import { JobAttachments } from "./components/details/job-attachments";
import { JobMatchWidget } from "./components/details/job-match-widget";
import { ApplyCtaCard } from "./components/details/apply-cta-card";

import { CompanyOverview } from "./components/company/company-overview";
import { CompanyHiringInsights } from "./components/company/company-hiring-insights";
import { RecommendedJobs } from "./components/recommendations/recommended-jobs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CandidateJobDetailsProps {
  jobId: string;
}

export function CandidateJobDetails({ jobId }: CandidateJobDetailsProps) {
  // Mock data fetch
  const job = mockJobs.find(j => j.id === jobId || j.slug === jobId) || mockJobs[0];

  const handleApply = () => console.log("Apply");
  const handleSave = () => console.log("Save");
  const handleShare = () => console.log("Share");

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        <div>
          <Button variant="ghost" size="sm" asChild className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] pl-0 -ml-2 mb-2">
            <Link href={ROUTES.candidate.jobs}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
            </Link>
          </Button>
          
          <JobHero 
            job={job} 
            onApply={handleApply}
            onSave={handleSave}
            onShare={handleShare}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Content Column (8) */}
          <div className="lg:col-span-8 space-y-6">
            <JobOverview job={job} />
            <JobSkills job={job} />
            <CompanyOverview job={job} />
            <CompanyHiringInsights job={job} />
            <HiringTeam job={job} />
            <JobAttachments job={job} />
          </div>

          {/* Right Sidebar Column (4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6 space-y-6">
              <ApplyCtaCard 
                job={job}
                onApply={handleApply}
                onSave={handleSave}
                onShare={handleShare}
              />
              <JobMatchWidget job={job} />
              <RecommendedJobs jobs={mockJobs.filter(j => j.id !== job.id).slice(0, 3)} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
