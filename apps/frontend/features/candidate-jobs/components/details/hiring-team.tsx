import * as React from "react";
import { Job } from "../../types";
import { Users } from "lucide-react";

interface HiringTeamProps {
  job: Job;
}

export function HiringTeam({ job }: HiringTeamProps) {
  if (job.hiringTeam.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <Users className="h-5 w-5 text-[hsl(var(--primary))]" />
        Meet Your Team
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {job.hiringTeam.map(member => (
          <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
            <div className="h-12 w-12 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))] font-bold overflow-hidden border border-[hsl(var(--primary)/0.2)]">
              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                member.name.charAt(0)
              )}
            </div>
            <div>
              <p className="font-semibold text-[hsl(var(--foreground))] text-sm">{member.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
