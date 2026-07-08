import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Video, Copy, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingDetails } from "../../types";

interface MeetingInformationProps {
  details?: MeetingDetails;
}

export function MeetingInformation({ details }: MeetingInformationProps) {
  if (!details) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Video className="h-4 w-4" /> Meeting Details
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))] flex items-center justify-between">
          <div className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
            <span className="truncate max-w-[200px] sm:max-w-xs">{details.url || "meet.google.com/abc-defg-hij"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--muted-foreground))]">
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--primary))]">
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <Shield className="h-4 w-4" /> Passcode: <span className="font-mono font-medium text-[hsl(var(--foreground))]">{details.passcode || "123456"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
