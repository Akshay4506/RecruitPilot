import * as React from "react";
import { JobEditor } from "@/features/recruiter-jobs/components/editor/job-editor";
import { mockJobs } from "@/features/recruiter-jobs/mock/jobs.mock";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Job | RecruitPilot",
  description: "Edit job posting.",
};

export default async function RecruiterJobEditPage({ params }: { params: Promise<{ jobId: string }> }) {
  // In a real app, this would be a server component fetching from API
  const { jobId } = await params;
  const job = mockJobs.find(j => j.id === jobId);
  
  if (!job) {
    notFound();
  }

  return (
    <JobEditor job={job} mode="edit" />
  );
}
