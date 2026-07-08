"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Upload, ShieldCheck } from "lucide-react";

export function AdminUsersHero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">User Management</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage platform access, roles, and security policies across your organization.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="px-3 py-1.5 rounded-md text-xs font-medium border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Identity Provider Sync Active
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <Download className="h-4 w-4" /> Export
        </Button>
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <Upload className="h-4 w-4" /> Import
        </Button>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" /> Invite User
        </Button>
      </div>
    </div>
  );
}
