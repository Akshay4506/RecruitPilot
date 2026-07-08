import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";

export function RbacHero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[hsl(var(--border))]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Roles & Permissions</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Manage system access, define granular permissions, and enforce security policies.
        </p>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Import Policy</span>
        </Button>
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export Policy</span>
        </Button>
        <Button className="gap-2 flex-1 md:flex-none">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>
    </div>
  );
}
