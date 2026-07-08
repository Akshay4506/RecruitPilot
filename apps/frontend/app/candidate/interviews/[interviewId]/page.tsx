import { CandidateInterviewDetails } from "@/features/candidate-interviews/candidate-interview-details";

export const metadata = {
  title: "Interview Details | RecruitPilot",
  description: "View details of your upcoming interview.",
};

interface InterviewDetailsPageProps {
  params: {
    interviewId: string;
  };
}

export default function InterviewDetailsPage({ params }: InterviewDetailsPageProps) {
  return <CandidateInterviewDetails interviewId={params.interviewId} />;
}
