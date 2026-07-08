import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { CheckCircle2, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecommendationPanel } from "../evaluation/recommendation-panel";
import { Recommendation } from "../../types";

export function CommitteeReview() {
  const [decision, setDecision] = React.useState<Recommendation>("HIRE");

  return (
    <Card className="border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.5)] shadow-lg bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.05)]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Gavel className="h-4 w-4 text-[hsl(var(--primary))]" /> Final Committee Decision
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <RecommendationPanel recommendation={decision} />
        
        <div className="flex justify-end gap-3 pt-4 border-t border-[hsl(var(--border))]">
          <Button variant="outline">Request Re-Interview</Button>
          <Button className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> Approve Final Decision
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
