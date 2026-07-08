import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Paperclip, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InterviewAttachments() {
  const files = [
    { name: "Jamie_Lin_Resume_v2.pdf", size: "2.4 MB" },
    { name: "System_Design_Rubric.pdf", size: "1.1 MB" }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Paperclip className="h-4 w-4" /> Attachments
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {files.map((file, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted)/0.3)] transition-colors group">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0" />
              <div className="truncate">
                <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{file.name}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{file.size}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 h-7 w-7">
              <Download className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
