import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog.name) private auditModel: Model<AuditLogDocument>) {}

  async log(action: string, actorId: string, companyId: string, targetId?: string, metadata: any = {}) {
    const log = new this.auditModel({
      action,
      actorId,
      companyId,
      targetId,
      metadata,
    });
    return log.save();
  }
}
