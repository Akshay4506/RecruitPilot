import * as React from "react";
import { InterviewTemplate } from "../../types";
import { Card, CardContent } from "@/components/cards/card";
import { CheckCircle2, Clock, ListChecks } from "lucide-react";

interface InterviewTemplateSelectorProps {
  templates: InterviewTemplate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InterviewTemplateSelector({ templates, selectedId, onSelect }: InterviewTemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-[hsl(var(--foreground))]">Select Interview Template</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map(tpl => {
          const isSelected = tpl.id === selectedId;
          return (
            <Card 
              key={tpl.id} 
              className={`border transition-all cursor-pointer ${
                isSelected 
                  ? "border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.02)]" 
                  : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--card))]"
              }`}
              onClick={() => onSelect(tpl.id)}
            >
              <CardContent className="p-4 relative h-full flex flex-col">
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[hsl(var(--primary))]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
                
                <h3 className="font-bold text-[hsl(var(--foreground))] pr-8">{tpl.name}</h3>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2 min-h-[32px]">
                  {tpl.description}
                </div>
                
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] flex-1 items-end">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {tpl.durationMinutes}m
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ListChecks className="h-3.5 w-3.5" /> {tpl.competencies.length} Competencies
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
