import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Timeline, TimelineItem } from "@/components/display/timeline";
import { Key, Plus } from "lucide-react";

export function ChangeHistory() {
  const history: TimelineItem[] = [
    {
      id: "1",
      title: "Permissions Updated",
      description: "Added 'Analytics View' permission.",
      timestamp: "2024-07-02T14:20:00Z",
      icon: Key,
      status: "info"
    },
    {
      id: "2",
      title: "Role Created",
      description: "Created from 'Full Recruiter' template.",
      timestamp: "2024-02-15T10:00:00Z",
      icon: Plus,
      status: "success"
    }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Change History</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Timeline items={history} />
      </CardContent>
    </Card>
  );
}
