import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, RotateCcw, Trash2 } from "lucide-react";
import { CandidateDocument } from "../../types";
import { formatDate } from "@/lib/utils";

interface VersionHistoryProps {
  history: CandidateDocument[];
  onPreview?: (doc: CandidateDocument) => void;
  onDownload?: (doc: CandidateDocument) => void;
  onRestore?: (doc: CandidateDocument) => void;
  onDelete?: (doc: CandidateDocument) => void;
}

export function VersionHistory({ history, onPreview, onDownload, onRestore, onDelete }: VersionHistoryProps) {
  if (!history || history.length === 0) return null;

  // Assume the array is sorted newest first. The first item is the "Latest"
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Version History</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <div className="divide-y divide-[hsl(var(--border))]">
          {history.map((doc, idx) => {
            const isLatest = idx === 0;
            const sizeMB = (doc.sizeBytes / (1024 * 1024)).toFixed(2);
            
            return (
              <div key={doc.id} className="p-4 flex flex-wrap items-start sm:items-center justify-between gap-4 hover:bg-[hsl(var(--muted)/0.3)] transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                    <FileText className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-[hsl(var(--foreground))] whitespace-nowrap">Version {doc.version}</span>
                      {isLatest && <Badge variant="default" size="sm">Latest</Badge>}
                      {doc.isDefault && <Badge variant="success" size="sm">Current</Badge>}
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] flex flex-wrap items-center gap-1">
                      <span className="whitespace-nowrap">{formatDate(doc.createdAt || "", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="whitespace-nowrap">&bull; {sizeMB} MB</span>
                      {doc.uploadedBy && (
                        <span className="whitespace-nowrap">&bull; By {doc.uploadedBy === "usr-999" ? "You" : "System"}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 shrink-0 ml-auto">
                  <Button variant="ghost" size="icon-sm" onClick={() => onPreview?.(doc)} aria-label={`Preview v${doc.version}`}>
                    <Eye className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => onDownload?.(doc)} aria-label={`Download v${doc.version}`}>
                    <Download className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </Button>
                  {!doc.isDefault && (
                    <Button variant="ghost" size="icon-sm" onClick={() => onRestore?.(doc)} aria-label={`Restore v${doc.version}`}>
                      <RotateCcw className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </Button>
                  )}
                  {!isLatest && (
                    <Button variant="ghost" size="icon-sm" onClick={() => onDelete?.(doc)} aria-label={`Delete v${doc.version}`}>
                      <Trash2 className="h-4 w-4 text-[hsl(var(--danger))]" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function VersionHistorySkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="divide-y divide-[hsl(var(--border))]">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 flex gap-4 items-center">
              <div className="h-10 w-10 shrink-0 bg-[hsl(var(--muted))] animate-pulse rounded" />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
                  {i === 1 && <div className="h-4 w-12 bg-[hsl(var(--muted))] animate-pulse rounded-full" />}
                </div>
                <div className="h-3 w-40 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
                <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
