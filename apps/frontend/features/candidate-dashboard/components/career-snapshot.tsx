import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/loaders/skeleton";
import { mockCandidate } from "../mock-data";

export function CareerSnapshot() {
  const candidate = mockCandidate;
  const currentRole = candidate.experience.find(e => e.isCurrent);
  const highestDegree = candidate.education[0];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  };

  const snapshotItems = [
    { label: "Current Role", value: currentRole ? currentRole.title : "Not specified" },
    { label: "Current Company", value: currentRole ? currentRole.company : "Not specified" },
    { label: "Highest Degree", value: highestDegree ? highestDegree.degree : "Not specified" },
    { label: "Preferred Location", value: candidate.location || "Not specified" },
    { label: "Expected Salary", value: candidate.expectedSalary && candidate.expectedSalaryCurrency ? formatCurrency(candidate.expectedSalary, candidate.expectedSalaryCurrency) : "Open" },
    { label: "Employment Type", value: "Full-Time, Remote" }, // Hardcoded for this mockup as it's missing from DTO
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Career Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
          {snapshotItems.map((item, idx) => (
            <div key={idx}>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1 font-medium">{item.label}</div>
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">{item.value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[hsl(var(--border))]">
          <div className="text-xs text-[hsl(var(--muted-foreground))] mb-2 font-medium">Top Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 6).map(skill => (
              <Badge key={skill} variant="outline" className="font-normal">{skill}</Badge>
            ))}
            {candidate.skills.length > 6 && (
              <Badge variant="outline" className="font-normal">+{candidate.skills.length - 6}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CareerSnapshotSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[hsl(var(--border))]">
          <Skeleton className="h-3 w-20 mb-2" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
