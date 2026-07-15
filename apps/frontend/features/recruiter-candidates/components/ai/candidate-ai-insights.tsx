/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Heart, AlertTriangle, Lightbulb, TrendingUp, ShieldAlert } from "lucide-react";

export function CandidateAiInsights({ candidate }: { candidate: RecruiterCandidate }) {
  const { insights } = candidate;

  const CircularScore = ({ score, label, icon: Icon, colorClass }: { score: number, label: string, icon: React.ElementType, colorClass: string }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))]">
      <div className={`relative flex items-center justify-center h-16 w-16 rounded-full border-4 ${colorClass} bg-[hsl(var(--background))]`}>
        <span className="text-lg font-bold text-[hsl(var(--foreground))]">{score}%</span>
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-[hsl(var(--muted-foreground))] text-center">
        <Icon className="h-4 w-4 shrink-0" /> {label}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6 border-t-4 border-t-[hsl(var(--primary))] shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Candidate AI Score</h2>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-sm max-w-lg">
              AI analysis based on candidate's entire profile, experience, and historical interactions.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.2)] p-4 rounded-xl shrink-0">
            <div className="text-center">
              <div className="text-4xl font-bold text-[hsl(var(--primary))]">{insights.overallScore}%</div>
              <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider mt-1">Overall Match</div>
            </div>
            <div className="h-12 w-px bg-[hsl(var(--primary)/0.2)]"></div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[hsl(var(--warning))]">
                <StarIcon className="h-4 w-4 fill-current" />
                <StarIcon className="h-4 w-4 fill-current" />
                <StarIcon className="h-4 w-4 fill-current" />
                <StarIcon className="h-4 w-4 fill-current" />
                <StarIcon className="h-4 w-4 fill-current opacity-30" />
              </div>
              <span className="text-xs font-medium text-[hsl(var(--foreground))]">Top Tier Candidate</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <CircularScore 
            score={insights.jobMatchScore} 
            label="Job Match" 
            icon={Target} 
            colorClass={insights.jobMatchScore >= 90 ? "border-[hsl(var(--success))]" : insights.jobMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
          <CircularScore 
            score={insights.experienceMatchScore} 
            label="Experience Match" 
            icon={BriefcaseIcon} 
            colorClass={insights.experienceMatchScore >= 90 ? "border-[hsl(var(--success))]" : insights.experienceMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
          <CircularScore 
            score={insights.cultureMatchScore} 
            label="Culture Match" 
            icon={Heart} 
            colorClass={insights.cultureMatchScore >= 90 ? "border-[hsl(var(--success))]" : insights.cultureMatchScore >= 70 ? "border-[hsl(var(--warning))]" : "border-[hsl(var(--danger))]"} 
          />
          <div className="flex flex-col items-center justify-center p-4 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))]">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] shadow-sm">
               <TrendingUp className={`h-8 w-8 ${insights.careerGrowthPotential === 'HIGH' ? 'text-[hsl(var(--success))]' : insights.careerGrowthPotential === 'MEDIUM' ? 'text-[hsl(var(--warning))]' : 'text-[hsl(var(--danger))]'}`} />
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-[hsl(var(--muted-foreground))] text-center">
               Career Growth: <span className="font-bold text-[hsl(var(--foreground))]">{insights.careerGrowthPotential}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--success))]"></span> Top Strengths
              </h4>
              <ul className="space-y-2">
                {insights.topStrengths.map((str, idx) => (
                  <li key={idx} className="text-sm text-[hsl(var(--muted-foreground))] flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 shrink-0 text-[hsl(var(--success))] mt-0.5" /> {str}
                  </li>
                ))}
              </ul>
            </div>
            
            {insights.riskFactors && insights.riskFactors.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2 mt-6">
                  <ShieldAlert className="h-4 w-4 text-[hsl(var(--danger))]" /> Risk Factors
                </h4>
                <ul className="space-y-2">
                  {insights.riskFactors.map((wk, idx) => (
                    <li key={idx} className="text-sm text-[hsl(var(--danger))] flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> {wk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--warning))]"></span> Skill Gaps
              </h4>
              <div className="flex flex-wrap gap-2">
                {insights.skillGaps.map((ms, idx) => (
                  <Badge key={idx} variant="outline" className="bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]">
                    {ms}
                  </Badge>
                ))}
                {insights.skillGaps.length === 0 && <span className="text-sm text-[hsl(var(--muted-foreground))]">No critical skill gaps identified.</span>}
              </div>
            </div>

            <div className="mt-6 p-5 bg-[hsl(var(--info)/0.1)] border border-[hsl(var(--info)/0.2)] rounded-lg">
              <h4 className="text-sm font-semibold text-[hsl(var(--info))] mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> AI Recommendation
              </h4>
              <p className="text-sm font-medium text-[hsl(var(--foreground))] leading-relaxed">
                {insights.recommendation}
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
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
