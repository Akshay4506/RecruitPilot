import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { PendingApproval } from "../../types";
import { Inbox, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PendingApprovalsProps {
  approvals: PendingApproval[];
}

export function PendingApprovals({ approvals }: PendingApprovalsProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="h-4 w-4 text-[hsl(var(--primary))]" /> Admin Inbox
          </div>
          <span className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-[10px] px-2 py-0.5 rounded-full">
            {approvals.length} pending
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-3">
        {approvals.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase text-[hsl(var(--primary))] tracking-wider">
                  {item.type}
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">• {item.requestedAt}</span>
              </div>
              <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">{item.title}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Requested by: {item.requester}</p>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="icon-sm" className="h-8 w-8 text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)] hover:bg-[hsl(var(--destructive)/0.1)]">
                <X className="h-4 w-4" />
              </Button>
              <Button size="icon-sm" className="h-8 w-8 bg-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.9)] text-white">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
