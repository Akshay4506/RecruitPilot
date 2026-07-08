"use client";

import * as React from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { SidebarGroup } from "./sidebar-group";
import { SidebarItem } from "./sidebar-item";
import { useSidebarStore } from "@/store/sidebar.store";
import type { NavConfig } from "@/types/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarUser {
  name: string;
  email: string;
  avatarSrc?: string;
  role?: string;
}

interface SidebarProps {
  navConfig: NavConfig;
  user?: SidebarUser;
  brandName?: string;
  brandHref?: string;
  brandLogo?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar widths
// ─────────────────────────────────────────────────────────────────────────────

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 56;

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar inner content (shared between desktop + mobile)
// ─────────────────────────────────────────────────────────────────────────────

function SidebarContent({
  navConfig,
  user,
  brandName = "RecruitPilot",
  brandHref = "/",
  brandLogo,
  isCollapsed,
}: SidebarProps & { isCollapsed: boolean }) {
  const closeMobile = useSidebarStore((s) => s.closeMobile);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <div className="flex h-full flex-col">
      {/* ── Brand Header ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex h-14 items-center border-b border-[hsl(var(--border))] shrink-0",
          isCollapsed ? "justify-center px-0" : "justify-between px-3"
        )}
      >
        <Link
          href={brandHref}
          className="flex items-center gap-2.5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] rounded"
        >
          {/* Logo mark */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--primary))]">
            {brandLogo ?? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            )}
          </div>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-bold text-[hsl(var(--foreground))] whitespace-nowrap overflow-hidden"
              >
                {brandName}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Desktop collapse toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggle}
          className={cn("shrink-0 hidden md:flex", isCollapsed && "hidden")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>

        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={closeMobile}
          className="shrink-0 md:hidden"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* ── Collapsed: expand button floating ────────────────────────── */}
      {isCollapsed && (
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggle}
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* ── Nav Sections ─────────────────────────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-4"
        aria-label="Main navigation"
      >
        {navConfig.sections.map((section) => (
          <SidebarGroup key={section.id} section={section} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* ── Footer nav items ─────────────────────────────────────────── */}
      {navConfig.footerItems && navConfig.footerItems.length > 0 && (
        <div className="border-t border-[hsl(var(--border))] px-2 py-2 space-y-1">
          {navConfig.footerItems.map((item) => (
            <SidebarItem key={item.id} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}

      {/* ── User Footer ──────────────────────────────────────────────── */}
      {user && (
        <div
          className={cn(
            "border-t border-[hsl(var(--border))] p-2 flex items-center shrink-0",
            isCollapsed ? "justify-center" : "gap-2.5"
          )}
        >
          <Avatar
            size="sm"
            src={user.avatarSrc}
            name={user.name}
            className="shrink-0"
          />
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">
                  {user.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar — desktop + mobile composite
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar(props: SidebarProps) {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebarStore();

  return (
    <>
      {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
      <motion.aside
        className={cn(
          "hidden md:flex flex-col",
          "shrink-0 h-screen sticky top-0",
          "border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]",
          "overflow-hidden"
        )}
        animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        aria-label="Desktop sidebar"
      >
        <SidebarContent {...props} isCollapsed={isCollapsed} />
      </motion.aside>

      {/* ── Mobile Drawer Backdrop ────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: SIDEBAR_WIDTH }}
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col md:hidden",
              "border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]"
            )}
            aria-label="Mobile navigation"
          >
            <SidebarContent {...props} isCollapsed={false} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export { Sidebar };
export type { SidebarProps, SidebarUser };
