import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { WorkingHours as WorkingHoursType } from "../../types";

interface WorkingHoursProps {
  workingHours: WorkingHoursType;
  onChange: () => void;
}

export function WorkingHours({ workingHours, onChange }: WorkingHoursProps) {
  const days = [
    { label: "Monday", value: "MON" },
    { label: "Tuesday", value: "TUE" },
    { label: "Wednesday", value: "WED" },
    { label: "Thursday", value: "THU" },
    { label: "Friday", value: "FRI" },
    { label: "Saturday", value: "SAT" },
    { label: "Sunday", value: "SUN" },
  ];

  return (
    <SettingsSection 
      title="Working Hours" 
      description="Define the default business hours for interview scheduling."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Global Timezone</label>
            <Select defaultValue={workingHours.timezone} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Working Days</label>
          <div className="flex flex-wrap gap-3">
            {days.map((day) => {
              const isActive = workingHours.workingDays.includes(day.value);
              return (
                <button
                  key={day.value}
                  onClick={onChange}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                    isActive 
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]" 
                      : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--muted-foreground))]"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[hsl(var(--border))]">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Start Time</label>
            <Input type="time" defaultValue={workingHours.startTime} onChange={onChange} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">End Time</label>
            <Input type="time" defaultValue={workingHours.endTime} onChange={onChange} />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
