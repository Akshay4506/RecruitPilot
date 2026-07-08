import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Competency, CompetencyDocument } from './schemas/competency.schema';
import { CreateCompetencyDto } from './dto/interview-template.dto';

@Injectable()
export class CompetencyLibraryService {
  constructor(@InjectModel(Competency.name) private model: Model<CompetencyDocument>) {}

  async create(companyId: string, dto: CreateCompetencyDto) {
    const doc = new this.model({ ...dto, companyId: new Types.ObjectId(companyId) });
    return doc.save();
  }

  async findAll(companyId: string) {
    return this.model.find({ companyId: new Types.ObjectId(companyId) }).exec();
  }
}
