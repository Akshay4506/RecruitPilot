import { Test, TestingModule } from '@nestjs/testing';
import { BulkOperationsService } from './bulk-operations.service';
import { ApplicationService } from '../application/application.service';

describe('BulkOperationsService', () => {
  let service: BulkOperationsService;

  const mockApplicationService = {
    getApplicationForCompany: jest.fn(),
    changeStatus: jest.fn(),
    assignRecruiter: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BulkOperationsService,
        { provide: ApplicationService, useValue: mockApplicationService },
      ],
    }).compile();

    service = module.get<BulkOperationsService>(BulkOperationsService);
  });

  it('should process bulk status change and return accurate summaries', async () => {
    mockApplicationService.getApplicationForCompany.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    mockApplicationService.changeStatus.mockResolvedValueOnce(true).mockRejectedValueOnce(new Error('Transition failed'));

    const result = await service.bulkChangeStatus('company1', 'user1', {
      applicationIds: ['app1', 'app2'],
      status: 'SHORTLISTED' as any,
    });

    expect(result.processed).toBe(2);
    expect(result.successful).toBe(1);
    expect(result.failed).toBe(1);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].id).toBe('app2');
  });

  it('should fail if application belongs to different company', async () => {
    mockApplicationService.getApplicationForCompany.mockRejectedValue(new Error('Not found'));

    const result = await service.bulkAssignRecruiter('company1', 'user1', {
      applicationIds: ['app1'],
      assigneeId: 'recruiter1',
      role: 'recruiter'
    });

    expect(result.processed).toBe(1);
    expect(result.successful).toBe(0);
    expect(result.failed).toBe(1);
  });
});
