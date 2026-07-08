import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";

export function SettingsCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={`border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] ${className || ""}`}>
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
}
