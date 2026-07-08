import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Flag, CheckCircle2 } from "lucide-react";

export function ScreeningAnswers({ application }: { application: Application }) {
  const { screeningAnswers } = application;

  if (screeningAnswers.length === 0) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center text-center border border-dashed border-[hsl(var(--border))]">
        <MessageSquare className="h-10 w-10 text-[hsl(var(--muted-foreground))/50] mb-3" />
        <p className="text-[hsl(var(--foreground))] font-medium">No Screening Answers</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 max-w-sm">
          This candidate was not required to answer any custom screening questions during application.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {screeningAnswers.map((sa) => (
        <Card key={sa.id} className="p-5 border-l-4 border-l-[hsl(var(--primary))]">
          <h4 className="font-medium text-[hsl(var(--foreground))] text-base mb-3">{sa.question}</h4>
          <div className="p-4 bg-[hsl(var(--muted)/0.3)] rounded-lg text-[hsl(var(--foreground))] text-sm leading-relaxed border border-[hsl(var(--border))] mb-4">
            {sa.answer}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-3 mt-2">
            {sa.score !== undefined ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">AI Score:</span>
                <span className={`font-semibold ${sa.score >= 80 ? "text-[hsl(var(--success))]" : sa.score >= 50 ? "text-[hsl(var(--warning))]" : "text-[hsl(var(--danger))]"}`}>
                  {sa.score}/100
                </span>
                {sa.score >= 80 && <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />}
              </div>
            ) : <div />}
            
            {sa.flags && sa.flags.length > 0 && (
              <div className="flex items-center gap-2">
                <Flag className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Flags:</span>
                {sa.flags.map((flag, idx) => (
                  <Badge key={idx} variant="outline" className="text-[10px] bg-[hsl(var(--background))] border-[hsl(var(--border))]">
                    {flag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
