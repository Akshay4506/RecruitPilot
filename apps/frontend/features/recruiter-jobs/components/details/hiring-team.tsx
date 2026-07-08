import * as React from "react";
import { Job } from "../../types";
import { Avatar } from "@/components/ui/avatar";

export function HiringTeam({ job }: { job: Job }) {
  if (job.hiringTeam.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Hiring Team</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {job.hiringTeam.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
            <Avatar src={member.avatarUrl} alt={member.name} name={member.name} size="md" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">{member.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{member.role} &bull; {member.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
