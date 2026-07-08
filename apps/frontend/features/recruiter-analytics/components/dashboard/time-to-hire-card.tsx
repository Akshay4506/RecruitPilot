"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { TimeSeriesData } from "../../types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface TimeToHireCardProps {
  data: TimeSeriesData[];
  isLoading?: boolean;
}

export function TimeToHireCard({ data, isLoading }: TimeToHireCardProps) {
  return (
    <AnalyticsCard 
      title="Time to Hire Trend" 
      description="Average days from application to offer acceptance"
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--card))', strokeWidth: 2 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
