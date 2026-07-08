"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, Mail, Building2, Users2, Download } from "lucide-react";

interface BulkToolbarProps {
  selectedCount: number;
  onClear: () => void;
}

export function BulkToolbar({ selectedCount, onClear }: BulkToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] rounded-full px-4 py-3 flex items-center gap-4 shadow-xl border border-[hsl(var(--border))]">
      <div className="flex items-center gap-3 border-r border-[hsl(var(--background))/0.2] pr-4">
        <span className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {selectedCount}
        </span>
        <span className="text-sm font-medium">selected</span>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <UserCheck className="h-4 w-4" /> Enable
        </Button>
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <UserX className="h-4 w-4" /> Disable
        </Button>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <Building2 className="h-4 w-4" /> Dept
        </Button>
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <Users2 className="h-4 w-4" /> Team
        </Button>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <Mail className="h-4 w-4" /> Invite
        </Button>
        <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-white hover:bg-white/20 h-8 gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--background))] hover:bg-white/10 h-8 ml-2"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
}
