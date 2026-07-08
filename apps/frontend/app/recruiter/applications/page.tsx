import * as React from "react";
import { RecruiterApplications } from "@/features/recruiter-applications/recruiter-applications";

export const metadata = {
  title: "Application Inbox | RecruitPilot",
  description: "Review candidates, manage statuses, and build your pipeline.",
};

export default function RecruiterApplicationsPage() {
  return (
    <RecruiterApplications />
  );
}
