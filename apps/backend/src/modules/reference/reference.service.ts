import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skill.schema';
import { Technology } from './schemas/technology.schema';
import { JobTitle } from './schemas/job-title.schema';
import { Company } from './schemas/company.schema';
import { Location } from './schemas/location.schema';
import { Industry } from './schemas/industry.schema';
import { Institution } from './schemas/institution.schema';
import { Degree } from './schemas/degree.schema';
import { EmploymentType } from './schemas/employment-type.schema';
import { Language } from './schemas/language.schema';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
    @InjectModel(Technology.name) private technologyModel: Model<Technology>,
    @InjectModel(JobTitle.name) private jobTitleModel: Model<JobTitle>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Industry.name) private industryModel: Model<Industry>,
    @InjectModel(Institution.name) private institutionModel: Model<Institution>,
    @InjectModel(Degree.name) private degreeModel: Model<Degree>,
    @InjectModel(EmploymentType.name) private employmentTypeModel: Model<EmploymentType>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  private getModel(collection: string): Model<any> {
    const models: Record<string, Model<any>> = {
      skills: this.skillModel,
      technologies: this.technologyModel,
      'job-titles': this.jobTitleModel,
      companies: this.companyModel,
      locations: this.locationModel,
      industries: this.industryModel,
      institutions: this.institutionModel,
      degrees: this.degreeModel,
      'employment-types': this.employmentTypeModel,
      languages: this.languageModel,
    };
    return models[collection];
  }

  async search(collection: string, query: string, limit = 10) {
    const model = this.getModel(collection);
    if (!model) throw new Error(`Collection ${collection} not found`);

    if (!query || query.trim() === '') {
      return model.find({ isVerified: true }).limit(limit).exec();
    }

    const normalizedQuery = query.toLowerCase().trim();

    return model.find(
      { $text: { $search: `"${normalizedQuery}"` } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .exec();
  }

  async findOrCreate(collection: string, name: string) {
    const model = this.getModel(collection);
    if (!model) throw new Error(`Collection ${collection} not found`);

    const normalizedName = name.toLowerCase().trim();
    
    // First try exact match on normalized name or aliases
    let doc = await model.findOne({ 
      $or: [
        { normalizedName },
        { aliases: normalizedName }
      ]
    }).exec();

    if (doc) {
      return doc;
    }

    // Auto-create with isVerified: false
    doc = new model({
      name: name.trim(),
      normalizedName,
      aliases: [],
      isVerified: false,
    });

    return doc.save();
  }
}
