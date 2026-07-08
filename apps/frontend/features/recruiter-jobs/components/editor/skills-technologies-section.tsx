import * as React from "react";
import { Label } from "@/components/ui/primitives";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export function SkillsTechnologiesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Skills & Technologies</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Add specific skills to help match candidates automatically.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Required Skills</Label>
          <div className="flex gap-2">
            <Input placeholder="Add a required skill (e.g. React)..." className="max-w-xs" />
            <Button variant="secondary"><Plus className="h-4 w-4 mr-2" /> Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-sm">
              React <button className="hover:text-red-500"><X className="h-3 w-3" /></button>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-sm">
              TypeScript <button className="hover:text-red-500"><X className="h-3 w-3" /></button>
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-[hsl(var(--border))]">
          <Label>Preferred Skills (Nice to have)</Label>
          <div className="flex gap-2">
            <Input placeholder="Add a preferred skill..." className="max-w-xs" />
            <Button variant="secondary"><Plus className="h-4 w-4 mr-2" /> Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
