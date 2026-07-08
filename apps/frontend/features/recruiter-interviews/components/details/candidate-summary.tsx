import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Briefcase, Code, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CandidateSummary() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Candidate Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] mb-3">
            <Briefcase className="h-4 w-4" /> Experience
          </div>
          <div className="space-y-3 pl-6 border-l-2 border-[hsl(var(--border))] ml-2">
            <div className="relative">
              <div className="absolute w-2 h-2 bg-[hsl(var(--primary))] rounded-full -left-[29px] top-1.5" />
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">Senior Backend Engineer at TechCorp</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">2020 - Present (4 yrs)</div>
            </div>
            <div className="relative">
              <div className="absolute w-2 h-2 bg-[hsl(var(--muted-foreground))] rounded-full -left-[29px] top-1.5" />
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">Backend Developer at StartupX</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">2017 - 2020 (3 yrs)</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] mb-3">
            <Code className="h-4 w-4" /> Key Skills
          </div>
          <div className="flex flex-wrap gap-1.5 pl-2">
            {["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "AWS", "Go"].map(skill => (
              <Badge key={skill} variant="neutral" className="font-normal">{skill}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] mb-3">
            <GraduationCap className="h-4 w-4" /> Education
          </div>
          <div className="text-sm text-[hsl(var(--foreground))] pl-2">
            <div className="font-medium">B.S. Computer Science</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">University of California, Berkeley</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
