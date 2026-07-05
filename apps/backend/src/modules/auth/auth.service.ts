import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { RegisterWorkspaceDto } from './dto/register-workspace.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerWorkspace(dto: RegisterWorkspaceDto) {
    // Trim spaces
    dto.password = dto.password.trim();
    dto.email = dto.email.trim().toLowerCase();

    // Create Company
    const company = await this.companyService.create(dto.companyName, dto.domain);

    // Hash Password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Create Company Admin
    const user = await this.userService.create({
      name: dto.userName,
      email: dto.email,
      passwordHash,
      companyId: company._id as any,
      role: Role.COMPANY_ADMIN,
    });

    return this.generateTokens(user._id.toString(), user.email, user.role, company._id.toString());
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials or inactive account');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user._id.toString(), user.email, user.role, user.companyId.toString());
  }

  async logout(userId: string) {
    await this.userService.updateRefreshTokenHash(userId, null);
    return { success: true, message: 'Logged out successfully' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Access Denied');
    }

    const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Access Denied');
    }

    return this.generateTokens(user._id.toString(), user.email, user.role, user.companyId.toString());
  }

  private async generateTokens(userId: string, email: string, role: string, companyId: string) {
    const payload = { sub: userId, email, role, companyId };

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

    const saltRounds = 10;
    const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);
    await this.userService.updateRefreshTokenHash(userId, refreshTokenHash);

    return {
      accessToken,
      refreshToken,
    };
  }
}
