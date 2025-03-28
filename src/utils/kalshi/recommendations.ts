
import { KalshiAiRecommendation } from './types/recommendations';

// Mock function to get AI recommendations
export const getAiRecommendations = async (): Promise<KalshiAiRecommendation[]> => {
  // This would normally fetch from the API
  return [
    {
      marketId: 'DEM-PRES-24',
      recommendation: 'BUY',
      reason: 'Polling data suggests high probability of Democratic nominee being confirmed',
      contractPrice: 70,
      size: 10,
      cost: 700,
      potentialProfit: 300,
      potentialPayout: 1000,
      confidence: 0.85,
      category: 'Politics'
    },
    {
      marketId: 'BTC-40K-END-AUG',
      recommendation: 'SELL',
      reason: 'Technical analysis indicates resistance at $40K level',
      contractPrice: 45,
      size: 5,
      cost: 225,
      potentialProfit: 225,
      potentialPayout: 500,
      confidence: 0.65,
      category: 'Crypto'
    }
  ];
};
