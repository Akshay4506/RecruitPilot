import * as React from "react";
import { User, UserSession } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Monitor, Smartphone, Globe } from "lucide-react";
import { StatusChip } from "@/components/display/status-chip";
import { formatDate } from "@/lib/utils";

interface ActiveSessionsProps {
  user: User;
}

const mockSessions: UserSession[] = [
  { id: "s1", device: "MacBook Pro", browser: "Chrome", ipAddress: "192.168.1.1", location: "San Francisco, CA", status: "ACTIVE", lastActiveAt: "2026-07-08T09:00:00Z", createdAt: "2026-07-08T08:30:00Z" },
  { id: "s2", device: "iPhone 13", browser: "Safari", ipAddress: "172.16.0.1", location: "San Francisco, CA", status: "ACTIVE", lastActiveAt: "2026-07-07T18:00:00Z", createdAt: "2026-07-07T09:00:00Z" },
];

export function ActiveSessions({ user }: ActiveSessionsProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Active Sessions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {mockSessions.map((session) => (
          <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
                {session.device.includes("iPhone") ? (
                  <Smartphone className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                ) : (
                  <Monitor className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[hsl(var(--foreground))]">{session.device}</span>
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">• {session.browser}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {session.ipAddress}</span>
                  <span>{session.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:items-end gap-2">
              <StatusChip label={session.status} variant={session.status === "ACTIVE" ? "success" : "neutral"} />
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Last active: {formatDate(session.lastActiveAt)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
