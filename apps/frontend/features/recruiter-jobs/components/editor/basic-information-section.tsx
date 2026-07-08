import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/primitives";
import { Textarea } from "@/components/ui/input";

export function BasicInformationSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Basic Information</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Provide the core details about the position.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Job Title *</Label>
          <Input placeholder="e.g. Senior Frontend Engineer" />
        </div>
        <div className="space-y-2">
          <Label>Department *</Label>
          <Input placeholder="e.g. Engineering" />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input placeholder="e.g. San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label>Work Mode</Label>
          <select className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm ring-offset-[hsl(var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50">
            <option>Remote</option>
            <option>Hybrid</option>
            <option>On-site</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Job Summary *</Label>
          <Textarea 
            placeholder="A short, compelling summary of the role..." 
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
