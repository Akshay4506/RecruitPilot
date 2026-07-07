import { IsEnum } from 'class-validator';
import { JobStatus } from '../schemas/job.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeJobStatusDto {
  @ApiProperty({ enum: JobStatus })
  @IsEnum(JobStatus)
  status: JobStatus;
}
