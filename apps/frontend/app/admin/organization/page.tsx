import { AdminOrganization } from "@/features/admin-organization/admin-organization";

export const metadata = {
  title: "Organization Settings | RecruitPilot Admin",
  description: "Manage your company profile, branding, departments, and workspace preferences.",
};

export default function AdminOrganizationPage() {
  return <AdminOrganization />;
}
