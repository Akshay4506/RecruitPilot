import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { PanelMember, AvailabilitySlot } from "../../types";
import { format } from "date-fns";

interface PanelAvailabilityMatrixProps {
  panel: PanelMember[];
  slots: AvailabilitySlot[];
  selectedDate: Date;
}

export function PanelAvailabilityMatrix({ panel, slots, selectedDate }: PanelAvailabilityMatrixProps) {
  // Generate some mock hours
  const hours = Array.from({ length: 9 }).map((_, i) => i + 9); // 9 AM to 5 PM

  return (
    <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Availability Matrix ({format(selectedDate, "MMM d, yyyy")})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-2 border-b border-r border-[hsl(var(--border))] w-48 text-[hsl(var(--muted-foreground))] font-semibold text-xs uppercase tracking-wider">Panel Member</th>
                {hours.map(h => (
                  <th key={h} className="p-2 border-b border-[hsl(var(--border))] text-center text-[hsl(var(--muted-foreground))] font-semibold text-xs uppercase tracking-wider min-w-[60px]">
                    {h}:00
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {panel.map(member => (
                <tr key={member.id} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted)/0.3)]">
                  <td className="p-2 border-r border-[hsl(var(--border))] font-medium text-[hsl(var(--foreground))] truncate max-w-[150px]">
                    {member.name}
                  </td>
                  {hours.map(h => {
                    // Mock some random availability for visualization
                    const isBusy = (member.id === 'user-1' && h === 11) || (member.id === 'user-2' && (h === 13 || h === 14));
                    return (
                      <td key={h} className="p-1 border-x border-[hsl(var(--border))]">
                        <div className={`h-8 rounded w-full ${isBusy ? 'bg-[hsl(var(--muted))] border border-[hsl(var(--border))] opacity-50' : 'bg-[hsl(var(--success)/0.2)] border border-[hsl(var(--success)/0.3)] cursor-pointer hover:bg-[hsl(var(--success)/0.3)]'}`} title={isBusy ? 'Busy' : 'Available'} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex gap-4 mt-4 text-xs text-[hsl(var(--muted-foreground))] justify-end">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[hsl(var(--success)/0.2)] border border-[hsl(var(--success)/0.3)] rounded-sm" /> Available</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-sm" /> Busy</div>
        </div>
      </CardContent>
    </Card>
  );
}
