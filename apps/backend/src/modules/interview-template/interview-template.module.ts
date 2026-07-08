import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewTemplateController } from './interview-template.controller';
import { InterviewTemplateService } from './interview-template.service';
import { CompetencyLibraryService } from './competency-library.service';
import { QuestionBankService } from './question-bank.service';
import { ScorecardTemplateService } from './scorecard-template.service';
import { EvaluationService } from './evaluation.service';
import { RecommendationService } from './recommendation.service';
import { InterviewTemplateEventsListener } from './interview-template-events.listener';
import { Competency, CompetencySchema } from './schemas/competency.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { ScorecardTemplate, ScorecardTemplateSchema } from './schemas/scorecard-template.schema';
import { InterviewTemplate, InterviewTemplateSchema } from './schemas/interview-template.schema';
import { Interview, InterviewSchema } from '../interview/schemas/interview.schema';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competency.name, schema: CompetencySchema },
      { name: Question.name, schema: QuestionSchema },
      { name: ScorecardTemplate.name, schema: ScorecardTemplateSchema },
      { name: InterviewTemplate.name, schema: InterviewTemplateSchema },
      { name: Interview.name, schema: InterviewSchema },
    ]),
    TimelineModule,
  ],
  controllers: [InterviewTemplateController],
  providers: [
    InterviewTemplateService,
    CompetencyLibraryService,
    QuestionBankService,
    ScorecardTemplateService,
    EvaluationService,
    RecommendationService,
    InterviewTemplateEventsListener,
  ],
})
export class InterviewTemplateModule {}
