import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/loaders/skeleton";
import { FileText, Download, MoreVertical, UploadCloud } from "lucide-react";
import { mockCandidate } from "../mock-data";

export function ResumeCard() {
  const candidate = mockCandidate;
  const hasResume = !!candidate.resumeUrl;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Resume</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        {hasResume ? (
          <div className="rounded-xl border border-[hsl(var(--border))] p-4 flex items-center gap-4 bg-[hsl(var(--muted)/0.3)]">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                {candidate.firstName}_Resume_2026.pdf
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Uploaded {new Date(candidate.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[hsl(var(--border))] p-6 text-center">
            <div className="mx-auto h-10 w-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
            <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">No resume uploaded</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Upload your resume to apply faster</p>
            <Button size="sm" variant="outline" className="w-full">
              <UploadCloud className="h-3.5 w-3.5 mr-1.5" /> Upload Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ResumeCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex-row items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-[hsl(var(--border))] p-4 flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}
