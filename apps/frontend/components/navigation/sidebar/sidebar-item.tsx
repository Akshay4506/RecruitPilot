"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/types/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  depth?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SidebarItem — single navigable entry
// ─────────────────────────────────────────────────────────────────────────────

function SidebarItem({ item, isCollapsed, depth = 0 }: SidebarItemProps) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const [isOpen, setIsOpen] = React.useState(() => {
    // Auto-open parent if a child is active
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  });

  // Active if exact match or prefix match (for sections)
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  const itemClasses = cn(
    "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2",
    "text-sm font-medium transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
    depth > 0 && "ml-5 pl-3 border-l border-[hsl(var(--border))]",
    isActive
      ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
      : [
          "text-[hsl(var(--muted-foreground))]",
          "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
        ],
    item.isDisabled && "pointer-events-none opacity-40"
  );

  // ── Parent with children ───────────────────────────────────────────────────
  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => !isCollapsed && setIsOpen((v) => !v)}
          className={cn(itemClasses, "w-full text-left")}
          aria-expanded={isOpen}
        >
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]"
              )}
              aria-hidden="true"
            />
          )}

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 truncate"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
              aria-hidden="true"
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1 space-y-1">
                {item.children!.map((child) => (
                  <SidebarItem
                    key={child.id}
                    item={child}
                    isCollapsed={isCollapsed}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Leaf item ──────────────────────────────────────────────────────────────
  const linkProps = item.isExternal
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: item.href };

  return (
    <Link {...linkProps} className={itemClasses} aria-current={isActive ? "page" : undefined}>
      {/* Active indicator dot */}
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[hsl(var(--primary))]"
          aria-hidden="true"
        />
      )}

      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive
              ? "text-[hsl(var(--primary))]"
              : "text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]"
          )}
          aria-hidden="true"
        />
      )}

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {!isCollapsed && item.badge && (
        <Badge
          variant={item.badge.variant ?? "primary"}
          size="sm"
          className="ml-auto shrink-0"
        >
          {item.badge.value}
        </Badge>
      )}

      {!isCollapsed && item.isExternal && (
        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
      )}
    </Link>
  );
}

export { SidebarItem };
