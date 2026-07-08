import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, User, CheckCircle2 } from "lucide-react";
import { Tooltip } from "@/components/ui/primitives";
import { Reference } from "../../types";

interface ProfessionalReferencesProps {
  references: Reference[];
  onAdd?: () => void;
}

export function ProfessionalReferences({ references, onAdd }: ProfessionalReferencesProps) {
  if (!references || references.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Professional References</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Reference">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {references.map((ref) => (
            <div key={ref.id} className="flex gap-3 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-0.5 overflow-hidden">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{ref.name}</h4>
                  {ref.status === "VERIFIED" && (
                    <Tooltip content="Verified Reference">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))] cursor-help" />
                    </Tooltip>
                  )}
                </div>
                <div className="text-xs text-[hsl(var(--foreground))] truncate">
                  {ref.title} at {ref.company}
                </div>
                <div className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">
                  {ref.relationship}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfessionalReferencesSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--muted))] animate-pulse shrink-0 mt-1" />
              <div className="flex-1 space-y-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-4 w-4 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
                </div>
                <div className="h-3 w-40 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-2 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
