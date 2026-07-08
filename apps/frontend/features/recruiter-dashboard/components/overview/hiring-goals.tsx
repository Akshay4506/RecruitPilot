import * as React from "react";
import { HiringGoal } from "../../types";
import { ROUTES } from "@/constants/routes";
import { Progress } from "@/components/ui/primitives";
import { Target } from "lucide-react";
import Link from "next/link";

interface HiringGoalsProps {
  goal: HiringGoal;
}

export function HiringGoals({ goal }: HiringGoalsProps) {
  const progressPercentage = Math.round((goal.currentHires / goal.targetHires) * 100);
  const remaining = Math.max(0, goal.targetHires - goal.currentHires);

  return (
    <Link href={ROUTES.recruiter.analytics} className="block">
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4 hover:border-[hsl(var(--primary)/0.3)] transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))] shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-[hsl(var(--foreground))]">{goal.month} Hiring Goal</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{remaining} hires remaining</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end text-sm">
            <span className="font-medium text-[hsl(var(--primary))]">{progressPercentage}% Achieved</span>
            <span className="text-[hsl(var(--muted-foreground))]">
              {goal.currentHires} / {goal.targetHires}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
    </Link>
  );
}
