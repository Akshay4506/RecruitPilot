import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument } from '../application/schemas/application.schema';
import { ScheduleInterviewDto } from './dto/interview.dto';

@Injectable()
export class InterviewValidationService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>
  ) {}

  async validateScheduling(companyId: string, dto: ScheduleInterviewDto) {
    // 1. Validate dates
    const start = new Date(dto.scheduledStart);
    const end = new Date(dto.scheduledEnd);
    if (start >= end) {
      throw new BadRequestException('Scheduled start time must be before end time.');
    }

    // 2. Validate Application & Company Authorization
    const application = await this.appModel.findOne({ 
      _id: new Types.ObjectId(dto.applicationId),
      companyId: new Types.ObjectId(companyId) 
    }).exec();

    if (!application) {
      throw new NotFoundException('Application not found or unauthorized.');
    }

    // 3. Validate Panel Members (no duplicates)
    const userIds = dto.panel.map((p: any) => p.userId);
    const uniqueIds = new Set(userIds);
    if (userIds.length !== uniqueIds.size) {
      throw new BadRequestException('Interview panel cannot contain duplicate members.');
    }

    return application;
  }
}
