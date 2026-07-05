import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { Technology, TechnologySchema } from './schemas/technology.schema';
import { JobTitle, JobTitleSchema } from './schemas/job-title.schema';
import { Company, CompanySchema } from './schemas/company.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Industry, IndustrySchema } from './schemas/industry.schema';
import { Institution, InstitutionSchema } from './schemas/institution.schema';
import { Degree, DegreeSchema } from './schemas/degree.schema';
import { EmploymentType, EmploymentTypeSchema } from './schemas/employment-type.schema';
import { Language, LanguageSchema } from './schemas/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema },
      { name: Technology.name, schema: TechnologySchema },
      { name: JobTitle.name, schema: JobTitleSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Location.name, schema: LocationSchema },
      { name: Industry.name, schema: IndustrySchema },
      { name: Institution.name, schema: InstitutionSchema },
      { name: Degree.name, schema: DegreeSchema },
      { name: EmploymentType.name, schema: EmploymentTypeSchema },
      { name: Language.name, schema: LanguageSchema },
    ]),
  ],
  controllers: [ReferenceController],
  providers: [ReferenceService],
  exports: [ReferenceService],
})
export class ReferenceModule {}
