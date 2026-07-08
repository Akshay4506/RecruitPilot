"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { X, Copy, Download, ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BulkToolbarProps {
  selectedCount: number;
  onClear: () => void;
}

export function BulkToolbar({ selectedCount, onClear }: BulkToolbarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-3 rounded-full shadow-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
        >
          <div className="flex items-center gap-2 px-2 border-r border-[hsl(var(--background)/0.2)]">
            <span className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {selectedCount}
            </span>
            <span className="text-sm font-medium pr-2">selected</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)] h-8 px-3 text-xs gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Enable
            </Button>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)] h-8 px-3 text-xs gap-1">
              <ShieldAlert className="h-3.5 w-3.5" /> Disable
            </Button>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)] h-8 px-3 text-xs gap-1">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </Button>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)] h-8 px-3 text-xs gap-1">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.2)] h-8 px-3 text-xs gap-1 ml-2">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>

          <div className="pl-2 border-l border-[hsl(var(--background)/0.2)]">
            <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8 rounded-full text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)]">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
