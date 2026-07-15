"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { RecruiterPerformance } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";

interface RecruiterPerformanceCardProps {
  performance: RecruiterPerformance[];
  isLoading?: boolean;
}

export function RecruiterPerformanceCard({ performance, isLoading }: RecruiterPerformanceCardProps) {
  const columns: ColumnDef<RecruiterPerformance>[] = [
    {
      id: "name",
      header: "Recruiter",
      accessor: "name",
    },
    {
      id: "activeJobs",
      header: "Active Jobs",
      accessor: "activeJobs",
      className: "text-center",
      headerClassName: "text-center",
    },
    {
      id: "processed",
      header: "Processed",
      accessor: "candidatesProcessed",
      className: "text-center",
      headerClassName: "text-center",
    },
    {
      id: "timeToHire",
      header: "Time to Hire",
      cell: (row: RecruiterPerformance) => `${row.timeToHireAvg} days`,
      className: "text-center",
      headerClassName: "text-center",
    },
    {
      id: "offerAccept",
      header: "Offer Accept",
      cell: (row: RecruiterPerformance) => `${row.offerAcceptanceRate}%`,
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return (
    <AnalyticsCard 
      title="Recruiter Performance" 
      description="Output and efficiency by team member"
      isLoading={isLoading}
      isEmpty={!isLoading && performance.length === 0}
      className="col-span-full xl:col-span-1 dark text-[hsl(var(--foreground))]"
    >
      <div className="h-full overflow-auto">
        <DataTable columns={columns} data={performance} keyField="recruiterId" />
      </div>
    </AnalyticsCard>
  );
}
