"use client";

import * as React from "react";
import { ShellLayout } from "./shell-layout";
import { companyAdminNav } from "@/config/nav.config";
import type { ShellLayoutProps } from "./shell-layout";

export type CompanyAdminLayoutProps = Omit<ShellLayoutProps, "navConfig">;

function CompanyAdminLayout({ user, ...props }: CompanyAdminLayoutProps) {
  return (
    <ShellLayout
      navConfig={companyAdminNav}
      user={user}
      contentWidth="fluid"
      headerProps={{ showSearch: true }}
      {...props}
    />
  );
}

export { CompanyAdminLayout };
