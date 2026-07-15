"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShellLayout } from "./shell-layout";
import { recruiterNav } from "@/config/nav.config";
import type { ShellLayoutProps } from "./shell-layout";
import type { Workspace } from "@/types/navigation";

export interface RecruiterLayoutProps extends Omit<ShellLayoutProps, "navConfig"> {
  workspaces?: Workspace[];
  currentWorkspaceId?: string;
  onWorkspaceSwitch?: (id: string) => void;
  notificationCount?: number;
}

function RecruiterLayout({
  user,
  workspaces,
  currentWorkspaceId,
  onWorkspaceSwitch,
  notificationCount = 0,
  headerProps = {},
  ...props
}: RecruiterLayoutProps) {
  const router = useRouter();

  return (
    <ShellLayout
      navConfig={recruiterNav}
      user={user}
      contentWidth="fluid"
      headerProps={{
        workspaces,
        currentWorkspaceId,
        onWorkspaceSwitch,
        notificationCount,
        showSearch: true,
        onProfile: () => router.push("/recruiter/profile"),
        onSettings: () => router.push("/recruiter/settings"),
        ...headerProps,
      }}
      {...props}
    />
  );
}

export { RecruiterLayout };
