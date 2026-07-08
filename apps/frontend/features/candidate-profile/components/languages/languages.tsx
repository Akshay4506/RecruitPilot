import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Language } from "../../types";

interface LanguagesProps {
  languages: Language[];
  onAdd?: () => void;
}

export function Languages({ languages, onAdd }: LanguagesProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Languages</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Language">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.id} className="flex gap-3 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <div className="mt-1 shrink-0 text-[hsl(var(--muted-foreground))]">
                <Globe2 className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{lang.name}</h4>
                  {lang.isNative && (
                    <Badge variant="success" size="sm">Native</Badge>
                  )}
                  {!lang.isNative && lang.speaking === "PROFESSIONAL" && (
                    <Badge variant="outline" size="sm">Professional</Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  <div className="flex flex-col">
                    <span className="opacity-70 mb-0.5">Read</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">{lang.reading}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="opacity-70 mb-0.5">Write</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">{lang.writing}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="opacity-70 mb-0.5">Speak</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">{lang.speaking}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LanguagesSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <div className="h-4 w-4 rounded bg-[hsl(var(--muted))] animate-pulse shrink-0 mt-1" />
              <div className="flex-1 space-y-3 py-1">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-4 w-12 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-6 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-6 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-6 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
