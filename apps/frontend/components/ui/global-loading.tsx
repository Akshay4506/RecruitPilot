"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { AnimatePresence, motion } from "framer-motion";

export function GlobalLoading() {
  const { globalLoading, globalLoadingMessage } = useUIStore();

  return (
    <AnimatePresence>
      {globalLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4 bg-card border border-border p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {globalLoadingMessage && (
              <p className="text-sm font-medium text-foreground">
                {globalLoadingMessage}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
