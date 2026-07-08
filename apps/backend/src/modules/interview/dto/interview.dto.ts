import { IsString, IsEnum, IsArray, IsOptional, IsDateString, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MeetingType, Recommendation, InterviewStatus } from '../schemas/interview.schema';

class MeetingDto {
  @IsEnum(MeetingType)
  type: MeetingType;

  @IsOptional()
  @IsString()
  locationOrUrl?: string;

  @IsOptional()
  @IsString()
  dialInNumber?: string;
}

class PanelMemberDto {
  @IsString()
  userId: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}

export class ScheduleInterviewDto {
  @IsString()
  applicationId: string;

  @IsNumber()
  roundNumber: number;

  @IsString()
  roundName: string;

  @IsString()
  interviewType: string;

  @IsDateString()
  scheduledStart: string;

  @IsDateString()
  scheduledEnd: string;

  @IsString()
  timezone: string;

  @ValidateNested()
  @Type(() => MeetingDto)
  meeting: MeetingDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PanelMemberDto)
  panel: PanelMemberDto[];
}

export class UpdateInterviewStatusDto {
  @IsEnum(InterviewStatus)
  status: InterviewStatus;
}

class CompetencyDto {
  @IsString()
  name: string;

  @IsNumber()
  score: number;

  @IsNumber()
  maxScore: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  comments?: string;
}

class ScorecardCategoryDto {
  @IsString()
  categoryName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompetencyDto)
  competencies: CompetencyDto[];
}

export class SubmitFeedbackDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScorecardCategoryDto)
  categories: ScorecardCategoryDto[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(Recommendation)
  recommendation?: Recommendation;

  @IsEnum(['DRAFT', 'FINAL'])
  status: 'DRAFT' | 'FINAL';
}
