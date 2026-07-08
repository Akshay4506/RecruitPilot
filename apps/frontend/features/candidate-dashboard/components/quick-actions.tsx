import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/loaders/skeleton";
import { Search, UploadCloud, UserCircle, FolderOpen, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    { label: "Browse Jobs", icon: Search, href: "/candidate/jobs", variant: "primary" as const },
    { label: "Complete Profile", icon: UserCircle, href: "/candidate/profile", variant: "outline" as const },
    { label: "Upload Resume", icon: UploadCloud, href: "/candidate/documents", variant: "outline" as const },
    { label: "Manage Documents", icon: FolderOpen, href: "/candidate/documents", variant: "outline" as const },
    { label: "View Applications", icon: FileText, href: "/candidate/applications", variant: "outline" as const },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant}
              className="w-full justify-start text-sm h-10 px-4 group"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-4 w-4 mr-3" aria-hidden />
                <span className="flex-1 text-left">{action.label}</span>
                <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActionsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-28" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
