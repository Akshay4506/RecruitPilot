export interface PipelineStageConfig {
  id: string;
  name: string;
  order: number;
  type: 'DEFAULT' | 'CUSTOM';
}

export const DEFAULT_PIPELINE_STAGES: PipelineStageConfig[] = [
  { id: 'SUBMITTED', name: 'Submitted', order: 10, type: 'DEFAULT' },
  { id: 'UNDER_REVIEW', name: 'Under Review', order: 20, type: 'DEFAULT' },
  { id: 'SHORTLISTED', name: 'Shortlisted', order: 30, type: 'DEFAULT' },
  { id: 'INTERVIEW', name: 'Interview', order: 40, type: 'DEFAULT' },
  { id: 'OFFER', name: 'Offer', order: 50, type: 'DEFAULT' },
  { id: 'HIRED', name: 'Hired', order: 60, type: 'DEFAULT' },
  { id: 'REJECTED', name: 'Rejected', order: 900, type: 'DEFAULT' },
  { id: 'WITHDRAWN', name: 'Withdrawn', order: 999, type: 'DEFAULT' }
];
