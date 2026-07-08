import { RecruiterPipeline } from "@/features/recruiter-pipeline/recruiter-pipeline";

export const metadata = {
  title: "Pipeline | RecruitPilot ATS",
  description: "Manage candidate pipeline.",
};

export default function RecruiterPipelinePage() {
  return <RecruiterPipeline />;
}
