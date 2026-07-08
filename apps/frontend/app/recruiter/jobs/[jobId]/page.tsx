import * as React from "react";
import { RecruiterJobDetails } from "@/features/recruiter-jobs/recruiter-job-details";
import { mockJobs } from "@/features/recruiter-jobs/mock/jobs.mock";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Job Details | RecruitPilot",
  description: "View job details and analytics.",
};

export default async function RecruiterJobDetailsPage({ params }: { params: Promise<{ jobId: string }> }) {
  // In a real app, this would be a server component fetching from API
  const { jobId } = await params;
  const job = mockJobs.find(j => j.id === jobId);
  
  if (!job) {
    notFound();
  }

  return (
    <RecruiterJobDetails job={job} />
  );
}
