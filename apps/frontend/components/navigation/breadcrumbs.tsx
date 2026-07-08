"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types/navigation";

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  /** Auto-generate from current pathname if items not provided */
  autoGenerate?: boolean;
  className?: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    items.push({ label, href });
  });

  return items;
}

function Breadcrumbs({ items, autoGenerate = true, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const crumbs = items ?? (autoGenerate ? generateBreadcrumbs(pathname) : []);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1 text-sm flex-wrap" role="list">
        {/* Home */}
        <li>
          <Link
            href="/"
            className={cn(
              "flex items-center text-[hsl(var(--muted-foreground))]",
              "hover:text-[hsl(var(--foreground))] transition-colors"
            )}
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 text-[hsl(var(--border))]" aria-hidden />
              {isLast || !crumb.href ? (
                <span
                  className="font-medium text-[hsl(var(--foreground))]"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
export type { BreadcrumbsProps, BreadcrumbItem };
