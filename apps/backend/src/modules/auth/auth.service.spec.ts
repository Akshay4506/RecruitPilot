import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Role } from '../user/schemas/user.schema';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<Partial<UserService>>;
  let companyService: jest.Mocked<Partial<CompanyService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;
  let configService: jest.Mocked<Partial<ConfigService>>;

  beforeEach(async () => {
    userService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      updateRefreshTokenHash: jest.fn(),
    };
    companyService = {
      create: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('test-token'),
    };
    configService = {
      get: jest.fn().mockReturnValue('secret'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: CompanyService, useValue: companyService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerWorkspace', () => {
    it('should create a company and a user, then return tokens', async () => {
      (companyService.create as jest.Mock).mockResolvedValue({ _id: 'company-123' });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      (userService.create as jest.Mock).mockResolvedValue({
        _id: 'user-123',
        email: 'test@acme.com',
        role: Role.COMPANY_ADMIN,
      });

      const dto = {
        companyName: 'Acme',
        domain: 'acme.com',
        userName: 'Admin',
        email: 'test@acme.com',
        password: 'Password123!',
      };

      const result = await service.registerWorkspace(dto);

      expect(companyService.create).toHaveBeenCalledWith('Acme', 'acme.com');
      expect(userService.create).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@acme.com',
        role: Role.COMPANY_ADMIN,
        companyId: 'company-123',
      }));
      expect(result).toHaveProperty('accessToken', 'test-token');
      expect(result).toHaveProperty('refreshToken', 'test-token');
    });
  });
});
