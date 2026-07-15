import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Edit3, Trash2, Shield, EyeOff, Users, Clock, Hash, DownloadCloud } from "lucide-react";
import { CandidateDocument, DocumentVisibility } from "../../types";
import { DocumentStatusChip } from "../document-status-chip";
import { formatDate } from "@/lib/utils";
import { Tooltip } from "@/components/ui/primitives";

interface DocumentCardProps {
  document: CandidateDocument;
  onPreview?: (doc: CandidateDocument) => void;
  onDownload?: (doc: CandidateDocument) => void;
  onRename?: (doc: CandidateDocument) => void;
  onDelete?: (doc: CandidateDocument) => void;
}

export function DocumentCard({ document, onPreview, onDownload, onRename, onDelete }: DocumentCardProps) {
  const sizeMB = (document.sizeBytes / (1024 * 1024)).toFixed(2);
  
  const VisibilityIcon = ({ visibility }: { visibility: DocumentVisibility }) => {
    switch (visibility) {
      case "PRIVATE": return <EyeOff className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />;
      case "PUBLIC": return <Eye className="h-3 w-3 text-[hsl(var(--info))]" />;
      case "RECRUITERS_ONLY": return <Users className="h-3 w-3 text-[hsl(var(--primary))]" />;
    }
  };

  const getVisibilityLabel = (visibility: DocumentVisibility) => {
    switch (visibility) {
      case "PRIVATE": return "Private";
      case "PUBLIC": return "Public";
      case "RECRUITERS_ONLY": return "Recruiters";
    }
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col group hover:border-[hsl(var(--primary)/0.5)] transition-colors">
      <CardContent className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] group-hover:bg-[hsl(var(--primary)/0.1)] group-hover:text-[hsl(var(--primary))] transition-colors">
            <FileText className="h-5 w-5" />
          </div>
          <DocumentStatusChip status={document.status} />
        </div>
        
        <div className="space-y-1 mb-4">
          <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] line-clamp-2 break-all" title={document.name}>
            {document.name}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-1">
              <Hash className="h-3 w-3" /> v{document.version}
            </div>
            <span>&bull;</span>
            <div>{sizeMB} MB</div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2 text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="h-3.5 w-3.5" /> Uploaded
            </div>
            <span className="font-medium text-[hsl(var(--foreground))] whitespace-nowrap truncate">
              {formatDate(document.createdAt || "", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-2 text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-1.5 shrink-0">
              <Shield className="h-3.5 w-3.5" /> Visibility
            </div>
            <div className="flex items-center gap-1 font-medium text-[hsl(var(--foreground))] whitespace-nowrap truncate">
              <VisibilityIcon visibility={document.visibility} />
              {getVisibilityLabel(document.visibility)}
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-2 text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-1.5 shrink-0">
              <DownloadCloud className="h-3.5 w-3.5" /> Downloads
            </div>
            <span className="font-medium text-[hsl(var(--foreground))] whitespace-nowrap">{document.downloadCount}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.1)] grid grid-cols-4 gap-1">
        <Tooltip content="Preview">
          <Button variant="ghost" size="icon-sm" onClick={() => onPreview?.(document)} className="w-full">
            <Eye className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </Button>
        </Tooltip>
        <Tooltip content="Download">
          <Button variant="ghost" size="icon-sm" onClick={() => onDownload?.(document)} className="w-full">
            <Download className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </Button>
        </Tooltip>
        <Tooltip content="Rename">
          <Button variant="ghost" size="icon-sm" onClick={() => onRename?.(document)} className="w-full">
            <Edit3 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete">
          <Button variant="ghost" size="icon-sm" onClick={() => onDelete?.(document)} className="w-full hover:bg-[hsl(var(--danger-bg))] hover:text-[hsl(var(--danger))]">
            <Trash2 className="h-4 w-4" />
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export function DocumentCardSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm h-full flex flex-col">
      <CardContent className="p-4 flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-3 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-3 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t border-[hsl(var(--border))] grid grid-cols-4 gap-2">
        <div className="h-8 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}
