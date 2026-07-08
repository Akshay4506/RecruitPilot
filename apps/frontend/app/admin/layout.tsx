import * as React from "react";
import { CompanyAdminLayout } from "@/components/layouts/admin-layout";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const mockUser = {
    name: "Alex Admin",
    email: "alex@recruitpilot.com",
    role: "Company Administrator",
  };

  return <CompanyAdminLayout user={mockUser}>{children}</CompanyAdminLayout>;
}
