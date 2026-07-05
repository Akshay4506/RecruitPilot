import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument, InvitationStatus } from './schemas/invitation.schema';
import { UserService } from '../user/user.service';
import { AuditService } from '../audit/audit.service';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class InvitationService {
  private resend: Resend;

  constructor(
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    private userService: UserService,
    private auditService: AuditService,
    private configService: ConfigService,
  ) {
    const resendKey = this.configService.get<string>('RESEND_API_KEY');
    if (resendKey) {
      this.resend = new Resend(resendKey);
    }
  }

  async inviteUser(email: string, role: string, companyId: string, inviterId: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 72); // 72 hours expiry

    const invitation = new this.invitationModel({
      email,
      role,
      token,
      companyId,
      invitedBy: inviterId,
      expiresAt,
    });

    await invitation.save();

    await this.auditService.log('USER_INVITED', inviterId, companyId, invitation._id as any, { email, role });

    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [email],
          subject: 'You have been invited to join the Workspace',
          html: `<p>Click <a href="http://localhost:3000/accept-invitation?token=${token}">here</a> to join.</p>`,
        });
      } catch (e) {
        console.error('Failed to send email', e);
      }
    }

    return invitation;
  }
}
