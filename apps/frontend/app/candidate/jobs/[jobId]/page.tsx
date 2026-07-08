import { CandidateJobDetails } from "@/features/candidate-jobs/candidate-job-details";

export const metadata = {
  title: "Job Details | RecruitPilot",
  description: "View job details, requirements, and apply.",
};

export default function CandidateJobDetailsPage({ params }: { params: { jobId: string } }) {
  return <CandidateJobDetails jobId={params.jobId} />;
}
