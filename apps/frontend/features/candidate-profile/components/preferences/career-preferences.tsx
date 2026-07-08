import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Edit3, MapPin, DollarSign, Clock, Briefcase, Globe } from "lucide-react";
import { CareerPreferences as CareerPreferencesType } from "../../types";

interface CareerPreferencesProps {
  preferences: CareerPreferencesType;
  onEdit?: () => void;
}

export function CareerPreferences({ preferences, onEdit }: CareerPreferencesProps) {
  if (!preferences) return null;

  const items = [
    {
      icon: <Briefcase className="h-4 w-4" />,
      label: "Roles",
      value: preferences.preferredRoles.join(", "),
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Locations",
      value: preferences.preferredLocations.join(", "),
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Expected Salary",
      value: `${preferences.expectedSalary.currency} ${(preferences.expectedSalary.min / 1000).toFixed(0)}k - ${(preferences.expectedSalary.max / 1000).toFixed(0)}k`,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "Notice Period",
      value: preferences.noticePeriod,
    },
    {
      icon: <Globe className="h-4 w-4" />,
      label: "Remote",
      value: preferences.remotePreference.replace("_", " "),
    },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Career Preferences</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onEdit} aria-label="Edit Preferences">
          <Edit3 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="mt-0.5 shrink-0 text-[hsl(var(--muted-foreground))]">
                {item.icon}
              </div>
              <div className="flex-1 space-y-0.5 overflow-hidden">
                <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{item.label}</div>
                <div className="text-sm font-medium text-[hsl(var(--foreground))] capitalize line-clamp-2">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CareerPreferencesSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-4 rounded bg-[hsl(var(--muted))] animate-pulse shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1 py-0.5">
                <div className="h-2 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
