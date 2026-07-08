"use client";
import * as React from "react";

export function SettingsSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
      {children}
    </div>
  );
}
