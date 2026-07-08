import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export function ConfigurationStatus() {
  const statuses = [
    { label: "Company Profile", completed: true },
    { label: "Branding", completed: true },
    { label: "Departments", completed: true },
    { label: "Offices", completed: true },
    { label: "Working Hours", completed: true },
    { label: "Holiday Calendar", completed: true },
    { label: "Hiring Defaults", completed: true },
    { label: "Notification Preferences", completed: false },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Configuration Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {statuses.map((status, i) => (
            <li key={i} className="flex items-center gap-3">
              {status.completed ? (
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />
              )}
              <span className={`text-sm ${status.completed ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] font-medium"}`}>
                {status.label}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
