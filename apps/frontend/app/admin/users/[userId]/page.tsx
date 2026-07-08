import { AdminUserDetails } from "@/features/admin-users/admin-user-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Details | RecruitPilot Admin",
  description: "View and manage user details, security, and activity.",
};

interface UserDetailsPageProps {
  params: {
    userId: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  return <AdminUserDetails userId={params.userId} />;
}
