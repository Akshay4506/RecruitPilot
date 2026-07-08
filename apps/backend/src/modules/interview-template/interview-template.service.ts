import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InterviewTemplate, InterviewTemplateDocument } from './schemas/interview-template.schema';
import { CreateInterviewTemplateDto } from './dto/interview-template.dto';
import { Interview, InterviewDocument } from '../interview/schemas/interview.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class InterviewTemplateService {
  constructor(
    @InjectModel(InterviewTemplate.name) private templateModel: Model<InterviewTemplateDocument>,
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(companyId: string, dto: CreateInterviewTemplateDto) {
    const doc = new this.templateModel({ ...dto, companyId: new Types.ObjectId(companyId) });
    return doc.save();
  }

  async applyTemplate(companyId: string, templateId: string, interviewId: string, actorId: string) {
    const template = await this.templateModel.findOne({ _id: new Types.ObjectId(templateId), companyId: new Types.ObjectId(companyId) })
      .populate('scorecardTemplateId')
      .exec();

    if (!template) throw new NotFoundException('Template not found');

    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!interview) throw new NotFoundException('Interview not found');

    interview.meeting.instructions = template.instructions;
    
    if (template.agenda && template.agenda.length > 0) {
      interview.meeting.preparationNotes = JSON.stringify(template.agenda);
    }

    await interview.save();

    this.eventEmitter.emit('interview-template.applied', { interviewId, templateId, actorId });

    return interview;
  }
}
