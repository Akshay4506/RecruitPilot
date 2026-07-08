import * as React from "react";
import { JobEditor } from "@/features/recruiter-jobs/components/editor/job-editor";

export const metadata = {
  title: "Create Job | RecruitPilot",
  description: "Create a new job posting.",
};

export default function RecruiterJobNewPage() {
  return (
    <JobEditor mode="create" />
  );
}
