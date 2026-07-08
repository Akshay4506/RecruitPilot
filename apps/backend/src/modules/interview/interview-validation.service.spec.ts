import { Test, TestingModule } from '@nestjs/testing';
import { InterviewValidationService } from './interview-validation.service';
import { getModelToken } from '@nestjs/mongoose';
import { Application } from '../application/schemas/application.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MeetingType } from './schemas/interview.schema';

describe('InterviewValidationService', () => {
  let service: InterviewValidationService;

  const mockAppModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewValidationService,
        { provide: getModelToken(Application.name), useValue: mockAppModel },
      ],
    }).compile();

    service = module.get<InterviewValidationService>(InterviewValidationService);
  });

  it('should throw BadRequest if start time is after end time', async () => {
    const dto = {
      applicationId: 'app1',
      roundNumber: 1,
      roundName: 'HR',
      interviewType: 'HR',
      scheduledStart: '2026-08-01T10:00:00Z',
      scheduledEnd: '2026-08-01T09:00:00Z',
      timezone: 'UTC',
      meeting: { type: MeetingType.VIRTUAL },
      panel: []
    };

    await expect(service.validateScheduling('company1', dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequest for duplicate panel members', async () => {
    mockAppModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'app1' }) });
    
    const dto = {
      applicationId: 'app1',
      roundNumber: 1,
      roundName: 'HR',
      interviewType: 'HR',
      scheduledStart: '2026-08-01T10:00:00Z',
      scheduledEnd: '2026-08-01T11:00:00Z',
      timezone: 'UTC',
      meeting: { type: MeetingType.VIRTUAL },
      panel: [
        { userId: 'user1', role: 'Interviewer' },
        { userId: 'user1', role: 'Observer' }
      ]
    };

    await expect(service.validateScheduling('company1', dto)).rejects.toThrow(BadRequestException);
  });
});
