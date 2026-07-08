import * as React from "react";
import { Interview } from "../../types";
import { Avatar } from "@/components/ui/avatar";

interface PanelSectionProps {
  interview: Interview;
}

export function PanelSection({ interview }: PanelSectionProps) {
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Interview Panel</h2>
      
      {interview.panel.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interview.panel.map((member) => (
            <div key={member.id} className="flex items-start gap-4 p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--muted)/0.3)]">
              <Avatar 
                className="h-12 w-12 border border-[hsl(var(--border))]" 
                src={member.avatarUrl} 
                name={member.name} 
                fallbackClassName="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-semibold" 
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm truncate">{member.name}</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{member.role}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{member.department} • {member.companyName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[hsl(var(--muted-foreground))]">The interview panel has not been assigned yet.</p>
      )}
    </div>
  );
}
