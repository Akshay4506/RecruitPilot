import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineEvent, TimelineEventDocument } from './schemas/timeline-event.schema';

@Injectable()
export class TimelineService {
  constructor(@InjectModel(TimelineEvent.name) private timelineModel: Model<TimelineEventDocument>) {}

  async logEvent(action: string, entityType: string, entityId: string, actorId?: string, metadata: any = {}) {
    const event = new this.timelineModel({
      action,
      entityType,
      entityId: new Types.ObjectId(entityId),
      actorId: actorId ? new Types.ObjectId(actorId) : undefined,
      metadata,
    });
    return event.save();
  }

  async getEventsForEntity(entityType: string, entityId: string) {
    return this.timelineModel.find({ entityType, entityId: new Types.ObjectId(entityId) }).sort({ createdAt: -1 }).exec();
  }

  @OnEvent('document.uploaded')
  async handleDocumentUploaded(payload: any) {
    await this.logEvent('DOCUMENT_UPLOADED', payload.ownerType, payload.ownerId, payload.ownerId, { documentId: payload.documentId, type: payload.documentType });
  }

  @OnEvent('document.defaultChanged')
  async handleDocumentDefaultChanged(payload: any) {
    await this.logEvent('DEFAULT_DOCUMENT_CHANGED', payload.ownerType, payload.ownerId, payload.ownerId, { documentId: payload.documentId, type: payload.documentType });
  }

  @OnEvent('document.deleted')
  async handleDocumentDeleted(payload: any) {
    await this.logEvent('DOCUMENT_DELETED', payload.ownerType, payload.ownerId, payload.ownerId, { documentId: payload.documentId });
  }
}
