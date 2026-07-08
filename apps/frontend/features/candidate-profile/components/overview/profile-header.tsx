import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/cards/card";
import { MapPin, Briefcase, CheckCircle2, Edit3, Share2, Download } from "lucide-react";
import { CandidateProfile } from "../../types";

interface ProfileHeaderProps {
  profile: CandidateProfile;
  onEdit?: () => void;
}

export function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm bg-[hsl(var(--card))]">
      <div className="h-32 bg-gradient-to-r from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.4)]" />
      <CardContent className="relative pt-0 sm:pt-0">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 sm:-mt-16 mb-4">
          <Avatar 
            src={profile.avatarUrl} 
            alt={profile.fullName} 
            size="xl" 
            className="border-4 border-[hsl(var(--background))] bg-[hsl(var(--background))] shadow-sm"
          />
          <div className="flex-1 space-y-1.5 pb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {profile.fullName}
              </h1>
              {profile.status === "ACTIVE" && (
                <Badge variant="success" size="sm" className="hidden sm:inline-flex">Open to Work</Badge>
              )}
            </div>
            <p className="text-base font-medium text-[hsl(var(--foreground))]">
              {profile.headline}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              {profile.experience.find(e => e.isCurrent) && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {profile.experience.find(e => e.isCurrent)?.title} at {profile.experience.find(e => e.isCurrent)?.company}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[hsl(var(--success))]">
                <CheckCircle2 className="h-4 w-4" />
                Verified Email
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pb-2 sm:pb-4">
            <Button variant="outline" size="sm" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Resume
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Edit3 className="h-4 w-4" />} onClick={onEdit}>
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <div className="h-32 bg-[hsl(var(--muted))] animate-pulse" />
      <CardContent className="relative pt-0 sm:pt-0">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 sm:-mt-16 mb-4">
          <div className="h-24 w-24 rounded-full bg-[hsl(var(--muted))] animate-pulse border-4 border-[hsl(var(--background))]" />
          <div className="flex-1 space-y-3 pb-2">
            <div className="h-8 w-48 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-5 w-72 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
              <div className="h-4 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
            </div>
          </div>
          <div className="flex gap-3 pb-2 sm:pb-4">
            <div className="h-9 w-24 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
            <div className="h-9 w-24 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
            <div className="h-9 w-32 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
