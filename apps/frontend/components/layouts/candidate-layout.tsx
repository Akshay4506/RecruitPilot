"use client";

import * as React from "react";
import { ShellLayout } from "./shell-layout";
import { candidateNav } from "@/config/nav.config";
import type { ShellLayoutProps } from "./shell-layout";

export type CandidateLayoutProps = Omit<ShellLayoutProps, "navConfig">;

function CandidateLayout({ user, ...props }: CandidateLayoutProps) {
  return (
    <ShellLayout
      navConfig={candidateNav}
      user={user}
      contentWidth="wide"
      {...props}
    />
  );
}

export { CandidateLayout };
