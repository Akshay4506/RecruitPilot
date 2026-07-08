"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { HiringFunnel } from "../../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PipelineFunnelCardProps {
  funnel: HiringFunnel;
  isLoading?: boolean;
}

export function PipelineFunnelCard({ funnel, isLoading }: PipelineFunnelCardProps) {
  // We'll render a simple horizontal bar chart to act as a funnel
  const data = funnel.stages.map(s => ({
    name: s.stage,
    value: s.count,
    conversion: s.conversionFromPrevious
  }));

  return (
    <AnalyticsCard 
      title="Hiring Funnel" 
      description={`Total dropoff rate: ${funnel.totalDropoffRate}%`}
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '12px', fill: 'hsl(var(--foreground))' }} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(var(--primary)/${1 - index * 0.15})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
