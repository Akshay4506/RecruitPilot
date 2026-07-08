import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Progress } from "@/components/ui/primitives";
import { Skeleton } from "@/components/loaders/skeleton";

export function ProfileCompletion() {
  const sections = [
    { label: "Personal Details", progress: 100 },
    { label: "Professional Experience", progress: 80 },
    { label: "Education", progress: 100 },
    { label: "Skills", progress: 90 },
    { label: "Projects", progress: 40 },
    { label: "Documents", progress: 100 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-[hsl(var(--foreground))]">{section.label}</span>
                <span className="text-[hsl(var(--muted-foreground))]">{section.progress}%</span>
              </div>
              <Progress 
                value={section.progress} 
                size="sm" 
                variant={section.progress === 100 ? "success" : section.progress > 60 ? "default" : "warning"}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileCompletionSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-36" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-1 w-full rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
