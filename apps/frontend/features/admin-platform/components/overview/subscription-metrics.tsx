import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { Users, HardDrive, Activity, Briefcase } from "lucide-react";
import { mockUsageQuota } from "../../mock/billing.mock";

export function SubscriptionMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Recruiter Seats</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockUsageQuota.recruiterSeatsUsed} <span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">/ {mockUsageQuota.recruiterSeatsLimit}</span></p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
              <Users className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Storage Used (GB)</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockUsageQuota.storageGbUsed} <span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">/ {mockUsageQuota.storageGbLimit}</span></p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">API Requests</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{(mockUsageQuota.apiRequestsUsed / 1000).toFixed(1)}k <span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">/ {(mockUsageQuota.apiRequestsLimit / 1000).toFixed(0)}k</span></p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Activity className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Active Jobs</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">24 <span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">/ Unlimited</span></p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
