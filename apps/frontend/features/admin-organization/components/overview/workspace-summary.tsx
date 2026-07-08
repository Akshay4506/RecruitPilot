import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Globe, Clock, DollarSign, Calendar } from "lucide-react";
import { mockLocalizationPreference } from "../../mock/organization.mock";

export function WorkspaceSummary() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Workspace Settings</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
            <Globe className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Locale & Language</span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{mockLocalizationPreference.language}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
            <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Timezone & Format</span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{mockLocalizationPreference.timezone} ({mockLocalizationPreference.timeFormat})</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
            <DollarSign className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Default Currency</span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{mockLocalizationPreference.currency}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
            <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Date Format</span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{mockLocalizationPreference.dateFormat}</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
