import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { validate } from './config/env.validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentModule } from './modules/department/department.module';
import { TeamModule } from './modules/team/team.module';
import { AuditModule } from './modules/audit/audit.module';
import { NotificationModule } from './modules/notification/notification.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { StorageModule } from './modules/storage/storage.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CandidateAuthModule } from './modules/candidate-auth/candidate-auth.module';
import { DocumentModule } from './modules/document/document.module';
import { ReferenceModule } from './modules/reference/reference.module';
import { CareerProfileModule } from './modules/career-profile/career-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    CompanyModule,
    UserModule,
    AuthModule,
    DepartmentModule,
    TeamModule,
    AuditModule,
    NotificationModule,
    InvitationModule,
    TimelineModule,
    StorageModule,
    CandidateModule,
    CandidateAuthModule,
    DocumentModule,
    ReferenceModule,
    CareerProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
