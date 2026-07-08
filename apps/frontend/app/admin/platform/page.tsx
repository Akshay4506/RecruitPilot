import { AdminPlatformOperations } from "@/features/admin-platform-operations/admin-platform-operations";

export const metadata = {
  title: "Platform Operations | RecruitPilot",
  description: "Monitor system health, audit logs, background jobs, and manage platform configurations.",
};

export default function AdminPlatformOperationsPage() {
  return <AdminPlatformOperations />;
}
