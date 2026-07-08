import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsCardProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function AnalyticsCard({ title, description, isLoading, isEmpty, children, className, action }: AnalyticsCardProps) {
  return (
    <Card className={`border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] flex flex-col ${className || ''}`}>
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between px-5">
        <div>
          <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</CardTitle>
          {description && <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{description}</div>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--muted-foreground))]">
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--muted-foreground))]">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-5 flex-1 relative flex flex-col p-5">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--card))] z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent animate-spin" />
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Loading data...</div>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--card))] z-10">
            <div className="text-sm text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] p-6 rounded-lg">
              No data available for this period.
            </div>
          </div>
        ) : null}
        
        <div className={`flex-1 w-full min-h-[250px] ${isLoading || isEmpty ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
