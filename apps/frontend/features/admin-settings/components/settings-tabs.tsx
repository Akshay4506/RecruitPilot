"use client";
import * as React from "react";

export function SettingsTabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] overflow-hidden p-2">
      {children}
    </div>
  );
}
