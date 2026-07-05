import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import { CandidateProfileController } from './candidate-profile.controller';
import { ReferenceModule } from '../reference/reference.module';
import { CareerProfileModule } from '../career-profile/career-profile.module';
import { DocumentModule } from '../document/document.module';
import { ProfileCompletionService } from './profile-completion.service';
import { TalentInsightsService } from './talent-insights.service';
import { ProfessionalSummaryService } from './professional-summary.service';
import { DashboardService } from './dashboard.service';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candidate.name, schema: CandidateSchema }]),
    TimelineModule,
    ReferenceModule,
    CareerProfileModule,
    DocumentModule,
  ],
  controllers: [CandidateController, CandidateProfileController],
  providers: [
    CandidateService,
    ProfileCompletionService,
    TalentInsightsService,
    ProfessionalSummaryService,
    DashboardService,
  ],
  exports: [CandidateService, ProfileCompletionService, DashboardService],
})
export class CandidateModule {}
