import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, Cpu } from "lucide-react";
import { Technology } from "../../types";
import { Tooltip } from "@/components/ui/primitives";

interface TechStackProps {
  technologies: Technology[];
  onAdd?: () => void;
}

export function TechStack({ technologies, onAdd }: TechStackProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Technologies</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Technology">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {technologies.map((tech) => (
            <Tooltip
              key={tech.id}
              content={
                <div className="space-y-1">
                  <div className="font-semibold">{tech.name}</div>
                  <div className="text-[hsl(var(--muted-foreground))]">{tech.yearsOfExperience} years experience</div>
                  <div className="text-[hsl(var(--muted-foreground))]">Used in {tech.projectsUsedCount} projects</div>
                </div>
              }
            >
              <div className="flex items-center gap-3 p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:border-[hsl(var(--primary)/0.5)] transition-colors cursor-default">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                  <Cpu className="h-4 w-4" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{tech.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] truncate">
                    {tech.proficiency}
                  </span>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TechStackSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-[hsl(var(--border))]">
              <div className="h-8 w-8 rounded bg-[hsl(var(--muted))] animate-pulse" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-3 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-2 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
