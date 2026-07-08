import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Zap, Heart, AlertTriangle, Lightbulb } from "lucide-react";

export function AiRecommendation({ application }: { application: Application }) {
  const { recommendation } = application;

  const CircularScore = ({ score, label, icon: Icon, colorClass }: { score: number, label: string, icon: React.ElementType, colorClass: string }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))]">
      <div className={`relative flex items-center justify-center h-16 w-16 rounded-full border-4 ${colorClass} bg-[hsl(var(--background))]`}>
        <span className="text-lg font-bold text-[hsl(var(--foreground))]">{score}%</span>
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-[hsl(var(--muted-foreground))]">
        <Icon className="h-4 w-4" /> {label}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6 border-t-4 border-t-[hsl(var(--primary))] shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">AI Insights & Recommendation</h2>
          </div>
          <Badge variant="outline" className="gap-1 bg-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))]">
            Confidence: {recommendation.confidence}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <CircularScore 
            score={recommendation.overallMatchScore} 
            label="Overall Match" 
            icon={Target} 
            colorClass={recommendation.overallMatchScore >= 90 ? "border-[hsl(var(--success))]" : recommendation.overallMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
          <CircularScore 
            score={recommendation.technicalMatchScore} 
            label="Technical Match" 
            icon={Zap} 
            colorClass={recommendation.technicalMatchScore >= 90 ? "border-[hsl(var(--success))]" : recommendation.technicalMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
          <CircularScore 
            score={recommendation.cultureMatchScore} 
            label="Culture Fit" 
            icon={Heart} 
            colorClass={recommendation.cultureMatchScore >= 90 ? "border-[hsl(var(--success))]" : recommendation.cultureMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--success))]"></span> Key Strengths
              </h4>
              <ul className="space-y-2">
                {recommendation.strengths.map((str, idx) => (
                  <li key={idx} className="text-sm text-[hsl(var(--muted-foreground))] flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 shrink-0 text-[hsl(var(--success))] mt-0.5" /> {str}
                  </li>
                ))}
                {recommendation.strengths.length === 0 && <li className="text-sm text-[hsl(var(--muted-foreground))]">None identified.</li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2 mt-6">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--warning))]"></span> Potential Weaknesses
              </h4>
              <ul className="space-y-2">
                {recommendation.weaknesses.map((wk, idx) => (
                  <li key={idx} className="text-sm text-[hsl(var(--muted-foreground))] flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-[hsl(var(--warning))] mt-0.5" /> {wk}
                  </li>
                ))}
                {recommendation.weaknesses.length === 0 && <li className="text-sm text-[hsl(var(--muted-foreground))]">None identified.</li>}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--danger))]"></span> Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.missingSkills.map((ms, idx) => (
                  <Badge key={idx} variant="destructive" className="bg-[hsl(var(--danger)/0.1)] text-[hsl(var(--danger))] border-[hsl(var(--danger)/0.2)]">
                    {ms}
                  </Badge>
                ))}
                {recommendation.missingSkills.length === 0 && <span className="text-sm text-[hsl(var(--muted-foreground))]">Candidate possesses all required skills.</span>}
              </div>
            </div>

            <div className="mt-6 p-4 bg-[hsl(var(--info)/0.1)] border border-[hsl(var(--info)/0.2)] rounded-lg">
              <h4 className="text-sm font-semibold text-[hsl(var(--info))] mb-1 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Recommended Action
              </h4>
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                {recommendation.recommendedNextAction}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
