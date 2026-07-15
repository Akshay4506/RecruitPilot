import * as React from "react";
import { Job } from "../../types";
import { Badge } from "@/components/ui/badge";

export function SkillsTechnologies({ job }: { job: Job }) {
  const mandatorySkills = job.skills.filter(s => s.type === "MANDATORY");
  const preferredSkills = job.skills.filter(s => s.type === "PREFERRED");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Skills & Technologies</h3>
      
      {mandatorySkills.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">Mandatory Skills</p>
          <div className="flex flex-wrap gap-2">
            {mandatorySkills.map((skill) => (
              <Badge key={skill.name} variant="default">{skill.name}</Badge>
            ))}
          </div>
        </div>
      )}

      {preferredSkills.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">Preferred Skills</p>
          <div className="flex flex-wrap gap-2">
            {preferredSkills.map((skill) => (
              <Badge key={skill.name} variant="outline">{skill.name}</Badge>
            ))}
          </div>
        </div>
      )}

      {job.technologies.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <Badge key={tech} variant="default" className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.2)] shadow-none border-none">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
