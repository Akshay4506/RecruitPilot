import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Plus } from "lucide-react";

export function TagsPanel({ candidate }: { candidate: RecruiterCandidate }) {
  const { tags } = candidate;

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Candidate Tags
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag.id} variant="neutral" className="gap-1 px-2 py-1">
              {tag.color && (
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color === 'blue' ? '#3b82f6' : tag.color === 'green' ? '#22c55e' : tag.color === 'purple' ? '#a855f7' : tag.color === 'orange' ? '#f97316' : '#94a3b8' }}></span>
              )}
              {tag.label}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[hsl(var(--muted-foreground))] italic">No tags added yet.</p>
      )}
    </Card>
  );
}
