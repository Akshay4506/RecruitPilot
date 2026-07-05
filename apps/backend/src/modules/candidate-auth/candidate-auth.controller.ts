import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CandidateAuthService } from './candidate-auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Candidate Authentication')
@Controller('api/v1/candidate-auth')
export class CandidateAuthController {
  constructor(private readonly authService: CandidateAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new candidate profile' })
  @ApiResponse({ status: 201, description: 'Candidate created successfully.' })
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Candidate login' })
  async login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
