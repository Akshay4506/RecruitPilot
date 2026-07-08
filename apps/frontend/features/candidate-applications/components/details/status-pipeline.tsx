import * as React from "react";
import { Application, ApplicationStage } from "../../types";
import { Check } from "lucide-react";

interface StatusPipelineProps {
  application: Application;
}

const STAGES: { id: ApplicationStage; label: string }[] = [
  { id: "SUBMITTED", label: "Submitted" },
  { id: "UNDER_REVIEW", label: "Review" },
  { id: "SHORTLISTED", label: "Shortlisted" },
  { id: "INTERVIEW", label: "Interview" },
  { id: "OFFER", label: "Offer" },
  { id: "HIRED", label: "Hired" },
];

export function StatusPipeline({ application }: StatusPipelineProps) {
  
  const currentStageIndex = STAGES.findIndex(s => s.id === application.stage);
  
  const isRejected = application.status === "REJECTED";
  const isWithdrawn = application.status === "WITHDRAWN";
  
  const getStageStatus = (index: number) => {
    if (isWithdrawn || isRejected) {
      if (index === currentStageIndex) return isRejected ? "rejected" : "withdrawn";
      if (index < currentStageIndex) return "completed";
      return "pending";
    }
    
    if (index < currentStageIndex) return "completed";
    if (index === currentStageIndex) return "current";
    return "pending";
  };

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="relative">
        
        {/* Progress Line Background */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-[hsl(var(--muted))]" />
        
        {/* Progress Line Active */}
        <div 
          className={`absolute top-5 left-6 h-0.5 transition-all duration-500 ${isRejected ? 'bg-[hsl(var(--danger))]' : isWithdrawn ? 'bg-[hsl(var(--muted-foreground))]' : 'bg-[hsl(var(--primary))]'}`}
          style={{ width: `calc(${(currentStageIndex / (STAGES.length - 1)) * 100}% - 24px)` }}
        />

        <div className="relative flex justify-between">
          {STAGES.map((stage, index) => {
            const status = getStageStatus(index);
            
            return (
              <div key={stage.id} className="flex flex-col items-center group w-16">
                
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[hsl(var(--card))] z-10 transition-colors duration-300
                    ${status === "completed" ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]" : 
                      status === "current" ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : 
                      status === "rejected" ? "border-[hsl(var(--danger))] bg-[hsl(var(--danger))] text-[hsl(var(--danger-foreground))]" :
                      status === "withdrawn" ? "border-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted-foreground))] text-[hsl(var(--card))]" :
                      "border-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"}
                  `}
                >
                  {status === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                <span className={`text-xs mt-3 font-medium text-center transition-colors duration-300
                  ${status === "completed" || status === "current" ? "text-[hsl(var(--foreground))]" : 
                    status === "rejected" ? "text-[hsl(var(--danger))]" :
                    "text-[hsl(var(--muted-foreground))]"}
                `}>
                  {stage.label}
                  {status === "rejected" && <span className="block text-[10px] opacity-80">(Rejected)</span>}
                  {status === "withdrawn" && <span className="block text-[10px] opacity-80">(Withdrawn)</span>}
                </span>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
