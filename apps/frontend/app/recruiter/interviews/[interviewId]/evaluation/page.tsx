import { RecruiterEvaluationWorkspace } from "@/features/recruiter-interviews/recruiter-evaluation-workspace";

export const metadata = {
  title: "Evaluation | RecruitPilot ATS",
  description: "Evaluate candidate interview.",
};

export default function EvaluationPage({ params }: { params: { interviewId: string } }) {
  return <RecruiterEvaluationWorkspace interviewId={params.interviewId} />;
}
