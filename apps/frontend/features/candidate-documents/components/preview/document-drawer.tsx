import * as React from "react";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerBody, 
  DrawerFooter 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CandidateDocument } from "../../types";
import { FileText, Download, EyeOff, Shield, Database, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocumentStatusChip } from "../document-status-chip";
import { formatDate } from "@/lib/utils";

interface DocumentDrawerProps {
  document: CandidateDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: CandidateDocument) => void;
}

export function DocumentDrawer({ document, isOpen, onClose, onDownload }: DocumentDrawerProps) {
  if (!document) return null;

  const sizeMB = (document.sizeBytes / (1024 * 1024)).toFixed(2);
  const isPreviewable = document.mimeType === "application/pdf" || document.mimeType.startsWith("image/");

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="border-b border-[hsl(var(--border))] flex items-start justify-between">
          <div className="flex gap-4 items-start">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <DrawerTitle className="text-lg">{document.name}</DrawerTitle>
              <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1 flex items-center gap-2 flex-wrap">
                <Badge variant="outline" size="sm">v{document.version}</Badge>
                <DocumentStatusChip status={document.status} />
                <span>{sizeMB} MB</span>
              </div>
            </div>
          </div>
        </DrawerHeader>
        
        <DrawerBody className="p-0 flex flex-col md:flex-row h-full overflow-hidden">
          {/* Main Preview Area */}
          <div className="flex-1 bg-[hsl(var(--muted)/0.3)] border-r border-[hsl(var(--border))] overflow-auto">
            {isPreviewable ? (
              <div className="flex flex-col items-center justify-center h-full p-8 min-h-[400px]">
                {document.mimeType === "application/pdf" ? (
                  <div className="w-full max-w-2xl bg-white shadow-sm border rounded-lg aspect-[8.5/11] flex items-center justify-center text-gray-400">
                    PDF Preview Placeholder
                  </div>
                ) : (
                  <img src="#" alt={document.name} className="max-w-full max-h-full object-contain rounded shadow" />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 min-h-[400px] text-center">
                <div className="h-16 w-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-4">
                  <EyeOff className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                </div>
                <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-2">Preview Unavailable</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 max-w-sm">
                  This file type ({document.extension}) cannot be previewed directly in the browser.
                </p>
                <Button onClick={() => onDownload(document)} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download to View
                </Button>
              </div>
            )}
          </div>
          
          {/* Sidebar Metadata Area */}
          <div className="w-full md:w-80 shrink-0 bg-[hsl(var(--card))] overflow-auto">
            <div className="p-6 space-y-8">
              
              {/* File Info */}
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-2">
                  <Database className="h-3.5 w-3.5" /> File Metadata
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Uploaded</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))]">{formatDate(document.createdAt || "", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Visibility</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))] capitalize">{document.visibility.toLowerCase()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Downloads</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))]">{document.downloadCount}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))] col-span-1">Checksum</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))] truncate col-span-2 font-mono text-xs">{document.checksum}</span>
                  </div>
                </div>
              </section>

              {/* Security & Processing */}
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5" /> Processing & Security
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">Virus Scan</span>
                    {document.virusScanned ? <Badge variant="success" size="sm">Clean</Badge> : <Badge variant="warning" size="sm">Pending</Badge>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">OCR Extraction</span>
                    {document.ocrProcessed ? <Badge variant="success" size="sm">Complete</Badge> : <Badge variant="neutral" size="sm">N/A</Badge>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">AI Analysis</span>
                    {document.aiParsed ? <Badge variant="success" size="sm">Parsed</Badge> : <Badge variant="neutral" size="sm">Not Parsed</Badge>}
                  </div>
                </div>
              </section>

              {/* Infrastructure */}
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" /> Infrastructure
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Provider</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))]">{document.provider}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Region</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))]">{document.region}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[hsl(var(--muted-foreground))] col-span-1">Bucket</span>
                    <span className="text-right font-medium text-[hsl(var(--foreground))] truncate col-span-2">{document.bucket}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter className="border-t border-[hsl(var(--border))]">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => onDownload(document)} className="gap-2">
            <Download className="h-4 w-4" /> Download File
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
