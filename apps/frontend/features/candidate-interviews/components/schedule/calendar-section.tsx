import * as React from "react";
import { Interview } from "../../types";
import { Calendar as CalendarIcon, Download, Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarSectionProps {
  interview: Interview;
}

export function CalendarSection({ interview }: CalendarSectionProps) {
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-4">
        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
          <CalendarIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Calendar Sync</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Add this interview to your personal calendar</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex-1 justify-start">
          <Download className="h-4 w-4 mr-2" /> Download .ICS
        </Button>
        <Button variant="outline" className="flex-1 justify-start">
          <ExternalLink className="h-4 w-4 mr-2" /> Add to Google Calendar
        </Button>
        <Button variant="outline" className="flex-1 justify-start">
          <Bell className="h-4 w-4 mr-2" /> Reminder Preferences
        </Button>
      </div>
      
    </div>
  );
}
