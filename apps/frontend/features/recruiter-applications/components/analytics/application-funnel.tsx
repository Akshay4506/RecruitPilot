import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Filter, ChevronRight } from "lucide-react";

export function ApplicationFunnel({ applications }: { applications: Application[] }) {
  const total = applications.length;
  const review = applications.filter(a => ["UNDER_REVIEW", "SHORTLISTED", "INTERVIEW_SCHEDULED", "OFFER", "HIRED", "REJECTED"].includes(a.status)).length;
  const interview = applications.filter(a => ["INTERVIEW_SCHEDULED", "OFFER", "HIRED"].includes(a.status)).length;
  const offer = applications.filter(a => ["OFFER", "HIRED"].includes(a.status)).length;
  const hire = applications.filter(a => a.status === "HIRED").length;

  const funnel = [
    { label: "Applied", count: total, color: "bg-[hsl(var(--primary))]" },
    { label: "Review", count: review, color: "bg-[hsl(var(--info))]" },
    { label: "Interview", count: interview, color: "bg-[hsl(var(--warning))]" },
    { label: "Offer", count: offer, color: "bg-[hsl(var(--success))]" },
    { label: "Hire", count: hire, color: "bg-[hsl(var(--success))]/80" },
  ];

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-[hsl(var(--primary))]" />
        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Conversion Funnel</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-3">
        {funnel.map((stage, idx) => {
          const width = total > 0 ? Math.max((stage.count / total) * 100, 5) : 0;
          return (
            <div key={stage.label} className="flex items-center gap-4 group">
              <div className="w-24 text-sm font-medium text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                {stage.label}
                {idx < funnel.length - 1 && <ChevronRight className="h-3 w-3 text-[hsl(var(--muted-foreground))/50]" />}
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div 
                  className={`h-8 rounded-md ${stage.color} transition-all duration-500 ease-out`}
                  style={{ width: `${width}%` }}
                />
                <span className="text-sm font-semibold text-[hsl(var(--foreground))] w-8">{stage.count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
