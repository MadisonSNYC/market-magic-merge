
import { mockAiRecommendations } from './mockData';

/**
 * Recommendation type with required properties for AiRecommendations component
 */
export interface KalshiRecommendation {
  id: string;
  market_id: string;  // Primary property name
  marketId?: string;  // Alias for backward compatibility
  title: string;
  confidence: number;
  side: string;
  recommendation: string;
  reasoning: string;
  reason: string;
  cost: number;
  potentialProfit: number;
}

/**
 * Get AI-generated trade recommendations
 * @returns An array of trade recommendations
 */
export const getAiRecommendations = async (): Promise<KalshiRecommendation[]> => {
  // In a real application, this would call an AI service or API
  // For now, we're returning mock data
  return mockAiRecommendations;
};

/**
 * Get personalized recommendations based on user data
 * @param userId User ID to generate personalized recommendations for
 * @returns An array of personalized recommendations
 */
export const getPersonalizedRecommendations = async (userId: string): Promise<KalshiRecommendation[]> => {
  // This would normally filter or customize recommendations based on user data
  // For now, just return the mock recommendations
  return mockAiRecommendations;
};

/**
 * Submit user feedback on a recommendation
 * @param recommendationId ID of the recommendation
 * @param helpful Whether the recommendation was helpful
 * @returns Success status
 */
export const submitRecommendationFeedback = async (
  recommendationId: string,
  helpful: boolean
): Promise<{ success: boolean }> => {
  // This would normally send feedback to an API
  console.log(`Feedback for recommendation ${recommendationId}: ${helpful ? 'Helpful' : 'Not helpful'}`);
  return { success: true };
};
