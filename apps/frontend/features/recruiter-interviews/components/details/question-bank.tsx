import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { HelpCircle, ChevronRight, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function QuestionBank() {
  const questions = [
    { id: 1, comp: "Data Structures", q: "How would you design a rate limiter?", difficulty: "Hard" },
    { id: 2, comp: "Algorithms", q: "Implement a thread-safe cache.", difficulty: "Medium" }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> Recommended Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-[hsl(var(--border))]">
          {questions.map(q => (
            <li key={q.id} className="p-4 hover:bg-[hsl(var(--muted)/0.3)] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-[hsl(var(--background))]">
                  {q.comp}
                </Badge>
                <span className={`text-xs font-semibold ${q.difficulty === 'Hard' ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--warning))]'}`}>
                  {q.difficulty}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquareQuote className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{q.q}</span>
              </div>
              <div className="mt-2 text-xs text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                View Rubric <ChevronRight className="h-3 w-3" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
