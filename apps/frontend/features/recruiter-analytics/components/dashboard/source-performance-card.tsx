"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { SourceAnalytics } from "../../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

interface SourcePerformanceCardProps {
  sources: SourceAnalytics[];
  isLoading?: boolean;
}

export function SourcePerformanceCard({ sources, isLoading }: SourcePerformanceCardProps) {
  return (
    <AnalyticsCard 
      title="Source Performance" 
      description="Volume by applicant origin"
      isLoading={isLoading}
      isEmpty={!isLoading && sources.length === 0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sources}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="source" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={50}>
            {sources.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(var(--primary)/${1 - index * 0.1})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
