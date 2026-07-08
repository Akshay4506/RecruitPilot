"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import type { NavSection } from "@/types/navigation";

interface SidebarGroupProps {
  section: NavSection;
  isCollapsed: boolean;
}

function SidebarGroup({ section, isCollapsed }: SidebarGroupProps) {
  const [isOpen, setIsOpen] = React.useState(section.defaultOpen ?? true);

  return (
    <div className="space-y-1">
      {/* Section heading */}
      {section.label && !isCollapsed && (
        <div className="flex items-center justify-between px-2.5 mb-1">
          {section.collapsible ? (
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide",
                "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                "transition-colors focus:outline-none focus:underline"
              )}
              aria-expanded={isOpen}
            >
              {section.label}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  !isOpen && "-rotate-90"
                )}
                aria-hidden
              />
            </button>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              {section.label}
            </span>
          )}
        </div>
      )}

      {/* Divider when collapsed */}
      {section.label && isCollapsed && (
        <div className="mx-auto my-2 h-px w-6 bg-[hsl(var(--border))]" aria-hidden />
      )}

      {/* Items */}
      {section.collapsible ? (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-1"
            >
              {section.items.map((item) => (
                <SidebarItem key={item.id} item={item} isCollapsed={isCollapsed} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="space-y-1">
          {section.items.map((item) => (
            <SidebarItem key={item.id} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}
    </div>
  );
}

export { SidebarGroup };
