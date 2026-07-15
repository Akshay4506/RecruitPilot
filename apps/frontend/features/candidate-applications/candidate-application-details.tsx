"use client";

import * as React from "react";
import { mockApplications } from "./mock/applications.mock";

import { ApplicationHero } from "./components/details/application-hero";
import { StatusPipeline } from "./components/details/status-pipeline";
import { ApplicationSnapshots } from "./components/details/application-snapshots";
import { ROUTES } from "@/constants/routes";
import { ApplicationTimelineView } from "./components/timeline/application-timeline-view";
import { ScreeningAnswers } from "./components/details/screening-answers";
import { ApplicationDocuments } from "./components/details/application-documents";
import { RecruiterContact } from "./components/details/recruiter-contact";
import { ApplicationInterviews } from "./components/interview/application-interviews";
import { ApplicationInsights } from "./components/details/application-insights";
import { ApplicationHealthWidget } from "./components/details/application-health-widget";
import { ApplicationActionsCard } from "./components/actions/application-actions-card";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CandidateApplicationDetailsProps {
  applicationId: string;
}

export function CandidateApplicationDetails({ applicationId }: CandidateApplicationDetailsProps) {
  const application = mockApplications.find(a => a.id === applicationId) || mockApplications[0];

  const handleWithdraw = () => void 0

  if (!application) return <div>Application not found</div>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        <div>
          <Button variant="ghost" size="sm" asChild className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] pl-0 -ml-2 mb-2">
            <Link href={ROUTES.candidate.applications}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tracker
            </Link>
          </Button>
          
          <ApplicationHero application={application} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Content Column (8) */}
          <div className="lg:col-span-8 space-y-6">
            <StatusPipeline application={application} />
            <ApplicationInterviews application={application} />
            <ApplicationSnapshots application={application} />
            <ScreeningAnswers application={application} />
            <ApplicationDocuments application={application} />
            <RecruiterContact application={application} />
            <ApplicationTimelineView application={application} />
          </div>

          {/* Right Sidebar Column (4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6 space-y-6">
              <ApplicationActionsCard application={application} onWithdraw={handleWithdraw} />
              <ApplicationHealthWidget application={application} />
              <ApplicationInsights application={application} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
