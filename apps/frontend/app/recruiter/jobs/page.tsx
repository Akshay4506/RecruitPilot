import * as React from "react";
import { RecruiterJobs } from "@/features/recruiter-jobs/recruiter-jobs";

export const metadata = {
  title: "Job Management | RecruitPilot",
  description: "Manage your active and archived job postings.",
};

export default function RecruiterJobsPage() {
  return (
    <RecruiterJobs />
  );
}
