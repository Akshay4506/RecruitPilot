import { Injectable, BadRequestException } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { ApplicationStatus } from '../application/schemas/application.schema';
import { DEFAULT_PIPELINE_STAGES } from './config/pipeline.config';

@Injectable()
export class PipelineService {
  constructor(private readonly applicationService: ApplicationService) {}

  async moveApplication(companyId: string, applicationId: string, targetStage: string, userId: string, reason?: string) {
    const stageConfig = DEFAULT_PIPELINE_STAGES.find(s => s.id === targetStage);
    if (!stageConfig) {
      throw new BadRequestException(`Invalid pipeline stage: ${targetStage}`);
    }

    // Ensure the user has permission to access this application in this company
    await this.applicationService.getApplicationForCompany(companyId, applicationId, userId);

    // Delegate the actual transition to ApplicationService which enforces ApplicationLifecycleService rules
    return this.applicationService.changeStatus(applicationId, targetStage as ApplicationStatus, userId, reason);
  }
}
