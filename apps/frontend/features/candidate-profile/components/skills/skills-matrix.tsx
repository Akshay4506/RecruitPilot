import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle2, ShieldCheck } from "lucide-react";
import { SkillDetail } from "../../types";

interface SkillsMatrixProps {
  skills: SkillDetail[];
  onAdd?: () => void;
}

export function SkillsMatrix({ skills, onAdd }: SkillsMatrixProps) {
  if (!skills || skills.length === 0) return null;

  const primarySkills = skills.filter((s) => s.type === "PRIMARY");
  const secondarySkills = skills.filter((s) => s.type === "SECONDARY");

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Skills & Expertise</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Skill">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {primarySkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Core Competencies
            </h4>
            <div className="flex flex-col gap-2">
              {primarySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between group rounded-md hover:bg-[hsl(var(--muted)/0.3)] -mx-2 px-2 py-1.5 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">{skill.name}</span>
                    {skill.isVerified && (
                      <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--success))] hidden sm:block" aria-label="Verified Skill" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[hsl(var(--muted-foreground))] w-12 text-right">{skill.yearsOfExperience} yrs</span>
                    <Badge variant="outline" size="sm" className="w-20 justify-center">
                      {skill.proficiency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {secondarySkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Other Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {secondarySkills.map((skill) => (
                <Badge key={skill.id} variant="neutral" className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.8)] px-2.5 py-1">
                  <span className="mr-1">{skill.name}</span>
                  {skill.isVerified && <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))]" />}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SkillsMatrixSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="h-3 w-28 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="h-4 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="flex gap-2">
                  <div className="h-4 w-8 bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-5 w-16 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
