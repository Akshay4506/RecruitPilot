import { Controller, Get, Param, Query, UseGuards, Request, Header } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { PipelineAnalyticsService } from './pipeline-analytics.service';
import { JobAnalyticsService } from './job-analytics.service';
import { RecruiterAnalyticsService } from './recruiter-analytics.service';
import { SourceAnalyticsService } from './source-analytics.service';
import { RecruitmentInsightsService } from './recruitment-insights.service';
import { ReportingService } from './reporting.service';
import { AnalyticsQueryDto } from './dto/analytics.dto';

@ApiTags('Recruitment Analytics')
@Controller('api/v1/analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RecruitmentAnalyticsController {
  constructor(
    private readonly dashboardService: DashboardMetricsService,
    private readonly pipelineService: PipelineAnalyticsService,
    private readonly jobService: JobAnalyticsService,
    private readonly recruiterService: RecruiterAnalyticsService,
    private readonly sourceService: SourceAnalyticsService,
    private readonly insightsService: RecruitmentInsightsService,
    private readonly reportingService: ReportingService
  ) {}

  @Get('dashboard/executive')
  @ApiOperation({ summary: 'Get Executive Dashboard Metrics' })
  async getExecutiveDashboard(@Request() req: any, @Query() query: AnalyticsQueryDto) {
    const data = await this.dashboardService.getExecutiveDashboard(req.user.organizationId, query);
    return { success: true, data };
  }

  @Get('dashboard/recruiter')
  @ApiOperation({ summary: 'Get Recruiter Dashboard Metrics' })
  async getRecruiterDashboard(@Request() req: any, @Query() query: AnalyticsQueryDto) {
    const data = await this.dashboardService.getRecruiterDashboard(req.user.organizationId, req.user.userId, query);
    return { success: true, data };
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Get Job Analytics' })
  async getJobAnalytics(@Request() req: any, @Param('jobId') jobId: string) {
    const data = await this.jobService.getJobAnalytics(req.user.organizationId, jobId);
    return { success: true, data };
  }

  @Get('pipeline')
  @ApiOperation({ summary: 'Get Pipeline Analytics' })
  async getPipelineAnalytics(@Request() req: any, @Query() query: AnalyticsQueryDto) {
    const data = await this.pipelineService.getPipelineAnalytics(req.user.organizationId, query);
    return { success: true, data };
  }

  @Get('sources')
  @ApiOperation({ summary: 'Get Source Analytics' })
  async getSourceAnalytics(@Request() req: any) {
    const data = await this.sourceService.getSourceAnalytics(req.user.organizationId);
    return { success: true, data };
  }

  @Get('recruiters/leaderboard')
  @ApiOperation({ summary: 'Get Recruiter Leaderboard' })
  async getRecruiterLeaderboard(@Request() req: any) {
    const data = await this.recruiterService.getLeaderboard(req.user.organizationId);
    return { success: true, data };
  }

  @Get('insights')
  @ApiOperation({ summary: 'Get Recruitment Insights' })
  async getInsights(@Request() req: any) {
    const data = await this.insightsService.generateInsights(req.user.organizationId);
    return { success: true, data };
  }

  @Get('reports/export/recruiter-performance')
  @ApiOperation({ summary: 'Export Recruiter Performance Report (CSV)' })
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="recruiter_performance.csv"')
  async exportRecruiterPerformance(@Request() req: any, @Query() filters: any) {
    const { csvContent } = await this.reportingService.generateRecruiterPerformanceCsv(req.user.organizationId, req.user.userId, filters);
    return csvContent; // Returns raw string for CSV download
  }
}
