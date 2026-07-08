import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Plus, Award, ExternalLink } from "lucide-react";
import { Certification } from "../../types";
import { formatDate } from "@/lib/utils";

interface CertificationsProps {
  certifications: Certification[];
  onAdd?: () => void;
}

export function Certifications({ certifications, onAdd }: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Certifications</CardTitle>
        <Button variant="ghost" size="icon-xs" onClick={onAdd} aria-label="Add Certification">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{cert.name}</h4>
                <div className="text-xs text-[hsl(var(--foreground))]">{cert.issuer}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  Issued {formatDate(cert.issueDate, { month: "short", year: "numeric" })}
                  {cert.expiryDate ? ` · Expires ${formatDate(cert.expiryDate, { month: "short", year: "numeric" })}` : " · No Expiration Date"}
                </div>
                {cert.credentialUrl && (
                  <div className="pt-1">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--primary))] hover:underline">
                      Show credential <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CertificationsSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-5 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-6 w-6 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 rounded bg-[hsl(var(--muted))] animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-24 bg-[hsl(var(--muted))] animate-pulse rounded pt-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
