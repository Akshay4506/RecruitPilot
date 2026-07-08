"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DiversityAnalyticsCardProps {
  data: { name: string; value: number }[];
  isLoading?: boolean;
}

export function DiversityAnalyticsCard({ data, isLoading }: DiversityAnalyticsCardProps) {
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--muted-foreground))'];

  return (
    <AnalyticsCard 
      title="Diversity Pipeline" 
      description="Self-reported demographic data"
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
