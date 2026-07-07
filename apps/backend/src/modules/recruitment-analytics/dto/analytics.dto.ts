import { ApiProperty } from '@nestjs/swagger';

export class MetricValueDto {
  @ApiProperty()
  value: number | string;

  @ApiProperty({ enum: ['UP', 'DOWN', 'NEUTRAL'], required: false })
  trend?: 'UP' | 'DOWN' | 'NEUTRAL';

  @ApiProperty({ required: false })
  comparison?: string;

  @ApiProperty({ required: false })
  percentage?: number;

  @ApiProperty()
  lastUpdated: Date;
}

export class WidgetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  data: any;

  @ApiProperty({ required: false })
  layout?: any;
}

export class AnalyticsQueryDto {
  @ApiProperty({ required: false })
  from?: string;

  @ApiProperty({ required: false })
  to?: string;

  @ApiProperty({ required: false })
  groupBy?: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER';

  @ApiProperty({ required: false })
  jobId?: string;
}
