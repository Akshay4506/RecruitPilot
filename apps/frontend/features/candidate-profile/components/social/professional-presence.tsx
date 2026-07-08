import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, Globe, Code, Terminal, ExternalLink } from "lucide-react";
import { SocialProfile } from "../../types";

interface ProfessionalPresenceProps {
  profiles: SocialProfile[];
  onAdd?: () => void;
}

export function ProfessionalPresence({ profiles, onAdd }: ProfessionalPresenceProps) {
  if (!profiles || profiles.length === 0) return null;

  const getIcon = (network: string) => {
    switch (network) {
      case "GitHub": return <Code className="h-4 w-4" />;
      case "LinkedIn": return <Globe className="h-4 w-4" />;
      case "Portfolio":
      case "Website": return <Globe className="h-4 w-4" />;
      case "LeetCode":
      case "HackerRank": return <Code className="h-4 w-4" />;
      case "StackOverflow": return <Terminal className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Professional Presence</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Social Profile">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {profiles.map((profile, idx) => (
            <a
              key={idx}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[hsl(var(--muted)/0.4)] transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors">
                {getIcon(profile.network)}
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{profile.network}</span>
                {profile.username && (
                  <span className="text-xs text-[hsl(var(--muted-foreground))] truncate">{profile.username}</span>
                )}
              </div>
              <ExternalLink className="h-3 w-3 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfessionalPresenceSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="h-8 w-8 rounded bg-[hsl(var(--muted))] animate-pulse shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
