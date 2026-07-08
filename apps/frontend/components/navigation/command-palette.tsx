"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Users, CalendarDays, Settings, BarChart3, Search,
} from "lucide-react";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";

// ─────────────────────────────────────────────────────────────────────────────
// Global Command Palette with Ctrl/Cmd+K shortcut
// ─────────────────────────────────────────────────────────────────────────────

interface GlobalCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickNavItems = [
  { id: "dashboard", label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard, shortcut: "G D" },
  { id: "jobs", label: "Jobs", href: "/recruiter/jobs", icon: Briefcase, shortcut: "G J" },
  { id: "candidates", label: "Candidates", href: "/recruiter/candidates", icon: Users, shortcut: "G C" },
  { id: "interviews", label: "Interviews", href: "/recruiter/interviews", icon: CalendarDays, shortcut: "G I" },
  { id: "analytics", label: "Analytics", href: "/recruiter/analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", href: "/recruiter/settings", icon: Settings },
];

const quickActions = [
  { id: "new-job", label: "Create New Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { id: "new-application", label: "Add Candidate", href: "/recruiter/candidates/new", icon: Users },
  { id: "schedule-interview", label: "Schedule Interview", href: "/recruiter/interviews/new", icon: CalendarDays },
];

function GlobalCommandPalette({ open, onOpenChange }: GlobalCommandPaletteProps) {
  const router = useRouter();

  const runCommand = React.useCallback(
    (cb: () => void) => {
      onOpenChange(false);
      cb();
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search anything..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-1 py-2">
            <Search className="h-6 w-6 text-[hsl(var(--muted-foreground))] opacity-40" />
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No results found</p>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Quick Navigation">
          {quickNavItems.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => runCommand(() => router.push(item.href))}
            >
              <item.icon className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              {item.label}
              {item.shortcut && (
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.id}
              onSelect={() => runCommand(() => router.push(action.href))}
            >
              <action.icon className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              {action.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// useCommandPalette — global Ctrl+K handler hook
// ─────────────────────────────────────────────────────────────────────────────

function useCommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}

export { GlobalCommandPalette, useCommandPalette };
