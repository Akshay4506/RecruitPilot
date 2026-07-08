import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewService } from './interview.service';
import { ScheduleInterviewDto, UpdateInterviewStatusDto, SubmitFeedbackDto } from './dto/interview.dto';

@ApiTags('Interview Management')
@Controller('api/v1/interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Schedule Interview (Recruiter)' })
  async scheduleInterview(@Request() req: any, @Body() dto: ScheduleInterviewDto) {
    const data = await this.interviewService.scheduleInterview(req.user.organizationId, req.user.userId, dto);
    return { success: true, data };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Interview Status' })
  async updateStatus(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateInterviewStatusDto) {
    const data = await this.interviewService.updateStatus(req.user.organizationId, id, dto, req.user.userId);
    return { success: true, data };
  }

  @Post(':id/feedback')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit Panel Member Feedback' })
  async submitFeedback(@Request() req: any, @Param('id') id: string, @Body() dto: SubmitFeedbackDto) {
    const data = await this.interviewService.submitFeedback(req.user.organizationId, id, req.user.userId, dto);
    return { success: true, data };
  }

  @Get('recruiter')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Interviews for Recruiter Workspace' })
  async getRecruiterInterviews(@Request() req: any) {
    const data = await this.interviewService.getInterviewsForRecruiter(req.user.organizationId);
    return { success: true, data };
  }

  @Get('candidate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Interviews for Candidate Portal' })
  async getCandidateInterviews(@Request() req: any) {
    const data = await this.interviewService.getInterviewsForCandidate(req.user.userId); // userId holds candidateId for B2C
    return { success: true, data };
  }
}
