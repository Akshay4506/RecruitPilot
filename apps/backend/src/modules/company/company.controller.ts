import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentWorkspace } from '../../common/decorators/current-workspace.decorator';

@ApiTags('Company Workspace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/workspace')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get workspace dashboard metrics' })
  async getDashboard(@CurrentWorkspace() companyId: string) {
    // Return mock metrics for now, eventually query DB for real counts
    return {
      success: true,
      data: {
        totalUsers: 5,
        totalDepartments: 2,
        totalTeams: 4,
        pendingInvitations: 1,
        activeJobs: 0, 
      }
    };
  }
}
