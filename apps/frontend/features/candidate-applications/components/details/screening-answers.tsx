import * as React from "react";
import { Application } from "../../types";
import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScreeningAnswersProps {
  application: Application;
}

export function ScreeningAnswers({ application }: ScreeningAnswersProps) {
  if (!application.screeningAnswers || application.screeningAnswers.length === 0) {
    return null;
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-[hsl(var(--primary))]" />
        Screening Questions
      </h2>
      
      <div className="space-y-6">
        {application.screeningAnswers.map((answer, index) => (
          <div key={answer.id} className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm font-semibold text-[hsl(var(--muted-foreground))] mt-0.5">Q{index + 1}.</span>
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">{answer.question}</p>
              {answer.isRequired && <Badge variant="neutral" className="text-[10px] py-0 shrink-0">Required</Badge>}
            </div>
            
            <div className="pl-6">
              <div className="bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-3 text-sm text-[hsl(var(--muted-foreground))]">
                {answer.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
