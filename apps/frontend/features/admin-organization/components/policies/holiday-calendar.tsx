import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Holiday } from "../../types";

interface HolidayCalendarProps {
  holidays: Holiday[];
  onChange: () => void;
}

export function HolidayCalendar({ holidays, onChange }: HolidayCalendarProps) {
  return (
    <SettingsSection 
      title="Company Holidays" 
      description="Add public holidays. Interview scheduling will automatically block these dates."
      footer={
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Holiday
        </Button>
      }
    >
      {holidays.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[hsl(var(--border))] rounded-lg text-center">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">No holidays configured</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Add holidays to prevent scheduling conflicts.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {holidays.map(holiday => (
            <div key={holiday.id} className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{holiday.name}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{holiday.date}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </SettingsSection>
  );
}
