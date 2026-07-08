import { IsString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DecisionStatus } from '../schemas/interview-decision.schema';

export class UpdateDecisionDto {
  @IsEnum(DecisionStatus)
  status: DecisionStatus;

  @IsString()
  reason: string;
}

export class CommitteeMemberDto {
  @IsString()
  userId: string;

  @IsString()
  role: string;
}

export class UpdateCommitteeDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommitteeMemberDto)
  members?: CommitteeMemberDto[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  status?: string; // PENDING, IN_PROGRESS, COMPLETED
}
