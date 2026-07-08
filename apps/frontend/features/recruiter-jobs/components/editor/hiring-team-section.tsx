import * as React from "react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function HiringTeamSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Hiring Team</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Select the team members involved in the hiring process for this role.</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Search team members by name or email..." className="max-w-md" />
          <Button variant="secondary">Search</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
            <div className="flex items-center gap-3">
              <Avatar name="Sarah Chen" />
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Hiring Manager</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600"><X className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
            <div className="flex items-center gap-3">
              <Avatar name="Michael Rodriguez" />
              <div>
                <p className="text-sm font-medium">Michael Rodriguez</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Recruiter</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600"><X className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
