import * as React from "react";
import { Job } from "../../types";
import { Building2, Globe, MapPin, Users } from "lucide-react";

interface CompanyOverviewProps {
  job: Job;
}

export function CompanyOverview({ job }: CompanyOverviewProps) {
  const { company } = job;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={company.name} className="w-10 h-10 object-contain rounded" />
          ) : (
            <Building2 className="h-7 w-7 text-[hsl(var(--muted-foreground))]" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">{company.name}</h2>
          <a href={company.website} target="_blank" rel="noreferrer" className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1 mt-0.5">
            <Globe className="h-3.5 w-3.5" /> Visit Website
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" /> Industry
          </p>
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{company.industry}</p>
        </div>
        <div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1 flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> Size
          </p>
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{company.size} employees</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> Headquarters
          </p>
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{company.headquarters}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {company.about}
        </p>
      </div>
    </div>
  );
}
