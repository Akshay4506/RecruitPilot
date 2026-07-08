import * as React from "react";
import { Interview } from "../../types";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/primitives";

interface InterviewCalendarWidgetProps {
  interviews: Interview[];
}

export function InterviewCalendarWidget({ interviews }: InterviewCalendarWidgetProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Determine starting weekday offset (0 = Sunday, 1 = Monday)
  const startDayOffset = startOfMonth(currentDate).getDay();

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-[hsl(var(--muted-foreground))]">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-7 w-7" />
        ))}

        {days.map((day) => {
            const dayInterviews = interviews.filter(int => 
              (int.status === "SCHEDULED" || int.status === "CONFIRMED") && 
              isSameDay(new Date(int.date), day)
            );
            
            const hasInterview = dayInterviews.length > 0;
            const isCurrentDay = isToday(day);

            return (
              <Tooltip key={day.toISOString()} content={
                hasInterview ? (
                  <div className="text-xs space-y-1">
                    {dayInterviews.map(int => (
                      <div key={int.id}>{format(new Date(int.date), "h:mm a")} - {int.jobTitle}</div>
                    ))}
                  </div>
                ) : null
              }>
                <div className={`
                  h-7 w-7 flex items-center justify-center rounded-full cursor-default
                  ${isCurrentDay ? 'bg-[hsl(var(--primary))] text-primary-foreground font-semibold' : 'text-[hsl(var(--foreground))]'}
                  ${!isCurrentDay && hasInterview ? 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] font-semibold' : ''}
                  ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                `}>
                  {format(day, "d")}
                  {hasInterview && !isCurrentDay && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[hsl(var(--primary))] translate-y-1.5" />
                  )}
                </div>
              </Tooltip>
            );
          })}
      </div>
    </div>
  );
}
