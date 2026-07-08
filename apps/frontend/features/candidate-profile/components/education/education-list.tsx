import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit3, GraduationCap } from "lucide-react";
import { ExtendedEducation } from "../../types";
import { formatDate } from "@/lib/utils";

interface EducationListProps {
  education: ExtendedEducation[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
}

export function EducationList({ education, onAdd, onEdit }: EducationListProps) {
  if (!education || education.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">Education</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={onAdd} aria-label="Add Education">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div key={edu.id} className="relative">
              {idx !== 0 && <hr className="absolute -top-3 left-0 w-full border-[hsl(var(--border))]" />}
              
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-start">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{edu.institution}</h3>
                    <div className="text-sm text-[hsl(var(--foreground))] font-medium mt-0.5">
                      {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <time dateTime={edu.startDate}>{formatDate(edu.startDate, { year: "numeric" })}</time>
                      <span>-</span>
                      <time dateTime={edu.endDate || ""}>{edu.endDate ? formatDate(edu.endDate, { year: "numeric" }) : "Present"}</time>
                      {edu.gpa && (
                        <>
                          <span>•</span>
                          <span>CGPA: {edu.gpa}</span>
                        </>
                      )}
                    </div>

                    {(edu.achievements || edu.activities) && (
                      <div className="mt-3 space-y-2">
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="text-sm text-[hsl(var(--muted-foreground))]">
                            <span className="font-medium text-[hsl(var(--foreground))]">Achievements: </span>
                            {edu.achievements.join(", ")}
                          </div>
                        )}
                        {edu.activities && edu.activities.length > 0 && (
                          <div className="text-sm text-[hsl(var(--muted-foreground))]">
                            <span className="font-medium text-[hsl(var(--foreground))]">Activities: </span>
                            {edu.activities.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {onEdit && (
                  <Button variant="ghost" size="icon-xs" onClick={() => onEdit(edu.id)} className="shrink-0 sm:mt-1 self-end sm:self-auto" aria-label="Edit this education">
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function EducationListSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 shrink-0 bg-[hsl(var(--muted))] animate-pulse rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-4 w-64 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-32 bg-[hsl(var(--muted))] animate-pulse rounded pt-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
