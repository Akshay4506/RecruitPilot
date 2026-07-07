import { IsString, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { JobVisibility, WorkMode } from '../schemas/job.schema';

export class CreateJobDto {
  @IsString()
  jobTitleId: string;

  @IsOptional()
  @IsString()
  departmentId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsOptional()
  @IsEnum(WorkMode)
  workMode?: WorkMode;

  @IsOptional()
  @IsEnum(JobVisibility)
  visibility?: JobVisibility;

  @IsOptional()
  @IsNumber()
  openPositions?: number;

  @IsOptional()
  location?: any;

  @IsOptional()
  compensation?: any;

  @IsOptional()
  experience?: any;

  @IsOptional()
  @IsArray()
  skills?: any[];

  @IsOptional()
  @IsArray()
  technologies?: any[];

  @IsOptional()
  description?: any;

  @IsOptional()
  @IsArray()
  hiringTeam?: any[];
}
