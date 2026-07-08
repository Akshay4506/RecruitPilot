import * as React from "react";
import { ReportsList } from "../reports/reports-list";
import { ReportBuilder } from "../reports/report-builder";
import { ExportHistory } from "../export/export-history";
import { mockReportPresets, mockExportJobs } from "../../mock/analytics.mock";

export function AnalyticsSidebar() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1">
        <ReportsList reports={mockReportPresets} />
      </div>
      <div className="flex-1">
        <ReportBuilder />
      </div>
      <div className="flex-1">
        <ExportHistory jobs={mockExportJobs} />
      </div>
    </div>
  );
}
