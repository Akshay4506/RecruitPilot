import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit3 } from "lucide-react";
import { ExtendedWorkExperience } from "../../types";
import { formatDate } from "@/lib/utils";

interface WorkExperienceProps {
  experiences: ExtendedWorkExperience[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
}

export function WorkExperience({ experiences, onAdd, onEdit }: WorkExperienceProps) {
  if (!experiences || experiences.length === 0) {
    return null; // Empty state will be handled by parent if needed
  }

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">Work Experience</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={onAdd} aria-label="Add Experience">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-[hsl(var(--border))] ml-3 space-y-8 pb-4">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-6">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--primary))] ring-4 ring-[hsl(var(--card))]" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{exp.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="font-medium text-[hsl(var(--foreground))]">{exp.company}</span>
                    <span>•</span>
                    <time dateTime={exp.startDate}>{formatDate(exp.startDate, { month: "short", year: "numeric" })}</time>
                    <span>-</span>
                    {exp.isCurrent ? (
                      <span className="text-[hsl(var(--primary))] font-medium">Present</span>
                    ) : (
                      <time dateTime={exp.endDate}>{exp.endDate ? formatDate(exp.endDate, { month: "short", year: "numeric" }) : ""}</time>
                    )}
                  </div>
                </div>
                {onEdit && (
                  <Button variant="ghost" size="icon-xs" onClick={() => onEdit(exp.id)} className="shrink-0 -mt-1 sm:mt-0" aria-label="Edit this experience">
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              {exp.description && (
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3 leading-relaxed">
                  {exp.description}
                </p>
              )}

              {/* Achievements & Responsibilities */}
              {(exp.achievements || exp.responsibilities) && (
                <div className="space-y-2 mb-4">
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-none space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[hsl(var(--success))] font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-none space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[hsl(var(--muted))] font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Chips for Skills & Tech */}
              {(exp.skillsUsed || exp.technologiesUsed) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.technologiesUsed?.map((tech) => (
                    <Badge key={tech} variant="neutral" size="sm" className="font-medium rounded-md">
                      {tech}
                    </Badge>
                  ))}
                  {exp.skillsUsed?.map((skill) => (
                    <Badge key={skill} variant="outline" size="sm" className="font-medium rounded-md text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkExperienceSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-6 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-[hsl(var(--border))] ml-3 space-y-8 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="relative pl-6 space-y-3">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--muted))] animate-pulse ring-4 ring-[hsl(var(--card))]" />
              <div className="h-5 w-48 bg-[hsl(var(--muted))] animate-pulse rounded" />
              <div className="h-4 w-64 bg-[hsl(var(--muted))] animate-pulse rounded" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-[85%] bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-16 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
                <div className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
                <div className="h-5 w-16 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
