import * as React from "react";
import { AnalyticsDateRange } from "../filters/analytics-date-range";
import { AnalyticsJobFilter } from "../filters/analytics-job-filter";
import { AnalyticsDepartmentFilter } from "../filters/analytics-department-filter";
import { ExportReportDialog } from "../dialogs/export-report-dialog";
import { Button } from "@/components/ui/button";
import { Download, LayoutTemplate, RotateCw } from "lucide-react";

export function RecruiterAnalyticsHero() {
  const [exportOpen, setExportOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Analytics & Reports</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Hiring insights, performance metrics, and funnel analytics.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <AnalyticsDateRange />
          <AnalyticsJobFilter />
          <AnalyticsDepartmentFilter />
          <Button variant="ghost" size="icon-sm" className="h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <LayoutTemplate className="h-4 w-4" /> Saved Reports
        </Button>
        <Button className="gap-2" onClick={() => setExportOpen(true)}>
          <Download className="h-4 w-4" /> Export Dashboard
        </Button>
      </div>

      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
