import * as React from "react";
import { RecruiterLayout } from "@/components/layouts/recruiter-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Workspace | RecruitPilot",
  description: "Manage jobs, applications, and interviews",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const mockUser = {
    name: "Sarah Connor",
    email: "sarah@acmecorp.com"
  };

  return <RecruiterLayout user={mockUser}>{children}</RecruiterLayout>;
}
