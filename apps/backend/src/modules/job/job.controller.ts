import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ChangeJobStatusDto } from './dto/change-job-status.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // B2B Auth Guard

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  async create(@Request() req: any, @Body() createJobDto: CreateJobDto) {
    const { organizationId, userId } = req.user;
    const job = await this.jobService.createJob(organizationId, createJobDto, userId);
    return { success: true, data: job };
  }

  @Post('from-template/:templateId')
  @ApiOperation({ summary: 'Create a job from a template' })
  async createFromTemplate(@Request() req: any, @Param('templateId') templateId: string) {
    const { organizationId, userId } = req.user;
    const job = await this.jobService.createFromTemplate(organizationId, templateId, userId);
    return { success: true, data: job };
  }

  @Get()
  @ApiOperation({ summary: 'List all jobs for the company' })
  async findAll(@Request() req: any) {
    const { organizationId } = req.user;
    const jobs = await this.jobService.listJobs(organizationId);
    return { success: true, data: jobs };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job details' })
  async findOne(@Request() req: any, @Param('id') id: string) {
    const { organizationId } = req.user;
    const job = await this.jobService.getJob(organizationId, id);
    return { success: true, data: job };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update job details' })
  async update(@Request() req: any, @Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const { organizationId, userId } = req.user;
    const job = await this.jobService.updateJob(organizationId, id, updateJobDto, userId);
    return { success: true, data: job };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change job status' })
  async changeStatus(@Request() req: any, @Param('id') id: string, @Body() statusDto: ChangeJobStatusDto) {
    const { organizationId, userId } = req.user;
    const job = await this.jobService.changeStatus(organizationId, id, statusDto.status, userId);
    return { success: true, data: job };
  }
}
