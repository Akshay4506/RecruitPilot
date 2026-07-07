import { Injectable } from '@nestjs/common';
import { MetricValueDto } from './dto/analytics.dto';

/**
 * Acts as a boundary layer for future precomputed analytics.
 * Currently formats real-time metrics into the standardized DTO structure.
 */
@Injectable()
export class AnalyticsSnapshotService {
  formatMetric(
    value: number | string,
    previousValue?: number,
    comparisonText?: string
  ): MetricValueDto {
    let trend: 'UP' | 'DOWN' | 'NEUTRAL' = 'NEUTRAL';
    let percentage: number | undefined;

    if (typeof value === 'number' && typeof previousValue === 'number') {
      if (value > previousValue) trend = 'UP';
      else if (value < previousValue) trend = 'DOWN';
      
      if (previousValue !== 0) {
        percentage = Math.abs(((value - previousValue) / previousValue) * 100);
      }
    }

    return {
      value,
      trend,
      comparison: comparisonText || (previousValue !== undefined ? `vs ${previousValue} last period` : undefined),
      percentage,
      lastUpdated: new Date()
    };
  }
}
