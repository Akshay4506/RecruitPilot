import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ListTodo, Clock } from "lucide-react";

export function InterviewAgenda() {
  const agendaItems = [
    { time: "5m", title: "Introductions & Setup", desc: "Brief intro and outline of the interview." },
    { time: "15m", title: "Past Experience", desc: "Deep dive into recent project architecture." },
    { time: "30m", title: "System Design", desc: "Design a rate limiter (see Question Bank)." },
    { time: "10m", title: "Candidate Questions", desc: "Leave time for them to ask about the team." }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <ListTodo className="h-4 w-4" /> Agenda
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {agendaItems.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex items-center gap-1 text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-1.5 py-0.5 rounded shrink-0">
                <Clock className="h-3 w-3" /> {item.time}
              </div>
              <div>
                <div className="text-sm font-medium text-[hsl(var(--foreground))]">{item.title}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
