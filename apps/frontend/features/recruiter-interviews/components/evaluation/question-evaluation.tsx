import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { MessageSquare } from "lucide-react";
import { QuestionResponse } from "../../types";

interface QuestionEvaluationProps {
  questions: QuestionResponse[];
}

export function QuestionEvaluation({ questions }: QuestionEvaluationProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Question Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {questions.map(q => (
          <div key={q.questionId} className="space-y-2">
            <div className="font-medium text-sm text-[hsl(var(--foreground))]">{q.question}</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button 
                  key={num}
                  className={`flex-1 h-8 rounded border transition-colors flex items-center justify-center font-semibold text-xs ${
                    q.rating === num 
                      ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm' 
                      : 'bg-[hsl(var(--background))] border-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {q.notes && (
              <div className="text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
                {q.notes}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
