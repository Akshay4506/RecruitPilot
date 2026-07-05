import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CandidateAuthService } from './candidate-auth.service';
import { CandidateAuthController } from './candidate-auth.controller';
import { CandidateModule } from '../candidate/candidate.module';
import { TimelineModule } from '../timeline/timeline.module';
import { CandidateJwtStrategy } from './strategies/candidate-jwt.strategy';

@Module({
  imports: [
    CandidateModule,
    TimelineModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [CandidateAuthController],
  providers: [CandidateAuthService, CandidateJwtStrategy],
})
export class CandidateAuthModule {}
