import { Injectable } from '@nestjs/common';
import { Recommendation } from '../interview/schemas/interview.schema';

@Injectable()
export class RecommendationService {
  aggregateRecommendations(panelMembers: any[], competencies: any[]): { recommendation: Recommendation; hasVeto: boolean; distribution: Record<string, number> } {
    let hasVeto = false;
    const distribution: Record<string, number> = {};
    
    const competencyMap = new Map(competencies.map(c => [c.name, c]));

    panelMembers.forEach(member => {
      if (!member.feedback || member.feedback.status !== 'FINAL') return;

      const rec = member.feedback.recommendation as Recommendation;
      if (rec) {
        distribution[rec] = (distribution[rec] || 0) + 1;
      }

      if (member.feedback.categories) {
        member.feedback.categories.forEach((cat: any) => {
          cat.competencies.forEach((comp: any) => {
            const masterComp = competencyMap.get(comp.name);
            if (masterComp && masterComp.isVetoCompetency) {
              if (comp.score < (comp.maxScore * 0.4)) {
                hasVeto = true;
              }
            }
          });
        });
      }
    });

    let finalRecommendation = Recommendation.NEUTRAL;
    if (hasVeto) {
      finalRecommendation = Recommendation.NEEDS_DISCUSSION;
    } else {
      const totalRecs = Object.values(distribution).reduce((a, b) => a + b, 0);
      if (totalRecs > 0) {
        if (distribution[Recommendation.STRONG_HIRE] > 0 && !distribution[Recommendation.NO_HIRE] && !distribution[Recommendation.STRONG_NO_HIRE]) {
          finalRecommendation = Recommendation.STRONG_HIRE;
        } else if (distribution[Recommendation.NO_HIRE] || distribution[Recommendation.STRONG_NO_HIRE]) {
          finalRecommendation = Recommendation.NEEDS_DISCUSSION;
        } else {
          finalRecommendation = Recommendation.HIRE;
        }
      }
    }

    return { recommendation: finalRecommendation, hasVeto, distribution };
  }
}
