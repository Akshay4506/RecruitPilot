import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { ChangeAppStatusDto } from './dto/change-app-status.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // B2B Auth Guard
import { CandidateJwtAuthGuard } from '../candidate-auth/guards/candidate-jwt-auth.guard'; // B2C Auth Guard

@ApiTags('Applications')
@Controller('api/v1/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // --- CANDIDATE ENDPOINTS ---
  
  @UseGuards(CandidateJwtAuthGuard)
  @ApiBearerAuth()
  @Post('apply')
  @ApiOperation({ summary: 'Submit an application as a candidate' })
  async submitApplication(@Request() req: any, @Body() dto: SubmitApplicationDto) {
    const { candidateId } = req.user;
    const app = await this.applicationService.submitApplication(candidateId, dto.jobId, dto.companyId, dto);
    return { success: true, data: app };
  }

  @UseGuards(CandidateJwtAuthGuard)
  @ApiBearerAuth()
  @Get('candidate')
  @ApiOperation({ summary: 'Get candidate applications' })
  async getCandidateApplications(@Request() req: any) {
    // Placeholder list logic
    return { success: true, data: [] };
  }

  @UseGuards(CandidateJwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/withdraw')
  @ApiOperation({ summary: 'Withdraw application' })
  async withdrawApplication(@Request() req: any, @Param('id') id: string, @Body('reason') reason: string) {
    const { candidateId } = req.user; // Actually would need validation ensuring this candidate owns it
    const app = await this.applicationService.changeStatus(id, 'WITHDRAWN' as any, candidateId, reason);
    return { success: true, data: app };
  }

  // --- RECRUITER ENDPOINTS ---

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('company')
  @ApiOperation({ summary: 'Get company applications' })
  async getCompanyApplications(@Request() req: any) {
    // Placeholder list logic
    return { success: true, data: [] };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('company/:id')
  @ApiOperation({ summary: 'Get application details for recruiter' })
  async getApplicationDetails(@Request() req: any, @Param('id') id: string) {
    const { organizationId, userId } = req.user;
    const app = await this.applicationService.getApplicationForCompany(organizationId, id, userId);
    return { success: true, data: app };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/status')
  @ApiOperation({ summary: 'Change application status' })
  async changeStatus(@Request() req: any, @Param('id') id: string, @Body() dto: ChangeAppStatusDto) {
    const { userId } = req.user;
    const app = await this.applicationService.changeStatus(id, dto.status, userId, dto.reason);
    return { success: true, data: app };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign application to a recruiter/manager' })
  async assignRecruiter(@Request() req: any, @Param('id') id: string, @Body() body: { assigneeId: string, role: 'recruiter' | 'hiringManager' | 'coordinator' }) {
    const { userId } = req.user;
    const app = await this.applicationService.assignRecruiter(id, body.assigneeId, body.role, userId);
    return { success: true, data: app };
  }
}
