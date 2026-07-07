import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from './schemas/application.schema';

@Injectable()
export class ApplicationValidationService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async validateDuplicate(candidateId: string, jobId: string) {
    const existing = await this.appModel.findOne({
      candidateId: new Types.ObjectId(candidateId),
      jobId: new Types.ObjectId(jobId),
      status: { $nin: [ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN] }
    }).exec();

    if (existing) {
      throw new ConflictException('You already have an active application for this job.');
    }
  }

  validateScreeningAnswers(answers: any[]) {
    if (!Array.isArray(answers)) return;
    for (const ans of answers) {
      if (ans.required && (!ans.answer || ans.answer.trim() === '')) {
        throw new BadRequestException(`Answer is required for question: ${ans.question}`);
      }
    }
  }
}
