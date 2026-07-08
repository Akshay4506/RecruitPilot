import { Injectable } from '@nestjs/common';
import { ConfidenceLevel, ConsensusData } from './schemas/interview-decision.schema';

@Injectable()
export class ConsensusService {
  calculateConsensus(scoreVariance: number): ConsensusData {
    let confidencePercentage = 100;
    
    if (scoreVariance > 0) {
      // Rough heuristic: standard deviation affects confidence
      const stdDev = Math.sqrt(scoreVariance);
      confidencePercentage = Math.max(0, 100 - (stdDev * 2)); 
      confidencePercentage = Math.round(confidencePercentage);
    }

    let confidenceLevel = ConfidenceLevel.HIGH;
    if (confidencePercentage < 50) {
      confidenceLevel = ConfidenceLevel.LOW;
    } else if (confidencePercentage < 80) {
      confidenceLevel = ConfidenceLevel.MEDIUM;
    }

    return {
      confidenceLevel,
      confidencePercentage,
      scoreVariance
    };
  }
}
