import * as React from "react";
import { CandidateLayout } from "@/components/layouts/candidate-layout";

export default function CandidateRootLayout({ children }: { children: React.ReactNode }) {
  const mockUser = {
    name: "John Candidate",
    email: "john@example.com",
    role: "Candidate",
  };

  return <CandidateLayout user={mockUser}>{children}</CandidateLayout>;
}
