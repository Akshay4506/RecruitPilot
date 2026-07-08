import { AdminRbac } from "@/features/admin-rbac/admin-rbac";

export const metadata = {
  title: "Roles & Permissions | RecruitPilot",
  description: "Manage system access and permissions",
};

export default function AdminRolesPage() {
  return <AdminRbac />;
}
