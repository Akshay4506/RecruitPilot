"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportReportDialog({ open, onOpenChange }: ExportReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="space-y-4">
          <div>
            <DialogTitle>Export Dashboard</DialogTitle>
            <DialogDescription>
              Select the format and data range for your export. The export will be queued in the background.
            </DialogDescription>
          </div>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">Format</label>
              <select className="w-full flex h-10 w-full items-center justify-between rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] ring-offset-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2">
                <option>PDF Document</option>
                <option>Excel Spreadsheet</option>
                <option>CSV Data</option>
                <option>PowerPoint Slide</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">Data Includes</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--input))]" /> Overview Metrics
                </label>
                <label className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--input))]" /> Core Charts
                </label>
                <label className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--input))]" /> Performance Tables
                </label>
                <label className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <input type="checkbox" defaultChecked className="rounded border-[hsl(var(--input))]" /> AI Insights
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-[hsl(var(--border))]">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => onOpenChange(false)}>Start Export</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
