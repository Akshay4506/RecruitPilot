import { AdminRoleWorkspace } from "@/features/admin-rbac/admin-role-workspace";
import { mockRoles } from "@/features/admin-rbac/mock/rbac.mock";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Role Workspace | RecruitPilot",
  description: "Edit role permissions and access policies",
};

interface RolePageProps {
  params: {
    roleId: string;
  };
}

export default function RoleEditorPage({ params }: RolePageProps) {
  const role = mockRoles.find(r => r.id === params.roleId);
  
  if (!role) {
    notFound();
  }

  return <AdminRoleWorkspace role={role} />;
}
