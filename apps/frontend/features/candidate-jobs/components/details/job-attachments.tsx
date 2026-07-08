import * as React from "react";
import { Job } from "../../types";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobAttachmentsProps {
  job: Job;
}

export function JobAttachments({ job }: JobAttachmentsProps) {
  // Mocking attachments for UI purposes as per constraints
  const mockAttachments = [
    { name: "Job_Description.pdf", size: "245 KB", type: "PDF" },
    { name: "Benefits_Overview.pdf", size: "1.2 MB", type: "PDF" }
  ];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Attachments</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockAttachments.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{doc.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{doc.size} • {doc.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
