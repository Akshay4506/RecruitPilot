import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Search, UploadCloud, Calendar, FileText, ChevronRight } from "lucide-react";

export function ProfileQuickActions() {
  const actions = [
    { label: "Browse Jobs", icon: <Search className="h-4 w-4" />, variant: "primary" as const },
    { label: "Upload Resume", icon: <UploadCloud className="h-4 w-4" />, variant: "outline" as const },
    { label: "View Applications", icon: <FileText className="h-4 w-4" />, variant: "outline" as const },
    { label: "Schedule Interview", icon: <Calendar className="h-4 w-4" />, variant: "outline" as const },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant}
              className="w-full justify-between"
              size="md"
              leftIcon={action.icon}
              rightIcon={<ChevronRight className="h-4 w-4 opacity-50" />}
            >
              <span className="flex-1 text-left px-2">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileQuickActionsSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="pb-3">
        <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 w-full bg-[hsl(var(--muted))] animate-pulse rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
