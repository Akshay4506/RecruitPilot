import * as React from "react";
import { Job } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Star, Zap } from "lucide-react";

interface JobSkillsProps {
  job: Job;
}

export function JobSkills({ job }: JobSkillsProps) {
  const mandatorySkills = job.skills.filter(s => s.type === "MANDATORY");
  const preferredSkills = job.skills.filter(s => s.type === "PREFERRED");

  if (job.skills.length === 0 && job.technologies.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Skills & Technologies</h2>
      
      <div className="space-y-4">
        {mandatorySkills.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 mb-3">
              <Star className="h-4 w-4 text-[hsl(var(--primary))]" />
              Must Have
            </h3>
            <div className="flex flex-wrap gap-2">
              {mandatorySkills.map(skill => (
                <Badge key={skill.name} variant="default" className="text-sm py-1 px-3">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {preferredSkills.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 mb-3">
              <Zap className="h-4 w-4 text-[hsl(var(--warning))]" />
              Nice to Have
            </h3>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map(skill => (
                <Badge key={skill.name} variant="outline" className="text-sm py-1 px-3">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {job.technologies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3 mt-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map(tech => (
                <Badge key={tech} variant="neutral" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
