import * as React from "react";
import { Notification } from "../../types";
import { Bell, Briefcase, FileText, Calendar, Info, Circle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface RecentNotificationsProps {
  notifications: Notification[];
}

export function RecentNotifications({ notifications }: RecentNotificationsProps) {
  if (notifications.length === 0) return null;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "APPLICATION": return <FileText className="h-4 w-4 text-[hsl(var(--info))]" />;
      case "INTERVIEW": return <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />;
      case "OFFER": return <Briefcase className="h-4 w-4 text-[hsl(var(--success))]" />;
      case "SYSTEM": return <Info className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />;
      case "REMINDER": return <Bell className="h-4 w-4 text-[hsl(var(--warning))]" />;
      default: return <Bell className="h-4 w-4 text-[hsl(var(--foreground))]" />;
    }
  };

  const getLink = (type: Notification["type"]) => {
    switch (type) {
      case "APPLICATION": return "/applications";
      case "INTERVIEW": return "/interviews";
      case "OFFER": return "/offers";
      default: return "/notifications";
    }
  };

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Notifications</h3>
        <Link href={ROUTES.recruiter.notifications} className="text-xs font-medium text-[hsl(var(--primary))] hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Link key={notif.id} href={getLink(notif.type)} className="block group">
            <div className={cn(
              "flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors",
              !notif.read ? "bg-[hsl(var(--muted)/0.3)] group-hover:bg-[hsl(var(--muted)/0.5)]" : "group-hover:bg-[hsl(var(--muted)/0.2)]"
            )}>
              <div className="mt-0.5 shrink-0 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded p-1.5 shadow-sm">
                {getIcon(notif.type)}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={cn(
                    "text-sm truncate",
                    !notif.read ? "font-semibold text-[hsl(var(--foreground))]" : "font-medium text-[hsl(var(--foreground))]"
                  )}>
                    {notif.title}
                  </h4>
                  {!notif.read && <Circle className="h-2 w-2 fill-[hsl(var(--primary))] text-[hsl(var(--primary))] shrink-0" />}
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2 leading-snug">
                  {notif.description}
                </p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] pt-1">
                  {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
