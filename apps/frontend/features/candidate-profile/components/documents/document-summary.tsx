import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Download } from "lucide-react";
import { CandidateProfile } from "../../types";

interface DocumentSummaryProps {
  profile: CandidateProfile;
  onUpload?: () => void;
}

export function DocumentSummary({ profile, onUpload }: DocumentSummaryProps) {
  const hasResume = !!profile.resumeUrl;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Documents</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onUpload} aria-label="Upload Document">
          <UploadCloud className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        {hasResume ? (
          <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:border-[hsl(var(--primary)/0.5)] transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-[hsl(var(--foreground))]">Resume</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">Default · PDF</div>
              </div>
            </div>
            <a href={profile.resumeUrl} download className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" aria-label="Download Resume">
              <Download className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--muted)/0.2)]">
            <UploadCloud className="h-8 w-8 text-[hsl(var(--muted-foreground))] mb-2" />
            <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">No resume uploaded</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] text-center mb-3">
              Upload your resume to automatically fill out your profile.
            </div>
            <Button variant="outline" size="sm" onClick={onUpload}>
              Upload Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DocumentSummarySkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-[hsl(var(--muted))] animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-4 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
              <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
            </div>
          </div>
          <div className="h-8 w-8 rounded bg-[hsl(var(--muted))] animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
