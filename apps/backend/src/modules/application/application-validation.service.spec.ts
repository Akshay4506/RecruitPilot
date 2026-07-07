import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationValidationService } from './application-validation.service';
import { getModelToken } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Types } from 'mongoose';
import { ConflictException, BadRequestException } from '@nestjs/common';

describe('ApplicationValidationService', () => {
  let service: ApplicationValidationService;

  class MockApplicationModel {
    static findOne = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationValidationService,
        { provide: getModelToken(Application.name), useValue: MockApplicationModel },
      ],
    }).compile();

    service = module.get<ApplicationValidationService>(ApplicationValidationService);
  });

  it('should throw ConflictException if duplicate active application exists', async () => {
    MockApplicationModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: new Types.ObjectId() }),
    });

    await expect(
      service.validateDuplicate(new Types.ObjectId().toString(), new Types.ObjectId().toString())
    ).rejects.toThrow(ConflictException);
  });

  it('should not throw if no duplicate active application exists', async () => {
    MockApplicationModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null), // No existing app
    });

    await expect(
      service.validateDuplicate(new Types.ObjectId().toString(), new Types.ObjectId().toString())
    ).resolves.not.toThrow();
  });

  it('should throw BadRequestException if required screening answer is missing', () => {
    const answers = [{ question: 'Why?', required: true, answer: '' }];
    expect(() => service.validateScreeningAnswers(answers)).toThrow(BadRequestException);
  });

  it('should pass screening validation if all required answers provided', () => {
    const answers = [{ question: 'Why?', required: true, answer: 'Because' }];
    expect(() => service.validateScreeningAnswers(answers)).not.toThrow();
  });
});
