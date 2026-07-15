"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShellLayout } from "./shell-layout";
import { companyAdminNav } from "@/config/nav.config";
import type { ShellLayoutProps } from "./shell-layout";

export type CompanyAdminLayoutProps = Omit<ShellLayoutProps, "navConfig">;

function CompanyAdminLayout({ user, headerProps, ...props }: CompanyAdminLayoutProps) {
  const router = useRouter();

  return (
    <ShellLayout
      navConfig={companyAdminNav}
      user={user}
      contentWidth="fluid"
      headerProps={{ 
        showSearch: true,
        onProfile: () => router.push("/admin/profile"),
        onSettings: () => router.push("/admin/settings"),
        ...headerProps
      }}
      {...props}
    />
  );
}

export { CompanyAdminLayout };
