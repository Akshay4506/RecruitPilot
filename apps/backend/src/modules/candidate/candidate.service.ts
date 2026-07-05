import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from './schemas/candidate.schema';

@Injectable()
export class CandidateService {
  constructor(@InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>) {}

  async create(data: Partial<Candidate>) {
    const candidate = new this.candidateModel(data);
    return candidate.save();
  }

  async findByEmail(email: string) {
    return this.candidateModel.findOne({ 'personalInfo.email': email }).exec();
  }

  async findById(id: string) {
    return this.candidateModel.findById(id).exec();
  }

  async updateLastLogin(id: string) {
    return this.candidateModel.findByIdAndUpdate(id, { lastLoginAt: new Date(), lastSeenAt: new Date() }).exec();
  }

  async updateRefreshTokenHash(id: string, hash: string | null) {
    return this.candidateModel.findByIdAndUpdate(id, { refreshTokenHash: hash }).exec();
  }

  async updateProfile(id: string, data: any) {
    return this.candidateModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  }
  async update(id: string, updateData: any) {
    return this.candidateModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
}
