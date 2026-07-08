import * as React from "react";
import { Interview } from "../../types";
import { BookOpen, FileText, Lightbulb, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PreparationSectionProps {
  interview: Interview;
}

export function PreparationSection({ interview }: PreparationSectionProps) {
  
  const { agenda, preparationNotes, requiredDocuments, tips, expectedDurationMinutes } = interview.preparation;

  if (!agenda.length && !preparationNotes && !requiredDocuments.length && !tips.length) {
    return null;
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-4">
        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Preparation Guide</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Everything you need to succeed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          {agenda.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-[hsl(var(--primary))]" /> Interview Agenda ({expectedDurationMinutes} min)
              </h3>
              <ul className="space-y-2">
                {agenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="h-5 w-5 shrink-0 rounded bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] font-medium flex items-center justify-center text-xs mt-0.5">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {preparationNotes && (
            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[hsl(var(--primary))]" /> Notes from Recruiter
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
                {preparationNotes}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          
          {requiredDocuments.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[hsl(var(--primary))]" /> Required Documents
              </h3>
              <div className="flex flex-wrap gap-2">
                {requiredDocuments.map((doc, i) => (
                  <Badge key={i} variant="outline" className="bg-[hsl(var(--background))]">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {tips.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[hsl(var(--warning))]" /> Pro Tips
              </h3>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--warning)/0.05)] p-3 rounded-lg border border-[hsl(var(--warning)/0.1)]">
                    <Lightbulb className="h-4 w-4 shrink-0 text-[hsl(var(--warning))] mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
