import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewAnalyticsService } from './interview-analytics.service';
import { InterviewerAnalyticsService } from './interviewer-analytics.service';
import { DecisionWorkflowService } from './decision-workflow.service';
import { HiringCommitteeService } from './hiring-committee.service';
import { UpdateDecisionDto, UpdateCommitteeDto } from './dto/interview-analytics.dto';

@ApiTags('Interview Analytics & Decisions')
@Controller('api/v1/interview-analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InterviewAnalyticsController {
  constructor(
    private analyticsService: InterviewAnalyticsService,
    private interviewerAnalyticsService: InterviewerAnalyticsService,
    private decisionWorkflowService: DecisionWorkflowService,
    private committeeService: HiringCommitteeService
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get Executive Dashboard Metrics' })
  async getDashboard(@Request() req: any) {
    const dashboard = await this.analyticsService.getExecutiveDashboard(req.user.organizationId);
    const kpis = await this.analyticsService.getCompanyKPIs(req.user.organizationId);
    return { ...dashboard, ...kpis };
  }

  @Get('interviewer/:userId')
  @ApiOperation({ summary: 'Get Interviewer Metrics' })
  async getInterviewerMetrics(@Request() req: any, @Param('userId') userId: string) {
    return this.interviewerAnalyticsService.getInterviewerMetrics(req.user.organizationId, userId);
  }

  @Post('interviews/:interviewId/decision')
  @ApiOperation({ summary: 'Update Interview Decision Workflow Status' })
  async updateDecisionStatus(@Request() req: any, @Param('interviewId') interviewId: string, @Body() dto: UpdateDecisionDto) {
    return this.decisionWorkflowService.updateDecisionStatus(req.user.organizationId, interviewId, dto, req.user.userId);
  }

  @Post('interviews/:interviewId/committee')
  @ApiOperation({ summary: 'Update Hiring Committee Status' })
  async updateCommittee(@Request() req: any, @Param('interviewId') interviewId: string, @Body() dto: UpdateCommitteeDto) {
    return this.committeeService.updateCommittee(req.user.organizationId, interviewId, dto, req.user.userId);
  }
}
