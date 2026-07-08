import { CandidateApplications } from "@/features/candidate-applications/candidate-applications";

export const metadata = {
  title: "Application Tracker | RecruitPilot",
  description: "Track your job applications and interviews.",
};

export default function ApplicationsPage() {
  return <CandidateApplications />;
}
