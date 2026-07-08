import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Progress } from "@/components/ui/primitives";
import { Badge } from "@/components/ui/badge";
import { CandidateProfile } from "../../types";

interface ProfileCompletionProps {
  profile: CandidateProfile;
}

export function ProfileCompletion({ profile }: ProfileCompletionProps) {
  const sections = [
    { name: "Personal", completed: true },
    { name: "Professional", completed: !!profile.headline },
    { name: "Experience", completed: profile.experience.length > 0 },
    { name: "Education", completed: profile.education.length > 0 },
    { name: "Skills", completed: profile.skills.length > 0 },
    { name: "Projects", completed: profile.projects.length > 0 },
    { name: "Documents", completed: !!profile.resumeUrl },
    { name: "Preferences", completed: profile.preferences.preferredRoles.length > 0 },
    { name: "Languages", completed: profile.languages.length > 0 },
    { name: "References", completed: profile.references.length > 0 },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[hsl(var(--foreground))]">{profile.profileCompletion}%</span>
            {profile.profileCompletion === 100 && (
              <Badge variant="success" size="sm">All Star</Badge>
            )}
          </div>
          
          <Progress 
            value={profile.profileCompletion} 
            max={100} 
            size="md" 
            variant={profile.profileCompletion > 80 ? "success" : "default"} 
          />
          
          <div className="flex flex-wrap gap-1.5 pt-2">
            {sections.map((section, idx) => (
              <Badge 
                key={idx} 
                variant={section.completed ? "default" : "outline"}
                className={!section.completed ? "opacity-50 text-[hsl(var(--muted-foreground))]" : "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.2)]"}
                size="sm"
              >
                {section.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileCompletionSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="pb-3">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-8 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-2 w-full bg-[hsl(var(--muted))] animate-pulse rounded-full" />
          <div className="flex flex-wrap gap-2 pt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
