"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// NotificationItem type (placeholder for future API)
// ─────────────────────────────────────────────────────────────────────────────

interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  isRead: boolean;
  type?: "info" | "success" | "warning" | "action";
}

interface NotificationsProps {
  count?: number;
  notifications?: NotificationItem[];
}

function Notifications({ count = 0, notifications = [] }: NotificationsProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasUnread = count > 0;

  // Click outside to close
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${hasUnread ? `, ${count} unread` : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {hasUnread && (
          <span
            className={cn(
              "absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center",
              "rounded-full bg-[hsl(var(--danger))] text-[10px] font-bold text-white"
            )}
            aria-hidden="true"
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </Button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border",
            "border-[hsl(var(--border))] bg-[hsl(var(--popover))] shadow-xl",
            "animate-[fade-in-up_150ms_ease-out]"
          )}
          role="dialog"
          aria-label="Notifications panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-4 py-3">
            <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              Notifications
            </h2>
            {hasUnread && (
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {count} unread
              </span>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="h-8 w-8 text-[hsl(var(--muted-foreground))] mb-2 opacity-30" />
                <p className="text-sm text-[hsl(var(--muted-foreground))]">All caught up!</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                  No new notifications
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "px-4 py-3 border-b border-[hsl(var(--border))] last:border-0 cursor-pointer",
                    "hover:bg-[hsl(var(--accent))] transition-colors",
                    !n.isRead && "bg-[hsl(var(--primary)/0.04)]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {!n.isRead && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                        {n.title}
                      </p>
                      {n.description && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 line-clamp-2">
                          {n.description}
                        </p>
                      )}
                      <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1">
                        {n.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[hsl(var(--border))] px-4 py-2">
            <button className="text-xs text-[hsl(var(--primary))] hover:underline w-full text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Notifications };
export type { NotificationItem };
