import { AdminBilling } from "@/features/admin-platform/admin-billing";

export const metadata = {
  title: "Platform Administration | RecruitPilot",
  description: "Manage subscription, billing, usage, integrations, and developer API settings.",
};

export default function AdminBillingPage() {
  return <AdminBilling />;
}
