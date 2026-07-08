import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, GitCompare, FileText } from "lucide-react";

export function ResumePreview({ application }: { application: Application }) {
  const { candidate } = application;

  return (
    <Card className="flex flex-col h-full min-h-[600px] overflow-hidden border border-[hsl(var(--border))]">
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[hsl(var(--primary)/0.1)] rounded-lg">
            <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
          </div>
          <div>
            <h3 className="font-medium text-[hsl(var(--foreground))]">Resume</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Version: <span className="font-semibold">{candidate.resumeVersion || "v1.0"}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Maximize2 className="h-4 w-4" /> Fullscreen
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <GitCompare className="h-4 w-4" /> Compare
          </Button>
        </div>
      </div>
      
      <div className="flex-1 bg-[hsl(var(--muted)/0.1)] flex items-center justify-center p-8">
        {/* Placeholder for actual PDF rendering */}
        <div className="w-full max-w-2xl bg-white h-[800px] shadow-sm border border-slate-200 rounded-sm p-12 flex flex-col items-center justify-center text-slate-400">
          <FileText className="h-16 w-16 mb-4 opacity-50" />
          <p className="text-lg font-medium text-slate-500">Resume rendering engine placeholder</p>
          <p className="text-sm mt-2 max-w-sm text-center">In production, this area will render the candidate's uploaded PDF or Document file directly in the browser.</p>
        </div>
      </div>
    </Card>
  );
}
