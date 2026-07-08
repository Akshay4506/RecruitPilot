import * as React from "react";
import { Timeline } from "@/components/display/timeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { History } from "lucide-react";

export function InterviewTimeline() {
  const items = [
    {
      id: "1",
      title: "Interview Scheduled",
      timestamp: "Aug 12, 10:00 AM",
      status: "success" as const,
      description: "Scheduled by System via Template."
    },
    {
      id: "2",
      title: "Alex Rivera accepted invite",
      timestamp: "Aug 12, 10:05 AM",
      status: "neutral" as const
    },
    {
      id: "3",
      title: "Taylor Swift accepted invite",
      timestamp: "Aug 12, 11:30 AM",
      status: "neutral" as const
    },
    {
      id: "4",
      title: "Jamie Lin accepted invite",
      timestamp: "Aug 12, 2:15 PM",
      status: "neutral" as const
    }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <History className="h-4 w-4" /> Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Timeline items={items} />
      </CardContent>
    </Card>
  );
}
