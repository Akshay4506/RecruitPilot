import { Controller, Post, Body, UseGuards, Put, Param, Delete, Get } from '@nestjs/common';
import { CandidateJwtAuthGuard } from '../candidate-auth/guards/candidate-jwt-auth.guard';
import { CurrentCandidate } from '../../common/decorators/current-candidate.decorator';
import { NotFoundException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ReferenceService } from '../reference/reference.service';
import { TimelineService } from '../timeline/timeline.service';
import { ProfileAggregatorService } from '../career-profile/profile-aggregator.service';
import { Types } from 'mongoose';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Candidate Career Profile')
@ApiBearerAuth()
@Controller('api/v1/candidate/profile')
@UseGuards(CandidateJwtAuthGuard)
export class CandidateProfileController {
  constructor(
    private candidateService: CandidateService,
    private referenceService: ReferenceService,
    private timelineService: TimelineService,
    private aggregatorService: ProfileAggregatorService
  ) {}

  @Get('snapshot')
  @ApiOperation({ summary: 'Get generated career snapshot and statistics' })
  async getSnapshot(@CurrentCandidate() candidate: any) {
    const fullCandidate = await this.candidateService.findById(candidate.id);
    if (!fullCandidate) throw new NotFoundException('Candidate not found');
    return {
      success: true,
      data: {
        snapshot: this.aggregatorService.generateSnapshot(fullCandidate),
        statistics: this.aggregatorService.generateStatistics(fullCandidate)
      }
    };
  }

  @Post('experience')
  @ApiOperation({ summary: 'Add a new work experience' })
  async addExperience(@CurrentCandidate() candidate: any, @Body() dto: any) {
    let companyId = dto.companyId;
    if (!companyId && dto.companyName) {
      const company = await this.referenceService.findOrCreate('companies', dto.companyName);
      companyId = company._id;
    }

    let jobTitleId = dto.jobTitleId;
    if (!jobTitleId && dto.jobTitleName) {
      const jobTitle = await this.referenceService.findOrCreate('job-titles', dto.jobTitleName);
      jobTitleId = jobTitle._id;
    }

    const newExperience = {
      _id: new Types.ObjectId(),
      companyId,
      jobTitleId,
      industryId: dto.industryId,
      employmentTypeId: dto.employmentTypeId,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      isCurrent: dto.isCurrent,
      locationId: dto.locationId,
      isRemote: dto.isRemote,
      isLeadership: dto.isLeadership,
      description: dto.description,
      responsibilities: dto.responsibilities || [],
      achievements: dto.achievements || [],
      skillsUsed: dto.skillsUsed || [],
      technologiesUsed: dto.technologiesUsed || [],
    };

    await this.candidateService.update(candidate.id, {
      $push: { experiences: newExperience }
    } as any);

    await this.timelineService.logEvent('PROFILE_EXPERIENCE_ADDED', 'CANDIDATE', candidate.id, candidate.id, { companyId });
    return { success: true, data: newExperience };
  }

  @Delete('experience/:id')
  @ApiOperation({ summary: 'Delete a work experience' })
  async deleteExperience(@CurrentCandidate() candidate: any, @Param('id') id: string) {
    await this.candidateService.update(candidate.id, {
      $pull: { experiences: { _id: new Types.ObjectId(id) } }
    } as any);
    return { success: true };
  }

  @Post('skill')
  @ApiOperation({ summary: 'Add a skill' })
  async addSkill(@CurrentCandidate() candidate: any, @Body() dto: any) {
    let skillId = dto.skillId;
    if (!skillId && dto.skillName) {
      const skill = await this.referenceService.findOrCreate('skills', dto.skillName);
      skillId = skill._id;
    }

    const newSkill = {
      _id: new Types.ObjectId(),
      skillId,
      proficiency: dto.proficiency || 'INTERMEDIATE',
      yearsOfExperience: dto.yearsOfExperience,
      lastUsedYear: dto.lastUsedYear,
      verificationSource: dto.verificationSource || 'SELF_DECLARED'
    };

    await this.candidateService.update(candidate.id, {
      $push: { skills: newSkill }
    } as any);

    await this.timelineService.logEvent('PROFILE_SKILL_ADDED', 'CANDIDATE', candidate.id, candidate.id, { skillId });
    return { success: true, data: newSkill };
  }
}
