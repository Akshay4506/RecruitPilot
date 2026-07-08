import * as React from "react";
import { Label } from "@/components/ui/primitives";
import { Textarea } from "@/components/ui/input";

export function RequirementsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Requirements & Responsibilities</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Detail what the candidate will do and what they need to succeed.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Key Responsibilities</Label>
          <Textarea 
            placeholder="List the day-to-day responsibilities (one per line)..." 
            className="min-h-[150px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Requirements</Label>
          <Textarea 
            placeholder="List the required experience, degrees, or certifications (one per line)..." 
            className="min-h-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
