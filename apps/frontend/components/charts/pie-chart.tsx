"use client";

import * as React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard, getChartColor } from "./chart-container";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartCardProps {
  title: string;
  description?: string;
  data: PieDataPoint[];
  loading?: boolean;
  error?: string;
  height?: number;
  className?: string;
  footer?: React.ReactNode;
  /** Inner radius — 0 for pie, >0 for donut */
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showLabels?: boolean;
  valueFormatter?: (value: number) => string;
  tooltipFormatter?: any;
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom label
// ─────────────────────────────────────────────────────────────────────────────
function renderCustomLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PieChartCard
// ─────────────────────────────────────────────────────────────────────────────
function PieChartCard({
  title,
  description,
  data,
  loading = false,
  error,
  height = 280,
  className,
  footer,
  innerRadius = 0,
  outerRadius = 90,
  showLegend = true,
  showLabels = false,
  valueFormatter = (v) => String(v),
  tooltipFormatter,
}: PieChartCardProps) {
  const isEmpty = !loading && !error && data.length === 0;

  // For donut center label
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const isDonut = innerRadius > 0;

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
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={data.length > 1 ? 2 : 0}
            dataKey="value"
            labelLine={false}
            label={showLabels ? renderCustomLabel : undefined}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? getChartColor(index)}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.12)",
            }}
            formatter={tooltipFormatter ?? ((value: any, name: any) => [valueFormatter(value), name])}
          />

          {showLegend && (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "11px",
                color: "hsl(var(--muted-foreground))",
                paddingLeft: "12px",
              }}
              formatter={(value) => (
                <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
              )}
            />
          )}
        </RePieChart>
      </ResponsiveContainer>

      {/* Donut center total */}
      {isDonut && total > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          aria-hidden
        >
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">
            {valueFormatter(total)}
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Total</span>
        </div>
      )}
    </ChartCard>
  );
}

// Donut convenience
function DonutChartCard(props: PieChartCardProps) {
  return <PieChartCard {...props} innerRadius={props.innerRadius ?? 60} />;
}

export { PieChartCard, DonutChartCard };
