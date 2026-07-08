"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Settings, UserPlus, BarChart3, RotateCw, ChevronDown, Globe } from "lucide-react";

export function AdminDashboardHero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">System Overview</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Global platform health, organizational metrics, and pending actions.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Workspace Selector Mock */}
          <Button variant="outline" className="gap-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
            <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span>Acme Corp Global</span>
            <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </Button>

          {/* Environment Badge */}
          <div className="px-3 py-1.5 rounded-md text-xs font-medium border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]">
            Production
          </div>
          
          <Button variant="ghost" size="icon-sm" className="h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <Settings className="h-4 w-4" /> Company Settings
        </Button>
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <BarChart3 className="h-4 w-4" /> Analytics
        </Button>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" /> Invite User
        </Button>
      </div>
    </div>
  );
}
