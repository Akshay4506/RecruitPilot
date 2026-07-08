import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { Building2, Network, Users, Briefcase } from "lucide-react";
import { mockOrganizationMetrics } from "../../mock/organization.mock";

export function OrganizationMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Offices</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.totalOffices}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
              <Building2 className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Departments</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.totalDepartments}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Network className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Active Users</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.totalUsers}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Users className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Open Jobs</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.activeJobs}</p>
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
