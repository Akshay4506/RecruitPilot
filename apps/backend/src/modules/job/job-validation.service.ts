import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JobValidationService {
  validateCompensation(minSalary?: number, maxSalary?: number) {
    if (minSalary !== undefined && maxSalary !== undefined) {
      if (minSalary > maxSalary) {
        throw new BadRequestException('Minimum salary cannot be greater than maximum salary');
      }
    }
  }

  validateExperience(minYears?: number, maxYears?: number) {
    if (minYears !== undefined && maxYears !== undefined) {
      if (minYears > maxYears) {
        throw new BadRequestException('Minimum experience cannot be greater than maximum experience');
      }
    }
  }

  validateHiringTeam(hiringTeam?: any[]) {
    if (hiringTeam && hiringTeam.length > 0) {
      const userIds = hiringTeam.map(member => member.userId.toString());
      const uniqueUsers = new Set(userIds);
      if (uniqueUsers.size !== userIds.length) {
        throw new BadRequestException('A user can only have one role in the hiring team');
      }
    }
  }

  validateJobPayload(payload: any) {
    if (payload.compensation) {
      this.validateCompensation(payload.compensation.minSalary, payload.compensation.maxSalary);
    }
    if (payload.experience) {
      this.validateExperience(payload.experience.minYears, payload.experience.maxYears);
    }
    if (payload.hiringTeam) {
      this.validateHiringTeam(payload.hiringTeam);
    }
  }
}
