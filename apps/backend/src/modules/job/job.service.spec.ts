import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { JobValidationService } from './job-validation.service';
import { JobLifecycleService } from './job-lifecycle.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { Job, JobStatus, JobVisibility, WorkMode } from './schemas/job.schema';
import { JobTemplate } from './schemas/job-template.schema';
import { Types } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('JobService', () => {
  let service: JobService;

  class MockJobModel {
    constructor(private data: any) {
      Object.assign(this, data);
    }
    save = jest.fn().mockResolvedValue(this);
    static find = jest.fn();
    static findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
        status: JobStatus.DRAFT,
        save: jest.fn().mockResolvedValue(true),
      }),
    });
  }

  const mockTemplateModel = {
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        toObject: () => ({ jobTitleId: new Types.ObjectId(), templateName: 'Test' }),
      }),
    }),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        JobValidationService,
        JobLifecycleService,
        { provide: getModelToken(Job.name), useValue: MockJobModel },
        { provide: getModelToken(JobTemplate.name), useValue: mockTemplateModel },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should create a job and emit event', async () => {
    const payload = { jobTitleId: new Types.ObjectId().toString(), workMode: WorkMode.REMOTE };
    const job = await service.createJob(new Types.ObjectId().toString(), payload, new Types.ObjectId().toString());
    
    expect(job).toBeDefined();
    expect(mockEventEmitter.emit).toHaveBeenCalledWith('job.created', expect.any(Object));
  });

  it('should change status correctly', async () => {
    const job = await service.changeStatus(
      new Types.ObjectId().toString(), 
      new Types.ObjectId().toString(), 
      JobStatus.PENDING_APPROVAL, 
      new Types.ObjectId().toString()
    );

    expect(job.status).toBe(JobStatus.PENDING_APPROVAL);
    expect(mockEventEmitter.emit).toHaveBeenCalledWith('job.status_changed', expect.any(Object));
  });

  it('should throw error on invalid transition', async () => {
    // Override mock to return PUBLISHED job
    MockJobModel.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        status: JobStatus.PUBLISHED,
        save: jest.fn(),
      }),
    });

    await expect(
      service.changeStatus(
        new Types.ObjectId().toString(), 
        new Types.ObjectId().toString(), 
        JobStatus.APPROVED, 
        new Types.ObjectId().toString()
      )
    ).rejects.toThrow(BadRequestException);
  });
});
