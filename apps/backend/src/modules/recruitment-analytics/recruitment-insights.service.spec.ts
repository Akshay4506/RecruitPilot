import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentInsightsService } from './recruitment-insights.service';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { AnalyticsQueryDto } from './dto/analytics.dto';

describe('RecruitmentInsightsService', () => {
  let service: RecruitmentInsightsService;

  const mockDashboardMetrics = {
    getExecutiveDashboard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecruitmentInsightsService,
        { provide: DashboardMetricsService, useValue: mockDashboardMetrics },
      ],
    }).compile();

    service = module.get<RecruitmentInsightsService>(RecruitmentInsightsService);
  });

  it('should generate WARNING insight if rejection rate is high', async () => {
    mockDashboardMetrics.getExecutiveDashboard.mockResolvedValue({
      metrics: {
        totalApplications: { value: 100 },
        rejections: { value: 85 },
        activeJobs: { value: 5 }
      }
    });

    const insights = await service.generateInsights('company1');
    expect(insights.length).toBeGreaterThan(0);
    const rejectionInsight = insights.find(i => i.id === 'high-rejection-rate');
    expect(rejectionInsight).toBeDefined();
    expect(rejectionInsight?.category).toBe('WARNING');
  });

  it('should generate INFO insight if active jobs is 0', async () => {
    mockDashboardMetrics.getExecutiveDashboard.mockResolvedValue({
      metrics: {
        totalApplications: { value: 0 },
        rejections: { value: 0 },
        activeJobs: { value: 0 }
      }
    });

    const insights = await service.generateInsights('company1');
    expect(insights.length).toBeGreaterThan(0);
    const jobsInsight = insights.find(i => i.id === 'no-active-jobs');
    expect(jobsInsight).toBeDefined();
    expect(jobsInsight?.category).toBe('INFO');
  });
});
