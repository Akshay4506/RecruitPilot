"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface DepartmentPerformanceCardProps {
  isLoading?: boolean;
}

export function DepartmentPerformanceCard({ isLoading }: DepartmentPerformanceCardProps) {
  // Mock data specific for department
  const data = [
    { department: "Engineering", hired: 12, open: 8 },
    { department: "Sales", hired: 8, open: 5 },
    { department: "Product", hired: 4, open: 2 },
    { department: "Marketing", hired: 3, open: 3 },
  ];

  return (
    <AnalyticsCard 
      title="Department Hiring" 
      description="Hired vs Open headcount by department"
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
      className="col-span-full xl:col-span-1"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="hired" name="Hired" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 4, 4]} maxBarSize={40} />
          <Bar dataKey="open" name="Open" stackId="a" fill="hsl(var(--primary)/0.3)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
