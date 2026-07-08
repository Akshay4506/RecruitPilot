import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ClipboardList } from "lucide-react";
import { CompetencyScore } from "../../types";

interface ScorecardProps {
  competencies: CompetencyScore[];
}

export function Scorecard({ competencies }: ScorecardProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <ClipboardList className="h-4 w-4" /> Competencies Scorecard
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {competencies.map(comp => (
          <div key={comp.competencyId} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm text-[hsl(var(--foreground))]">{comp.name}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Weight: {comp.weight.toFixed(1)}x</div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button 
                  key={num}
                  className={`flex-1 h-10 rounded border transition-colors flex items-center justify-center font-semibold text-sm ${
                    comp.score === num 
                      ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm scale-[1.02]' 
                      : 'bg-[hsl(var(--background))] border-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {comp.evidence && (
              <div className="text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg">
                <span className="font-semibold text-[hsl(var(--foreground))] block mb-1 text-xs uppercase tracking-wider">Evidence Notes</span>
                {comp.evidence}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
