import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { CandidateProfile } from "../../types";

interface AboutMeProps {
  profile: CandidateProfile;
  onEdit?: () => void;
}

export function AboutMe({ profile, onEdit }: AboutMeProps) {
  if (!profile.summary) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">About Me</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Edit About Me">
          <Edit3 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none text-[hsl(var(--muted-foreground))]">
          {/* We use a simple string for now, but this could render markdown or rich text */}
          <p className="whitespace-pre-wrap leading-relaxed">{profile.summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AboutMeSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-4 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-4 w-[90%] bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-4 w-[80%] bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}
