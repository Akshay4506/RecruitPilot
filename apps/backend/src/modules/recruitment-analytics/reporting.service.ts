import { Injectable } from '@nestjs/common';
import { RecruiterAnalyticsService } from './recruiter-analytics.service';

export interface ReportMetadata {
  generatedBy: string;
  generatedAt: Date;
  filters: any;
}

@Injectable()
export class ReportingService {
  constructor(private recruiterAnalytics: RecruiterAnalyticsService) {}

  async generateRecruiterPerformanceCsv(companyId: string, userId: string, filters: any) {
    const leaderboard = await this.recruiterAnalytics.getLeaderboard(companyId);

    const headers = ['Recruiter ID', 'Total Assigned Applications', 'Reviewed', 'Hires'];
    const rows = leaderboard.map(l => [
      l._id?.toString() || 'Unassigned',
      l.totalAssigned,
      l.reviewed,
      l.hires
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const metadata: ReportMetadata = {
      generatedBy: userId,
      generatedAt: new Date(),
      filters
    };

    return { csvContent, metadata };
  }
}
