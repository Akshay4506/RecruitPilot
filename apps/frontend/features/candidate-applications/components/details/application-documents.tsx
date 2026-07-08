import * as React from "react";
import { Application } from "../../types";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ApplicationDocumentsProps {
  application: Application;
}

export function ApplicationDocuments({ application }: ApplicationDocumentsProps) {
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
        Application Documents
      </h2>
      
      <div className="space-y-4">
        
        {/* Resume */}
        <div>
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Resume</h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors group bg-[hsl(var(--muted)/0.3)] gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{application.resume.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                  Version: {application.resume.version} • Uploaded {format(new Date(application.resume.uploadedAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="sm" className="h-8">
                <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Supporting Documents */}
        {application.supportingDocuments && application.supportingDocuments.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 mt-6">Supporting Documents</h3>
            <div className="space-y-3">
              {application.supportingDocuments.map(doc => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">{doc.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                        {doc.type} • Uploaded {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="h-3.5 w-3.5 mr-1.5" /> View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
