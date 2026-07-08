import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InterviewDecisionDocument } from './schemas/interview-decision.schema';

@Injectable()
export class DecisionAuditService {
  recordAuditLog(
    decisionDoc: InterviewDecisionDocument, 
    newDecision: string, 
    userId: string, 
    reason: string, 
    confidenceChange?: number
  ) {
    decisionDoc.auditTrail.push({
      previousDecision: decisionDoc.status,
      newDecision,
      changedBy: new Types.ObjectId(userId),
      changedAt: new Date(),
      reason,
      confidenceChange
    });
  }
}
