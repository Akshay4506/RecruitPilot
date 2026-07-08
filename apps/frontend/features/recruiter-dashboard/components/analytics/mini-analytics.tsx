import * as React from "react";
import { BarChartCard } from "@/components/charts/bar-chart";
import { LineChartCard } from "@/components/charts/line-chart";

// Local mock data since mini-analytics wasn't strictly typed in the main dashboard mock, but represents standard trends
const applicationsData = [
  { name: "Mon", count: 45 },
  { name: "Tue", count: 52 },
  { name: "Wed", count: 38 },
  { name: "Thu", count: 65 },
  { name: "Fri", count: 48 },
  { name: "Sat", count: 12 },
  { name: "Sun", count: 18 },
];

const interviewsData = [
  { name: "W1", count: 12 },
  { name: "W2", count: 18 },
  { name: "W3", count: 15 },
  { name: "W4", count: 24 },
];

export function MiniAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <LineChartCard
        title="Applications (Last 7 Days)"
        description="Daily inbound applications"
        data={applicationsData}
        categoryKey="name"
        series={[
          { dataKey: "count", label: "Applications", color: "hsl(var(--primary))" }
        ]}
        height={250}
        showDots
        curved
      />
      <BarChartCard
        title="Interviews (Last 30 Days)"
        description="Weekly scheduled interviews"
        data={interviewsData}
        categoryKey="name"
        series={[
          { dataKey: "count", label: "Interviews", color: "hsl(var(--info))" }
        ]}
        height={250}
        colorPerBar
        borderRadius={4}
      />
    </div>
  );
}
