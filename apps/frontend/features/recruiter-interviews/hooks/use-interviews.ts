import { useState, useEffect } from 'react';
import { mockInterviewService } from '../services/mock-interviews.service';
import { apiInterviewService } from '../services/api-interviews.service';

// Use mock service by default for Milestone 4, will swap in Milestone 5
const service = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false' 
  ? mockInterviewService 
  : apiInterviewService;

export function useInterview() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const result = await service.getAll();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
    isFetching: isLoading
  };
}
