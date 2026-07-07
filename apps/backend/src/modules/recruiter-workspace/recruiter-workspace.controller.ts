import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // B2B Guard
import { RecruiterWorkspaceService } from './recruiter-workspace.service';
import { ApplicationInboxService } from './application-inbox.service';
import { WorkspaceAggregatorService } from './workspace-aggregator.service';
import { BulkOperationsService } from './bulk-operations.service';
import { PipelineMetricsService } from './pipeline-metrics.service';
import { PipelineService } from './pipeline.service';
import { WorkspaceTimelineService } from './workspace-timeline.service';
import { BulkAssignRecruiterDto, BulkChangeStatusDto, BulkAddLabelsDto } from './dto/bulk-action.dto';
import { CreateSavedViewDto } from './dto/saved-view.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SavedView, SavedViewDocument } from './schemas/saved-view.schema';

@ApiTags('Recruiter Workspace')
@Controller('api/v1/workspace')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RecruiterWorkspaceController {
  constructor(
    private readonly workspaceService: RecruiterWorkspaceService,
    private readonly inboxService: ApplicationInboxService,
    private readonly aggregatorService: WorkspaceAggregatorService,
    private readonly bulkOpsService: BulkOperationsService,
    private readonly metricsService: PipelineMetricsService,
    private readonly pipelineService: PipelineService,
    private readonly timelineService: WorkspaceTimelineService,
    @InjectModel(SavedView.name) private savedViewModel: Model<SavedViewDocument>
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get workspace dashboard metrics' })
  async getDashboard(@Request() req: any) {
    const { organizationId, userId } = req.user;
    const data = await this.workspaceService.getDashboardMetrics(organizationId, userId);
    return { success: true, data };
  }

  @Get('inbox')
  @ApiOperation({ summary: 'Search and filter application inbox' })
  async searchInbox(@Request() req: any, @Query() query: any) {
    const { organizationId } = req.user;
    const result = await this.inboxService.searchInbox(organizationId, query);
    return { success: true, data: result.data, meta: result.meta };
  }

  @Get('candidate/:applicationId')
  @ApiOperation({ summary: 'Get full candidate workspace payload' })
  async getCandidateWorkspace(@Request() req: any, @Param('applicationId') applicationId: string) {
    const { organizationId, userId } = req.user;
    const data = await this.aggregatorService.assembleCandidateWorkspace(organizationId, applicationId, userId);
    return { success: true, data };
  }

  @Post('pipeline/move')
  @ApiOperation({ summary: 'Move application to new pipeline stage' })
  async movePipeline(@Request() req: any, @Body() body: { applicationId: string, stage: string, reason?: string }) {
    const { organizationId, userId } = req.user;
    const data = await this.pipelineService.moveApplication(organizationId, body.applicationId, body.stage, userId, body.reason);
    return { success: true, data };
  }

  @Post('bulk/status')
  @ApiOperation({ summary: 'Bulk change application status' })
  async bulkChangeStatus(@Request() req: any, @Body() dto: BulkChangeStatusDto) {
    const { organizationId, userId } = req.user;
    const result = await this.bulkOpsService.bulkChangeStatus(organizationId, userId, dto);
    return { success: true, data: result };
  }

  @Post('bulk/assign')
  @ApiOperation({ summary: 'Bulk assign recruiters' })
  async bulkAssignRecruiter(@Request() req: any, @Body() dto: BulkAssignRecruiterDto) {
    const { organizationId, userId } = req.user;
    const result = await this.bulkOpsService.bulkAssignRecruiter(organizationId, userId, dto);
    return { success: true, data: result };
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Get pipeline metrics' })
  async getMetrics(@Request() req: any, @Query('jobId') jobId?: string) {
    const { organizationId } = req.user;
    const data = await this.metricsService.getMetrics(organizationId, jobId);
    return { success: true, data };
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Get recruiter activity timeline' })
  async getTimeline(@Request() req: any) {
    const { userId } = req.user;
    const data = await this.timelineService.getRecruiterActivityFeed(userId);
    return { success: true, data };
  }

  @Post('saved-views')
  @ApiOperation({ summary: 'Create a saved view' })
  async createSavedView(@Request() req: any, @Body() dto: CreateSavedViewDto) {
    const { organizationId, userId } = req.user;
    const view = new this.savedViewModel({
      ...dto,
      companyId: new Types.ObjectId(organizationId),
      userId: new Types.ObjectId(userId)
    });
    await view.save();
    return { success: true, data: view };
  }

  @Get('saved-views')
  @ApiOperation({ summary: 'List saved views' })
  async getSavedViews(@Request() req: any) {
    const { organizationId, userId } = req.user;
    const views = await this.savedViewModel.find({
      companyId: new Types.ObjectId(organizationId),
      userId: new Types.ObjectId(userId)
    }).exec();
    return { success: true, data: views };
  }
}
