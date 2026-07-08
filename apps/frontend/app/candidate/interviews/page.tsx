import { CandidateInterviews } from "@/features/candidate-interviews/candidate-interviews";

export const metadata = {
  title: "Interview Center | RecruitPilot",
  description: "Manage your upcoming interviews.",
};

export default function InterviewsPage() {
  return <CandidateInterviews />;
}
