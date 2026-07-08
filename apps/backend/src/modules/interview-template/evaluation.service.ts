import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview, InterviewDocument, EvaluationSummary } from '../interview/schemas/interview.schema';
import { RecommendationService } from './recommendation.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>,
    private recommendationService: RecommendationService,
    private eventEmitter: EventEmitter2
  ) {}

  async calculateEvaluationSummary(companyId: string, interviewId: string, competencies: any[]) {
    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!interview) return null;

    let totalScore = 0;
    let totalMaxScore = 0;
    let totalWeightedScore = 0;
    let highestScore = -1;
    let lowestScore = Infinity;
    const scores: number[] = [];
    let completedCount = 0;
    let pendingCount = 0;

    interview.panel.forEach(member => {
      if (!member.feedback || member.feedback.status !== 'FINAL') {
        pendingCount++;
        return;
      }
      completedCount++;

      let memberTotal = 0;
      let memberMax = 0;

      member.feedback.categories?.forEach((cat: any) => {
        cat.competencies.forEach((comp: any) => {
          totalScore += comp.score;
          totalMaxScore += comp.maxScore;
          totalWeightedScore += (comp.score * (comp.weight || 1));
          
          memberTotal += comp.score;
          memberMax += comp.maxScore;
        });
      });

      if (memberMax > 0) {
        const percentage = (memberTotal / memberMax) * 100;
        scores.push(percentage);
        if (percentage > highestScore) highestScore = percentage;
        if (percentage < lowestScore) lowestScore = percentage;
      }
    });

    if (lowestScore === Infinity) lowestScore = 0;
    if (highestScore === -1) highestScore = 0;

    let variance = 0;
    if (scores.length > 1) {
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
    }

    const { recommendation, hasVeto, distribution } = this.recommendationService.aggregateRecommendations(interview.panel, competencies);

    const summary: EvaluationSummary = {
      averageScore: totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0,
      weightedScore: totalWeightedScore,
      highestScore,
      lowestScore,
      scoreVariance: variance,
      recommendationDistribution: distribution,
      completedFeedbackCount: completedCount,
      pendingFeedbackCount: pendingCount,
      hasVeto
    };

    interview.evaluationSummary = summary;
    
    if (pendingCount === 0) {
      interview.finalDecision = recommendation;
      this.eventEmitter.emit('interview.evaluation_completed', { 
        interviewId, 
        recommendation, 
        companyId,
        applicationId: interview.applicationId,
        scoreVariance: summary.scoreVariance
      });
    }

    await interview.save();
    return summary;
  }
}
