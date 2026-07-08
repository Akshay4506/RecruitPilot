import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ScorecardTemplate, ScorecardTemplateDocument } from './schemas/scorecard-template.schema';

@Injectable()
export class ScorecardTemplateService {
  constructor(@InjectModel(ScorecardTemplate.name) private model: Model<ScorecardTemplateDocument>) {}
  
  async create(companyId: string, payload: any) {
    const doc = new this.model({ ...payload, companyId: new Types.ObjectId(companyId) });
    return doc.save();
  }
}
