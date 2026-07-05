import { Controller, Get, Patch, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ProfileCompletionService } from './profile-completion.service';
import { TimelineService } from '../timeline/timeline.service';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CandidateJwtAuthGuard } from '../candidate-auth/guards/candidate-jwt-auth.guard';
import { CurrentCandidate } from '../../common/decorators/current-candidate.decorator';

@ApiTags('Candidate Profile')
@ApiBearerAuth()
@UseGuards(CandidateJwtAuthGuard)
@Controller('api/v1/candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly timelineService: TimelineService,
    private readonly dashboardService: DashboardService
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get aggregated candidate dashboard' })
  async getDashboard(@CurrentCandidate() user: any) {
    const dashboard = await this.dashboardService.getDashboard(user.candidateId);
    return { success: true, data: dashboard };
  }

  @Get('recruiter-preview')
  @ApiOperation({ summary: 'Preview profile as a recruiter' })
  async getRecruiterPreview(@CurrentCandidate() user: any) {
    const preview = await this.dashboardService.getRecruiterPreview(user.candidateId);
    return { success: true, data: preview };
  }

  @Get('professional-summary')
  @ApiOperation({ summary: 'Generate professional summary text' })
  async getProfessionalSummary(@CurrentCandidate() user: any) {
    const summary = await this.dashboardService.getProfessionalSummary(user.candidateId);
    return { success: true, data: summary };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update candidate profile information' })
  async updateProfile(@CurrentCandidate() user: any, @Body() dto: any) {
    const candidate = await this.candidateService.updateProfile(user.candidateId, dto);
    await this.timelineService.logEvent('PROFILE_UPDATED', 'CANDIDATE', user.candidateId, user.candidateId);
    
    return {
      success: true,
      data: candidate
    };
  }
}
