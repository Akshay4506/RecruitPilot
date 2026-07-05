import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  async create(name: string, domain: string): Promise<CompanyDocument> {
    const existing = await this.companyModel.findOne({ domain });
    if (existing) {
      throw new ConflictException('Company with this domain already exists');
    }
    const createdCompany = new this.companyModel({ name, domain });
    return createdCompany.save();
  }

  async findById(id: string): Promise<CompanyDocument | null> {
    return this.companyModel.findById(id);
  }
}
