import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CandidateService } from '../candidate/candidate.service';
import { TimelineService } from '../timeline/timeline.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CandidateAuthService {
  constructor(
    private candidateService: CandidateService,
    private timelineService: TimelineService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: any) {
    const existing = await this.candidateService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Candidate already exists with this email');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const candidate = await this.candidateService.create({
      personalInfo: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
      },
      passwordHash,
      slug: `${dto.firstName.toLowerCase()}-${dto.lastName.toLowerCase()}-${Date.now()}`,
    });

    await this.timelineService.logEvent('ACCOUNT_CREATED', 'CANDIDATE', String(candidate._id), String(candidate._id));

    return this.generateTokens(String(candidate._id), candidate.personalInfo.email);
  }

  async login(dto: any) {
    const candidate = await this.candidateService.findByEmail(dto.email);
    if (!candidate) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, candidate.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.candidateService.updateLastLogin(String(candidate._id));
    await this.timelineService.logEvent('LOGIN', 'CANDIDATE', String(candidate._id), String(candidate._id));

    return this.generateTokens(String(candidate._id), candidate.personalInfo.email);
  }

  private async generateTokens(candidateId: string, email: string) {
    const payload = { sub: candidateId, email, type: 'candidate' };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.candidateService.updateRefreshTokenHash(candidateId, refreshTokenHash);

    return { accessToken, refreshToken };
  }
}
