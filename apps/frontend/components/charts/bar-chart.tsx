"use client";

import * as React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartCard, getChartColor } from "./chart-container";
import type { BaseChartCardProps } from "./chart-container";

export interface BarChartCardProps extends BaseChartCardProps {
  layout?: "vertical" | "horizontal";
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  /** Use a single color per bar (single-series only) */
  colorPerBar?: boolean;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: any;
  barSize?: number;
  borderRadius?: number;
}

function BarChartCard({
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
  layout = "horizontal",
  stacked = false,
  showGrid = true,
  showLegend = true,
  colorPerBar = false,
  yAxisFormatter = (v) => String(v),
  tooltipFormatter,
  barSize = 28,
  borderRadius = 4,
}: BarChartCardProps) {
  const isEmpty = !loading && !error && data.length === 0;

  const sharedTooltip = (
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
      cursor={{ fill: "hsl(var(--muted)/0.5)" }}
    />
  );

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
        <ReBarChart
          data={data}
          layout={layout}
          margin={{ top: 5, right: 16, left: layout === "vertical" ? 60 : -8, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              horizontal={layout === "horizontal"}
              vertical={layout === "vertical"}
            />
          )}

          {layout === "horizontal" ? (
            <>
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
                tickFormatter={yAxisFormatter}
                dx={-4}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={yAxisFormatter}
              />
              <YAxis
                type="category"
                dataKey={categoryKey}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
            </>
          )}

          {sharedTooltip}

          {showLegend && series.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px", color: "hsl(var(--muted-foreground))" }}
            />
          )}

          {series.map((s, i) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.label}
              fill={s.color ?? getChartColor(i)}
              stackId={stacked ? "stack" : undefined}
              maxBarSize={barSize}
              radius={[borderRadius, borderRadius, 0, 0]}
            >
              {colorPerBar && data.map((_, di) => (
                <Cell key={`cell-${di}`} fill={getChartColor(di)} />
              ))}
            </Bar>
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export { BarChartCard };
