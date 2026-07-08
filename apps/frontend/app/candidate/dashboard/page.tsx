import * as React from "react";
import { CandidateDashboard } from "@/features/candidate-dashboard/candidate-dashboard";

export const metadata = {
  title: "Dashboard | RecruitPilot",
  description: "Candidate dashboard overview",
};

export default function CandidateDashboardPage() {
  return <CandidateDashboard />;
}
