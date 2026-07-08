import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ThumbsUp, ThumbsDown, Hand, MessageSquarePlus } from "lucide-react";
import { Recommendation } from "../../types";

interface RecommendationPanelProps {
  recommendation?: Recommendation;
}

export function RecommendationPanel({ recommendation }: RecommendationPanelProps) {
  const options = [
    { value: "STRONG_HIRE", label: "Strong Hire", icon: ThumbsUp, color: "text-[hsl(var(--success))]", bg: "bg-[hsl(var(--success)/0.1)]", border: "border-[hsl(var(--success)/0.3)]" },
    { value: "HIRE", label: "Hire", icon: ThumbsUp, color: "text-[hsl(var(--success))]", bg: "bg-[hsl(var(--success)/0.1)]", border: "border-[hsl(var(--success)/0.3)]" },
    { value: "LEAN_HIRE", label: "Lean Hire", icon: ThumbsUp, color: "text-[hsl(var(--success))]", bg: "bg-[hsl(var(--success)/0.1)]", border: "border-[hsl(var(--success)/0.3)]" },
    { value: "NEUTRAL", label: "Neutral", icon: Hand, color: "text-[hsl(var(--muted-foreground))]", bg: "bg-[hsl(var(--muted)/0.3)]", border: "border-[hsl(var(--border))]" },
    { value: "LEAN_NO_HIRE", label: "Lean No Hire", icon: ThumbsDown, color: "text-[hsl(var(--warning))]", bg: "bg-[hsl(var(--warning)/0.1)]", border: "border-[hsl(var(--warning)/0.3)]" },
    { value: "NO_HIRE", label: "No Hire", icon: ThumbsDown, color: "text-[hsl(var(--destructive))]", bg: "bg-[hsl(var(--destructive)/0.1)]", border: "border-[hsl(var(--destructive)/0.3)]" },
    { value: "STRONG_NO_HIRE", label: "Strong No Hire", icon: ThumbsDown, color: "text-[hsl(var(--destructive))]", bg: "bg-[hsl(var(--destructive)/0.1)]", border: "border-[hsl(var(--destructive)/0.3)]" },
    { value: "NEEDS_DISCUSSION", label: "Needs Discussion", icon: MessageSquarePlus, color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.1)]", border: "border-[hsl(var(--primary)/0.3)]" }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Final Recommendation</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          {options.map(opt => {
            const isSelected = recommendation === opt.value;
            const Icon = opt.icon;
            return (
              <button 
                key={opt.value}
                className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected ? `${opt.border} ${opt.bg} ring-1 ring-current` : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? opt.color : 'text-[hsl(var(--muted-foreground))]'}`} />
                <span className={`font-semibold ${isSelected ? opt.color : 'text-[hsl(var(--foreground))]'}`}>{opt.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Overall Comments</label>
          <textarea 
            className="w-full h-32 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            placeholder="Summarize your overall impression of the candidate..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
