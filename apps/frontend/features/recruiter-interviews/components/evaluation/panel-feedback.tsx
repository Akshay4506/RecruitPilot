import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { CheckCircle2, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanelFeedbackProps {
  status: "DRAFT" | "SUBMITTED" | "LOCKED";
}

export function PanelFeedback({ status }: PanelFeedbackProps) {
  return (
    <Card className={`border shadow-sm transition-all ${status === 'DRAFT' ? 'border-[hsl(var(--warning)/0.5)] bg-[hsl(var(--warning)/0.02)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]'}`}>
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          {status === 'DRAFT' && <Save className="h-4 w-4 text-[hsl(var(--warning))]" />}
          {status === 'SUBMITTED' && <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />}
          {status === 'LOCKED' && <Lock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />}
          Submission Status
        </CardTitle>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === 'DRAFT' ? 'bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]' :
          status === 'SUBMITTED' ? 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]' :
          'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
        }`}>
          {status}
        </span>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {status === 'DRAFT' && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Your evaluation is currently saved as a draft. The hiring team cannot see your scores until you finalize your submission.</p>
        )}
        {status === 'SUBMITTED' && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Your evaluation has been submitted. You can still make changes until the committee review locks it.</p>
        )}
        {status === 'LOCKED' && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">This evaluation has been locked by the committee and can no longer be edited.</p>
        )}

        <div className="flex gap-3">
          {status !== 'LOCKED' && (
            <Button variant="outline" className="flex-1">Save Draft</Button>
          )}
          {status !== 'LOCKED' && (
            <Button className="flex-1">Finalize Submission</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
