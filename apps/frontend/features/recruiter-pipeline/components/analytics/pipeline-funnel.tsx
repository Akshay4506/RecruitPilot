import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Funnel, FunnelChart, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { value: 100, name: 'Applied', fill: '#8884d8' },
  { value: 80, name: 'Screening', fill: '#83a6ed' },
  { value: 50, name: 'Assessment', fill: '#8dd1e1' },
  { value: 40, name: 'Technical', fill: '#82ca9d' },
  { value: 20, name: 'Offer', fill: '#a4de6c' },
  { value: 12, name: 'Hired', fill: '#d0ed57' }
];

export function PipelineFunnel() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Hiring Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip cursor={{fill: 'transparent'}} />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
              />
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
