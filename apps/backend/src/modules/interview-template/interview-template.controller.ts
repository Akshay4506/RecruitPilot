import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewTemplateService } from './interview-template.service';
import { CompetencyLibraryService } from './competency-library.service';
import { QuestionBankService } from './question-bank.service';
import { EvaluationService } from './evaluation.service';
import { CreateCompetencyDto, CreateQuestionDto, CreateInterviewTemplateDto } from './dto/interview-template.dto';

@ApiTags('Interview Templates & Evaluation')
@Controller('api/v1/interview-templates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InterviewTemplateController {
  constructor(
    private templateService: InterviewTemplateService,
    private competencyService: CompetencyLibraryService,
    private questionService: QuestionBankService,
    private evaluationService: EvaluationService
  ) {}

  @Post('competencies')
  @ApiOperation({ summary: 'Create Competency' })
  async createCompetency(@Request() req: any, @Body() dto: CreateCompetencyDto) {
    return this.competencyService.create(req.user.organizationId, dto);
  }

  @Post('questions')
  @ApiOperation({ summary: 'Create Question' })
  async createQuestion(@Request() req: any, @Body() dto: CreateQuestionDto) {
    return this.questionService.create(req.user.organizationId, dto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Interview Template' })
  async createTemplate(@Request() req: any, @Body() dto: CreateInterviewTemplateDto) {
    return this.templateService.create(req.user.organizationId, dto);
  }

  @Post(':id/apply/:interviewId')
  @ApiOperation({ summary: 'Apply Template to Interview' })
  async applyTemplate(@Request() req: any, @Param('id') id: string, @Param('interviewId') interviewId: string) {
    return this.templateService.applyTemplate(req.user.organizationId, id, interviewId, req.user.userId);
  }

  @Post('interviews/:interviewId/evaluate')
  @ApiOperation({ summary: 'Calculate Evaluation Summary' })
  async evaluateInterview(@Request() req: any, @Param('interviewId') interviewId: string) {
    // Usually triggered by event, but exposing for manual recalculation if needed
    const competencies = await this.competencyService.findAll(req.user.organizationId);
    return this.evaluationService.calculateEvaluationSummary(req.user.organizationId, interviewId, competencies);
  }
}
