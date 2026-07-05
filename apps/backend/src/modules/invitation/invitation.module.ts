import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { Invitation, InvitationSchema } from './schemas/invitation.schema';
import { UserModule } from '../user/user.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
    UserModule,
    AuditModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
