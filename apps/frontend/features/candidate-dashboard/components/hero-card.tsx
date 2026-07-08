import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/cards/card";
import { Progress } from "@/components/ui/primitives";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/loaders/skeleton";
import { MapPin, Briefcase, MailCheck, FileText, Clock } from "lucide-react";
import { mockCandidate } from "../mock-data";

export function HeroCard() {
  const candidate = mockCandidate;

  // Derive some values based on the mock data
  const latestExperience = candidate.experience.find(e => e.isCurrent) || candidate.experience[0];
  const profileCompletion = 85; // Simulated
  const lastUpdated = new Date(candidate.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--muted)/0.3)]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar 
            src={candidate.avatarUrl} 
            name={candidate.fullName} 
            size="xl" 
            className="ring-4 ring-[hsl(var(--background))]"
          />
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{candidate.fullName}</h1>
              <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">{candidate.headline}</p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-[hsl(var(--muted-foreground))]">
              {candidate.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{candidate.location}</span>
                </div>
              )}
              {latestExperience && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{latestExperience.company}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[hsl(var(--success))]">
                <MailCheck className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
              {candidate.resumeUrl && (
                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Resume uploaded</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-none">
                Open to work
              </Badge>
              {candidate.isOpenToRelocation && (
                <Badge variant="outline">Relocation friendly</Badge>
              )}
              <Badge variant="outline" className="text-[hsl(var(--muted-foreground))]">
                <Clock className="h-3 w-3 mr-1" /> Updated {lastUpdated}
              </Badge>
            </div>
          </div>
          
          <div className="w-full md:w-48 bg-[hsl(var(--background))] p-4 rounded-xl border border-[hsl(var(--border))]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Profile Health</span>
              <span className="text-sm font-bold text-[hsl(var(--primary))]">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} size="sm" variant={profileCompletion > 80 ? "success" : "default"} />
            <Button variant="ghost" size="sm" className="w-full mt-3 h-8 text-xs">
              Improve profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HeroCardSkeleton() {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Skeleton className="h-24 w-24 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-24 w-full md:w-48 rounded-xl shrink-0" />
      </CardContent>
    </Card>
  );
}
