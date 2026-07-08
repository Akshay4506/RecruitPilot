import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  UserPlus, 
  Download, 
  Archive,
  MessageSquare,
  Share2,
  GitMerge
} from "lucide-react";

interface QuickActionsProps {
  candidate: RecruiterCandidate;
  onActionClick: (action: string) => void;
}

export function QuickActions({ candidate, onActionClick }: QuickActionsProps) {
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
          className="w-full justify-start gap-2" 
          variant="outline"
          onClick={() => onActionClick("request_docs")}
        >
          <MessageSquare className="h-4 w-4" /> Request Documents
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
          onClick={() => onActionClick("share")}
        >
          <Share2 className="h-4 w-4" /> Share Profile
        </Button>
      </div>

      <div className="pt-2 border-t border-[hsl(var(--border))] space-y-2">
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--muted-foreground))]" 
          variant="ghost"
          onClick={() => onActionClick("download")}
        >
          <Download className="h-4 w-4" /> Download Resume
        </Button>
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--muted-foreground))]" 
          variant="ghost"
          onClick={() => onActionClick("merge")}
        >
          <GitMerge className="h-4 w-4" /> Merge Candidate
        </Button>
        <Button 
          className="w-full justify-start gap-2 text-[hsl(var(--muted-foreground))]" 
          variant="ghost"
          onClick={() => onActionClick("archive")}
        >
          <Archive className="h-4 w-4" /> Archive Candidate
        </Button>
      </div>
    </Card>
  );
}
