"use client";

import * as React from "react";
import { ChevronsUpDown, Check, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Workspace } from "@/types/navigation";

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  onSwitch: (workspaceId: string) => void;
}

function WorkspaceSwitcher({
  workspaces,
  currentWorkspaceId,
  onSwitch,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const current = workspaces.find((w) => w.id === currentWorkspaceId) ?? workspaces[0];

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!current) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-[hsl(var(--border))]",
          "px-2.5 py-1.5 text-sm transition-colors",
          "hover:bg-[hsl(var(--accent))]",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Workspace logo */}
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[hsl(var(--primary)/0.1)]">
          {current.logo ? (
            <img src={current.logo} alt={current.name} className="h-full w-full rounded object-cover" />
          ) : (
            <Building2 className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
          )}
        </div>
        <span className="max-w-[120px] truncate font-medium text-[hsl(var(--foreground))]">
          {current.name}
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" aria-hidden />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border",
            "border-[hsl(var(--border))] bg-[hsl(var(--popover))] shadow-xl p-1",
            "animate-[fade-in-up_150ms_ease-out]"
          )}
          role="listbox"
          aria-label="Switch workspace"
        >
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              role="option"
              aria-selected={ws.id === currentWorkspaceId}
              onClick={() => {
                onSwitch(ws.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                ws.id === currentWorkspaceId
                  ? "bg-[hsl(var(--accent))]"
                  : "hover:bg-[hsl(var(--accent))]"
              )}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[hsl(var(--primary)/0.1)]">
                {ws.logo ? (
                  <img src={ws.logo} alt={ws.name} className="h-full w-full rounded object-cover" />
                ) : (
                  <Building2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {ws.name}
                </p>
                {ws.plan && (
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{ws.plan}</p>
                )}
              </div>
              {ws.id === currentWorkspaceId && (
                <Check className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { WorkspaceSwitcher };
export type { WorkspaceSwitcherProps, Workspace };
