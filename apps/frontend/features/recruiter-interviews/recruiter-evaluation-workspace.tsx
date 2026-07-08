"use client";

import * as React from "react";
import { mockInterviews, mockScorecards } from "./mock/interviews.mock";
import { InterviewDetailsHero } from "./components/details/interview-hero";
import { Scorecard } from "./components/evaluation/scorecard";
import { QuestionEvaluation } from "./components/evaluation/question-evaluation";
import { PanelFeedback } from "./components/evaluation/panel-feedback";
import { EvaluationSummary } from "./components/evaluation/evaluation-summary";
import { RecommendationPanel } from "./components/evaluation/recommendation-panel";
import { ConsensusPanel } from "./components/decision/consensus-panel";
import { InterviewInsights } from "./components/decision/interview-insights";
import { CommitteeReview } from "./components/decision/committee-review";
import { AuditTrail } from "./components/decision/audit-trail";

interface RecruiterEvaluationWorkspaceProps {
  interviewId: string;
}

export function RecruiterEvaluationWorkspace({ interviewId }: RecruiterEvaluationWorkspaceProps) {
  const interview = mockInterviews.find(i => i.id === interviewId) || mockInterviews[0];
  const scorecard = mockScorecards.find(s => s.interviewId === interviewId) || mockScorecards[0];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24">
      <InterviewDetailsHero interview={interview} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* If the interview is still in feedback stage, show evaluation form */}
          {scorecard.status !== 'LOCKED' ? (
            <>
              <Scorecard competencies={scorecard.competencies} />
              <QuestionEvaluation questions={scorecard.questions} />
              <RecommendationPanel recommendation={scorecard.recommendation} />
            </>
          ) : (
            <CommitteeReview />
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PanelFeedback status={scorecard.status} />
          
          <EvaluationSummary 
            summary={{
              interviewId,
              averageScore: 3.8,
              variance: 0.5,
              highestScore: 4.5,
              lowestScore: 3.0,
              vetoTriggered: false,
              consensusAchieved: false,
              consensusRecommendation: "LEAN_HIRE"
            }} 
          />
          
          {scorecard.status === 'LOCKED' && (
            <>
              <ConsensusPanel 
                summary={{
                  interviewId,
                  averageScore: 3.8,
                  variance: 0.5,
                  highestScore: 4.5,
                  lowestScore: 3.0,
                  vetoTriggered: false,
                  consensusAchieved: false,
                  consensusRecommendation: "LEAN_HIRE"
                }} 
              />
              <InterviewInsights />
              <AuditTrail />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
