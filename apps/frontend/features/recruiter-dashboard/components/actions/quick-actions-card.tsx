import * as React from "react";
import { Plus, Search, Calendar, FileDown, BarChart2 } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export function QuickActionsCard() {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4 sticky top-6">
      <h3 className="font-semibold text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))] pb-3">
        Quick Actions
      </h3>

      <div className="space-y-2.5">
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors" asChild>
          <Link href={ROUTES.recruiter.jobNew}>
            <Plus className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            Create Job
          </Link>
        </Button>

        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors" asChild>
          <Link href={ROUTES.recruiter.candidates}>
            <Search className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            Search Candidates
          </Link>
        </Button>

        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors" asChild>
          <Link href={ROUTES.recruiter.interviewNew}>
            <Calendar className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            Schedule Interview
          </Link>
        </Button>

        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors" asChild>
          <Link href={ROUTES.recruiter.analytics}>
            <FileDown className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            Export Reports
          </Link>
        </Button>

        <Button variant="outline" className="w-full justify-start text-left font-normal bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors" asChild>
          <Link href={ROUTES.recruiter.analytics}>
            <BarChart2 className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            View Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
}
