import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApplicationStatus } from '../schemas/application.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeAppStatusDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
