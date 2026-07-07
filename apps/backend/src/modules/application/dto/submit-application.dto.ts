import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class SubmitApplicationDto {
  @IsString()
  jobId: string;

  @IsString()
  companyId: string;

  @IsOptional()
  resume?: any;

  @IsOptional()
  @IsArray()
  supportingDocuments?: any[];

  @IsOptional()
  @IsArray()
  screeningAnswers?: any[];

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsBoolean()
  consentGiven?: boolean;
}
