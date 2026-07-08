import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation.service';
import { Recommendation } from '../interview/schemas/interview.schema';

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationService],
    }).compile();

    service = module.get<RecommendationService>(RecommendationService);
  });

  it('should detect a veto competency and return NEEDS_DISCUSSION', () => {
    const competencies = [
      { name: 'System Design', isVetoCompetency: true }
    ];

    const panelMembers = [
      {
        feedback: {
          status: 'FINAL',
          recommendation: Recommendation.NO_HIRE,
          categories: [
            {
              competencies: [
                { name: 'System Design', score: 2, maxScore: 10 } // Score < 4 (40%) triggers veto
              ]
            }
          ]
        }
      }
    ];

    const result = service.aggregateRecommendations(panelMembers, competencies);
    expect(result.hasVeto).toBe(true);
    expect(result.recommendation).toBe(Recommendation.NEEDS_DISCUSSION);
  });

  it('should return STRONG_HIRE if everyone gives strong hire', () => {
    const competencies = [
      { name: 'System Design', isVetoCompetency: true }
    ];

    const panelMembers = [
      {
        feedback: {
          status: 'FINAL',
          recommendation: Recommendation.STRONG_HIRE,
          categories: [
            {
              competencies: [
                { name: 'System Design', score: 9, maxScore: 10 }
              ]
            }
          ]
        }
      },
      {
        feedback: {
          status: 'FINAL',
          recommendation: Recommendation.STRONG_HIRE,
        }
      }
    ];

    const result = service.aggregateRecommendations(panelMembers, competencies);
    expect(result.hasVeto).toBe(false);
    expect(result.recommendation).toBe(Recommendation.STRONG_HIRE);
    expect(result.distribution[Recommendation.STRONG_HIRE]).toBe(2);
  });
});
