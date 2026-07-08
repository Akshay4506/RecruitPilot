import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { UserStatistics as IUserStatistics } from "../../types";
import { Activity } from "lucide-react";

interface UserStatisticsProps {
  stats: IUserStatistics;
}

export function UserStatistics({ stats }: UserStatisticsProps) {
  const statsList = [
    { label: "New Users (30d)", value: stats.newUsers30d },
    { label: "Invited Users", value: stats.invitedUsers },
    { label: "Locked Accounts", value: stats.lockedAccounts, isAlert: stats.lockedAccounts > 0 },
    { label: "MFA Enabled", value: stats.mfaEnabled },
    { label: "Inactive Users (>30d)", value: stats.inactiveUsers30d },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Activity className="h-4 w-4 text-[hsl(var(--primary))]" /> User Health
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statsList.map((stat, idx) => (
            <div key={idx} className="flex flex-col space-y-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
              <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{stat.label}</span>
              <span className={`text-lg font-bold ${stat.isAlert ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--foreground))]'}`}>
                {stat.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
