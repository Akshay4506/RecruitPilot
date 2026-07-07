import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from '../../application/schemas/application.schema';
import { ApiProperty } from '@nestjs/swagger';

export class BulkActionDto {
  @IsArray()
  @IsString({ each: true })
  applicationIds: string[];

  @IsOptional()
  @IsString()
  reason?: string;
}

export class BulkChangeStatusDto extends BulkActionDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}

export class BulkAssignRecruiterDto extends BulkActionDto {
  @IsString()
  assigneeId: string;

  @IsEnum(['recruiter', 'hiringManager', 'coordinator'])
  role: 'recruiter' | 'hiringManager' | 'coordinator';
}

export class BulkAddLabelsDto extends BulkActionDto {
  @IsArray()
  @IsString({ each: true })
  labels: string[];
}
