import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/interview-template.dto';

@Injectable()
export class QuestionBankService {
  constructor(@InjectModel(Question.name) private model: Model<QuestionDocument>) {}

  async create(companyId: string, dto: CreateQuestionDto) {
    const doc = new this.model({ ...dto, companyId: new Types.ObjectId(companyId) });
    return doc.save();
  }

  async findAll(companyId: string) {
    return this.model.find({ companyId: new Types.ObjectId(companyId) }).populate('competencies').exec();
  }

  async recordUsage(questionId: string) {
    return this.model.findByIdAndUpdate(questionId, { $inc: { usageCount: 1 } }).exec();
  }
}
