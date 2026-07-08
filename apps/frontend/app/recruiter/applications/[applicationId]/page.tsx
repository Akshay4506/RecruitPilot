import * as React from "react";
import { RecruiterApplicationReview } from "@/features/recruiter-applications/recruiter-application-review";
import { mockApplications } from "@/features/recruiter-applications/mock/applications.mock";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Candidate Review | RecruitPilot",
  description: "Review candidate application and collaborate with the hiring team.",
};

export default async function RecruiterApplicationReviewPage({ params }: { params: Promise<{ applicationId: string }> }) {
  // In a real app, this would be a server component fetching from API
  const { applicationId } = await params;
  const application = mockApplications.find(a => a.id === applicationId);
  
  if (!application) {
    notFound();
  }

  return (
    <RecruiterApplicationReview application={application} />
  );
}
