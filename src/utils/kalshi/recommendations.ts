
import { mockAiRecommendations } from './mockData';

/**
 * Recommendation type with required properties for AiRecommendations component
 */
export interface KalshiRecommendation {
  id: string;
  market_id: string;
  marketId: string; // Alias for market_id for backward compatibility
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
  const recommendations = mockAiRecommendations.map(rec => ({
    ...rec,
    marketId: rec.market_id // Add the alias for backward compatibility
  }));
  return recommendations;
};

/**
 * Get personalized recommendations based on user data
 * @param userId User ID to generate personalized recommendations for
 * @returns An array of personalized recommendations
 */
export const getPersonalizedRecommendations = async (userId: string): Promise<KalshiRecommendation[]> => {
  // This would normally filter or customize recommendations based on user data
  // For now, just return the mock recommendations with the alias added
  const recommendations = mockAiRecommendations.map(rec => ({
    ...rec,
    marketId: rec.market_id // Add the alias for backward compatibility
  }));
  return recommendations;
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
