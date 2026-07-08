import * as React from "react";
import { Upload, FileText, Trash2 } from "lucide-react";

export function AttachmentsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Attachments & Documents</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Upload JD documents, architecture guides, or interview rubrics.</p>
      </div>

      <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-xl p-8 text-center hover:bg-[hsl(var(--muted)/0.2)] transition-colors cursor-pointer">
        <Upload className="h-8 w-8 text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
        <p className="text-sm font-medium">Click to upload or drag and drop</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">PDF, DOCX up to 10MB</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-md">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Architecture_Guidelines.pdf</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">1.2 MB &bull; Uploaded today</p>
            </div>
          </div>
          <button className="p-2 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
