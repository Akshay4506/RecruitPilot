import { AdminUsers } from "@/features/admin-users/admin-users";

export const metadata = {
  title: "Users | RecruitPilot Admin",
  description: "Manage platform access, roles, and security policies.",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
