import * as React from "react";
import { Timeline } from "@/components/display/timeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { FileText } from "lucide-react";

export function AuditTrail() {
  const items = [
    {
      id: "1",
      title: "Scorecard locked",
      timestamp: "Aug 13, 9:00 AM",
      status: "neutral" as const,
      description: "Alex Rivera finalized their feedback."
    },
    {
      id: "2",
      title: "Consensus met",
      timestamp: "Aug 13, 9:15 AM",
      status: "success" as const,
      description: "System automatically flagged consensus achieved."
    }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <FileText className="h-4 w-4" /> Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Timeline items={items} />
      </CardContent>
    </Card>
  );
}
