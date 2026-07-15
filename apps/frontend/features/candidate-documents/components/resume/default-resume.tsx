import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, RefreshCw, Trash2 } from "lucide-react";
import { CandidateDocument } from "../../types";
import { DocumentStatusChip } from "../document-status-chip";
import { formatDate } from "@/lib/utils";

interface DefaultResumeProps {
  resume: CandidateDocument;
  onPreview?: (doc: CandidateDocument) => void;
  onDownload?: (doc: CandidateDocument) => void;
  onReplace?: () => void;
  onDelete?: (doc: CandidateDocument) => void;
}

export function DefaultResume({ resume, onPreview, onDownload, onReplace, onDelete }: DefaultResumeProps) {
  if (!resume) return null;

  const sizeMB = (resume.sizeBytes / (1024 * 1024)).toFixed(2);

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Default Resume</CardTitle>
          <Badge variant="success" size="sm">Active Default</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="font-semibold text-[hsl(var(--foreground))] truncate text-base" title={resume.name}>
              {resume.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <span className="font-medium text-[hsl(var(--foreground))]">Version {resume.version}</span>
              <span>&bull;</span>
              <span>{sizeMB} MB</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <DocumentStatusChip status={resume.status} />
              {resume.visibility === "PUBLIC" && (
                <Badge variant="outline" size="sm" className="text-[hsl(var(--muted-foreground))]">Public</Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[hsl(var(--muted-foreground))] text-xs mb-1">Uploaded</div>
            <div className="font-medium text-[hsl(var(--foreground))]">{formatDate(resume.createdAt || "", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
          <div>
            <div className="text-[hsl(var(--muted-foreground))] text-xs mb-1">Last Updated</div>
            <div className="font-medium text-[hsl(var(--foreground))]">{formatDate(resume.updatedAt || "", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.2)] flex flex-wrap gap-2 justify-between">
        <div className="flex flex-1 min-w-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => onPreview?.(resume)} className="flex-1 min-w-0 px-2">
            <Eye className="mr-1.5 h-4 w-4 shrink-0" />
            <span className="truncate">Preview</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => onDownload?.(resume)} className="flex-1 min-w-0 px-2">
            <Download className="mr-1.5 h-4 w-4 shrink-0" />
            <span className="truncate">Download</span>
          </Button>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="icon-sm" onClick={onReplace} aria-label="Replace Resume">
            <RefreshCw className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => onDelete?.(resume)} aria-label="Delete Resume">
            <Trash2 className="h-4 w-4 text-[hsl(var(--danger))]" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function DefaultResumeSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 bg-[hsl(var(--muted))] animate-pulse rounded shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-3 w-1/3 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-[hsl(var(--border))] flex gap-2">
        <div className="h-9 flex-1 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-9 flex-1 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-9 w-9 bg-[hsl(var(--muted))] animate-pulse rounded shrink-0" />
        <div className="h-9 w-9 bg-[hsl(var(--muted))] animate-pulse rounded shrink-0" />
      </CardFooter>
    </Card>
  );
}
