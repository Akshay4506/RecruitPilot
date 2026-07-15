"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShellLayout } from "./shell-layout";
import { candidateNav } from "@/config/nav.config";
import type { ShellLayoutProps } from "./shell-layout";

export type CandidateLayoutProps = Omit<ShellLayoutProps, "navConfig">;

function CandidateLayout({ user, headerProps, ...props }: CandidateLayoutProps) {
  const router = useRouter();

  return (
    <ShellLayout
      navConfig={candidateNav}
      user={user}
      contentWidth="wide"
      headerProps={{
        onProfile: () => router.push("/candidate/profile"),
        onSettings: () => router.push("/candidate/settings"),
        ...headerProps,
      }}
      {...props}
    />
  );
}

export { CandidateLayout };
