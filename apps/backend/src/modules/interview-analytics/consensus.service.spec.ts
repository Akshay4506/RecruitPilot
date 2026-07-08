import { Test, TestingModule } from '@nestjs/testing';
import { ConsensusService } from './consensus.service';
import { ConfidenceLevel } from './schemas/interview-decision.schema';

describe('ConsensusService', () => {
  let service: ConsensusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsensusService],
    }).compile();

    service = module.get<ConsensusService>(ConsensusService);
  });

  it('should return 100% HIGH confidence for 0 variance', () => {
    const result = service.calculateConsensus(0);
    expect(result.confidencePercentage).toBe(100);
    expect(result.confidenceLevel).toBe(ConfidenceLevel.HIGH);
  });

  it('should return LOW confidence for high variance', () => {
    // 900 variance -> stdDev is 30.
    // 100 - (30 * 2) = 40%
    const result = service.calculateConsensus(900);
    expect(result.confidencePercentage).toBe(40);
    expect(result.confidenceLevel).toBe(ConfidenceLevel.LOW);
  });
});
