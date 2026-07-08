import * as React from "react";
import { RecruiterCandidates } from "@/features/recruiter-candidates/recruiter-candidates";

export const metadata = {
  title: "Candidate Directory | RecruitPilot",
  description: "Browse, filter, and manage your entire talent pool.",
};

export default function RecruiterCandidatesPage() {
  return (
    <div className="p-6 sm:p-8">
      <RecruiterCandidates />
    </div>
  );
}
