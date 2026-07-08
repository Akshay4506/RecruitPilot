import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Receipt, Users, Key } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 p-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start text-[hsl(var(--foreground))]">
          <ArrowUpRight className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
          Upgrade Plan
        </Button>
        <Button variant="ghost" className="w-full justify-start text-[hsl(var(--foreground))]">
          <Users className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
          Buy More Seats
        </Button>
        <Button variant="ghost" className="w-full justify-start text-[hsl(var(--foreground))]">
          <Receipt className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
          View Latest Invoice
        </Button>
        <Button variant="ghost" className="w-full justify-start text-[hsl(var(--foreground))]">
          <Key className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
          Generate API Key
        </Button>
      </CardContent>
    </Card>
  );
}
