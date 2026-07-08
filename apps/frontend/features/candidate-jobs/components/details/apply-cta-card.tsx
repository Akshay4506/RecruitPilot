import * as React from "react";
import { Job } from "../../types";
import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Flag, CheckCircle2 } from "lucide-react";

interface ApplyCtaCardProps {
  job: Job;
  onApply?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

export function ApplyCtaCard({ job, onApply, onSave, onShare }: ApplyCtaCardProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm sticky top-6 space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] text-lg">Interested in this role?</h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        Submit your application. We'll automatically include your default resume and profile details.
      </p>
      
      <div className="pt-2 space-y-3">
        <Button variant="primary" size="lg" className="w-full gap-2" onClick={onApply} disabled={job.isApplied}>
          {job.isApplied ? (
            <><CheckCircle2 className="h-5 w-5"/> Applied</>
          ) : "Apply Now"}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className={`flex-1 ${job.isSaved ? 'text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]' : ''}`} onClick={onSave}>
            <Bookmark className={`h-4 w-4 mr-2 ${job.isSaved ? 'fill-current' : ''}`} />
            {job.isSaved ? 'Saved' : 'Save Job'}
          </Button>
          <Button variant="outline" className="flex-1" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>
      
      <div className="pt-4 border-t border-[hsl(var(--border))] text-center mt-6">
        <Button variant="ghost" size="sm" className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--danger))]">
          <Flag className="h-3 w-3 mr-1.5" /> Report this job
        </Button>
      </div>
    </div>
  );
}
