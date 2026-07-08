"use client";

import * as React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard, getChartColor } from "./chart-container";
import type { BaseChartCardProps } from "./chart-container";

export interface LineChartCardProps extends BaseChartCardProps {
  curved?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: any;
}

function LineChartCard({
  title,
  description,
  data,
  series,
  categoryKey,
  loading = false,
  error,
  height = 280,
  className,
  footer,
  curved = true,
  showDots = false,
  showGrid = true,
  showLegend = true,
  yAxisFormatter = (v) => String(v),
  tooltipFormatter,
}: LineChartCardProps) {
  const isEmpty = !loading && !error && data.length === 0;

  return (
    <ChartCard
      title={title}
      description={description}
      loading={loading}
      error={error}
      isEmpty={isEmpty}
      height={height}
      className={className}
      footer={footer}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart
          data={data}
          margin={{ top: 5, right: 16, left: -8, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
          )}
          <XAxis
            dataKey={categoryKey}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            dx={-4}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.12)",
            }}
            formatter={tooltipFormatter}
            cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px", color: "hsl(var(--muted-foreground))" }}
            />
          )}
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type={curved ? "monotone" : "linear"}
              dataKey={s.dataKey}
              name={s.label}
              stroke={s.color ?? getChartColor(i)}
              strokeWidth={2}
              dot={showDots ? { r: 3, fill: s.color ?? getChartColor(i) } : false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export { LineChartCard };
