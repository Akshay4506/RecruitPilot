"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Save, Undo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SaveBarProps {
  isDirty: boolean;
  onSave: () => void;
  onDiscard: () => void;
  isLoading?: boolean;
}

export function SaveBar({ isDirty, onSave, onDiscard, isLoading }: SaveBarProps) {
  return (
    <AnimatePresence>
      {isDirty && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-6 py-4 rounded-full shadow-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold">Unsaved changes</span>
            <span className="text-xs opacity-80">Please save or discard your changes</span>
          </div>

          <div className="flex items-center gap-2 border-l border-[hsl(var(--background)/0.2)] pl-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDiscard}
              disabled={isLoading}
              className="text-[hsl(var(--background))] hover:text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/0.2)]"
            >
              <Undo className="h-4 w-4 mr-2" />
              Discard
            </Button>
            <Button 
              size="sm" 
              onClick={onSave}
              disabled={isLoading}
              className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background)/0.9)]"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
