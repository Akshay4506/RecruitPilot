import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDifficulty } from '../schemas/question.schema';

export class CreateCompetencyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  defaultWeight?: number;

  @IsOptional()
  @IsNumber()
  defaultMaxScore?: number;

  @IsOptional()
  @IsArray()
  rubric?: any[];

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsBoolean()
  isVetoCompetency?: boolean;
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsEnum(QuestionDifficulty)
  difficulty?: QuestionDifficulty;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  competencies?: string[]; // Competency IDs

  @IsOptional()
  @IsArray()
  suggestedFollowUps?: string[];

  @IsOptional()
  @IsNumber()
  expectedDurationMinutes?: number;

  @IsOptional()
  @IsString()
  hints?: string;

  @IsOptional()
  @IsString()
  redFlags?: string;

  @IsOptional()
  @IsString()
  excellentAnswerGuidance?: string;
}

export class CreateInterviewTemplateDto {
  @IsString()
  name: string;

  @IsString()
  interviewType: string;

  @IsNumber()
  durationMinutes: number;

  @IsOptional()
  @IsString()
  scorecardTemplateId?: string;

  @IsOptional()
  @IsArray()
  recommendedQuestions?: string[];

  @IsOptional()
  @IsArray()
  agenda?: any[];
}
