"use client";

import * as React from "react";
import { format, startOfWeek, addDays, isSameDay, isToday } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Interview } from "../../types";

interface InterviewCalendarProps {
  interviews: Interview[];
}

export function InterviewCalendar({ interviews }: InterviewCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const getInterviewsForDate = (date: Date) => {
    return interviews.filter(inv => isSameDay(new Date(inv.scheduledAt), date));
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" /> Weekly Schedule
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-xs" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
              {format(startDate, "MMM d")} - {format(addDays(startDate, 6), "MMM d")}
            </span>
            <Button variant="ghost" size="icon-xs" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px bg-[hsl(var(--border))] rounded-lg overflow-hidden border border-[hsl(var(--border))]">
          {/* Header Row */}
          {weekDays.map(day => (
            <div key={day.toISOString()} className="bg-[hsl(var(--muted)/0.3)] p-2 text-center border-b border-[hsl(var(--border))]">
              <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase font-semibold">{format(day, "EEE")}</div>
              <div className={`text-sm font-bold mt-1 ${isToday(day) ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] w-6 h-6 mx-auto rounded-full flex items-center justify-center" : "text-[hsl(var(--foreground))]"}`}>
                {format(day, "d")}
              </div>
            </div>
          ))}
          
          {/* Content Row */}
          {weekDays.map(day => {
            const dayInterviews = getInterviewsForDate(day);
            return (
              <div key={`content-${day.toISOString()}`} className="bg-[hsl(var(--card))] min-h-[120px] p-1.5 flex flex-col gap-1.5 hover:bg-[hsl(var(--muted)/0.1)] transition-colors">
                {dayInterviews.map(inv => (
                  <div 
                    key={inv.id} 
                    className={`px-2 py-1.5 rounded text-xs border cursor-pointer hover:opacity-80 transition-opacity ${
                      inv.status === 'SCHEDULED' ? 'bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))]' :
                      inv.status === 'COMPLETED' ? 'bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]' :
                      'bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]'
                    }`}
                  >
                    <div className="font-semibold truncate">{format(new Date(inv.scheduledAt), "h:mm a")}</div>
                    <div className="truncate opacity-90">{inv.candidate.name}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
