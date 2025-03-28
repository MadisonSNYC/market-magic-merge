
import { KalshiAiRecommendation } from './types/recommendations';
import { mockAiRecommendations } from './mockData';

// Re-export the mock data for components that need static data
export { mockAiRecommendations };

// Mock function to get AI recommendations
export const getAiRecommendations = async (): Promise<KalshiAiRecommendation[]> => {
  // This would normally fetch from the API
  return mockAiRecommendations;
};
