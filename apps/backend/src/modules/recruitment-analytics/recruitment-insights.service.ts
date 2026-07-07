import { Injectable } from '@nestjs/common';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { AnalyticsQueryDto } from './dto/analytics.dto';

export interface Insight {
  id: string;
  category: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'INFO';
  message: string;
  suggestedAction?: string;
  timestamp: Date;
}

@Injectable()
export class RecruitmentInsightsService {
  constructor(private dashboardMetrics: DashboardMetricsService) {}

  async generateInsights(companyId: string): Promise<Insight[]> {
    const insights: Insight[] = [];
    const query = new AnalyticsQueryDto();

    const { metrics } = await this.dashboardMetrics.getExecutiveDashboard(companyId, query);
    
    // Rule 1: High Rejection Rate
    const totalApps = Number(metrics.totalApplications.value) || 0;
    const rejections = Number(metrics.rejections.value) || 0;
    if (totalApps > 20 && (rejections / totalApps) > 0.8) {
      insights.push({
        id: 'high-rejection-rate',
        category: 'WARNING',
        message: 'Over 80% of applications are being rejected across the platform.',
        suggestedAction: 'Review job descriptions to ensure alignment with target candidate pool.',
        timestamp: new Date()
      });
    }

    // Rule 2: No Active Jobs
    const activeJobs = Number(metrics.activeJobs.value) || 0;
    if (activeJobs === 0) {
      insights.push({
        id: 'no-active-jobs',
        category: 'INFO',
        message: 'There are currently no active jobs published.',
        suggestedAction: 'Publish new job postings to start receiving applications.',
        timestamp: new Date()
      });
    }

    // Additional rules would evaluate specific jobs, bottlenecks, etc.
    return insights;
  }
}
