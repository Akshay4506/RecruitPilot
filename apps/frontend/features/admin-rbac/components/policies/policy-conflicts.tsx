import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PolicyConflicts() {
  // In a real app, this would receive conflicts from a parent or context
  const conflicts = [
    {
      id: "conflict_1",
      title: "Conflicting Global Action",
      description: "Role grants 'Delete Jobs' but Template explicitly denies it.",
      severity: "warning"
    }
  ];

  if (conflicts.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--warning)/0.3)] shadow-sm bg-[hsl(var(--warning)/0.05)]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--warning)/0.2)] flex flex-row items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-[hsl(var(--warning))]" />
        <CardTitle className="text-sm font-semibold text-[hsl(var(--warning))]">Policy Conflicts Detected</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {conflicts.map(conflict => (
          <div key={conflict.id} className="flex flex-col gap-2 p-3 rounded border border-[hsl(var(--warning)/0.2)] bg-[hsl(var(--background))]">
            <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{conflict.title}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{conflict.description}</span>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm" className="h-7 text-xs border-[hsl(var(--warning)/0.5)] text-[hsl(var(--warning))] hover:bg-[hsl(var(--warning)/0.1)]">Resolve via Template</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs border-[hsl(var(--primary)/0.5)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)]">Keep Override</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
