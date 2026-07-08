import { CandidateApplicationDetails } from "@/features/candidate-applications/candidate-application-details";

export const metadata = {
  title: "Application Details | RecruitPilot",
  description: "View details of your job application.",
};

interface ApplicationDetailsPageProps {
  params: {
    applicationId: string;
  };
}

export default function ApplicationDetailsPage({ params }: ApplicationDetailsPageProps) {
  return <CandidateApplicationDetails applicationId={params.applicationId} />;
}
