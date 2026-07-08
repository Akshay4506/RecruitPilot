import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  UserPlus, 
  Forward, 
  Download, 
  Archive,
  MessageSquare
} from "lucide-react";

interface QuickActionsProps {
  application: Application;
  onActionClick: (action: string) => void;
}

export function QuickActions({ application, onActionClick }: QuickActionsProps) {
  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">
        Quick Actions
      </h3>
      
      <div className="space-y-2">
        <Button 
          className="w-full justify-start gap-2" 
          variant="primary"
          onClick={() => onActionClick("schedule")}
        >
          <Calendar className="h-4 w-4" /> Schedule Interview
        </Button>
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--success))] hover:text-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success)/0.2)]" 
          variant="outline"
          onClick={() => onActionClick("shortlist")}
        >
          <CheckCircle className="h-4 w-4" /> Shortlist
        </Button>
        <Button 
          className="w-full justify-start gap-2" 
          variant="outline"
          onClick={() => onActionClick("move_stage")}
        >
          <Forward className="h-4 w-4" /> Move Stage
        </Button>
        <Button 
          className="w-full justify-start gap-2" 
          variant="outline"
          onClick={() => onActionClick("assign")}
        >
          <UserPlus className="h-4 w-4" /> Assign Recruiter
        </Button>
        <Button 
          className="w-full justify-start gap-2" 
          variant="outline"
          onClick={() => onActionClick("request_info")}
        >
          <MessageSquare className="h-4 w-4" /> Request Info
        </Button>
      </div>

      <div className="pt-2 border-t border-[hsl(var(--border))] space-y-2">
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)] border border-[hsl(var(--danger)/0.2)]" 
          variant="outline"
          onClick={() => onActionClick("reject")}
        >
          <XCircle className="h-4 w-4" /> Reject Candidate
        </Button>
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--muted-foreground))]" 
          variant="ghost"
        >
          <Download className="h-4 w-4" /> Export Data
        </Button>
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--muted-foreground))]" 
          variant="ghost"
        >
          <Archive className="h-4 w-4" /> Archive Application
        </Button>
      </div>
    </Card>
  );
}
