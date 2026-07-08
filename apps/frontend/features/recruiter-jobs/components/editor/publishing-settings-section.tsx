import * as React from "react";
import { Label } from "@/components/ui/primitives";

export function PublishingSettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Publishing Settings</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Control who can see this job and how long it stays open.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Visibility</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] cursor-pointer hover:border-[hsl(var(--primary)/0.5)]">
              <input type="radio" name="visibility" value="public" defaultChecked className="accent-[hsl(var(--primary))]" />
              <div>
                <p className="text-sm font-medium">Public (Careers Page & Job Boards)</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Anyone can find and apply to this job.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] cursor-pointer hover:border-[hsl(var(--primary)/0.5)]">
              <input type="radio" name="visibility" value="internal" className="accent-[hsl(var(--primary))]" />
              <div>
                <p className="text-sm font-medium">Internal Only</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Only logged-in employees can see this job.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] cursor-pointer hover:border-[hsl(var(--primary)/0.5)]">
              <input type="radio" name="visibility" value="unlisted" className="accent-[hsl(var(--primary))]" />
              <div>
                <p className="text-sm font-medium">Unlisted (Direct Link)</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Only people with the link can view and apply.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Closing Date (Optional)</Label>
          <input type="date" className="flex h-10 w-full max-w-sm rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm ring-offset-[hsl(var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]" />
        </div>
      </div>
    </div>
  );
}
