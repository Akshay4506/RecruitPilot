import * as React from "react";
import { Interview } from "../../types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewPipelineProps {
  interview: Interview;
}

const STAGES = [
  { id: "SCHEDULED", label: "Scheduled" },
  { id: "CONFIRMED", label: "Confirmed" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "COMPLETED", label: "Completed" },
];

export function InterviewPipeline({ interview }: InterviewPipelineProps) {
  
  // Determine current step index
  let currentIndex = 0;
  
  if (interview.status === "CANCELLED" || interview.status === "NO_SHOW") {
    // If cancelled, we don't really progress normally. Maybe show failure state.
    currentIndex = -1;
  } else {
    switch (interview.status) {
      case "SCHEDULED": 
        currentIndex = interview.confirmationStatus === "CONFIRMED" ? 1 : 0;
        break;
      case "CONFIRMED": currentIndex = 1; break;
      case "IN_PROGRESS": currentIndex = 2; break;
      case "COMPLETED": currentIndex = 3; break;
    }
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="relative">
        
        {/* Connecting Line Background */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-[hsl(var(--muted))] -z-10" />
        
        {/* Connecting Line Active */}
        {currentIndex >= 0 && (
          <div 
            className="absolute top-4 left-0 h-0.5 bg-[hsl(var(--primary))] -z-10 transition-all duration-500 ease-in-out" 
            style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
          />
        )}

        {/* Steps */}
        <div className="flex justify-between">
          {STAGES.map((stage, index) => {
            
            const isCompleted = currentIndex > index;
            const isCurrent = currentIndex === index;
            const isPending = currentIndex < index;
            const isError = currentIndex === -1; // Cancelled

            let ringColor = "ring-[hsl(var(--muted))] bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]";
            
            if (isCompleted) {
              ringColor = "ring-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-primary-foreground";
            } else if (isCurrent) {
              ringColor = "ring-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--primary))] border-2 border-[hsl(var(--primary))]";
            } else if (isError) {
              ringColor = "ring-[hsl(var(--danger)/0.2)] bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]";
            }

            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ring-4 shadow-sm transition-colors",
                  ringColor
                )}>
                  {isCompleted ? <Check className="h-4 w-4" /> : (index + 1)}
                </div>
                
                <span className={cn(
                  "text-xs font-medium mt-1",
                  (isCompleted || isCurrent) ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"
                )}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {currentIndex === -1 && (
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--danger))] bg-[hsl(var(--danger)/0.1)] px-3 py-1.5 rounded-full">
              Interview {interview.status === "NO_SHOW" ? "No-Show" : "Cancelled"}
            </span>
          </div>
        )}
        
      </div>
    </div>
  );
}
