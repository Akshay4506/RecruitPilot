import { Injectable, Logger } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { BulkAssignRecruiterDto, BulkChangeStatusDto } from './dto/bulk-action.dto';

@Injectable()
export class BulkOperationsService {
  private readonly logger = new Logger(BulkOperationsService.name);
  
  constructor(private readonly applicationService: ApplicationService) {}

  async bulkChangeStatus(companyId: string, userId: string, dto: BulkChangeStatusDto) {
    const results = { processed: 0, successful: 0, failed: 0, errors: [] as {id: string, reason: string}[] };
    
    for (const appId of dto.applicationIds) {
      results.processed++;
      try {
        // Enforce permission: ensures application belongs to company
        await this.applicationService.getApplicationForCompany(companyId, appId, userId);
        await this.applicationService.changeStatus(appId, dto.status, userId, dto.reason);
        results.successful++;
      } catch (err: any) {
        results.failed++;
        results.errors.push({ id: appId, reason: err.message });
      }
    }
    
    return results;
  }
  
  async bulkAssignRecruiter(companyId: string, userId: string, dto: BulkAssignRecruiterDto) {
    const results = { processed: 0, successful: 0, failed: 0, errors: [] as {id: string, reason: string}[] };
    
    for (const appId of dto.applicationIds) {
      results.processed++;
      try {
        // Enforce permission
        await this.applicationService.getApplicationForCompany(companyId, appId, userId);
        await this.applicationService.assignRecruiter(appId, dto.assigneeId, dto.role, userId);
        results.successful++;
      } catch (err: any) {
        results.failed++;
        results.errors.push({ id: appId, reason: err.message });
      }
    }
    
    return results;
  }
}
