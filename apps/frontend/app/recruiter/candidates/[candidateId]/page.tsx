import * as React from "react";
import { RecruiterCandidateWorkspace } from "@/features/recruiter-candidates/recruiter-candidate-workspace";
import { mockCandidates } from "@/features/recruiter-candidates/mock/candidates.mock";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Candidate Workspace | RecruitPilot",
  description: "Comprehensive 360° view of candidate history, skills, and applications.",
};

export default async function RecruiterCandidateWorkspacePage({ params }: { params: Promise<{ candidateId: string }> }) {
  // In a real app, this would be a server component fetching from API
  const { candidateId } = await params;
  const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidates[0]; // fallback to first mock for testing UI
  
  if (!candidate) {
    notFound();
  }

  return (
    <RecruiterCandidateWorkspace candidate={candidate} />
  );
}
