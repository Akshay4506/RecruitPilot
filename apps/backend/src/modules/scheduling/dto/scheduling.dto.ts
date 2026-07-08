import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum RescheduleInitiator {
  RECRUITER = 'RECRUITER',
  CANDIDATE = 'CANDIDATE',
  SYSTEM = 'SYSTEM',
}

class WorkingHoursDto {
  @IsString()
  dayOfWeek: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

class AvailabilityExceptionDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  reason: string;
}

export class SetAvailabilityDto {
  @IsString()
  timezone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingHoursDto)
  workingHours: WorkingHoursDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityExceptionDto)
  exceptions?: AvailabilityExceptionDto[];

  @IsOptional()
  @IsNumber()
  preBufferMinutes?: number;

  @IsOptional()
  @IsNumber()
  postBufferMinutes?: number;

  @IsOptional()
  @IsNumber()
  maxInterviewsPerDay?: number;

  @IsOptional()
  @IsArray()
  reminderPreferences?: number[];
}

export class RescheduleDto {
  @IsDateString()
  newStart: string;

  @IsDateString()
  newEnd: string;

  @IsString()
  reason: string;

  @IsEnum(RescheduleInitiator)
  initiatorType: RescheduleInitiator;
}

export class ConfirmDto {
  @IsString()
  action: 'ACCEPT' | 'DECLINE';
}
