import { RecruiterInterviewWorkspace } from "@/features/recruiter-interviews/recruiter-interview-workspace";

export const metadata = {
  title: "Interview Workspace | RecruitPilot ATS",
  description: "Execute candidate interview.",
};

export default function InterviewWorkspacePage({ params }: { params: { interviewId: string } }) {
  return <RecruiterInterviewWorkspace interviewId={params.interviewId} />;
}
