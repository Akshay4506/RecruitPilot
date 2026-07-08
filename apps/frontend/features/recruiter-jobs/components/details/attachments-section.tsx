import * as React from "react";
import { Job } from "../../types";
import { FileText, Download } from "lucide-react";

export function AttachmentsSection({ job }: { job: Job }) {
  if (job.attachments.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Internal Documents & Attachments</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {job.attachments.map((attachment) => (
          <div key={attachment.id} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] group hover:border-[hsl(var(--primary)/0.5)] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-md">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{attachment.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {(attachment.size / 1024 / 1024).toFixed(2)} MB &bull; {attachment.uploadedBy}
                </p>
              </div>
            </div>
            <button className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors opacity-0 group-hover:opacity-100">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
