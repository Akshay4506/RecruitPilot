"use client";

import * as React from "react";
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard, getChartColor } from "./chart-container";
import type { BaseChartCardProps } from "./chart-container";

export interface AreaChartCardProps extends BaseChartCardProps {
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  /** Fill opacity for area gradient (0-1) */
  fillOpacity?: number;
  curved?: boolean;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: any;
}

function AreaChartCard({
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
  stacked = false,
  showGrid = true,
  showLegend = true,
  fillOpacity = 0.12,
  curved = true,
  yAxisFormatter = (v) => String(v),
  tooltipFormatter,
}: AreaChartCardProps) {
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
        <ReAreaChart
          data={data}
          margin={{ top: 5, right: 16, left: -8, bottom: 0 }}
        >
          {/* SVG gradient defs per series */}
          <defs>
            {series.map((s, i) => {
              const color = s.color ?? getChartColor(i);
              const id = `gradient-${s.dataKey}`;
              return (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"   stopColor={color} stopOpacity={fillOpacity * 6} />
                  <stop offset="95%"  stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>

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
            tickFormatter={yAxisFormatter}
            dx={-4}
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
          {showLegend && series.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px", color: "hsl(var(--muted-foreground))" }}
            />
          )}

          {series.map((s, i) => {
            const color = s.color ?? getChartColor(i);
            return (
              <Area
                key={s.dataKey}
                type={curved ? "monotone" : "linear"}
                dataKey={s.dataKey}
                name={s.label}
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${s.dataKey})`}
                stackId={stacked ? "stack" : undefined}
                dot={false}
                activeDot={{ r: 5, fill: color, strokeWidth: 0 }}
              />
            );
          })}
        </ReAreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export { AreaChartCard };
