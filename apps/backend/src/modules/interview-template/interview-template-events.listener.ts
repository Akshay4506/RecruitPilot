import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';
import { EvaluationService } from './evaluation.service';
import { CompetencyLibraryService } from './competency-library.service';

@Injectable()
export class InterviewTemplateEventsListener {
  private readonly logger = new Logger(InterviewTemplateEventsListener.name);

  constructor(
    private timelineService: TimelineService,
    private evaluationService: EvaluationService,
    private competencyService: CompetencyLibraryService
  ) {}

  @OnEvent('interview-template.applied', { async: true })
  async handleTemplateApplied(payload: any) {
    await this.timelineService.logEvent(
      'INTERVIEW_TEMPLATE_APPLIED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId,
      { templateId: payload.templateId }
    );
  }

  @OnEvent('interview.feedback_submitted', { async: true })
  async handleFeedbackSubmitted(payload: any) {
    // Emit timeline events for Draft vs Final
    await this.timelineService.logEvent(
      `FEEDBACK_${payload.status}`,
      'INTERVIEW',
      payload.interviewId,
      payload.actorId
    );

    // If FINAL, recalculate the evaluation summary to update the distribution and maybe finalize the interview
    if (payload.status === 'FINAL') {
      try {
        const competencies = await this.competencyService.findAll(payload.companyId);
        await this.evaluationService.calculateEvaluationSummary(payload.companyId, payload.interviewId, competencies);
      } catch (err: any) {
        this.logger.error('Failed to calculate evaluation summary on feedback submission', err.stack);
      }
    }
  }

  @OnEvent('interview.evaluation_completed', { async: true })
  async handleEvaluationCompleted(payload: any) {
    await this.timelineService.logEvent(
      'EVALUATION_COMPLETED',
      'INTERVIEW',
      payload.interviewId,
      'SYSTEM',
      { recommendation: payload.recommendation }
    );
  }
}
