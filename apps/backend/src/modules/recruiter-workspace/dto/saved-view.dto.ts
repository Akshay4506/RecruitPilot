import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateSavedViewDto {
  @IsString()
  viewName: string;

  @IsObject()
  filters: Record<string, any>;

  @IsOptional()
  @IsObject()
  sorting?: Record<string, 1 | -1>;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
