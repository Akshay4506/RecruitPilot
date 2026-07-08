import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, CalendarDays } from "lucide-react";

export function CandidateDocuments({ candidate }: { candidate: RecruiterCandidate }) {
  if (candidate.documents.length === 0) {
    return (
      <Card className="p-8 text-center text-[hsl(var(--muted-foreground))]">
        No documents uploaded yet.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {candidate.documents.map(doc => (
        <div key={doc.id} className="flex items-center justify-between p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary)/0.5)] transition-colors group">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-[hsl(var(--foreground))] text-base flex items-center gap-2">
                {doc.name}
                {doc.version && <span className="text-[10px] bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded text-[hsl(var(--muted-foreground))]">{doc.version}</span>}
              </div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-2 mt-1">
                <span className="uppercase tracking-wider">{doc.type.replace("_", " ")}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {new Date(doc.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" asChild>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" /> View
              </a>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
              <a href={doc.url} download>
                <Download className="h-3 w-3" /> Download
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
